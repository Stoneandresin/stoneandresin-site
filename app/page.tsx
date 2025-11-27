"use client";
export const dynamic = 'force-dynamic';

import Hero from "@/components/Hero";
import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";
import Estimator from "@/components/Estimator";
import RevealOnScroll from "@/components/RevealOnScroll";
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
        {/* Trust Signals Bar */}
        <section className="bg-white py-10 border-b border-slate-100">
          <div className="container mx-auto px-4">
            <RevealOnScroll className="reveal-slide-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm md:text-base leading-tight">Fully Licensed <br /> & Insured</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm md:text-base leading-tight">10 Year Workmanship <br /> Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm md:text-base leading-tight">Certified Resin- <br /> Bound Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm md:text-base leading-tight">Local <br /> Small Business</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>



        {/* Color Collection */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <RevealOnScroll className="reveal-fade">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
                  Explore Our Collection
                </h2>
                <p className="text-slate-600">
                  From natural golden tones to modern greys, find the perfect match for your home's architecture.
                </p>
              </div>
              <ColorsSlider showHeading={false} className="py-0" />
              <div className="text-center mt-8">
                <a href="/colors" className="inline-block border-b-2 border-slate-900 text-slate-900 font-medium hover:text-slate-700 hover:border-slate-700 transition-colors">
                  View all 24 blends →
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Why resin-bound & Estimator Split Section */}
        <section id="estimate" className="py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Why Resin-Bound */}
              <RevealOnScroll className="reveal-slide-left">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-tight">
                    Why Resin-Bound <br /> Beats Concrete
                  </h2>
                  
                  <div className="bg-slate-900 text-white rounded-xl p-8 shadow-2xl">
                    <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-700">
                      <div className="px-2">
                        <div className="mb-4 flex justify-center text-cyan-400">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Crack-Resistant</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Resin flexes with the ground, unlike rigid concrete, which cracks.
                        </p>
                      </div>
                      <div className="px-2">
                        <div className="mb-4 flex justify-center text-cyan-400">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Permeable & Safer</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Millions of tiny voids allow water to drain through instead of puddling.
                        </p>
                      </div>
                      <div className="px-2">
                        <div className="mb-4 flex justify-center text-cyan-400">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">High-End Look</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Natural stone blends and a smooth, seamless finish give your home "custom-built" curb appeal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Right Column: Estimator */}
              <RevealOnScroll className="reveal-slide-right" delayMs={200}>
                <div>
                  <Estimator />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>



        {/* Recent Projects */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-12 text-center">Recent Transformations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <RevealOnScroll className="reveal-slide-up">
                <article className="group cursor-pointer">
                  <CompareFigure
                    before="/gallery/driveway-cincy-before.jpg"
                    after="/gallery/driveway-cincy-after-2.jpg"
                    altBefore="Before: driveway prepped with reinforcement grid"
                    altAfter="After: resin‑bound driveway—finished surface at garage"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">Driveway Resurfacing</h3>
                    <p className="text-sm text-slate-500 mt-1">Cincinnati, OH • Grey Mix</p>
                  </div>
                </article>
              </RevealOnScroll>

              <RevealOnScroll className="reveal-slide-up" delayMs={100}>
                <article className="group cursor-pointer">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                    <Image src="/gallery/driveway-cincy-after.jpg" alt="Resin‑bound driveway with clean edge and tape‑off" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">Precision Edging</h3>
                    <p className="text-sm text-slate-500 mt-1">Cincinnati, OH • Detail Work</p>
                  </div>
                </article>
              </RevealOnScroll>

              <RevealOnScroll className="reveal-slide-up" delayMs={200}>
                <article className="group cursor-pointer">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                    <Image src="/gallery/driveway-cincy-detail.jpg" alt="Resin‑bound surface detail—aggregate texture" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">Surface Texture</h3>
                    <p className="text-sm text-slate-500 mt-1">Macro View • Permeable System</p>
                  </div>
                </article>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
