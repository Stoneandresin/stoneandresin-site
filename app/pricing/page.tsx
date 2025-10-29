import Estimator from "@/components/Estimator";

export const metadata = {
  title: "Pricing"
}

export default function PricingPage(){
  return (
    <main>
      
      <section className="container py-14">
        <h1 className="section-title mb-4">Transparent pricing</h1>
        <p className="subtle max-w-2xl">
          Online estimates provide a realistic range; on site quotes finalize pricing after assessing prep, drainage, and final Vuba system requirements.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Left: Instant Price Estimator */}
          <div className="card p-6">
            <Estimator />
          </div>

          {/* Right: Commercial card */}
          <div className="card p-6">
            <div className="text-lg font-bold">Commercial</div>
            <div className="text-2xl font-extrabold mt-2">Custom</div>
            <ul className="mt-4 subtle space-y-1 list-disc list-inside">
              <li>Spec driven installations</li>
              <li>Drainage/permits</li>
              <li>Maintenance plan</li>
            </ul>
          </div>
        </div>
      </section>
      
    </main>
  )
}