'use client'
import { useState } from "react"

const items = [
  { q: "How is resin‑bound different from epoxy‑pebble floors?", a: "Resin‑bound is permeable and UV‑stable, ideal for outdoors (driveways, patios). Epoxy‑pebble is typically non‑permeable and can amber under UV outdoors. We install a SUDS‑compliant, porous system that manages rainwater and resists fading." },
  { q: "What does the price estimator include?", a: "The estimate includes materials (UV-stable Vuba resin and aggregates), labor for surface preparation and installation, and typical site conditions. Final price depends on actual site assessment, base condition, drainage needs, and any special requirements." },
  { q: "Why is there a price range?", a: "Pricing varies based on surface type (driveway, patio, pool deck), existing base condition (new/sound vs. cracked/damaged), prep work required, and project size. Larger projects often have lower per-square-foot costs. We provide the range upfront, then confirm exact pricing during your free on-site visit." },
  { q: "What affects the final price?", a: "Key factors include: base condition and repairs needed, grading/drainage work, edge details and transitions, accessibility for equipment, and aggregate blend selection. We'll discuss all these during your site visit to provide an accurate quote." },
  { q: "Is it slippery or hard to maintain?", a: "The texture is naturally slip‑resistant when dry and can be engineered for wet areas. Routine maintenance is simple: occasional rinse or light power‑wash to keep pores clear." },
  { q: "How long does install take?", a: "Most residential projects are completed in 1–2 days depending on prep and weather. Larger or more complex projects may take 3-4 days." },
  { q: "What about cracks and uneven concrete?", a: "We repair cracks, address movement, and level to create a stable surface before installation. The estimator includes allowances for typical prep work. Severe damage may require additional base work, which we'll identify during the site visit." },
  { q: "Do you offer financing or payment plans?", a: "We accept multiple payment methods and can discuss payment schedules for larger projects. Contact us to discuss options that work for your budget." }
]

export default function FAQ(){
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="container py-14">
      <h2 className="section-title mb-6">FAQs</h2>
      <div className="space-y-3">
        {items.map((it, i)=>(
          <div key={i} className="card">
            <button className="w-full text-left p-5 font-semibold" onClick={()=>setOpen(o=>o===i?null:i)} aria-expanded={open===i}>
              {it.q}
            </button>
            {open===i && <div className="px-5 pb-5 subtle">{it.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
