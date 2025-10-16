'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 nav-light">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg link">
          <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100" />
          Stone<span className="text-slate-400">&</span>Resin
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/#surfaces" className="link">Surfaces</Link>
          <Link href="/pricing" className="link">Pricing</Link>
          <Link href="/learn" className="link">Learn</Link>
          <Link href="/about" className="link">About</Link>
          <Link href="/contact" className="btn-accent" aria-label="Get an instant estimate">Get Instant Estimate</Link>
        </div>

        <button aria-label="Toggle menu" className="md:hidden btn-ghost" onClick={() => setOpen(o => !o)}>
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <Link href="/#surfaces" className="link" onClick={() => setOpen(false)}>Surfaces</Link>
            <Link href="/pricing" className="link" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/learn" className="link" onClick={() => setOpen(false)}>Learn</Link>
            <Link href="/about" className="link" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" className="btn-accent" onClick={() => setOpen(false)}>Get Instant Estimate</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
