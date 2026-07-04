import type { Metadata } from "next";
import { XCircle, Users, Feather } from "lucide-react";
import Link from "next/link";
import { getPageContent } from "@/lib/content";
import { getUpcomingSeminars } from "@/lib/seminars";
import { isStripeEnabled } from "@/lib/stripe";
import { PageHero } from "@/components/PageHero";
import { QuickActions } from "@/components/QuickActions";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ seminar?: string; cause?: string; canceled?: string }>;
}) {
  const sp = await searchParams;
  const c = await getPageContent("register");
  const seminars = await getUpcomingSeminars();

  const options = seminars.map((s) => ({
    id: s.id,
    startDate: s.startDate.toISOString(),
    endDate: s.endDate.toISOString(),
    priceCents: s.priceCents,
  }));

  return (
    <>
      <QuickActions />
      <PageHero
        image="/images/register-hero.jpg"
        imageAlt="Mountain lake landscape"
        title={c.title}
        subtitle={
          <span className="font-display text-xl font-semibold uppercase tracking-wide text-gold-400">
            {c.subtitle}
          </span>
        }
        topWeave
      >
        <p className="mt-4 max-w-xl text-cream-100/85">{c.intro}</p>
      </PageHero>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          {sp.canceled && (
            <div className="mb-8 flex items-center gap-2 rounded-md bg-rust-500/10 px-4 py-3 text-sm text-rust-600">
              <XCircle className="h-4 w-4" />
              Your payment was canceled. You can try again anytime below.
            </div>
          )}

          <div id="register" className="scroll-mt-28">
            <RegisterForm
              seminars={options}
              defaultSeminarId={sp.seminar}
              defaultCause={sp.cause}
              stripeEnabled={isStripeEnabled}
            />
          </div>

          {/* Bring your team */}
          <div className="mt-10 grid gap-6 rounded-lg border border-cream-300 bg-cream-200/50 p-8 lg:grid-cols-2">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal-600 text-cream-50">
                <Users className="h-7 w-7" />
              </span>
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-navy-600">
                  Bring Your Team
                </p>
                <p className="text-sm text-ink-soft">
                  Group rates are available for 3 or more participants.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-block font-display text-sm font-semibold uppercase tracking-wide text-rust-500 hover:text-rust-600"
                >
                  Request Group Pricing →
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 border-cream-300 lg:border-l lg:pl-8">
              <Feather className="animate-float hidden h-12 w-12 shrink-0 text-teal-600 sm:block" strokeWidth={1.2} />
              <p className="text-ink-soft">
                Together, we build stronger Nations through education, skills, and
                stewardship of our people, our lands, and our future.{" "}
                <span className="font-semibold text-navy-600">
                  Thank you for supporting our mission.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
