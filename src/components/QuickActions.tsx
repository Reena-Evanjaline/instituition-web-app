import Link from "next/link";

/**
 * Floating quick-action pills pinned to the right edge, shown site-wide.
 * Register → registration, Dates → seminars list, Help → contact page.
 */
export function QuickActions() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 pr-1 sm:flex"
    >
      <Link
        href="/register"
        className="rounded-full bg-rust-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream-50 shadow-lg transition-colors hover:bg-rust-600"
      >
        Register
      </Link>
      <Link
        href="/seminars"
        className="rounded-full bg-cream-50 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-700 shadow-lg transition-colors hover:bg-cream-100"
      >
        Dates
      </Link>
      <Link
        href="/contact"
        className="rounded-full bg-cream-50 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-700 shadow-lg transition-colors hover:bg-cream-100"
      >
        Help
      </Link>
    </nav>
  );
}
