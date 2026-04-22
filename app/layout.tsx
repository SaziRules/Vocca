import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation    from "@/components/layout/Navigation";
import Footer        from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  "VOCCA — Luxury Chocolate | Dubai-Inspired, South African Crafted",
    template: "%s | VOCCA",
  },
  description:
    "VOCCA. Artisan luxury chocolate inspired by the golden opulence of Dubai, handcrafted in South Africa. Pistachio Kunafa, Lotus Kunafa, Hazelnut Kunafa — a ritual, not a treat.",

  keywords: [
    "luxury chocolate",
    "Dubai chocolate",
    "artisan chocolate",
    "South Africa",
    "Kunafa chocolate",
    "pistachio chocolate",
    "premium gifting",
    "Belgian chocolate",
    "VOCCA",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:       "VOCCA — Luxury Chocolate",
    description: "Where gold meets cocoa. Dubai-inspired luxury chocolate, handcrafted in South Africa.",
    url:         "/",
    siteName:    "VOCCA",
    locale:      "en_ZA",
    type:        "website",
    images: [
      {
        url:    "/images/products/pastichio.png",
        width:  1200,
        height: 630,
        alt:    "VOCCA Pistachio Kunafa — Luxury Chocolate",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "VOCCA — Luxury Chocolate",
    description: "Where gold meets cocoa. Dubai-inspired luxury chocolate, handcrafted in South Africa.",
    images:      ["/images/products/pastichio.png"],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const orgJsonLd = {
  "@context":   "https://schema.org",
  "@type":      "Organization",
  name:         "VOCCA",
  url:          SITE_URL,
  logo:         `${SITE_URL}/images/logo.webp`,
  description:  "Artisan luxury chocolate inspired by Dubai, handcrafted in South Africa.",
  sameAs:       ["https://www.instagram.com/vocca.sa"],
  address: {
    "@type":           "PostalAddress",
    addressLocality:   "Durban",
    addressCountry:    "ZA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
