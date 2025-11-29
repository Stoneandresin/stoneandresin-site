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
    <nav className="sticky top-0 z-50 nav-dark">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg link-invert">
          <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100" />
          Stone<span className="text-slate-400">&</span>Resin
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/#surfaces" className="link-invert">Surfaces</Link>
          <Link href="/pricing" className="link-invert">Pricing</Link>
          <Link href="/learn" className="link-invert">Learn</Link>
 copilot/fix-git-submodule-fetch
          <Link href="/faq" className="link-invert">FAQ</Link>

          <Link href="/resources" className="link-invert">Resources</Link>
 main
          <Link href="/about" className="link-invert">About</Link>
          <a 
            href="tel:+15137878798" 
            className="flex items-center gap-1 link-invert font-semibold"
            aria-label="Call Stone & Resin at 513-787-8798"
          >
            📞 (513) 787-8798
          </a>
          <a
            href="/#estimate"
            className="btn-accent"
            aria-label="Jump to instant estimator on the homepage"
            onClick={handleEstimateClick}
          >
            Get Free Estimate
          </a>
        </div>

        <button aria-label="Toggle menu" className="md:hidden btn-ghost" onClick={() => setOpen(o => !o)}>
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <Link href="/#surfaces" className="link-invert" onClick={() => setOpen(false)}>Surfaces</Link>
            <Link href="/pricing" className="link-invert" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/learn" className="link-invert" onClick={() => setOpen(false)}>Learn</Link>
 copilot/fix-git-submodule-fetch
            <Link href="/faq" className="link-invert" onClick={() => setOpen(false)}>FAQ</Link>

            <Link href="/resources" className="link-invert" onClick={() => setOpen(false)}>Resources</Link>
 main
            <Link href="/about" className="link-invert" onClick={() => setOpen(false)}>About</Link>
            <a 
              href="tel:+15137878798" 
              className="btn-outline text-center"
              aria-label="Call Stone & Resin"
            >
              📞 Call (513) 787-8798
            </a>
            <a
              href="/#estimate"
              className="btn-accent"
              onClick={handleEstimateClick}
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
