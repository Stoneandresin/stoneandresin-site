"use client";
export const dynamic = 'force-dynamic';

import Hero from "@/components/Hero";
import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";
import Estimator from "@/components/Estimator";
import { useState } from "react";

function CompareFigure({ before, after, altBefore, altAfter }: { before: string; after: string; altBefore: string; altAfter: string }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="relative border border-slate-200 rounded-xl overflow-hidden">
      <div className="relative w-full aspect-[16/10]" style={{ ['--pos' as any]: `${pos}%` }}>
        <Image src={before} alt={altBefore} fill className="object-cover" />
        <Image src={after} alt={altAfter} fill className="object-cover" style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }} />
        <span className="absolute top-2 left-2 z-10 text-xs font-semibold px-2 py-1 rounded-full bg-white/80 border border-slate-200">Before</span>
        <span className="absolute top-2 right-2 z-10 text-xs font-semibold px-2 py-1 rounded-full bg-white/80 border border-slate-200">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Slide to compare before and after"
          onChange={(e) => setPos(parseInt(e.target.value, 10))}
          className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-ew-resize"
        />
        <div className="absolute top-1/2 left-[var(--pos)] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center text-sm font-bold select-none pointer-events-none">
          ↔
        </div>
      </div>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <main>
        {/* Hero */}
        <section className="container py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-600 mb-2">Transparent pricing</p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Instant pricing for resin‑bound surfaces
            </h1>
            
            {/* Trust row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Vuba Certified
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                BBB Accredited
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Fully insured
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                2‑year workmanship warranty
              </span>
            </div>

            <p className="mt-4 text-gray-600">
              Premium, permeable Vuba stone systems for driveways, patios, walkways, and pool decks across Greater Cincinnati.
            </p>
          </div>
        </section>

        {/* Vuba blends carousel — right under hero */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-4">Choose your Vuba blend</h2>
          <ColorsSlider showHeading={false} className="py-0" />
          <p className="mt-4 text-sm text-gray-600">
            See a blend you love?{" "}
            <a href="/contact" className="underline">
              Request a sample &amp; site visit →
            </a>
          </p>
        </section>

        {/* Why resin-bound section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="surface-light rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold accent-text">
                Why resin‑bound?
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                We're trained on the Vuba resin‑bound system through their live, hands‑on course. We follow proven methods for mixing, moisture control, edging, drainage, and curing—so your driveway or patio looks right and lasts.
              </p>
              <div className="grid-clean md:grid-cols-3 mt-6">
                <div className="card p-5">
                  <h3 className="font-semibold">Permeable by design</h3>
                  <p className="mt-2 text-sm copy-muted">
                    Reduce puddling and runoff with a porous surface.
                  </p>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold">UV‑stable and durable</h3>
                  <p className="mt-2 text-sm copy-muted">
                    Color‑stable resins and aggregates built to last.
                  </p>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold">Low maintenance</h3>
                  <p className="mt-2 text-sm copy-muted">
                    Easy to clean and keep looking great season after season.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Manufacturer warranty is system‑dependent. Vuba's U.S. homeowner page references a 5‑year manufacturer warranty, upgraded to 10 years when installed over VubaMac. Ask us which applies to your project.
              </p>
            </div>
          </div>
        </section>

        {/* Services expansion */}
        <section id="services" className="py-12 bg-slate-50 border-y border-slate-200/70">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Full-service improvements</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Resin surfaces outside, kitchen &amp; bath remodels inside
            </h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base max-w-3xl">
              Keep the curb appeal you hired us for and bring that same craftsmanship indoors. We now take on full interior
              remodels—planning, trades coordination, and punch-list perfection included.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <article className="card h-full p-6">
                <h3 className="text-lg font-semibold">Resin-bound exteriors</h3>
                <p className="mt-2 text-sm copy-muted">
                  Driveways, walkways, patios, and pool decks with premium Vuba blends and professional site prep.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>• Moisture-managed base work</li>
                  <li>• Seamless tie-ins to garages &amp; drains</li>
                  <li>• Decorative borders and lighting sleeves</li>
                </ul>
              </article>

              <article className="card h-full p-6">
                <h3 className="text-lg font-semibold">Kitchen remodels</h3>
                <p className="mt-2 text-sm copy-muted">
                  Gut renovations or targeted updates that modernize your most-used room without disrupting daily life.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>• Layout changes and structural updates</li>
                  <li>• Custom cabinetry, countertops, and tile</li>
                  <li>• Appliance, plumbing, and lighting upgrades</li>
                </ul>
              </article>

              <article className="card h-full p-6">
                <h3 className="text-lg font-semibold">Bathroom remodels</h3>
                <p className="mt-2 text-sm copy-muted">
                  Spa-worthy bathrooms with waterproofing, luxury finishes, and accessibility options tailored to your family.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>• Walk-in showers, freestanding tubs, and tile</li>
                  <li>• Heated floors and ventilation improvements</li>
                  <li>• Fixture, vanity, and storage design</li>
                </ul>
              </article>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" className="btn-accent">Book a remodeling consult</a>
              <a href="/projects" className="btn-ghost">Browse project photos</a>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Recent projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <article className="card overflow-hidden">
                <CompareFigure
                  before="/gallery/driveway-cincy-before.jpg"
                  after="/gallery/driveway-cincy-after-2.jpg"
                  altBefore="Before: driveway prepped with reinforcement grid"
                  altAfter="After: resin‑bound driveway—finished surface at garage"
                />
                <div className="p-4 grid gap-2">
                  <h3 className="font-semibold">Driveway resurfacing</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Cincinnati, OH</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Approx. 600 sq ft</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Blend: Grey mix</span>
                  </div>
                  <a href="/contact" className="btn-accent w-full justify-center">Book on‑site quote</a>
                </div>
              </article>

              <article className="card overflow-hidden">
                <div className="relative w-full aspect-[16/10]">
                  <Image src="/gallery/driveway-cincy-after.jpg" alt="Resin‑bound driveway with clean edge and tape‑off" fill className="object-cover" />
                </div>
                <div className="p-4 grid gap-2">
                  <h3 className="font-semibold">Finished edge (tape‑off)</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Cincinnati, OH</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Resin‑bound driveway</span>
                  </div>
                  <a href="/contact" className="btn-accent w-full justify-center">Book on‑site quote</a>
                </div>
              </article>

              <article className="card overflow-hidden">
                <div className="relative w-full aspect-[16/10]">
                  <Image src="/gallery/driveway-cincy-detail.jpg" alt="Resin‑bound surface detail—aggregate texture" fill className="object-cover" />
                </div>
                <div className="p-4 grid gap-2">
                  <h3 className="font-semibold">Surface detail</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Texture close‑up</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Permeable, UV‑stable</span>
                  </div>
                  <a href="/contact" className="btn-accent w-full justify-center">Book on‑site quote</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Estimator */}
        <section id="estimate" className="container py-12 scroll-mt-24">
          <div className="surface-light rounded-2xl p-6 md:p-8">
            <Estimator />
          </div>

          <section className="mt-8 flex justify-center">
            <Image
              src="/AAC1A118-5584-4B37-9504-1F0C01C4B1D1.jpg"
              alt="Vuba Stone Certified Installer badge"
              width={300}
              height={450}
              className="rounded-md shadow"
            />
          </section>
        </section>

        {/* Call to action section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="surface-light rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold">
                    Ready for a surface that stands out?
                  </h2>
                  <p className="mt-1 copy-muted">
                    Get an instant range now. We'll confirm your final price on‑site.
                  </p>
                </div>
                <a href="/pricing" className="btn-accent" data-sticky-suppress="estimate">
                  Get instant estimate
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
