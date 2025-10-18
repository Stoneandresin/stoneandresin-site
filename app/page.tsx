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
            <h1 className="text-4xl font-extrabold tracking-tight">
              Resin-Bound Surfaces, Installed Right.
            </h1>
            <p className="mt-3 text-gray-600">
              Premium, permeable Vuba stone systems for driveways, patios, walkways, and pool decks across Greater Cincinnati.
            </p>
          </div>
        </section>

        {/* Vuba blends carousel — right under hero */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-4">Choose Your Vuba Blend</h2>
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
                We’re trained on the Vuba resin‑bound system through their live, hands‑on course. We follow proven methods for mixing, moisture control, edging, drainage, and curing—so your driveway or patio looks right and lasts.
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
                Manufacturer warranty is system‑dependent. Vuba’s U.S. homeowner page references a 5‑year manufacturer warranty, upgraded to 10 years when installed over VubaMac. Ask us which applies to your project.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <article className="card overflow-hidden">
                <CompareFigure
                  before="/gallery/patio-loveland-before.jpg"
                  after="/gallery/patio-loveland-after.jpg"
                  altBefore="Before: worn patio in Loveland"
                  altAfter="After: resin‑bound patio with clean edges"
                />
                <div className="p-4 grid gap-2">
                  <h3 className="font-semibold">Patio refresh</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Loveland, OH</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">420 sq ft</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Blend: Dorset Cove</span>
                  </div>
                  <a href="/contact" className="btn-accent w-full justify-center">Book On‑Site Quote</a>
                </div>
              </article>

              <article className="card overflow-hidden">
                <div className="relative w-full aspect-[16/10]">
                  <Image src="/gallery/walkway-anderson.jpg" alt="Resin‑bound walkway with crisp border" fill className="object-cover" />
                </div>
                <div className="p-4 grid gap-2">
                  <h3 className="font-semibold">Walkway upgrade</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Anderson Township, OH</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">180 sq ft</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Blend: Arctic Pearl</span>
                  </div>
                  <a href="/contact" className="btn-accent w-full justify-center">Book On‑Site Quote</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Estimator */}
        <section className="container py-12">
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
                    Get an instant range now. We’ll confirm your final price on
                    site.
                  </p>
                </div>
                <a href="/pricing" className="btn-accent">
                  Get Instant Estimate
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
