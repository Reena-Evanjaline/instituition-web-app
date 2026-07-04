import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Landmark,
  Trees,
  Users,
  TrendingUp,
  GraduationCap,
  Check,
  Quote,
} from "lucide-react";
import { Facebook, Instagram, Linkedin } from "@/components/SocialIcons";
import { getPageContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Why It Matters" };

const empowers = [
  { icon: Landmark, tint: "bg-teal-600", title: "Govern Ourselves", body: "Make decisions that reflect our values, traditions, and the needs of our people." },
  { icon: Trees, tint: "bg-rust-500", title: "Protect Our Lands and Resources", body: "Care for the lands, waters, and natural resources entrusted to us for future generations." },
  { icon: Users, tint: "bg-teal-600", title: "Strengthen Our Communities", body: "Build healthy, safe, and vibrant communities through programs and services we control." },
  { icon: TrendingUp, tint: "bg-plum-500", title: "Build Economic Independence", body: "Create jobs, support tribal enterprises, and strengthen our financial future." },
  { icon: GraduationCap, tint: "bg-rust-500", title: "Invest in Our Future Generations", body: "Provide education, training, and opportunities so our youth can lead with pride and purpose." },
];

const trainingPoints = [
  "Improve financial management and accountability",
  "Increase efficiency and reduce administrative burdens",
  "Write stronger grants and secure more funding",
  "Build a skilled workforce equipped for today and tomorrow",
  "Strengthen tribal enterprises and economic development",
];

export default async function WhyPage() {
  const c = await getPageContent("why");
  return (
    <>
      {/* Utility top bar */}
      <div className="bg-navy-700 text-cream-100">
        <div className="container-page flex h-10 items-center justify-between">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-cream-100">
            Strong Nations. Strong Futures.
          </span>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="text-cream-100/80 hover:text-gold-400">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <PageHero
        image="/images/why-hero.jpg"
        imageAlt="Native woman in star quilt overlooking a valley at sunrise"
        title={
          <>
            {c.title}{" "}
            <span className="text-rust-400">{c.titleAccent}</span>{" "}
            {c.titleEnd}
          </>
        }
        subtitle={c.subtitle}
        topWeave
      >
        <p className="mt-4 font-display text-lg font-semibold italic text-gold-400">
          {c.emphasis}
        </p>
      </PageHero>

      {/* Empowers */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-display text-2xl font-bold uppercase tracking-wide text-teal-600 sm:text-3xl">
            Sovereignty Empowers Our Nations To:
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {empowers.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06} variant="blur">
                <div className="group flex cursor-default flex-col items-center text-center">
                  <span className={`icon-pop grid h-16 w-16 place-items-center rounded-full text-cream-50 shadow-card ${e.tint}`}>
                    <e.icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold uppercase leading-tight tracking-wide text-navy-600">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Training band */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-lg bg-teal-800 text-cream-50">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="img-zoom relative min-h-[260px]">
                <Image
                  src="/images/why-training.jpg"
                  alt="Tribal professionals collaborating"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:py-12 lg:pr-12">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
                  How This Training Supports Sovereignty
                </h2>
                <p className="mt-3 text-cream-100/80">
                  Strong systems are the backbone of strong Nations. Our AI training
                  helps Tribal governments and organizations:
                </p>
                <ul className="mt-5 space-y-2.5">
                  {trainingPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-cream-100/90">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" /> {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-display font-semibold uppercase tracking-wide text-gold-400">
                  Stronger skills. Stronger systems. Stronger sovereignty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote + together */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full gap-4 rounded-lg bg-cream-200/70 p-8">
              <Quote className="h-8 w-8 shrink-0 text-rust-500" />
              <div>
                <p className="font-display text-xl font-semibold leading-snug text-navy-600">
                  Sovereignty is not a gift. It is a right. Our Nations have always
                  been here, and we will continue to build a future that honors our
                  ancestors and uplifts our people.
                </p>
                <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-rust-500">
                  — For Our Nations. For Our Future.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-lg bg-cream-200/70 p-8">
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-teal-600">
                Together, We Build Stronger Nations
              </h3>
              <p className="mt-3 text-ink-soft">
                When we invest in our people, our systems, and our sovereignty, we
                create a future where our Nations can thrive—today and for generations
                to come.
              </p>
              <Link href="/register" className="btn-accent mt-6 self-start">
                Register For A Seminar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-800 text-cream-50">
        <div className="container-page flex flex-col items-center gap-6 py-12 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-5">
            <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold-400 text-gold-400 sm:grid">
              <Users className="h-8 w-8" />
            </span>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
              {c.bannerTitle}
              <span className="mt-1 block text-sm font-normal normal-case tracking-normal text-cream-100/80">
                {c.bannerSubtitle}
              </span>
            </h2>
          </div>
          <Link href="/register" className="btn-gold shrink-0">
            Register Now
          </Link>
        </div>
      </section>
    </>
  );
}
