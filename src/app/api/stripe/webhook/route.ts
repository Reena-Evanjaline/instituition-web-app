import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  if (!isStripeEnabled || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    if (secret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, secret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const regId = session.metadata?.registrationId;
    if (regId && session.payment_status === "paid") {
      try {
        await prisma.registration.update({
          where: { id: regId },
          data: { status: "PAID" },
        });
      } catch {
        // Registration may have been removed; ignore.
      }
    }
  }

  return NextResponse.json({ received: true });
}
