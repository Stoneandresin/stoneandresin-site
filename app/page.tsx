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
        {/* Trust Signals Bar */}
        <section className="bg-white py-10 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.25)]">
          <div className="container mx-auto px-4 sm:px-6 max-w-full">
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
          </div>
        </section>

        {/* Color Collection */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-full">
            <RevealOnScroll className="reveal-fade">
              <div className="text-center max-w-3xl mx-auto mb-12 px-2">
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

        {/* Why resin-bound section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-full">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-tight text-center">
                Why Resin-Bound Beats Concrete
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
          </div>
        </section>

        {/* Instant Price Estimator */}
        <section id="estimate" className="py-20 bg-slate-50 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-full">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
                  Instant Price Estimator
                </h2>
                <p className="text-xl text-slate-600">
                  Get a ballpark price in seconds
                </p>
              </div>
              <div className="flex justify-center">
                <Estimator />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <RecentProjects />
      </main>
    </>
  );
}
