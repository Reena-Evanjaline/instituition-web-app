import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Institute for Native Americans",
    template: "%s · AI Institute for Native Americans",
  },
  description:
    "2-day hands-on training that equips tribal professionals and community members with AI, financial, and career skills to build stronger Nations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
