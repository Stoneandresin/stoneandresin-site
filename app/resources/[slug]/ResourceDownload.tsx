'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'

interface ResourceDownloadProps {
  resourceTitle: string
  pdfUrl: string
  slug: string
}

export default function ResourceDownload({ resourceTitle, pdfUrl, slug }: ResourceDownloadProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!email || !name) {
      setErrorMsg('Please fill in all fields')
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
          leadType: 'resource_download',
          resource: slug,
          resourceTitle,
        }),
      })

      const data: any = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok === false) {
        const msg = data?.error ? String(data.error) : `Request failed (${res.status})`
        throw new Error(msg)
      }
      
      // Track conversion
      if (typeof window !== 'undefined') {
        const w = window as any
        if (w.gtag) {
          w.gtag('event', 'resource_download', {
            event_category: 'Lead Generation',
            event_label: slug,
          })
        }
        if (w.va?.track) {
          w.va.track('resource_download', { resource: slug })
        }
      }
      
      setStatus('sent')
      
      // Trigger download after a brief delay
      setTimeout(() => {
        // For now, since we don't have actual PDFs, we'll show a message
        // In production, this would trigger the actual PDF download
        // window.open(pdfUrl, '_blank')
      }, 500)
    } catch (err: unknown) {
      console.error(err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setErrorMsg(msg)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card p-8 text-center" role="status" aria-live="polite">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-3">Check your email!</h2>
        <p className="text-slate-600 mb-6">
          We've sent you a link to download <strong>{resourceTitle}</strong>.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Note: This is a demo. In production, you would receive an actual PDF download link via email.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/resources" className="btn-outline">
            Browse more resources
          </a>
          <a href="/learn" className="btn-accent">
            Read our guides
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <h2 className="text-xl font-bold mb-3">Get your free download</h2>
      <p className="text-slate-600 mb-6">
        Enter your email to receive the download link. We'll also send you helpful tips about resin-bound surfaces.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="download-name" className="label">Name</label>
          <input
            id="download-name"
            type="text"
            className="input"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="John Smith"
            required
          />
        </div>
        
        <div>
          <label htmlFor="download-email" className="label">Email</label>
          <input
            id="download-email"
            type="email"
            className="input"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn w-full justify-center"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Get Download Link'}
        </button>
        
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center" role="alert">
            {errorMsg || 'Something went wrong. Please try again or call 513-787-8798.'}
          </p>
        )}
        
        <p className="text-xs text-slate-500 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
