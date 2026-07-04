import type { ReactNode } from "react";

export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-teal-600 [&_a:hover]:text-rust-500 [&_li]:relative [&_li]:pl-6 [&_ul]:space-y-2 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-rust-500 [&_ul>li]:before:content-['▸']">
          {children}
        </div>
      </div>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3 border-t border-cream-300 pt-6">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy-600">
        {title}
      </h2>
      {children}
    </div>
  );
}
