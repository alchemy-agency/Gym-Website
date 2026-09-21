import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { GoogleTag } from "@/components/GoogleTag";
import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { contact, isInstagramEnabled, site } from "@/content/business";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "A private, application-only gym on Autopark Drive in Huntington Beach, and one-on-one personal training with Sam Axelrode. The first session is free.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Sam's Body Shop HB | Private Gym & Personal Training in Huntington Beach",
    template: `%s | ${site.gymName}`,
  },
  description,
  applicationName: site.gymName,
  keywords: [
    "private gym Huntington Beach",
    "personal trainer Huntington Beach",
    "personal training Huntington Beach CA",
    "one on one personal trainer Orange County",
    "private gym membership Huntington Beach",
    "personal trainer 92648",
    "Function Health panel",
  ],
  authors: [{ name: "Sam Axelrode" }],
  creator: "Sam Axelrode",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.gymName,
    title: "Sam's Body Shop HB | Private Gym & Personal Training",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam's Body Shop HB | Private Gym & Personal Training",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health and fitness",
};

export const viewport: Viewport = {
  themeColor: "#0a0b0a",
  colorScheme: "dark",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "@id": `${site.url}/#business`,
  name: site.gymName,
  alternateName: site.trainingName,
  description,
  url: site.url,
  telephone: contact.phone,
  email: contact.email,
  image: `${site.url}/opengraph-image`,
  priceRange: "Rates on request",
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.zip,
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Huntington Beach" },
    { "@type": "City", name: "Costa Mesa" },
    { "@type": "City", name: "Fountain Valley" },
    { "@type": "City", name: "Newport Beach" },
  ],
  founder: {
    "@type": "Person",
    name: "Sam Axelrode",
    jobTitle: "ACE Certified Personal Trainer",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Training options",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Free first personal training session",
        priceCurrency: "USD",
        price: "0",
      },
      {
        "@type": "Offer",
        name: "Private gym membership",
      },
      {
        "@type": "Offer",
        name: "Personal training session pack (includes Function Health panel)",
      },
    ],
  },
  ...(isInstagramEnabled ? { sameAs: [contact.instagram] } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="min-h-[100dvh] bg-ink antialiased">
        {/* Scroll-reveal wrappers are server-rendered at opacity 0 and brought
            in by Motion. Without JavaScript there is no Motion, so this
            restores every revealed block rather than leaving a blank page. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-line-2 focus:bg-ink-3 focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Grain />
        <GoogleTag />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
