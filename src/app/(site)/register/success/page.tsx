import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = { title: "Registration Confirmed" };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; demo?: string; rid?: string }>;
}) {
  const sp = await searchParams;
  let amountCents: number | null = null;
  let email: string | null = null;

  // Confirm the Stripe payment and mark the registration paid.
  if (sp.session_id && isStripeEnabled && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sp.session_id);
      if (session.payment_status === "paid") {
        amountCents = session.amount_total ?? null;
        email = session.customer_email ?? null;
        const regId = session.metadata?.registrationId;
        if (regId) {
          await prisma.registration.update({
            where: { id: regId },
            data: { status: "PAID" },
          });
        }
      }
    } catch {
      // Ignore — still show a friendly confirmation.
    }
  } else if (sp.rid) {
    try {
      const reg = await prisma.registration.findUnique({ where: { id: sp.rid } });
      if (reg) {
        amountCents = reg.amountCents;
        email = reg.email;
      }
    } catch {
      // Ignore.
    }
  }

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-20">
      <div className="card max-w-lg p-8 text-center sm:p-12">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal-50 text-teal-600">
          <CheckCircle2 className="h-11 w-11" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-teal-800">
          You&apos;re registered!
        </h1>
        <p className="mt-3 text-ink-soft">
          {sp.demo
            ? "This is a demo confirmation — no real charge was made."
            : "Thank you for registering. A confirmation has been sent to your email."}
        </p>

        {(amountCents || email) && (
          <div className="mt-6 space-y-2 rounded-xl bg-cream-100 p-5 text-left text-sm">
            {email && (
              <div className="flex justify-between">
                <span className="text-ink-soft">Confirmation email</span>
                <span className="font-medium text-ink">{email}</span>
              </div>
            )}
            {amountCents != null && (
              <div className="flex justify-between">
                <span className="text-ink-soft">Amount</span>
                <span className="font-medium text-ink">
                  {formatCurrency(amountCents)}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to Home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/seminars" className="btn-outline">
            View Seminars
          </Link>
        </div>
      </div>
    </section>
  );
}
