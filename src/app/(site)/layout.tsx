import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuickActions } from "@/components/QuickActions";
import { getUser } from "@/lib/user-auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div className="flex min-h-full flex-col">
      <Navbar user={user ? { name: user.name } : null} />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickActions />
    </div>
  );
}
