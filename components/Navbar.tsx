'use client'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { MouseEvent } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleEstimateClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return
    }
    event.preventDefault()

    const onHome = pathname === '/' || pathname === ''

    if (onHome) {
      const target = document.getElementById('estimate')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.location.hash = 'estimate'
      }
    } else {
      router.push('/#estimate')
    }

    setOpen(false)
  }, [pathname, router])

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-2xl text-white">
          <span className="inline-block h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
          Stone <span className="text-white/60">&</span> Resin
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#surfaces" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Surfaces</Link>
          <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Pricing</Link>
          <Link href="/learn" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Learn</Link>
          <Link href="/resources" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Resources</Link>
          <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About</Link>
          <a
            href="/#estimate"
            className="bg-white text-slate-900 px-6 py-2.5 rounded-md font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
            aria-label="Jump to instant estimator on the homepage"
            onClick={handleEstimateClick}
          >
            Get Instant Estimate
          </a>
        </div>

        <button aria-label="Toggle menu" className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/#surfaces" className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>Surfaces</Link>
            <Link href="/pricing" className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/learn" className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>Learn</Link>
            <Link href="/resources" className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>Resources</Link>
            <Link href="/about" className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>About</Link>
            <a
              href="/#estimate"
              className="bg-white text-slate-900 px-6 py-3 rounded-md font-bold text-center"
              onClick={handleEstimateClick}
            >
              Get Instant Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
