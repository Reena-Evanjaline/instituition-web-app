import Link from "next/link";
import Image from "next/image";

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const light = variant === "light";
  return (
    <Link href="/" className={`group flex items-center gap-3.5 ${className}`}>
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full transition-transform group-hover:scale-105 ${
          light ? "h-16 w-16 bg-cream-50 p-0.5 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
        }`}
      >
        <Image
          src="/images/logo-emblem-v2.png"
          alt="AI Institute for Native Americans emblem"
          width={128}
          height={128}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="leading-none">
        <span
          className={`block whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl ${
            light ? "text-cream-50" : "text-navy-600"
          }`}
        >
          AI Institute
        </span>
        <span className="my-1 flex items-center gap-2">
          <span className="h-px w-4 bg-rust-500" />
          <span
            className={`font-display text-[11px] font-semibold uppercase tracking-[0.25em] sm:text-xs ${
              light ? "text-cream-200" : "text-ink-soft"
            }`}
          >
            For
          </span>
          <span className="h-px w-4 bg-rust-500" />
        </span>
        <span
          className={`block whitespace-nowrap font-display text-base font-bold uppercase tracking-[0.14em] sm:text-xl ${
            light ? "text-teal-100" : "text-teal-600"
          }`}
        >
          Native Americans
        </span>
      </span>
    </Link>
  );
}
