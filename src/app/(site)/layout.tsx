import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuickActions } from "@/components/QuickActions";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileNav } from "@/components/MobileNav";
import { getUser } from "@/lib/user-auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div className="flex min-h-full flex-col">
      {/* Content layer sits ABOVE the footer with an opaque background, so the
          sticky footer below is hidden until the page scrolls up to reveal it. */}
      <div className="relative z-10 flex flex-1 flex-col bg-[#fbf3ea]">
        <Navbar user={user ? { name: user.name } : null} />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
      <QuickActions />
      <ScrollToTop />
      <MobileNav />
    </div>
  );
}
