// app/page.tsx
"use client";

import { useMemo, useState } from "react";

type Condition = "light" | "moderate" | "heavy";

const BASE_PPSF = 15; // $/sqft
const MULTIPLIER: Record<Condition, number> = {
  light: 1.0,
  moderate: 1.2,
  heavy: 1.4,
};

function fmtUSD(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function estimate(area: number, condition: Condition) {
  const ppsf = BASE_PPSF * MULTIPLIER[condition];
  const mid = area * ppsf;
  // Show a range to set expectations (site-condition variance, edges, drainage, etc.)
  const low = Math.max(0, mid * 0.95);
  const high = mid * 1.25;
  return { low, high };
}

export default function Home() {
  const [area, setArea] = useState<number>(400);
  const [cond, setCond] = useState<Condition>("moderate");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const range = useMemo(() => estimate(area || 0, cond), [area, cond]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    const payload = {
      name,
      email,
      phone,
      zip,
      areaSqFt: area,
      condition: cond,
      estimateLow: Math.round(range.low),
      estimateHigh: Math.round(range.high),
      source: "stoneandresin.com",
      submittedAt: new Date().toISOString(),
    };

    // Prefer backend route (keeps your token server-side).
    // If /api/lead is missing, optionally fall back to a public webhook defined as NEXT_PUBLIC_LEAD_WEBHOOK_URL.
    let ok = false, status = 0;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      status = res.status;
      ok = res.ok;
      if (!ok && status === 404) {
        const fallback = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
        if (fallback) {
          const f = await fetch(fallback, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          ok = f.ok;
          status = f.status;
        }
      }
    } catch {
      // ignore, show message below
    } finally {
      setBusy(false);
    }

    setMsg(ok ? "Thanks! We’ll text or email to book your on-site quote." : `Submit failed (status ${status || "network"})`);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Hero */}
        <section>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-800">
            <span className="font-semibold">Stone & Resin</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Resin-Bound Surfaces for
            <br /> Ohio Homes & Businesses
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Permeable, UV-stable, and beautiful. Driveways, patios, walkways, pool decks—installed by local pros in
            Amelia & Cincinnati.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#estimator" className="rounded-full bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800">
              Get My Instant Estimate
            </a>
            <a
              href="/projects"
              className="rounded-full border border-gray-300 px-5 py-3 text-gray-900 hover:bg-gray-50"
            >
              See Projects
            </a>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border px-3 py-2">✓ Permeable drainage</div>
            <div className="rounded-xl border px-3 py-2">✓ UV color retention</div>
            <div className="rounded-xl border px-3 py-2">✓ Fast install</div>
            <div className="rounded-xl border px-3 py-2">✓ Low maintenance</div>
          </div>
        </section>

        {/* Right: Estimator */}
        <section id="estimator">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Instant Price Estimator</h2>
            <p className="mt-1 text-sm text-gray-600">
              Premium UV-stable resin—get a ballpark now, then book a precise on-site quote.
            </p>

            <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm">
                  <span className="mb-1 block text-gray-700">Area (sq ft)</span>
                  <input
                    type="number"
                    min={50}
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value || "0", 10))}
                    className="w-full rounded-lg border px-3 py-2"
                    name="area"
                    required
                  />
                </label>

                <label className="text-sm">
                  <span className="mb-1 block text-gray-700">Surface condition</span>
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    name="condition"
                    value={cond}
                    onChange={(e) => setCond(e.target.value as Condition)}
                  >
                    <option value="light">Light / minimal repair</option>
                    <option value="moderate">Cracked / moderate repair</option>
                    <option value="heavy">Heavy repair</option>
                  </select>
                </label>
              </div>

              <div className="rounded-xl border px-4 py-3">
                <div className="text-xs font-medium text-gray-600">ESTIMATED RANGE</div>
                <div className="mt-1 text-2xl font-bold">
                  {fmtUSD(range.low)} – {fmtUSD(range.high)}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Range includes Premium UV resin & install. Final price depends on site conditions and exact scope. Not a
                  formal quote.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm">
                  <span className="mb-1 block text-gray-700">Full name</span>
                  <input className="w-full rounded-lg border px-3 py-2" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-gray-700">Email</span>
                  <input type="email" className="w-full rounded-lg border px-3 py-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-gray-700">Phone</span>
                  <input className="w-full rounded-lg border px-3 py-2" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-gray-700">ZIP code</span>
                  <input className="w-full rounded-lg border px-3 py-2" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
                </label>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-1 rounded-full bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
              >
                {busy ? "Submitting…" : "Book My On-Site Quote"}
              </button>

              {msg && (
                <div className="text-sm text-gray-700">
                  {msg}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
