import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import MobileStickyBar from "@/components/MobileStickyBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TidioChat from "@/components/TidioChat";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stoneandresin.com"),
  title: {
    default: "Stone & Resin | Resin-Bound Surfaces in Amelia & Cincinnati, OH",
    template: "%s | Stone & Resin",
  },
  description:
    "Premium resin-bound driveways, patios, walkways, and pool decks. Permeable, UV-stable, low maintenance. Serving Amelia & Cincinnati, Ohio.",
  keywords: [
    "resin bound driveway",
    "resin bound patio",
    "resin bound pool deck",
    "permeable driveway",
    "Cincinnati OH",
    "Amelia OH",
    "Vuba certified installer",
  ],
  openGraph: {
    type: "website",
    url: "https://www.stoneandresin.com",
    title: "Stone & Resin | Resin-Bound Surfaces in Ohio",
    description: "Permeable, UV-stable surfaces that stay beautiful longer.",
    images: ["/img/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stone & Resin | Resin-Bound Surfaces in Ohio",
    description:
      "Premium resin-bound driveways, patios, walkways, and pool decks. Serving Amelia & Cincinnati, Ohio.",
    images: ["/img/hero.jpg"],
  },
  alternates: {
    canonical: "https://www.stoneandresin.com/",
  },
  icons: {
    icon: "/favicon.ico",
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
    "image": "https://www.stoneandresin.com/img/hero.jpg",
    "telephone": "+1-513-787-8798",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3326 State Route 132",
      "addressLocality": "Amelia",
      "addressRegion": "OH",
      "postalCode": "45102",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Amelia",
        "containedInPlace": {
          "@type": "State",
          "name": "Ohio"
        }
      },
      {
        "@type": "City",
        "name": "Cincinnati",
        "containedInPlace": {
          "@type": "State",
          "name": "Ohio"
        }
      }
    ],
    "sameAs": [
      "https://www.bbb.org/us/oh/amelia/profile/construction-services/spaulding-quality-renovations-0292-90050955"
    ],
    "logo": "https://www.stoneandresin.com/favicon.ico",
    "priceRange": "$12-$20 per square foot",
    "description": "Professional resin-bound surface installation for driveways, patios, walkways, and pool decks. Vuba certified installer serving Greater Cincinnati and Amelia, Ohio."
  };
  
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Resin-Bound Surface Installation",
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Stone & Resin",
      "telephone": "+1-513-787-8798",
      "url": "https://www.stoneandresin.com"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Amelia",
        "containedInPlace": {
          "@type": "State",
          "name": "Ohio"
        }
      },
      {
        "@type": "City",
        "name": "Cincinnati",
        "containedInPlace": {
          "@type": "State",
          "name": "Ohio"
        }
      }
    ],
    "description": "Professional installation of Vuba resin-bound surfaces including driveways, patios, walkways, and pool decks. UV-stable, permeable systems designed for Ohio's climate.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "12-20",
        "priceCurrency": "USD",
        "unitText": "per square foot"
      }
    }
  };
  
  return (
    <html lang="en" className="light-ui">
      <head>
        <link
          rel="preload"
          as="image"
          href="/img/hero.webp"
          imageSrcSet="/img/hero.webp 640w, /img/hero.webp 960w, /img/hero.webp 1280w, /img/hero.webp 1600w"
          imageSizes="(max-width: 768px) 100vw, 50vw"
          type="image/webp"
        />
      </head>
      <body className="page-bg text-slate-900 antialiased">
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="service-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <TidioChat />
        <MobileStickyBar />
       </body>
     </html>
   );
 }
