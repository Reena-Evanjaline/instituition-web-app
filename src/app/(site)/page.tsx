import Link from "next/link";
import Image from "next/image";
import {
  DollarSign,
  CheckCircle2,
  Users,
  TrendingUp,
  Calendar,
  UtensilsCrossed,
  BookOpen,
  Award,
  Feather,
  ArrowRight,
} from "lucide-react";
import { getPageContent } from "@/lib/content";
import { getUpcomingSeminars } from "@/lib/seminars";
import { formatDateRange } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { FlourishTitle } from "@/components/Section";
import { SeminarCard } from "@/components/SeminarCard";
import { WovenBorder } from "@/components/WovenBorder";

const benefits = [
  {
    icon: DollarSign,
    color: "bg-teal-600",
    title: "Improve Efficiency",
    body: "Save time and reduce administrative burdens with AI tools.",
  },
  {
    icon: CheckCircle2,
    color: "bg-rust-500",
    title: "Increase Accuracy",
    body: "Improve financial accuracy and reduce errors.",
  },
  {
    icon: Users,
    color: "bg-teal-600",
    title: "Strengthen Operations",
    body: "Build stronger systems and support Tribal governance.",
  },
  {
    icon: TrendingUp,
    color: "bg-plum-500",
    title: "Build Opportunities",
    body: "Support workforce development and economic growth.",
  },
];

export default async function HomePage() {
  const c = await getPageContent("home");
  const seminars = await getUpcomingSeminars(4);
  const next = seminars[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section>
        <div className="relative overflow-hidden bg-navy-800">
          {/* Photo sits in the right half and shows the full scene (no full-bleed crop). */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
            <Image
              src="/images/home-hero.jpg"
              alt="Native American professionals training with AI"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            {/* Soft seam: fade the photo's left edge into the dark panel. */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-navy-800 to-transparent" />
          </div>
          <div className="container-page relative py-20 sm:py-28 lg:py-32">
            <div className="max-w-2xl">
              <Reveal>
                <h1 className="font-display text-4xl font-bold uppercase leading-[1.02] text-cream-50 sm:text-5xl lg:text-6xl">
                  {c.heroTitle}
                  <span className="mt-2 block text-2xl font-semibold text-cream-100 sm:text-3xl lg:text-4xl">
                    {c.heroTitleAccent}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-lg text-cream-100/90">
                  {c.heroSubtitle}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link href="/register" className="btn-accent">
                    {c.heroPrimaryCta}
                  </Link>
                  <Link href="/seminars" className="btn-outline-light">
                    {c.heroSecondaryCta}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <WovenBorder size="lg" />
      </section>

      {/* ── Info bar ─────────────────────────────────────── */}
      <section className="bg-cream-100">
        <div className="container-page py-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal-600 text-cream-50">
                <Calendar className="h-7 w-7" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Next Seminar
                </p>
                <p className="font-display text-lg font-bold text-navy-600">
                  {next ? formatDateRange(next.startDate, next.endDate) : "Coming soon"}
                </p>
              </div>
            </div>

            <div className="hidden h-12 w-px bg-cream-300 lg:block" />

            <div className="text-center">
              <p className="font-display text-3xl font-bold text-navy-600">
                <CountUp value={(next?.priceCents ?? 159500) / 100} prefix="$" />
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {c.priceLabel}
              </p>
              <p className="text-xs text-ink-soft">{c.priceNote}</p>
            </div>

            <div className="hidden h-12 w-px bg-cream-300 lg:block" />

            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                [UtensilsCrossed, "Meals Included"],
                [BookOpen, "Training Materials"],
                [Award, "Certificate of Completion"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Award;
                return (
                  <div key={label as string} className="flex flex-col items-center gap-1.5 text-center">
                    <I className="h-6 w-6 text-navy-600" />
                    <span className="max-w-[6rem] text-xs font-semibold uppercase tracking-wide text-navy-600">
                      {label as string}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link href="/register" className="btn-accent">
              Reserve Your Spot Now
            </Link>
          </div>
        </div>
        <div className="container-page">
          <div className="h-px bg-cream-300" />
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-page">
          <FlourishTitle>{c.benefitsTitle}</FlourishTitle>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} variant="blur">
                <div className="group flex cursor-default flex-col items-center text-center">
                  <span className={`icon-pop grid h-16 w-16 place-items-center rounded-full text-cream-50 shadow-card ${b.color}`}>
                    <b.icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-navy-600">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming seminars ────────────────────────────── */}
      <section className="border-t border-cream-300 bg-cream-100 py-16 sm:py-20">
        <div className="container-page">
          <FlourishTitle>Upcoming Seminars</FlourishTitle>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seminars.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <SeminarCard seminar={s} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold text-ink-soft">
            New seminars every two weeks!
          </p>
        </div>
      </section>

      {/* ── Causes CTA band ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-teal-700 text-cream-50">
        <div className="absolute -right-16 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border-[20px] border-cream-50/5 lg:block" />
        <div className="container-page relative grid items-center gap-8 py-14 lg:grid-cols-[auto_1fr_auto]">
          <Feather className="animate-float h-24 w-24 shrink-0 text-cream-100/90" strokeWidth={1} />
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              Invest In Your Future. Invest In Your Nation.
            </h2>
            <p className="mt-3 max-w-xl text-cream-100/85">
              Support Protecting Native American Women and Native American Sovereignty.
            </p>
            <p className="mt-2 font-semibold text-gold-400">
              100% of contributions go directly to these causes.
            </p>
          </div>
          <Link href="/causes" className="btn-outline-light shrink-0">
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
