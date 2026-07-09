import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Centered section title with the little diamond/rule flourishes (·—— TITLE ——·). */
export function FlourishTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <h2 className={`flourish-title ${className}`}>{children}</h2>
    </Reveal>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`mt-3 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl ${
            light ? "text-cream-50" : "text-navy-600"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-cream-100/85" : "text-ink-soft"}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-10 sm:py-12 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
