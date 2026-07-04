import { requireAdmin, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  async function logout() {
    "use server";
    await destroySession();
    redirect("/admin/login");
  }

  return (
    <AdminShell adminName={session.name} logoutAction={logout}>
      {children}
    </AdminShell>
  );
}
