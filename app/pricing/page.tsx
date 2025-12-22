import Estimator from "@/components/Estimator";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Pricing & Instant Estimate",
  description: "Get instant pricing for resin-bound driveways, patios, and pool decks in Ohio. Transparent $12-$20/sq ft pricing with free on-site quotes. Vuba certified installer serving Cincinnati & Amelia.",
  openGraph: {
    title: "Resin-Bound Surface Pricing | Stone & Resin",
    description: "Instant online estimates for permeable resin-bound surfaces. Transparent pricing and free on-site quotes in Greater Cincinnati.",
    type: "website",
    images: ["/img/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Resin-Bound Pricing | Stone & Resin",
    description: "Get your instant estimate now. $12-$20/sq ft installed in Ohio.",
    images: ["/img/hero.jpg"],
  }
}

export default function PricingPage(){
  return (
    <main>
      <div className="bg-slate-900 pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-serif text-white mb-4">Transparent Pricing</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Get instant estimates for resin-bound driveways, patios, and pool decks.
          </p>
        </div>
      </div>
      
      <section className="container py-14">
        <p className="text-sm font-semibold text-slate-600 mb-2">Instant Estimate</p>
        <h2 className="section-title mb-4">Calculate your project cost</h2>
        <p className="subtle max-w-2xl mb-8">
          Online estimates provide a realistic range; on‑site quotes finalize pricing after assessing prep, drainage, and final Vuba system requirements.
        </p>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          {/* Left/Top: Instant Price Estimator */}
          <div className="card p-6 md:row-span-2">
            <Estimator />
          </div>

          {/* Right/Bottom: Commercial card */}
          <div className="card p-6">
            <div className="text-lg font-bold">Commercial</div>
            <div className="text-2xl font-extrabold mt-2">Custom</div>
            <ul className="mt-4 subtle space-y-1 list-disc list-inside text-sm">
              <li>Spec‑driven installations</li>
              <li>Drainage/permits</li>
              <li>Maintenance plan</li>
            </ul>
            <a href="/contact?subject=Commercial%20spec%20quote" className="btn-accent mt-4 w-full justify-center text-sm">
              Request spec quote
            </a>
          </div>
        </div>
      </section>
      
      <FAQ />
      
    </main>
  )
}
