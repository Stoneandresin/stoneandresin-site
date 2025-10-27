'use client'

import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'

type Condition = 'new_slab' | 'cracked' | 'heavy_repair'

const PRICING = {
  // Customer-facing base range per sq ft (already includes Premium UV resin cost & your margin)
  base: { low: 18, high: 24 }, // $/sf — adjust as needed

  // Site condition multipliers (prep effort)
  condition: {
    new_slab: 1.0,
    cracked: 1.15,
    heavy_repair: 1.35,
  } as Record<Condition, number>,

  // Business rules
  minJob: 2500, // minimum ticket
  rounding: 50, // round to nearest $50 for cleaner presentation
}

function clampSqft(n: number) {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(50000, Math.round(n)))
}

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function Estimator() {
  const [sqft, setSqft] = useState<number>(0)
  const [condition, setCondition] = useState<Condition>('cracked')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // --- live pricing calc (Premium-only; no finish selector) ---
  const { low, high } = useMemo(() => {
    const sqftClean = clampSqft(sqft)
    const condKey: keyof typeof PRICING.condition = condition
    const mult = PRICING.condition[condKey]

    let lowRaw = sqftClean * PRICING.base.low * mult
    let highRaw = sqftClean * PRICING.base.high * mult

    // enforce minimum job
    lowRaw = Math.max(lowRaw, PRICING.minJob)
    highRaw = Math.max(highRaw, PRICING.minJob)

    // round for nicer presentation
    const round = (x: number) => Math.round(x / PRICING.rounding) * PRICING.rounding
    return { low: round(lowRaw), high: round(highRaw) }
  }, [sqft, condition])

  async function submitLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // minimal client-side validation
    if (!name.trim() || !email.trim() || !phone.trim() || !zip.trim()) {
      alert('Please complete name, email, phone, and ZIP so we can confirm your quote.')
      return
    }
    setErrorMsg(null)
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          zip,
          sqft: clampSqft(sqft),
          condition,
          estimate: { low, high },
        }),
      })

      const data: any = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok === false) {
        const msg = data?.error ? String(data.error) : `Request failed (${res.status})`
        throw new Error(msg)
      }
      setStatus('sent')
    } catch (err: unknown) {
      console.error(err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setErrorMsg(msg)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submitLead} className="space-y-4" aria-label="Instant price estimator and quote form">
      <h2 className="text-2xl font-bold">Instant Price Estimator</h2>
      <p className="text-base text-gray-700">Premium, UV‑stable resin. Get a quick estimate now, then book a precise on‑site quote.</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="sqftInput">Project area (sq ft)</label>
          <input
            className="input"
            type="number"
            min={0}
            step={10}
            id="sqftInput"
            placeholder="e.g., 400"
            aria-describedby="sqftHelp"
            value={sqft === 0 ? '' : sqft}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const raw = e.target.value
              if (raw === '') {
                setSqft(0)
                return
              }
              const n = Number(raw)
              setSqft(Number.isFinite(n) ? n : 0)
            }}
          />
          <p id="sqftHelp" className="text-sm text-gray-700 mt-1">Measure L × W for each space, add them up, and enter the total square feet.</p>
        </div>

        <div>
          <label className="label" htmlFor="conditionSelect">Surface condition</label>
          <select
            className="input"
            value={condition}
            id="conditionSelect"
            aria-describedby="conditionHelp"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCondition(e.target.value as Condition)}
          >
            <option value="new_slab">New / sound slab</option>
            <option value="cracked">Cracked / moderate repair</option>
            <option value="heavy_repair">Heavily damaged / buildup</option>
          </select>
          <p id="conditionHelp" className="text-sm text-gray-700 mt-1">Not sure? Pick "Cracked / moderate repair." We'll confirm on‑site.</p>
        </div>

        {/* Estimate card (always visible) */}
        <div className="card p-4 col-span-2">
          <div className="text-sm uppercase tracking-wide subtle">Estimated range</div>
          <div className="text-2xl font-extrabold mt-1">
            {money(low)} – {money(high)}
          </div>
          <p className="text-sm text-gray-700 mt-1">
            Range includes Premium UV resin & install. Final price depends on site conditions and exact scope.
            Not a formal quote.
          </p>
        </div>

        <div>
          <label className="label">Full name</label>
          <input className="input" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" type="tel" value={phone} onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label className="label">ZIP code</label>
          <input className="input" inputMode="numeric" pattern="[0-9]*" value={zip} onChange={(e: ChangeEvent<HTMLInputElement>) => setZip(e.target.value)} required />
        </div>
      </div>

      <button type="submit" className="btn w-full md:w-auto" disabled={status === 'sending' || status === 'sent'}>
        {status === 'sending' ? 'Sending...' : 'Book My On-Site Quote'}
      </button>
      {status === 'sent' && <p className="text-emerald-700 text-sm">Thanks! We’ll be in touch shortly.</p>}
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">
          There was a problem submitting ({errorMsg || 'unknown'}). Please call 513-787-8798.
        </p>
      )}
    </form>
  )
}