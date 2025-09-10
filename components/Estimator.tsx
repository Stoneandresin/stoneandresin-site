// components/Estimator.tsx
"use client";

import { useMemo, useState } from "react";

type Condition = "light" | "moderate" | "heavy";

const BASE_PPSF = 15;
const MULT: Record<Condition, number> = { light: 1.0, moderate: 1.2, heavy: 1.4 };

function usd(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function estimate(area: number, cond: Condition) {
  const ppsf = BASE_PPSF * MULT[cond];
  const mid = (area || 0) * ppsf;
  return { low: Math.max(0, mid * 0.95), high: mid * 1.25 };
}

export default function Estimator() {
  const [area, setArea] = useState(400);
  const [cond, setCond] = useState<Condition>("moderate");
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); const [zip, setZip] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

  const range = useMemo(() => estimate(area, cond), [area, cond]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null); setErr(null);

    // Honeypot: if filled, silently succeed to bots, skip webhook
    if (hp.trim() !== "") {
      setBusy(false);
      setMsg("Thanks! We’ll contact you to book an on-site quote.");
      return;
    }

    try {
      const payload = {
        name, email, phone, zip,
        areaSqFt: area, condition: cond,
        estimateLow: Math.round(range.low), estimateHigh: Math.round(range.high),
        source: "stoneandresin.com", submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // try to show structured error from the API
        let detail: any = null;
        try { detail = await res.json(); } catch {}
        const status = res.status;
        const reason = detail?.error || "submit_failed";
        // Map the hardened route’s statuses to readable messages
        if (status === 400) setErr("Please provide a valid name and email.");
        else if (status === 500 && reason === "LEAD_WEBHOOK_URL not set") setErr("Server isn’t configured yet.");
        else if (status === 502) setErr("Our lead service is temporarily unavailable. Please try again shortly.");
        else setErr(`Submit failed (status ${status}).`);
        setBusy(false);
        return;
      }

      setMsg("Thanks! We’ll contact you to book an on-site quote.");
    } catch {
      setErr("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="estimator" className="container py-10">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Instant Price Estimator</h2>
        <p className="mt-1 text-sm text-gray-600">
          Premium UV-stable resin—get a ballpark now, then book a precise on-site quote.
        </p>

        <form className="mt-4 grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="mb-1 block text-gray-700">Area (sq ft)</span>
              <input
                type="number" min={50} value={area}
                onChange={(e)=>setArea(parseInt(e.target.value || "0", 10))}
                className="w-full rounded-lg border px-3 py-2" required
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-700">Surface condition</span>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={cond} onChange={(e)=>setCond(e.target.value as Condition)}
              >
                <option value="light">Light / minimal repair</option>
                <option value="moderate">Cracked / moderate repair</option>
                <option value="heavy">Heavy repair</option>
              </select>
            </label>
          </div>

          <div className="rounded-xl border px-4 py-3">
            <div className="text-xs font-medium text-gray-600">ESTIMATED RANGE</div>
            <div className="mt-1 text-2xl font-bold">{usd(range.low)} – {usd(range.high)}</div>
            <div className="mt-1 text-xs text-gray-500">
              Range includes premium UV resin & install. Final price depends on site conditions and scope. Not a formal quote.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="mb-1 block text-gray-700">Full name</span>
              <input className="w-full rounded-lg border px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} required />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-700">Email</span>
              <input type="email" className="w-full rounded-lg border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-700">Phone</span>
              <input className="w-full rounded-lg border px-3 py-2" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-700">ZIP code</span>
              <input className="w-full rounded-lg border px-3 py-2" value={zip} onChange={(e)=>setZip(e.target.value)} />
            </label>
          </div>

          {/* Honeypot (hidden from users, present for bots) */}
          <div aria-hidden="true" className="hidden">
            <label>
              <span>Company</span>
              <input value={hp} onChange={(e)=>setHp(e.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <button
            type="submit" disabled={busy}
            className="mt-1 rounded-full bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            {busy ? "Submitting…" : "Book My On-Site Quote"}
          </button>

          {msg && <div className="text-sm text-emerald-700">{msg}</div>}
          {err && <div className="text-sm text-red-600">{err}</div>}
        </form>
      </div>
    </section>
  );
}
