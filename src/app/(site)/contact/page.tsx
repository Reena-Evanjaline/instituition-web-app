import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Users, Feather } from "lucide-react";
import { getPageContent, getSiteContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const c = await getPageContent("contact");
  const site = await getSiteContent();

  const methods = [
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Address", value: `${site.address}\n${site.cityStateZip}` },
    { icon: Clock, label: "Office Hours", value: c.officeHours },
  ];

  return (
    <>
      <PageHero
        image="/images/contact-hero.jpg"
        imageAlt="Mountain lake with teepee at sunset"
        title={c.title}
        subtitle={c.subtitle}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid items-stretch gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Get in touch */}
          <Reveal className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-600 text-cream-50">
                <Mail className="h-6 w-6" />
              </span>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy-600">
                Get In Touch
              </h2>
            </div>
            <p className="mt-4 text-ink-soft">{c.getInTouchBody}</p>

            <div className="mt-8 flex flex-1 flex-col justify-between gap-6">
              {methods.map((m) => {
                const body = (
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-600 text-cream-50">
                      <m.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold uppercase tracking-wide text-navy-600">
                        {m.label}
                      </p>
                      <p className="whitespace-pre-line text-ink-soft">{m.value}</p>
                    </div>
                  </div>
                );
                return m.href ? (
                  <a key={m.label} href={m.href} className="block transition-opacity hover:opacity-80">
                    {body}
                  </a>
                ) : (
                  <div key={m.label}>{body}</div>
                );
              })}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-600 text-cream-50">
                <Users className="h-6 w-6" />
              </span>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-navy-600">
                Send Us A Message
              </h2>
            </div>
            <div className="mt-5">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Group training band */}
      <section className="relative overflow-hidden bg-teal-700 text-cream-50">
        <div className="grid lg:grid-cols-2">
          <div className="container-page py-12 lg:py-16" style={{ marginRight: 0 }}>
            <div className="flex items-start gap-5">
              <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-cream-50/60 sm:grid">
                <Users className="h-8 w-8" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
                  Interested In Group Training?
                </h2>
                <p className="mt-3 max-w-md text-cream-100/85">
                  We offer special group rates for Tribal governments, departments, and
                  organizations. Contact us to get a custom quote for your team.
                </p>
                <Link
                  href={`mailto:${site.email}?subject=Group%20Training`}
                  className="btn-outline-light mt-6"
                >
                  Request Group Information
                </Link>
              </div>
            </div>
          </div>
          <div className="img-zoom relative min-h-[220px]">
            <Image
              src="/images/contact-group.jpg"
              alt="Tribal professionals collaborating"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Thank you */}
      <section className="bg-cream-200/60 py-12">
        <div className="container-page flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <Feather className="animate-float h-14 w-14 shrink-0 text-teal-600" strokeWidth={1.2} />
          <div>
            <p className="text-ink-soft">
              Together, we build stronger Nations through knowledge, opportunity, and
              respect for our traditions and future.
            </p>
            <p className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-teal-600">
              Thank You For Supporting Native Communities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
