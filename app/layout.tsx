// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {process.env.NEXT_PUBLIC_TIDIO_KEY && (
          <Script
            id="tidio-chat"
            src={`https://code.tidio.co/${process.env.NEXT_PUBLIC_TIDIO_KEY}.js`}
            strategy="afterInteractive"
          />
        )}
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
