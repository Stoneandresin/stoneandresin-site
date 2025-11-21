import Link from "next/link"

export const metadata = { 
  title: "Resin-Bound vs Concrete vs Asphalt Comparison | Stone & Resin",
  description: "Compare resin-bound surfaces to concrete and asphalt driveways. See cost, maintenance, lifespan, and total cost of ownership over 20 years."
}

export default function ComparePage(){
  return (
    <main className="bg-slate-50">
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4">
            Resin-Bound vs Concrete vs Asphalt
          </h1>
          <p className="text-lg text-slate-200 max-w-3xl">
            Compare initial costs, maintenance requirements, and total 20-year cost of ownership.
          </p>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Comparison Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Feature</th>
                  <th className="px-4 py-3 text-center font-bold text-green-700 bg-green-50">Resin-Bound</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-700">Concrete</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-700">Asphalt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-4 font-semibold">Initial Cost (600 sq ft)</td>
                  <td className="px-4 py-4 text-center bg-green-50">$7,200 - $10,800</td>
                  <td className="px-4 py-4 text-center">$3,600 - $6,000</td>
                  <td className="px-4 py-4 text-center">$1,800 - $3,600</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Lifespan</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">15-25+ years</td>
                  <td className="px-4 py-4 text-center">20-30 years</td>
                  <td className="px-4 py-4 text-center">10-15 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Maintenance (per year)</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">$0 - $100</td>
                  <td className="px-4 py-4 text-center">$200 - $400</td>
                  <td className="px-4 py-4 text-center">$300 - $600</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Sealing Required</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">Never</td>
                  <td className="px-4 py-4 text-center">Every 3-5 years</td>
                  <td className="px-4 py-4 text-center">Every 2-3 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Crack Resistance</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">Excellent</td>
                  <td className="px-4 py-4 text-center">Fair to Good</td>
                  <td className="px-4 py-4 text-center">Poor</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Permeable / Drainage</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">Yes - Excellent</td>
                  <td className="px-4 py-4 text-center">No (unless special)</td>
                  <td className="px-4 py-4 text-center">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">UV Resistance</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">Excellent</td>
                  <td className="px-4 py-4 text-center">Good</td>
                  <td className="px-4 py-4 text-center">Poor (fades)</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Installation Time</td>
                  <td className="px-4 py-4 text-center bg-green-50">2-3 days</td>
                  <td className="px-4 py-4 text-center">3-5 days</td>
                  <td className="px-4 py-4 text-center">1-2 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold">Design Options</td>
                  <td className="px-4 py-4 text-center bg-green-50 font-semibold text-green-700">Many colors/blends</td>
                  <td className="px-4 py-4 text-center">Limited (stamping)</td>
                  <td className="px-4 py-4 text-center">Black/gray only</td>
                </tr>
                <tr className="bg-cyan-50">
                  <td className="px-4 py-4 font-bold text-lg">20-Year Total Cost*</td>
                  <td className="px-4 py-4 text-center bg-green-100 font-bold text-green-700 text-lg">$9,200 - $12,800</td>
                  <td className="px-4 py-4 text-center font-bold text-lg">$11,600 - $18,000</td>
                  <td className="px-4 py-4 text-center font-bold text-lg">$14,800 - $21,600</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-600 mb-8 text-center">
            * Total cost includes initial installation, annual maintenance, sealing, crack repairs, and one replacement cycle where applicable over 20 years.
          </p>

          {/* ROI Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-green-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">💰 Lower Total Cost</h3>
              <p className="text-slate-600">
                Save <strong>30-40% over 20 years</strong> compared to asphalt and <strong>15-25%</strong> compared to concrete when you factor in maintenance and replacement.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">🏠 Increase Property Value</h3>
              <p className="text-slate-600">
                Quality hardscaping adds <strong>5-10% to home value</strong>. Unique, low-maintenance resin-bound surfaces stand out to buyers.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-cyan-500">
              <h3 className="text-lg font-bold text-slate-900 mb-2">⏱️ Save Time</h3>
              <p className="text-slate-600">
                Minimal maintenance means <strong>no weekend sealing projects</strong>, no crack filling, no resurfacing for 15-25 years.
              </p>
            </div>
          </div>

          {/* Environmental Benefits */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Environmental Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <strong>Reduces Stormwater Runoff:</strong> Permeable design allows natural drainage, reducing stress on municipal systems
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <strong>Natural Groundwater Recharge:</strong> Water filters through to soil naturally, supporting local water table
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <strong>No Harsh Chemicals:</strong> No sealers or chemicals leaching into groundwater
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <strong>May Qualify for Incentives:</strong> Some Ohio municipalities offer credits for permeable surfaces
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">See Exactly What It Would Cost for Your Project</h2>
            <p className="mb-6">Get an instant estimate in under 2 minutes—no email required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
                Get Instant Estimate
              </Link>
              <Link href="/contact" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition">
                Schedule Free Site Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
