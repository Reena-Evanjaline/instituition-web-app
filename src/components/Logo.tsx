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
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full transition-transform group-hover:scale-105 ${
          light ? "h-12 w-12 bg-cream-50 p-0.5" : "h-12 w-12"
        }`}
      >
        <Image
          src="/images/logo-mark.png"
          alt="AI Institute for Native Americans emblem"
          width={96}
          height={96}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-xl font-bold uppercase tracking-tight ${
            light ? "text-cream-50" : "text-navy-600"
          }`}
        >
          AI Institute
        </span>
        <span className="my-0.5 flex items-center gap-1.5">
          <span className="h-px w-3 bg-rust-500" />
          <span
            className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] ${
              light ? "text-cream-200" : "text-ink-soft"
            }`}
          >
            For
          </span>
          <span className="h-px w-3 bg-rust-500" />
        </span>
        <span
          className={`block font-display text-sm font-bold uppercase tracking-[0.12em] ${
            light ? "text-teal-100" : "text-teal-600"
          }`}
        >
          Native Americans
        </span>
      </span>
    </Link>
  );
}
