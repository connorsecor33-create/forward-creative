import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { IntroCurtain } from "@/components/IntroCurtain";

// Self-hosted copies of the THUMOS typefaces (all SIL Open Font License 1.1).
const maven = localFont({
  src: "./fonts/MavenPro-Variable.woff2",
  variable: "--font-maven",
  weight: "400 900",
  display: "swap",
});

const oswald = localFont({
  src: [
    { path: "./fonts/Oswald-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Oswald-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-oswald",
  display: "swap",
});

const azeret = localFont({
  src: "./fonts/AzeretMono-400.woff2",
  variable: "--font-azeret",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "creative studio",
    "brand identity",
    "web design",
    "digital agency",
    "brand strategy",
    "e-commerce design",
    "creative agency",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  slogan: site.tagline,
  description: site.description,
  sameAs: [site.social.instagram, site.social.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${maven.variable} ${oswald.variable} ${azeret.variable}`}>
      <body>
        <a
          href="#main"
          className="eyebrow sr-only z-[100] bg-lime px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <IntroCurtain />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
        </Providers>
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
