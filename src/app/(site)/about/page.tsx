import type { Metadata } from "next";
import Image from "next/image";
import { Users, Target, Landmark, Tag, CheckCircle2, Feather } from "lucide-react";
import { getPageContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "About Us" };

const pillars = [
  {
    icon: Users,
    title: "Why We Exist",
    body: [
      "Tribal governments and organizations face increasing demands with limited resources. Many systems remain manual and inefficient.",
      "We strengthen internal capability to improve performance, accuracy, and sustainability.",
    ],
  },
  {
    icon: Target,
    title: "Our Approach",
    body: [
      "Our training is hands-on, practical, and designed for immediate use. Every concept connects directly to real tribal operations.",
      "We deliver tools—not theory.",
    ],
  },
  {
    icon: Landmark,
    title: "Our Focus",
    body: [
      "We serve tribal governments, staff, enterprises, and workforce programs.",
      "Our work strengthens the people responsible for delivering results.",
    ],
  },
];

const includes = [
  "Includes training materials",
  "Breakfast, snacks & lunch both days",
  "AI tool resources",
  "Certificate of completion",
];

export default async function AboutPage() {
  const c = await getPageContent("about");
  return (
    <>
      <PageHero
        image="/images/about-hero.jpg"
        imageAlt="Riders at sunset near teepees"
        title={c.title}
        subtitle={c.subtitle}
      />

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-rust-500" />
              {c.missionTitle}
            </span>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>{c.missionBody1}</p>
              <p>{c.missionBody2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="img-zoom relative aspect-[4/3] rounded-lg shadow-soft">
              <Image
                src="/images/about-dreamcatcher.jpg"
                alt="Dreamcatcher and feather on wood"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-cream-200/60 py-16 sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} variant="up">
              <div className="group flex flex-col">
                <div className="flex items-center gap-4">
                  <span className={`icon-pop grid h-14 w-14 shrink-0 place-items-center rounded-full text-cream-50 ${
                    i === 1 ? "bg-rust-500" : "bg-teal-600"
                  }`}>
                    <p.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-navy-600">
                    {p.title}
                  </h3>
                </div>
                <span className="mt-4 h-0.5 w-12 bg-rust-500" />
                <div className="mt-4 space-y-3 text-ink-soft">
                  {p.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Program value */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid items-center gap-8 rounded-lg border border-cream-300 bg-cream-50 p-8 shadow-card lg:grid-cols-[auto_1fr_1fr] lg:gap-12 lg:p-12">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-teal-600 text-cream-50">
                <Tag className="h-11 w-11" />
              </span>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide text-navy-600">
                  Program Value
                </p>
                <p className="font-display text-5xl font-bold text-rust-500">
                  <CountUp value={1595} prefix="$" />
                  <span className="ml-2 align-middle font-display text-base font-semibold text-navy-600">
                    Per Participant
                  </span>
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Participants gain practical financial skills, increased efficiency,
                  and tools that improve day-to-day operations—along with a certificate
                  of completion.
                </p>
              </div>
              <ul className="space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" />
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="flex flex-col items-center gap-5 rounded-lg bg-teal-700 px-8 py-10 text-cream-50 sm:flex-row sm:gap-8 sm:py-12">
            <Feather className="animate-float h-16 w-16 shrink-0 text-cream-100/90" strokeWidth={1} />
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                {c.bannerTitle}
              </h2>
              <p className="mt-2 text-cream-100/85">{c.bannerSubtitle}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
