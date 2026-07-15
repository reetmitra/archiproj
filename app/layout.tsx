import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollDepth } from "@/components/motion/scroll-depth";
import { getProfile } from "@/lib/content";

// The prof's pick (option 4 of the 2026-07 font comparison): Inter for
// headings AND body. Only the mono labels keep their own face.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: {
      default: `${profile.name} — ${profile.title}, ${profile.affiliation}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.bio,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();
  return (
    <html
      lang="en"
      // the pre-paint inline script adds data-motion before hydration
      suppressHydrationWarning
      className={`${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Set data-motion pre-paint so [data-anim] elements hide before
            the first frame, on every route. No-JS/crawlers never run this,
            so nothing hides for them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-motion','')",
          }}
        />
        <ScrollDepth />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-accent focus:text-ink focus:px-4 focus:py-2 focus:font-medium"
        >
          Skip to content
        </a>
        <Header wordmark={profile.name} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
