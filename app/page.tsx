"use client";
export const dynamic = 'force-dynamic';

import Hero from "@/components/Hero";
import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";
import Estimator from "@/components/Estimator";

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
            <div className="surface-1 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold accent-text">
                Why resin‑bound?
              </h2>
              <div className="grid-clean md:grid-cols-3 mt-6">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">Permeable by design</h3>
                  <p className="mt-2 text-sm copy-muted">
                    Reduce puddling and runoff with a porous surface.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">UV‑stable and durable</h3>
                  <p className="mt-2 text-sm copy-muted">
                    Color‑stable resins and aggregates built to last.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">Low maintenance</h3>
                  <p className="mt-2 text-sm copy-muted">
                    Easy to clean and keep looking great season after season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estimator */}
        <section className="container py-12">
          <Estimator />

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
            <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
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
