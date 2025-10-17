// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stoneandresin.com"),
  title: {
    default: "Stone & Resin | Resin-Bound Surfaces in Amelia & Cincinnati, OH",
    template: "%s | Stone & Resin",
  },
  description:
    "Premium resin-bound driveways, patios, walkways, and pool decks. Permeable, UV-stable, low maintenance. Serving Amelia & Cincinnati, Ohio.",
  openGraph: {
    type: "website",
    url: "https://www.stoneandresin.com",
    title: "Stone & Resin | Resin-Bound Surfaces in Ohio",
    description: "Permeable, UV-stable surfaces that stay beautiful longer.",
    images: ["/placeholder.jpg"],
  },
  alternates: {
    canonical: "https://www.stoneandresin.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Stone & Resin",
    "url": "https://www.stoneandresin.com",
    "telephone": "+1-513-787-8798",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3326 State Route 132",
      "addressLocality": "Amelia",
      "addressRegion": "OH",
      "postalCode": "45102",
      "addressCountry": "US"
    },
    "areaServed": ["Amelia OH", "Cincinnati OH"],
    "sameAs": [
      "https://www.bbb.org/us/oh/amelia/profile/construction-services/spaulding-quality-renovations-0292-90050955",
      "https://www.facebook.com/",
      "https://www.instagram.com/"
    ],
    "logo": "/favicon.ico"
  };
  return (
    <html lang="en" className="light-ui">
      <body className="page-bg text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <Script id="ld-localbusiness" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Spalding Quality Renovations – Stone & Resin",
            "image": "https://www.stoneandresin.com/hero.jpg",
            "url": "https://www.stoneandresin.com",
            "telephone": "+1-513-787-8798",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Amelia",
              "addressRegion": "OH",
              "postalCode": "45102",
              "addressCountry": "US"
            },
            "areaServed": ["Cincinnati","Batavia","Anderson Township","Milford","Loveland"],
            "priceRange": "$$",
            "aggregateRating": {
              "@type":"AggregateRating",
              "ratingValue":"4.9",
              "reviewCount":"212"
            }
          })}
        </Script>
      </body>
    </html>
  );
}
