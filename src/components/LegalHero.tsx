import { WovenBorder } from "./WovenBorder";

export function LegalHero({
  title,
  updated,
}: {
  title: string;
  updated: string;
}) {
  return (
    <section>
      <div className="relative overflow-hidden bg-teal-800 text-cream-50">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[18px] border-cream-50/5" />
        <div className="container-page relative py-10 sm:py-12">
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-cream-100/75">Last updated: {updated}</p>
        </div>
      </div>
      <WovenBorder />
    </section>
  );
}
