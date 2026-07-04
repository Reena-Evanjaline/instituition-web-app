import Image from "next/image";
import { WovenBorder } from "./WovenBorder";

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt = "",
  topWeave = false,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  image: string;
  imageAlt?: string;
  topWeave?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section>
      {topWeave && <WovenBorder />}
      <div className="relative overflow-hidden bg-navy-800">
        {/* Photo sits in the right half and shows the full scene (no full-bleed crop). */}
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          {/* Soft seam: fade the photo's left edge into the dark panel. */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-navy-800 to-transparent" />
        </div>

        <div className="container-page relative py-20 sm:py-28">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-cream-50 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream-100/90">
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
