"use client";
export const dynamic = 'force-dynamic';

import Hero from "@/components/Hero";
import RevealOnScroll from "@/components/RevealOnScroll";
import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";
import Estimator from "@/components/Estimator";
 setup/agent-hq-scaffold
import RevealOnScroll from "@/components/RevealOnScroll";
import RecentProjects from "@/components/RecentProjects";

import { useState } from "react";
import { recentProjects, certificateImage } from "@/lib/frontPageContent";

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
 main

export default function Home() {
  return (
    <>
      <Hero />

      <main>
 setup/agent-hq-scaffold
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
 copilot/fix-git-submodule-fetch
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-4">Choose your Vuba blend</h2>
          <ColorsSlider showHeading={false} className="py-0" />
          <p className="mt-4 text-sm text-gray-600">
            See a blend you love?{" "}
            <a href="/contact" className="underline">
              Schedule a free site visit →
            </a>
          </p>

        <section className="container py-12 relative overflow-hidden">
          <RevealOnScroll className="origin-top">
            <h2 className="text-2xl font-bold mb-4">Choose your Vuba blend</h2>
            <ColorsSlider showHeading={false} className="py-0" />
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <p className="text-sm text-gray-600">
                See a blend you love?
              </p>
              <a href="/contact" className="btn-accent inline-flex items-center gap-2">
                <span>Request Sample & Site Visit</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="/colors" className="btn-outline inline-flex items-center">
                View All Colors
              </a>
            </div>
          </RevealOnScroll>
 main
        </section>

        {/* Why resin-bound section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div
              className="rounded-3xl px-6 py-8 md:px-10 md:py-10"
              style={{ backgroundColor: "var(--brand-blue-dark)" }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Why resin‑bound?
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-100/80 max-w-2xl">
                We're trained on the Vuba resin‑bound system through their live, hands‑on course. We follow proven
                methods for mixing, moisture control, edging, drainage, and curing—so your driveway or patio looks
                right and lasts.
              </p>
              <div className="grid-clean md:grid-cols-3 mt-6 gap-4">
                <div className="rounded-2xl bg-slate-900/60 p-5">
                  <h3 className="font-semibold text-white">Permeable by design</h3>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Reduce puddling and runoff with a porous surface.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-5">
                  <h3 className="font-semibold text-white">UV‑stable and durable</h3>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Color‑stable resins and aggregates built to last.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-5">
                  <h3 className="font-semibold text-white">Low maintenance</h3>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Easy to clean and keep looking great season after season.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-slate-400">
                Manufacturer warranty is system‑dependent. Vuba's U.S. homeowner page references a 5‑year manufacturer
                warranty, upgraded to 10 years when installed over VubaMac. Ask us which applies to your project.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Recent projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
copilot/update-front-page-photos
              {recentProjects.map((project) => (
                <article key={project.id} className="card overflow-hidden">
                  {project.type === "before-after" ? (
                    <CompareFigure
                      before={project.beforeImage.src}
                      after={project.afterImage.src}
                      altBefore={project.beforeImage.alt}
                      altAfter={project.afterImage.alt}
                    />
                  ) : (
                    <div className="relative w-full aspect-[16/10]">
                      <Image 
                        src={project.image.src} 
                        alt={project.image.alt} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  )}
                  <div className="p-4 grid gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="/contact" className="btn-accent w-full justify-center">Book on‑site quote</a>
                  </div>
                </article>
              ))}

              <article className="card overflow-hidden">
                <div className="relative">
                  <CompareFigure
                    before="/gallery/driveway-cincy-before.jpg"
                    after="/gallery/driveway-cincy-after-2.jpg"
                    altBefore="Before: driveway prepped with reinforcement grid"
                    altAfter="After: resin‑bound driveway—finished surface at garage"
                  />
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white text-xs font-semibold shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Our Install
                  </span>
                </div>
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
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white text-xs font-semibold shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Our Install
                  </span>
 main
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm md:text-base leading-tight">10 Year Workmanship <br /> Warranty</span>
                </div>
setup/agent-hq-scaffold
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm md:text-base leading-tight">Certified Resin- <br /> Bound Training</span>

              </article>

              <article className="card overflow-hidden">
                <div className="relative w-full aspect-[16/10]">
                  <Image src="/gallery/driveway-cincy-detail.jpg" alt="Resin‑bound surface detail—aggregate texture" fill className="object-cover" />
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white text-xs font-semibold shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Our Install
                  </span>
 main
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
 setup/agent-hq-scaffold
              </div>
            </RevealOnScroll>

              </article>
 main
            </div>
          </div>
        </section>

        {/* Resources & Learning section */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                Learn about resin‑bound surfaces
              </h2>
              <p className="text-slate-600">
                Expert guides, maintenance tips, and free resources for Ohio homeowners
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <article className="card p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold mb-2">Expert Guides</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Detailed articles on resin vs. epoxy, drainage requirements, and maintenance
                </p>
                <a href="/learn" className="btn-accent inline-flex items-center justify-center w-full">
                  Browse Guides
                </a>
              </article>
              <article className="card p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold mb-2">Free Downloads</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Maintenance checklists and preparation guides for your project
                </p>
                <a href="/resources" className="btn-accent inline-flex items-center justify-center w-full">
                  Get Resources
                </a>
              </article>
              <article className="card p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold mb-2">Color Options</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Explore Vuba aggregate blends and request physical samples
                </p>
                <a href="/colors" className="btn-accent inline-flex items-center justify-center w-full">
                  See Sample Blends
                </a>
              </article>
            </div>
 main
          </div>
        </section>


 setup/agent-hq-scaffold

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

          <section className="mt-8 flex justify-center">
            <Image
              src={certificateImage.src}
              alt={certificateImage.alt}
              width={certificateImage.width}
              height={certificateImage.height}
              className="rounded-md shadow"
            />
          </section>
  main
        </section>

 copilot/fix-git-submodule-fetch
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

        {/* Why resin-bound & Estimator Split Section */}
        <section id="estimate" className="py-20 bg-white scroll-mt-24">
 main
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Why Resin-Bound */}
              <RevealOnScroll className="reveal-slide-left">
                <div>
 copilot/fix-git-submodule-fetch
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
 main
            </div>
          </div>
        </section>



        {/* Recent Projects */}
        <RecentProjects />
      </main>
    </>
  );
}
