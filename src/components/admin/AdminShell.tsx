"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Lock,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { isAdminFeatureEnabled, type AdminFeature } from "@/lib/adminFeatures";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  feature: AdminFeature;
};

const allNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true, feature: "dashboard" },
  { href: "/admin/seminars", label: "Seminars", icon: CalendarDays, feature: "seminars" },
  { href: "/admin/registrations", label: "Registrations", icon: Users, feature: "registrations" },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, feature: "messages" },
  { href: "/admin/content", label: "Page Content", icon: FileText, feature: "content" },
];


export function AdminShell({
  children,
  adminName,
  logoutAction,
}: {
  children: React.ReactNode;
  adminName: string;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {allNav.map((n) => {
          const enabled = isAdminFeatureEnabled(n.feature);

          if (!enabled) {
            return (
              <div
                key={n.href}
                aria-disabled="true"
                title="Coming soon"
                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft/40"
              >
                <n.icon className="h-5 w-5" />
                <span className="flex-1">{n.label}</span>
                <Lock className="h-3.5 w-3.5" />
              </div>
            );
          }

          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(n.href, n.exact)
                  ? "bg-teal-600 text-cream-50"
                  : "text-ink-soft hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-cream-200 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-teal-50 hover:text-teal-700"
        >
          <ExternalLink className="h-5 w-5" />
          View Site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rust-600 hover:bg-rust-500/10"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-cream-200 bg-white lg:block">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-soft">
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-cream-200 bg-white px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-cream-200 text-teal-700 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-soft">
              Signed in as <strong className="text-ink">{adminName}</strong>
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-600 text-sm font-semibold text-cream-50">
              {adminName.charAt(0).toUpperCase()}
            </span>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>

      {/* Close button for mobile overlay accessibility */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed right-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-lg bg-white text-teal-700 shadow lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
