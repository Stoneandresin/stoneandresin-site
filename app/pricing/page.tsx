import Estimator from "@/components/Estimator";

export const metadata = {
  title: "Pricing"
}

export default function PricingPage(){
  return (
    <main>
      
      <section className="container py-14">
        <p className="text-sm font-semibold text-slate-600 mb-2">Transparent pricing</p>
        <h1 className="section-title mb-4">Instant pricing for resin‑bound surfaces</h1>
        <p className="subtle max-w-2xl">
          Online estimates provide a realistic range; on‑site quotes finalize pricing after assessing prep, drainage, and final Vuba system requirements.
        </p>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6 mt-8">
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
      
    </main>
  )
}
