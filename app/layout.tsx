// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TidioChat from "@/components/TidioChat";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stoneandresin.com"),
  title: {
    default: "Stone & Resin | Resin-Bound Surfaces in Amelia & Cincinnati, OH",
    template: "%s | Stone & Resin",
  },
  description:
    "Premium resin-bound driveways, patios, walkways, and pool decks plus full kitchen and bathroom remodels. Permeable, UV-stable, low maintenance craftsmanship. Serving Amelia & Cincinnati, Ohio.",
  openGraph: {
    type: "website",
    url: "https://www.stoneandresin.com",
    title: "Stone & Resin | Resin-Bound Surfaces in Ohio",
    description: "Permeable, UV-stable surfaces and full-service kitchen & bath remodels across Greater Cincinnati.",
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
    "serviceType": [
      "Resin-bound driveways, patios, and pool decks",
      "Kitchen remodeling",
      "Bathroom remodeling"
    ],
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
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <TidioChat />
        {/* Mobile sticky bar */}
        <nav id="sr-mobilebar" className="sr-mbar" role="region" aria-label="Quick actions: Estimate or Call">
          <style>{`
            .sr-mbar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#0f1a2a;color:#e6f1f8;border-top:1px solid #183355}
            .sr-mbar .wrap{max-width:1100px;margin:0 auto;padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px))}
            .sr-mbar .row{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch}
            .sr-mbar a{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;font-weight:800;text-decoration:none;border-radius:999px;border:1px solid rgba(255,255,255,.08)}
            .sr-mbar .btn-estimate{background:#06b6d4;color:#022a37;border-color:#0dd1ef}
            .sr-mbar .btn-estimate:hover{background:#0891b2}
            .sr-mbar .btn-call{background:#13243c;color:#e6f1f8}
            @media(min-width:768px){.sr-mbar{display:none}}
            .sr-mobilebar-pad{padding-bottom:var(--sr-mobilebar-pad,60px)!important}
            @media(min-width:768px){.sr-mobilebar-pad{padding-bottom:0!important}}
          `}</style>
          <div className="wrap">
            <div className="row">
              <a href="#estimate" className="btn-estimate" data-analytics="cta" data-action="estimate_click" aria-label="Jump to instant estimate">⚡ Estimate</a>
              <a href="tel:+15137878798" className="btn-call" data-analytics="cta" data-action="call_click" aria-label="Tap to call Stone & Resin">📞 Call</a>
            </div>
          </div>
          <script
            dangerouslySetInnerHTML={{ __html: `
              (function(){
                function applyPad(){var bar=document.getElementById('sr-mobilebar');if(!bar)return;var h=bar.offsetHeight||60;document.body.style.setProperty('--sr-mobilebar-pad',h+'px');if(!document.body.classList.contains('sr-mobilebar-pad')){document.body.classList.add('sr-mobilebar-pad');}}
                function showBar(show){var bar=document.getElementById('sr-mobilebar');if(!bar)return;bar.style.display = show ? '' : 'none'; if(show){applyPad();} else {document.body.classList.remove('sr-mobilebar-pad');}}
                function trackGA(ev){var el=ev.currentTarget;var isCta=el&&el.getAttribute&&el.getAttribute('data-analytics')==='cta';if(!isCta)return;var action=el.getAttribute('data-action')||'cta_click';if(typeof window.gtag==='function'){try{window.gtag('event',action,{event_category:'CTA',event_label:'mobile_sticky_bar'});}catch(e){}} if(window.va&&typeof window.va.track==='function'){try{window.va.track('cta_click',{location:'mobile_bar',action:action});}catch(e){}}}
                function init(){
                  applyPad();
                  var links=document.querySelectorAll('#sr-mobilebar a[data-analytics="cta"]');
                  for(var i=0;i<links.length;i++){links[i].addEventListener('click',trackGA,{passive:true});}
                  var suppress = document.querySelectorAll('[data-sticky-suppress="estimate"]');
                  if('IntersectionObserver' in window && suppress.length){
                    var anyInView=false; var obs = new IntersectionObserver(function(entries){
                      anyInView=false; for(var j=0;j<entries.length;j++){ if(entries[j].isIntersecting && entries[j].intersectionRatio>0.1){ anyInView=true; break; } }
                      showBar(!anyInView);
                    }, { threshold:[0,0.1,0.5,1] });
                    for(var k=0;k<suppress.length;k++){ obs.observe(suppress[k]); }
                  }
                }
                if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true});}else{init();}
                window.addEventListener('resize',function(){applyPad();});
              })();
            `}}
          />
        </nav>
       </body>
     </html>
   );
 }
