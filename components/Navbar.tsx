'use client'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { MouseEvent } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const menuId = 'site-nav-menu'

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
    <nav className="sticky top-0 z-50 nav-dark">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg link-invert">
          <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100" />
          Stone<span className="text-slate-400">&</span>Resin
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/#surfaces" className="link-invert">Surfaces</Link>
          <Link href="/pricing" className="link-invert">Pricing</Link>
          <Link href="/learn" className="link-invert">Learn</Link>
          <Link href="/resources" className="link-invert">Resources</Link>
          <Link href="/about" className="link-invert">About</Link>
          <a
            href="/#estimate"
            className="btn-accent"
            aria-label="Jump to instant estimator on the homepage"
            onClick={handleEstimateClick}
          >
            Get Instant Estimate
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={menuId}
          className="md:hidden btn-ghost"
          onClick={() => setOpen(o => !o)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div id={menuId} className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <Link href="/#surfaces" className="link-invert" onClick={() => setOpen(false)}>Surfaces</Link>
            <Link href="/pricing" className="link-invert" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/learn" className="link-invert" onClick={() => setOpen(false)}>Learn</Link>
            <Link href="/resources" className="link-invert" onClick={() => setOpen(false)}>Resources</Link>
            <Link href="/about" className="link-invert" onClick={() => setOpen(false)}>About</Link>
            <a
              href="/#estimate"
              className="btn-accent"
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
