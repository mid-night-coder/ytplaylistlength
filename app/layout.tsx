import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const BASE_URL = "https://ytplaylistlengthcal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "YouTube Playlist Length Calculator — Total Duration & Watch Time",
    template: "%s | YT Playlist Length",
  },
  description:
    "Free YouTube Playlist Length Calculator. Calculate total playlist duration and watch time at 1x, 1.25x, 1.5x, 1.75x, and 2x speeds. No sign-up required.",
  keywords: [
    "YouTube playlist length calculator","YouTube playlist duration","YouTube watch time calculator",
    "how long is a YouTube playlist","playlist length checker","YouTube 2x speed calculator",
    "binge watch calculator","youtube total duration",
  ],
  authors: [{ name: "YT Playlist Length" }],
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website", locale: "en_US", url: BASE_URL,
    siteName: "YouTube Playlist Length Calculator",
    title: "YouTube Playlist Length Calculator — Free Online Tool",
    description: "Calculate total YouTube playlist duration instantly. Get watch time at 5 playback speeds. No signup required.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "YouTube Playlist Length Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Playlist Length Calculator",
    description: "Calculate the total duration of any YouTube playlist instantly.",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: { canonical: BASE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YouTube Playlist Length Calculator",
  url: BASE_URL,
  description: "Calculate total YouTube playlist duration and watch time at different playback speeds.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["Total playlist duration","Watch time at 1.25x, 1.5x, 1.75x, 2x speeds","Daily watch planner","Video list with thumbnails","Single video support","Multi-URL aggregation"],
  author: { "@type": "Organization", name: "YT Playlist Length", url: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Inline theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <Script src="https://pl30154839.effectivecpmnetwork.com/4e/a2/93/4ea29356f9e54b45aaabfa3362084c1a.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
