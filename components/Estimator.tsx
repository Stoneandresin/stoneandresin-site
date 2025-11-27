'use client'

import { useMemo, useState, useEffect, type ChangeEvent, type FormEvent } from 'react'

type Condition = 'new_slab' | 'cracked' | 'heavy_repair'
type SurfaceType = 'driveway' | 'patio' | 'pool_deck' | 'walkway'

const PRICING = {
  // Base range per sq ft
  base: { low: 12, high: 17 }, // $/sf base range
  
  // Surface type adjustments
  surfaceType: {
    driveway: 1.0,
    patio: 1.0,
    pool_deck: 1.1,
    walkway: 1.15,
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
  const [sqft, setSqft] = useState<number>(400)
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
      
      // Track successful conversion
      if (typeof window !== 'undefined') {
        const w = window as any
        if (w.gtag) {
          w.gtag('event', 'quote_request_completed', {
            event_category: 'Lead Generation',
            event_label: 'estimator_form_success',
            value: Math.round((low + high) / 2),
            currency: 'USD'
          })
          // Track as conversion
          const conversionSendTo = process.env.NEXT_PUBLIC_GADS_SEND_TO
          if (conversionSendTo) {
            w.gtag('event', 'conversion', {
              send_to: conversionSendTo,
              value: Math.round((low + high) / 2),
              currency: 'USD'
            })
          }
        }
        if (w.va?.track) {
          w.va.track('quote_request_completed', { 
            location: 'estimator',
            sqft: clampSqft(sqft),
            condition,
            estimated_value: Math.round((low + high) / 2),
            lead_id: data?.id || 'unknown'
          })
        }
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
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md mx-auto">
        <div className="bg-slate-900 p-6 text-center">
          <h2 className="text-2xl font-serif text-white">Request Received</h2>
        </div>
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">Thanks! We'll be in touch shortly.</h3>
          <p className="text-slate-600 mb-6">
            While you wait, check out our color options.
          </p>
          <a href="/colors" className="inline-block bg-slate-900 text-white px-6 py-3 rounded font-medium hover:bg-slate-800 transition-colors">
            View Color Blends
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md mx-auto border border-slate-200">
      <div className="bg-slate-900 p-6 text-center">
        <h2 className="text-2xl font-serif text-white">Instant Price Estimator</h2>
        <p className="text-slate-400 text-sm mt-1">Get a ballpark price in seconds</p>
      </div>

      <form onSubmit={submitLead} className="p-6 space-y-6">
        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
          <div className="grid grid-cols-2 gap-2">
            {(['driveway', 'patio', 'pool_deck', 'walkway'] as SurfaceType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSurfaceType(type)}
                className={`px-3 py-2 text-sm rounded border transition-colors ${
                  surfaceType === type
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Approximate Size */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">Approximate Size</label>
            <span className="text-sm font-bold text-slate-900">{sqft} sq ft</span>
          </div>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Small (100)</span>
            <span>Large (2000+)</span>
          </div>
        </div>

        {/* Estimated Price Display */}
        <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-100">
          <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Estimated Price</p>
          <p className="text-3xl font-serif font-bold text-slate-900">
            {money(low)} - {money(high)}
          </p>
          <p className="text-xs text-slate-400 mt-1">Includes materials & installation</p>
        </div>

        {/* Contact Fields */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full px-4 py-3 rounded border ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:outline-none focus:border-slate-900`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => handleFieldBlur('name', e.target.value)}
            required
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email Address"
            className={`w-full px-4 py-3 rounded border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:outline-none focus:border-slate-900`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleFieldBlur('email', e.target.value)}
            required
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="tel"
                placeholder="Phone"
                className={`w-full px-4 py-3 rounded border ${errors.phone ? 'border-red-500' : 'border-slate-200'} focus:outline-none focus:border-slate-900`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                required
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Zip Code"
                className={`w-full px-4 py-3 rounded border ${errors.zip ? 'border-red-500' : 'border-slate-200'} focus:outline-none focus:border-slate-900`}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                onBlur={(e) => handleFieldBlur('zip', e.target.value)}
                required
              />
              {errors.zip && <p className="text-xs text-red-600">{errors.zip}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Calculating...' : 'Get Official Quote'}
        </button>

        <p className="text-xs text-center text-slate-400">
          No spam. We only use this info to send your estimate.
        </p>

        {status === 'error' && (
          <p className="text-red-600 text-sm text-center">
            Error: {errorMsg || 'Please try again.'}
          </p>
        )}
      </form>
    </div>
  )
}
