'use client'
import { useState } from "react"

const items = [
  { q: "How is resin‑bound different from epoxy‑pebble floors?", a: "Resin‑bound is permeable and UV‑stable, ideal for outdoors (driveways, patios). Epoxy‑pebble is typically non‑permeable and can amber under UV outdoors. We install a SUDS‑compliant, porous system that manages rainwater and resists fading." },
  { q: "Is it slippery or hard to maintain?", a: "The texture is naturally slip‑resistant when dry and can be engineered for wet areas. Routine maintenance is simple: occasional rinse or light power‑wash." },
  { q: "How long does install take?", a: "Most residential projects are completed in 1–2 days depending on prep and weather." },
  { q: "What about cracks and uneven concrete?", a: "We repair cracks, address movement, and level to create a stable surface before installation. The estimator includes allowances for prep." }
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
