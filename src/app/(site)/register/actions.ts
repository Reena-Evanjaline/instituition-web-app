"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe, isStripeEnabled } from "@/lib/stripe";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  descriptor: z.string().optional(),
  seminarId: z.string().optional(),
  cause: z.string().optional(),
  amountCents: z.coerce.number().int().min(100).max(10_000_00),
});

export type RegisterState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitRegistration(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = schema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    organization: formData.get("organization"),
    role: formData.get("role"),
    descriptor: formData.get("descriptor"),
    seminarId: formData.get("seminarId"),
    cause: formData.get("cause"),
    amountCents: formData.get("amountCents"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  const d = parsed.data;
  // Ignore the fallback pseudo-ids (they aren't real DB rows).
  const seminarId =
    d.seminarId && !d.seminarId.startsWith("fallback-") ? d.seminarId : null;

  let registrationId: string;
  try {
    const reg = await prisma.registration.create({
      data: {
        fullName: d.fullName,
        email: d.email,
        phone: d.phone || null,
        organization: d.organization || null,
        role: d.role || null,
        descriptor: d.descriptor || null,
        cause: d.cause || null,
        amountCents: d.amountCents,
        seminarId,
      },
    });
    registrationId = reg.id;
  } catch {
    return { error: "Could not save your registration. Please try again." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // ── Stripe checkout ──────────────────────────────────────────
  // Build the checkout session inside try/catch, but perform the redirect
  // OUTSIDE it — redirect() throws a control-flow signal that must not be
  // swallowed by the catch.
  let checkoutUrl: string | null = null;
  if (isStripeEnabled && stripe) {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: d.email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: d.amountCents,
              product_data: {
                name: "AI Institute — 2-Day Seminar Registration",
                description: d.cause ? `In support of: ${d.cause}` : undefined,
              },
            },
          },
        ],
        success_url: `${siteUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/register?canceled=1`,
        metadata: { registrationId },
      });

      await prisma.registration.update({
        where: { id: registrationId },
        data: { stripeSessionId: session.id },
      });

      checkoutUrl = session.url;
    } catch (err) {
      console.error("[stripe] checkout session failed:", err);
      return {
        error:
          "Payment could not be started. Please check your details and try again.",
      };
    }

    if (checkoutUrl) redirect(checkoutUrl);
    return { error: "Payment could not be started. Please try again." };
  }

  // ── Demo mode (no Stripe key) ────────────────────────────────
  redirect(`/register/success?demo=1&rid=${registrationId}`);
}
