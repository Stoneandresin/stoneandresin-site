// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import ColorsSlider from "@/components/ColorsSlider";
import Image from "next/image";


// ----- Simple estimator settings -----
type Condition = "light" | "moderate" | "heavy";

const BASE_PPSF = 15; // $ / sq ft
const MULTIPLIER: Record<Condition, number> = {
  light: 1.0,
  moderate: 1.2,
  heavy: 1.4,
};

function fmtUSD(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function estimate(area: number, condition: Condition) {
  const ppsf = BASE_PPSF * MULTIPLIER[condition];
  const mid = area * ppsf;
  const low = Math.max(0, mid * 0.95);
  const high = mid * 1.25;
  return { low, high, ppsf };
}

export default function Home() {
  const [area, setArea] = useState<number>(400);
  const [condition, setCondition] = useState<Condition>("moderate");
  const { low, high } = useMemo(
    () => estimate(area || 0, condition),
    [area, condition]
  );

  return (
    <main>
      {/* Hero */}
      <section className="container py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Resin-Bound Surfaces, Installed Right.
          </h1>
          <p className="mt-3 text-gray-600">
            Premium, permeable Vuba stone systems for driveways, patios,
            walkways, and pool decks across Greater Cincinnati.
          </p>
        </div>
      </section>

      {/* Vuba blends carousel — right under hero */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Choose Your Vuba Blend</h2>
        <ColorsSlider />
        <p className="mt-4 text-sm text-gray-600">
          See a blend you love?{" "}
          <a href="/contact" className="underline">
            Request a sample & site visit →
          </a>
        </p>
      </section>

      {/* Estimator */}
      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold">Instant Estimate</h2>

            <label className="block mt-4 text-sm font-medium">Area (sq ft)</label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={area === 0 ? "" : area}
              onChange={(e) => {
                const raw = e.target.value;
                // Remove any leading zeros
                const sanitized = raw.replace(/^0+/, "");
                // If cleared, set to 0; otherwise parse number
                setArea(sanitized === "" ? 0 : Number(sanitized));
              }}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="e.g., 400"
            />

            <label className="block mt-4 text-sm font-medium">Site condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as Condition)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            >
              <option value="light">Light (minimal prep)</option>
              <option value="moderate">Moderate (typical)</option>
              <option value="heavy">Heavy (extra prep/drainage)</option>
            </select>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold">Estimated Range</h3>
            <p className="mt-3 text-3xl font-extrabold">
              {fmtUSD(low)} – {fmtUSD(high)}
            </p>
            <ul className="mt-4 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Final quote confirmed after site visit.</li>
              <li>Prep, drainage, edges, and blend selection affect price.</li>
              <li>Ask about commercial specs and maintenance plans.</li>
            </ul>
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center rounded-md px-4 py-2 font-medium bg-black text-white hover:opacity-90"
              >
                Get a firm quote
              </a>
            </div>
          </div>
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

    </main>
  );
}

