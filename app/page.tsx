"use client";
export const dynamic = 'force-dynamic';

import Hero from "@/components/Hero";
import RevealOnScroll from "@/components/RevealOnScroll";
import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";
import Estimator from "@/components/Estimator";
import RecentProjects from "@/components/RecentProjects";
import { certificateImage } from "@/lib/frontPageContent";

export default function Home() {
  return (
    <>
      <Hero />

      <main>
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
          </div>
        </section>

        {/* Color Collection */}
        <section className="py-20 bg-white">
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
        <RecentProjects />
      </main>
    </>
  );
}
