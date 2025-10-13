"use client";

import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";
import Estimator from "@/components/Estimator";

export default function Home() {
  return (
    <>
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
      </main>
    </>
  );
}
