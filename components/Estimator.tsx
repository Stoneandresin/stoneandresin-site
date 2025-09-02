'use client'
import { useMemo, useState } from 'react'

type Condition = 'new_slab' | 'cracked' | 'heavy_repair'

const PRICING = {
  // Customer-facing base range per sq ft (already includes Premium UV resin cost & your margin)
  base: { low: 15, high: 20 }, // $/sf — adjust as needed

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
  const [sqft, setSqft] = useState<number>(400)
  const [condition, setCondition] = useState<Condition>('cracked')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // --- live pricing calc (Premium-only; no finish selector) ---
  const { low, high } = useMemo(() => {
    const sqftClean = clampSqft(sqft)
    const mult = PRICING.condition[condition]

    let lowRaw = sqftClean * PRICING.base.low * mult
    let highRaw = sqftClean * PRICING.base.high * mult

    // enforce minimum job
    lowRaw = Math.max(lowRaw, PRICING.minJob)
    highRaw = Math.max(highRaw, PRICING.minJob)

    // round for nicer presentation
    const round = (x: number) => Math.round(x / PRICING.rounding) * PRICING.rounding
    return { low: round(lowRaw), high: round(highRaw) }
  }, [sqft, condition])

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    // minimal client-side validation
    if (!name.trim() || !email.trim() || !phone.trim() || !zip.trim()) {
      alert('Please complete name, email, phone, and ZIP so we can confirm your quote.')
      return
    }
    setStatus('sending')
    try {
      // Replace with your webhook when ready.
      console.log('Lead submitted', { name, email, phone, zip, sqft, condition, low, high })
      await new Promise((r) => setTimeout(r, 600))
      setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submitLead} className="space-y-4" aria-label="Instant price estimator and quote form">
      <h2 className="text-2xl font-bold">Instant Price Estimator</h2>
      <p className="subtle text-sm">Premium UV-stable resin—get a ballpark now, then book a precise on-site quote.</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Area (sq ft)</label>
          <input
            className="input"
            type="number"
            min={0}
            step={10}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="label">Surface condition</label>
          <select
            className="input"
            value={condition}
            onChange={(e) => setCondition(e.target.value as Condition)}
          >
            <option value="new_slab">New / sound slab</option>
            <option value="cracked">Cracked / moderate repair</option>
            <option value="heavy_repair">Heavily damaged / buildup</option>
          </select>
        </div>

        {/* Estimate card */}
        <div className="card p-4 col-span-2">
          <div className="text-sm uppercase tracking-wide subtle">Estimated range</div>
          <div className="text-2xl font-extrabold mt-1">
            {money(low)} – {money(high)}
          </div>
          <p className="text-xs subtle mt-1">
            Range includes Premium UV resin & install. Final price depends on site conditions and exact scope.
            Not a formal quote.
          </p>
        </div>

        <div>
          <label className="label">Full name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label className="label">ZIP code</label>
          <input className="input" value={zip} onChange={(e) => setZip(e.target.value)} />
        </div>
      </div>

      <button type="submit" className="btn w-full md:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Book My On-Site Quote'}
      </button>
      {status === 'sent' && <p className="text-emerald-700 text-sm">Thanks! We’ll be in touch shortly.</p>}
      {status === 'error' && <p className="text-red-600 text-sm">There was a problem submitting. Please call 513-787-8798.</p>}
    </form>
  )
}
