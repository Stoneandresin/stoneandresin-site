'use client'

import { useMemo, useState, useEffect, type ChangeEvent, type FormEvent } from 'react'

type Condition = 'new_slab' | 'cracked' | 'heavy_repair'
type SurfaceType = 'driveway' | 'patio' | 'pool_deck'

const SURFACE_TYPE_LABELS: Record<SurfaceType, string> = {
  driveway: 'driveway',
  patio: 'patio',
  pool_deck: 'pool deck'
}

const CONDITION_LABELS: Record<Condition, string> = {
  new_slab: 'new / sound slab',
  cracked: 'cracked',
  heavy_repair: 'heavy repair'
}

const PRICING = {
  // Base range per sq ft
  base: { low: 12, high: 20 }, // $/sf base range
  
  // Surface type adjustments
  surfaceType: {
    driveway: 1.0,
    patio: 0.95,
    pool_deck: 1.1,
  } as Record<SurfaceType, number>,

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
  const [surfaceType, setSurfaceType] = useState<SurfaceType>('driveway')
  const [condition, setCondition] = useState<Condition>('cracked')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Capture UTM and referrer
  const [utmData, setUtmData] = useState<Record<string, string>>({})
  
  useEffect(() => {
    // Capture UTM params and referrer on mount
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utm: Record<string, string> = {}
      params.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          utm[key] = value
        }
      })
      if (document.referrer) {
        utm.referrer = document.referrer
      }
      setUtmData(utm)
    }
  }, [])

  // --- live pricing calc with breakdown ---
  const priceBreakdown = useMemo(() => {
    const sqftClean = clampSqft(sqft)
    const surfMult = PRICING.surfaceType[surfaceType]
    const condMult = PRICING.condition[condition]

    const basePerSqft = { low: PRICING.base.low, high: PRICING.base.high }
    const surfaceAdjusted = { 
      low: basePerSqft.low * surfMult, 
      high: basePerSqft.high * surfMult 
    }
    
    let lowRaw = sqftClean * surfaceAdjusted.low * condMult
    let highRaw = sqftClean * surfaceAdjusted.high * condMult

    // enforce minimum job
    lowRaw = Math.max(lowRaw, PRICING.minJob)
    highRaw = Math.max(highRaw, PRICING.minJob)

    // round for nicer presentation
    const round = (x: number) => Math.round(x / PRICING.rounding) * PRICING.rounding
    
    return {
      basePerSqft,
      surfaceAdjusted,
      condMult,
      surfMult,
      low: round(lowRaw),
      high: round(highRaw),
      sqftClean
    }
  }, [sqft, surfaceType, condition])

  const { low, high } = priceBreakdown

  function validateField(field: string, value: string): string | null {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : null
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : null
      case 'phone':
        return value.trim().length < 10 ? 'Please enter a valid phone number' : null
      case 'zip':
        return !/^\d{5}$/.test(value.trim()) ? 'Please enter a valid 5-digit ZIP code' : null
      default:
        return null
    }
  }

  function handleFieldBlur(field: string, value: string) {
    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }))
  }

  async function submitLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Validate all fields
    const fieldErrors: Record<string, string> = {}
    const nameError = validateField('name', name)
    const emailError = validateField('email', email)
    const phoneError = validateField('phone', phone)
    const zipError = validateField('zip', zip)
    
    if (nameError) fieldErrors.name = nameError
    if (emailError) fieldErrors.email = emailError
    if (phoneError) fieldErrors.phone = phoneError
    if (zipError) fieldErrors.zip = zipError
    
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
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
          sqft: priceBreakdown.sqftClean,
          surfaceType,
          condition,
          estimate: { low, high },
          ...utmData, // Include UTM and referrer data
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

  if (status === 'sent') {
    return (
      <div className="space-y-4" role="status" aria-live="polite">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-2xl font-bold mb-2">Thanks! We'll text you shortly.</h3>
          <p className="text-slate-600 mb-6">
            Want to lock in a time now?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/schedule?utm_source=site&utm_medium=cta&utm_campaign=book" className="btn-accent">
              Book a consultation
            </a>
            <a href="/colors" className="btn-ghost">
              View color blends
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submitLead} className="space-y-4" aria-label="Instant price estimator and quote form">
      <h2 className="text-2xl font-bold">Instant price estimator</h2>
      <p className="subtle text-sm">Premium UV‑stable resin—get a ballpark now, then book a precise on‑site quote.</p>

      <div className="grid grid-cols-1 gap-4">
        {/* Surface Type */}
        <div>
          <label className="label" htmlFor="surfaceTypeSelect">Surface type</label>
          <select
            className="input"
            value={surfaceType}
            id="surfaceTypeSelect"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSurfaceType(e.target.value as SurfaceType)}
          >
            <option value="driveway">Driveway</option>
            <option value="patio">Patio</option>
            <option value="pool_deck">Pool deck</option>
          </select>
        </div>

        {/* Area with Slider */}
        <div>
          <label className="label" htmlFor="sqftInput">Area (sq ft)</label>
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
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={sqft}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSqft(Number(e.target.value))}
            className="w-full mt-2"
            aria-label="Adjust square footage with slider"
          />
          <p id="sqftHelp" className="text-xs subtle mt-1">Measure length × width of each area and add them up.</p>
        </div>

        {/* Surface Condition */}
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
          <p id="conditionHelp" className="text-xs subtle mt-1">Not sure? Choose "Cracked / moderate repair" — we'll confirm during your site visit.</p>
        </div>

        {/* Estimate card with breakdown */}
        <div className="card p-4" role="region" aria-live="polite">
          <div className="text-sm uppercase tracking-wide subtle">Estimated range</div>
          <div className="text-2xl font-extrabold mt-1">
            {money(low)} – {money(high)}
          </div>
          <div className="text-xs subtle mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Base ({money(priceBreakdown.basePerSqft.low)}–{money(priceBreakdown.basePerSqft.high)}/sq ft)</span>
            </div>
            <div className="flex justify-between">
              <span>+ Surface type ({SURFACE_TYPE_LABELS[surfaceType]})</span>
              <span>{priceBreakdown.surfMult === 1 ? '—' : `${priceBreakdown.surfMult < 1 ? '' : '+'}${((priceBreakdown.surfMult - 1) * 100).toFixed(0)}%`}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Condition ({CONDITION_LABELS[condition]})</span>
              <span>{priceBreakdown.condMult === 1 ? '—' : `+${((priceBreakdown.condMult - 1) * 100).toFixed(0)}%`}</span>
            </div>
          </div>
          <p className="text-xs subtle mt-2 pt-2 border-t border-slate-200">
            Typical jobs range $12–$20/sq ft depending on prep and base condition.
          </p>
          <p className="text-xs subtle mt-1">
            Range includes Premium UV resin & install. Final price depends on site conditions and exact scope.
            Not a formal quote.
          </p>
        </div>

        {/* Contact Fields */}
        <div>
          <label className="label">Full name</label>
          <input 
            className={`input ${errors.name ? 'border-red-500' : ''}`}
            value={name} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }))
              }
            }}
            onBlur={(e) => handleFieldBlur('name', e.target.value)}
            required 
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-600 mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Email</label>
            <input 
              className={`input ${errors.email ? 'border-red-500' : ''}`}
              type="email" 
              value={email} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }))
                }
              }}
              onBlur={(e) => handleFieldBlur('email', e.target.value)}
              required 
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-600 mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="label">Phone</label>
            <input 
              className={`input ${errors.phone ? 'border-red-500' : ''}`}
              type="tel" 
              value={phone} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value)
                if (errors.phone) {
                  setErrors(prev => ({ ...prev, phone: '' }))
                }
              }}
              onBlur={(e) => handleFieldBlur('phone', e.target.value)}
              required 
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-600 mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="label">ZIP code</label>
          <input 
            className={`input ${errors.zip ? 'border-red-500' : ''}`}
            inputMode="numeric" 
            pattern="[0-9]*" 
            value={zip} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setZip(e.target.value)
              if (errors.zip) {
                setErrors(prev => ({ ...prev, zip: '' }))
              }
            }}
            onBlur={(e) => handleFieldBlur('zip', e.target.value)}
            required 
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? 'zip-error' : undefined}
          />
          {errors.zip && (
            <p id="zip-error" className="text-xs text-red-600 mt-1" role="alert">
              {errors.zip}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="submit" className="btn w-full sm:flex-1" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Book my on‑site quote'}
        </button>
        <a href="/contact" className="btn-accent w-full sm:flex-1 justify-center text-center">
          Request callback
        </a>
      </div>
      
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert" aria-live="assertive">
          There was a problem submitting ({errorMsg || 'unknown'}). Please call 513-787-8798.
        </p>
      )}
    </form>
  )
}
