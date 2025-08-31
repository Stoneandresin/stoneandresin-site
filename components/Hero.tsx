import Link from "next/link"
import Estimator from "./Estimator"

export default function Hero(){
  return (
    <section className="bg-[linear-gradient(135deg,#f0fbf9,#ffffff)] border-b border-emerald-50">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-12 md:py-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Resin‑Bound Surfaces for Ohio Homes & Businesses
          </h1>
          <p className="subtle text-lg">
            Permeable, UV‑stable, and beautiful. Driveways, patios, walkways, pool decks—installed by local pros in Amelia & Cincinnati.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="#estimate" className="btn">Get My Instant Estimate</Link>
            <Link href="/projects" className="btn-outline">See Projects</Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 pt-4 text-sm">
            <li className="card p-4">✔ Permeable drainage</li>
            <li className="card p-4">✔ UV color retention</li>
            <li className="card p-4">✔ Fast install</li>
            <li className="card p-4">✔ Low maintenance</li>
          </ul>
        </div>
        <div id="estimate" className="card p-5">
          <Estimator />
        </div>
      </div>
    </section>
  )
}
