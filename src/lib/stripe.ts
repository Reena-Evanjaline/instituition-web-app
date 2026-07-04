import "server-only";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** Stripe client — null when no key is configured (demo mode). */
export const stripe: Stripe | null = key
  ? new Stripe(key, { apiVersion: "2026-06-24.dahlia" })
  : null;

export const isStripeEnabled = Boolean(key);
