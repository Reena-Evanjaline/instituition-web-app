import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Facebook, Linkedin, Youtube } from "./SocialIcons";
import { Logo } from "./Logo";
import { WovenBorder } from "./WovenBorder";
import { getSiteContent } from "@/lib/content";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/seminars", label: "Seminars" },
  { href: "/causes", label: "Causes & Giving" },
  { href: "/why-it-matters", label: "Why It Matters" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const site = await getSiteContent();
  return (
    <footer className="mt-0">
      <div className="bg-navy-700 text-cream-100">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-200/70">
              {site.tagline}
            </p>
            <svg
              viewBox="0 0 220 16"
              className="mt-5 h-4 w-52"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 8 H80" className="stroke-gold-500" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M80 8 q7 -7 14 0 t14 0 t14 0 t14 0"
                className="stroke-teal-400"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M148 8 H218" className="stroke-gold-500" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="mt-6 flex gap-3">
              {[Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-ocean-500 text-white transition-colors hover:bg-ocean-600"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream-50">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              {quickLinks.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-cream-200/75 transition-colors hover:text-gold-400"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream-50">
              Contact Us
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm text-cream-200/80">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`tel:${site.phone}`} className="hover:text-gold-400">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-gold-400">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  {site.address}
                  <br />
                  {site.cityStateZip}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream-50">
              Stay Connected
            </h4>
            <p className="mt-5 text-sm text-cream-200/75">
              Sign up for updates on upcoming seminars and resources.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-white/15 bg-white px-4 py-2.5 text-sm text-navy-700 outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button type="submit" className="btn-accent w-full py-2.5">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream-200/60 sm:flex-row">
            <p>© 2026 {site.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-cream-50">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-cream-50">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
      <WovenBorder size="lg" />
    </footer>
  );
}
