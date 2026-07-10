"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Phone, Menu, UserPlus } from "lucide-react";

/**
 * Fixed bottom navigation bar for phones (hidden at md and up). Gives thumb
 * access to the key destinations with Register as the elevated centre action.
 * The "Menu" button opens the existing Navbar drawer via a window event.
 */
const sideItems = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/seminars", label: "Seminars", Icon: Calendar },
  { href: "/contact", label: "Contact", Icon: Phone },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      <div className="flex items-end justify-around border-t border-cream-300 bg-cream-50 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_24px_-10px_rgba(20,20,20,0.35)]">
        <NavLink {...sideItems[0]} active={isActive(sideItems[0].href)} />
        <NavLink {...sideItems[1]} active={isActive(sideItems[1].href)} />

        {/* Elevated centre action */}
        <Link
          href="/register"
          aria-label="Register"
          className="-mt-7 flex w-16 flex-col items-center"
        >
          <span
            className={`grid h-14 w-14 place-items-center rounded-full text-white shadow-lg ring-4 ring-cream-50 transition-colors ${
              isActive("/register") ? "bg-rust-600" : "bg-rust-500"
            }`}
          >
            <UserPlus className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-rust-600">
            Register
          </span>
        </Link>

        <NavLink {...sideItems[2]} active={isActive(sideItems[2].href)} />

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("toggle-mobile-menu"))}
          aria-label="Open menu"
          className="flex w-16 flex-col items-center gap-1 py-1 text-navy-600 transition-colors hover:text-rust-500"
        >
          <Menu className="h-6 w-6" />
          <span className="text-[11px] font-medium">Menu</span>
        </button>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex w-16 flex-col items-center gap-1 py-1 transition-colors ${
        active ? "text-rust-500" : "text-navy-600 hover:text-rust-500"
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-[11px] font-medium">{label}</span>
    </Link>
  );
}
