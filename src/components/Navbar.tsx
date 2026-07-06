"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/seminars", label: "Seminars" },
  { href: "/causes", label: "Causes & Giving" },
  { href: "/why-it-matters", label: "Why It Matters" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ user }: { user?: { name: string } | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#FBF3EA]">
      <nav className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 xl:h-24 xl:px-10">
        <Logo />

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative whitespace-nowrap px-3 py-2 font-display text-base font-semibold tracking-normal transition-colors ${
                isActive(l.href)
                  ? "text-rust-500"
                  : "text-navy-600 hover:text-rust-500"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-rust-500" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 xl:flex">
          <Link
            href={user ? "/account" : "/login"}
            className="whitespace-nowrap font-display text-base font-semibold text-navy-600 transition-colors hover:text-rust-500"
          >
            {user ? "My Account" : "Sign In"}
          </Link>
          <Link href="/register" className="btn-accent whitespace-nowrap px-6 py-3 text-base">
            Register Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-md border border-cream-300 bg-cream-50 text-navy-600 xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={open ? "pointer-events-auto xl:hidden" : "pointer-events-none xl:hidden"}>
        <div
          className={`fixed inset-0 top-20 z-40 bg-navy-800/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed inset-x-0 top-20 z-50 border-b border-cream-300 bg-[#FBF3EA] px-5 pb-6 pt-3 shadow-soft transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-4 py-3 font-display text-base font-semibold tracking-normal ${
                  isActive(l.href)
                    ? "bg-teal-600 text-cream-50"
                    : "text-navy-600 hover:bg-cream-200"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={user ? "/account" : "/login"}
              className="rounded-md px-4 py-3 font-display text-base font-semibold tracking-normal text-navy-600 hover:bg-cream-200"
            >
              {user ? "My Account" : "Sign In"}
            </Link>
            <Link href="/register" className="btn-accent mt-3 w-full">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
