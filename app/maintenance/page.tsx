import Link from "next/link"

export const metadata = { 
  title: "Resin-Bound Surface Maintenance Guide | Stone & Resin",
  description: "Complete maintenance guide for your resin-bound driveway, patio, or walkway. Seasonal cleaning schedules, stain removal, and care tips for Ohio homeowners."
}

export default function MaintenanceGuidePage(){
  return (
    <main className="bg-slate-50">
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4">
            Resin-Bound Surface Maintenance Guide
          </h1>
          <p className="text-lg text-slate-200 max-w-3xl">
            Your complete guide to keeping your resin-bound driveway, patio, or walkway looking pristine for years. Simple routines and seasonal care for Ohio's climate.
          </p>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Quick Reference Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-cyan-500">
            <h2 className="text-xl font-bold text-slate-900 mb-4">📋 Quick Reference</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">✅ Do:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Sweep/blow debris weekly</li>
                  <li>• Rinse monthly with garden hose</li>
                  <li>• Power-wash annually (max 2000 PSI)</li>
                  <li>• Clean spills promptly</li>
                  <li>• Use plastic shovels for snow</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">❌ Avoid:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• High-pressure washers {`(>2000 PSI)`}</li>
                  <li>• Metal shovels or sharp tools</li>
                  <li>• Harsh acidic cleaners</li>
                  <li>• Sealants (blocks drainage)</li>
                  <li>• Wire brushes or abrasive pads</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Weekly/Monthly Care */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Regular Maintenance</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🧹</span> Weekly: Remove Debris
                </h3>
                <p className="text-slate-600">
                  Sweep or blow off leaves, dirt, and organic matter. Accumulated debris can stain the surface and clog pores, reducing drainage capacity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">💧</span> Monthly: Rinse Surface
                </h3>
                <p className="text-slate-600">
                  Use a garden hose to rinse away dust, pollen, and light dirt. Especially important during spring pollen season and after autumn leaf fall.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🚨</span> As Needed: Spot Clean Spills
                </h3>
                <p className="text-slate-600 mb-2">Address spills promptly to prevent staining:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                  <li><strong>Oil/grease:</strong> Blot (don't wipe), then use pH-neutral cleaner</li>
                  <li><strong>Food/beverages:</strong> Rinse with water immediately</li>
                  <li><strong>Pet waste:</strong> Remove solid material, rinse thoroughly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seasonal Deep Cleaning */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Seasonal Deep Cleaning</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌸</span> Spring (April-May)
                </h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Power-wash entire surface (1500-2000 PSI max)</li>
                  <li>Use wide fan tip, keep 12-18 inches from surface</li>
                  <li>Remove winter salt residue and debris</li>
                  <li>Check for any areas needing repair</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">☀️</span> Summer (July-August)
                </h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Light pressure wash to remove accumulated dust</li>
                  <li>Inspect for any weed growth at edges (rare but possible)</li>
                  <li>Verify drainage remains effective during heavy rains</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🍂</span> Fall (October-November)
                </h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Remove leaves promptly—wet leaves can stain</li>
                  <li>Pre-winter cleaning to prevent organic buildup</li>
                  <li>Clear any clogged areas before winter</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">❄️</span> Winter (As Needed)
                </h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Use plastic shovel for snow removal (avoid metal edges)</li>
                  <li>Apply ice melt sparingly—calcium chloride is safer than rock salt</li>
                  <li>Avoid excessive salt that can leave white residue</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stain Removal Guide */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Stain Removal Guide</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">🛢️ Oil & Grease Stains</h3>
                <ol className="list-decimal list-inside text-slate-600 space-y-1">
                  <li>Apply absorbent material (cat litter, sawdust) immediately</li>
                  <li>Let sit for several hours to absorb oil</li>
                  <li>Sweep away absorbent material</li>
                  <li>Use pH-neutral degreaser or dish soap solution</li>
                  <li>Scrub gently with soft brush</li>
                  <li>Rinse thoroughly with water</li>
                </ol>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">🦀 Rust Stains</h3>
                <ol className="list-decimal list-inside text-slate-600 space-y-1">
                  <li>Use a rust remover safe for stone surfaces</li>
                  <li>Follow product instructions carefully</li>
                  <li>Test in inconspicuous area first</li>
                  <li>Rinse thoroughly after treatment</li>
                </ol>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">🍇 Organic Stains (Leaves, Berries)</h3>
                <ol className="list-decimal list-inside text-slate-600 space-y-1">
                  <li>Remove source material immediately</li>
                  <li>Pressure wash affected area</li>
                  <li>For set stains, use mild bleach solution (1:10 bleach:water)</li>
                  <li>Let sit for 10-15 minutes</li>
                  <li>Scrub gently and rinse thoroughly</li>
                </ol>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">🚗 Tire Marks</h3>
                <ol className="list-decimal list-inside text-slate-600 space-y-1">
                  <li>Most fade naturally with weathering</li>
                  <li>For persistent marks, use gentle degreaser</li>
                  <li>Pressure wash with warm water if available</li>
                </ol>
              </div>
            </div>
          </div>

          {/* When to Call for Repairs */}
          <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ When to Call for Repairs</h2>
            <p className="text-slate-700 mb-3">Contact your installer if you notice:</p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Areas where stones are loosening or coming free</li>
              <li>Significant cracks or damage</li>
              <li>Persistent drainage problems</li>
              <li>Large or spreading stains that won't clean</li>
              <li>Settling or uneven areas</li>
            </ul>
          </div>

          {/* Expected Longevity */}
          <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4">💚 Expected Longevity</h2>
            <p className="text-slate-700 text-lg">
              With proper maintenance, a quality resin-bound surface should maintain its appearance and function for <strong>15-25+ years</strong>. The key is consistent, gentle care rather than aggressive or infrequent cleaning.
            </p>
          </div>

          {/* Download Checklist CTA */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Maintenance?</h2>
            <p className="mb-6">Our team can provide specific care recommendations for your surface and handle any repairs needed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
                Contact Us
              </Link>
              <Link href="/pricing" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition">
                Get Instant Estimate
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/learn" className="text-cyan-600 hover:text-cyan-700 underline">
              ← Back to Learn Section
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
