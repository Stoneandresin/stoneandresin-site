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
              Schedule a free site visit →
            </a>
          </p>
        </section>

        {/* Why resin-bound section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-400">
                Why resin‑bound?
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                We're trained on the Vuba resin‑bound system through their live, hands‑on course. We follow proven methods for mixing, moisture control, edging, drainage, and curing—so your driveway or patio looks right and lasts.
              </p>
              <div className="grid-clean md:grid-cols-3 mt-6">
                <div className="bg-slate-800 rounded-lg p-5">
                  <h3 className="font-semibold text-white">Permeable by design</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Reduce puddling and runoff with a porous surface.
                  </p>
                </div>
                <div className="bg-slate-800 rounded-lg p-5">
                  <h3 className="font-semibold text-white">UV‑stable and durable</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Color‑stable resins and aggregates built to last.
                  </p>
                </div>
                <div className="bg-slate-800 rounded-lg p-5">
                  <h3 className="font-semibold text-white">Low maintenance</h3>
                  <p className="mt-2 text-sm text-slate-400">
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

        {/* Testimonials Section */}
        <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">What Cincinnati Homeowners Say</h2>
              <p className="text-slate-600">Real experiences from your neighbors in Cincinnati and Amelia</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-cyan-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                </div>
                <p className="text-slate-700 italic mb-4">
                  "We love how it looks and the drainage is perfect. No more puddles by the garage door!"
                </p>
                <p className="font-semibold text-slate-900">Cincinnati Homeowner</p>
                <p className="text-sm text-slate-500">Driveway Resurfacing</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                </div>
                <p className="text-slate-700 italic mb-4">
                  "The pool deck stays so much cooler than our old concrete. Kids can walk on it barefoot even in summer!"
                </p>
                <p className="font-semibold text-slate-900">Amelia Homeowner</p>
                <p className="text-sm text-slate-500">Pool Deck Installation</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                </div>
                <p className="text-slate-700 italic mb-4">
                  "Professional installation, beautiful finish. Worth every penny for the low maintenance alone."
                </p>
                <p className="font-semibold text-slate-900">Cincinnati Homeowner</p>
                <p className="text-sm text-slate-500">Patio & Walkway</p>
              </div>
            </div>
            
            {/* Trust Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-cyan-600 mb-1">50+</div>
                <div className="text-sm text-slate-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-cyan-600 mb-1">100%</div>
                <div className="text-sm text-slate-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-cyan-600 mb-1">15-25+</div>
                <div className="text-sm text-slate-600">Years Lifespan</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-cyan-600 mb-1">2-3</div>
                <div className="text-sm text-slate-600">Day Install Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Financing & Warranty Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">💳 Flexible Financing Available</h3>
                <p className="text-slate-700 mb-4">
                  Make your project affordable with flexible payment options. Get the surface you want now, pay over time.
                </p>
                <a href="/contact" className="text-green-700 font-semibold underline">Ask about financing →</a>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">🛡️ Warranty Protection</h3>
                <p className="text-slate-700 mb-4">
                  <strong>2-year workmanship warranty</strong> on all installations. Vuba manufacturer warranty: 5-10 years depending on system.
                </p>
                <a href="/faq" className="text-blue-700 font-semibold underline">Learn more about warranties →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Spring Special / Urgency Section */}
        <section className="py-12 bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                🌸 Spring Installation Season
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                Book Your Spring Installation Now
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                April-June is our busiest season. Current lead time: <strong>3-5 weeks</strong>. 
                Schedule your free site visit today to secure your spot for spring installation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-accent inline-flex items-center justify-center">
                  Schedule Free Site Visit
                </a>
                <a href="tel:+15137878798" className="btn-outline inline-flex items-center justify-center">
                  📞 Call (513) 787-8798
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                <strong>Limited availability.</strong> We maintain quality by limiting concurrent projects.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="surface-light rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold">
                    Ready for a Surface That Lasts 15-25+ Years?
                  </h2>
                  <p className="mt-1 copy-muted">
                    Get your free instant estimate now. We'll confirm final pricing during your free on-site visit.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      ✓ No email required
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      ✓ Takes under 2 minutes
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      ✓ See instant price ranges
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a href="/pricing" className="btn-accent whitespace-nowrap" data-sticky-suppress="estimate">
                    Get Free Estimate
                  </a>
                  <a href="tel:+15137878798" className="btn-outline whitespace-nowrap text-center">
                    📞 Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
