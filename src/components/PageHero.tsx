import Image from "next/image";
import { WovenBorder } from "./WovenBorder";

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt = "",
  topWeave = false,
  objectPosition = "50% 50%",
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  image: string;
  imageAlt?: string;
  topWeave?: boolean;
  /** Which part of the photo to keep in the wide frame (CSS object-position). */
  objectPosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section>
      {topWeave && <WovenBorder />}
      <div className="relative flex min-h-[360px] items-center overflow-hidden bg-navy-800 sm:min-h-0 sm:aspect-[1024/320]">
        {/* Full-width scene photo (matches the demo's edge-to-edge hero). */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
          {/* Light left-weighted wash — keeps the white headline legible while
              letting the sunset read vividly (like the demo). */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/75 via-navy-900/30 to-transparent" />
        </div>

        <div className="container-page relative w-full py-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.02] text-cream-50 sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white sm:text-xl">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
      <WovenBorder />
    </section>
  );
}
