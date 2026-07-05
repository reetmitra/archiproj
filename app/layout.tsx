import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSiteSettings } from "@/lib/content";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const site = getSiteSettings();

export const metadata: Metadata = {
  title: {
    default: `${site.labName} — ${site.tagline}`,
    template: `%s — ${site.labName}`,
  },
  description: site.mission,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // the pre-paint inline script adds data-motion before hydration
      suppressHydrationWarning
      className={`${bricolage.variable} ${publicSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-accent focus:text-ink focus:px-4 focus:py-2 focus:font-medium"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
