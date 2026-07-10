import Link from "next/link";
import Image from "next/image";
import { Anton } from "next/font/google";

/** Tall condensed display face for the wordmark, matching the brand lockup. */
const wordmark = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

export function Logo({
  className = "",
  variant = "dark",
  priority = false,
  size = "md",
}: {
  className?: string;
  variant?: "dark" | "light";
  /** Only the header logo is above the fold — leave false for the footer. */
  priority?: boolean;
  /** "md" is the full header lockup; "sm" is the compact footer lockup. */
  size?: "md" | "sm";
}) {
  const light = variant === "light";
  const sm = size === "sm";
  const emblem = sm
    ? "/images/logo-emblem-footer-v4.png"
    : "/images/logo-emblem-v2.png";
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3.5 ${wordmark.variable} ${className}`}
    >
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full transition-transform group-hover:scale-105 ${
          sm ? "h-[6.5rem] w-[6.5rem]" : "h-16 w-16 sm:h-20 sm:w-20 xl:h-[8.25rem] xl:w-[8.25rem]"
        } ${light && !sm ? "bg-cream-50 p-0.5" : ""}`}
      >
        <Image
          src={emblem}
          alt=""
          width={128}
          height={128}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </span>
      {/* Width is set by the AI INSTITUTE line alone; the NATIVE AMERICANS row is
          absolutely positioned across that width so it stays flush at both edges
          without ever stretching the top line. */}
      <span
        className={`relative block font-[family-name:var(--font-logo)] leading-none ${
          sm ? "pb-[1.7rem]" : "pb-[0.9rem] sm:pb-[1.15rem] xl:pb-[1.9rem]"
        }`}
      >
        <span
          className={`flex gap-[0.15em] whitespace-nowrap uppercase leading-none ${
            sm
              ? "text-[2.1rem] tracking-[0.1em]"
              : "tracking-[0.02em] text-[1.4rem] sm:text-[1.75rem] xl:text-[3rem]"
          } ${light ? "text-cream-50" : "text-navy-600"}`}
        >
          <span>AI</span>
          <span>Institute</span>
        </span>
        <span className={`flex items-center ${sm ? "my-2 gap-2" : "my-2 gap-2.5"}`}>
          <span className={`h-0.5 flex-1 rounded-full ${light ? "bg-gold-400" : "bg-rust-500"}`} />
          <span
            className={`uppercase leading-none tracking-[0.2em] ${
              sm ? "text-[0.95rem]" : "text-[0.6rem] sm:text-[0.8rem] xl:text-[1.05rem]"
            } ${light ? "text-cream-200" : "text-navy-600"}`}
          >
            For
          </span>
          <span className={`h-0.5 flex-1 rounded-full ${light ? "bg-gold-400" : "bg-rust-500"}`} />
        </span>
        <span
          className={`absolute inset-x-0 bottom-0 flex justify-between gap-[0.35em] whitespace-nowrap uppercase leading-none tracking-[0.02em] ${
            sm ? "text-[1.58rem]" : "text-[0.9rem] sm:text-[1.15rem] xl:text-[1.9rem]"
          } ${light ? (sm ? "text-cream-50" : "text-teal-100") : "text-teal-600"}`}
        >
          <span>Native</span>
          <span>Americans</span>
        </span>
      </span>
    </Link>
  );
}
