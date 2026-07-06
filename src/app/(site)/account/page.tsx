import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { requireUser } from "@/lib/user-auth";
import { AuthCard } from "@/components/AuthCard";
import { logoutAction } from "../auth-actions";

export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const user = await requireUser();

  return (
    <AuthCard title="My Account" subtitle="You're signed in.">
      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-md border border-cream-300 bg-cream-100 p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-600 text-cream-50">
            <UserRound className="h-6 w-6" />
          </span>
          <div className="text-sm">
            <p className="font-display font-bold uppercase tracking-wide text-navy-600">
              {user.name}
            </p>
            <p className="text-ink-soft">{user.email}</p>
          </div>
        </div>

        <form action={logoutAction}>
          <button type="submit" className="btn-outline w-full justify-center">
            Sign Out
          </button>
        </form>
      </div>
    </AuthCard>
  );
}
