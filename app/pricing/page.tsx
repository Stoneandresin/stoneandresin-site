import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Pricing"
}

export default function PricingPage(){
  return (
    <main>
      <Navbar />
      <section className="container py-14">
        <h1 className="section-title mb-4">Transparent pricing</h1>
        <p className="subtle max-w-2xl">
          Online estimates provide a realistic range; on site quotes finalize pricing after assessing prep, drainage, and final Vuba system requirements.
        </p>
        {/* Updated pricing cards: remove standard blend and use Vuba pricing */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[
            {
              name: "Vuba Blends",
              price: "$12–$20 / sq ft",
              features: [
                "Premium stone colors",
                "Premium UV package",
                "Maintenance plan",
              ],
            },
            {
              name: "Commercial",
              price: "Custom",
              features: [
                "Spec driven installations",
                "Drainage/permits",
                "Maintenance plan",
              ],
            },
          ].map((t, i) => (
            <div key={i} className="card p-6">
              <div className="text-lg font-bold">{t.name}</div>
              <div className="text-2xl font-extrabold mt-2">{t.price}</div>
+              <ul className="mt-4 subtle space-y-1 list-disc list-inside">
+                {t.features.map((f, j) => (
+                  <li key={j}>{f}</li>
+                ))}
+              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
