'use client'
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 nav-dark">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl link-invert">
          <span className="inline-block h-6 w-6 rounded-full" style={{ background: "var(--brand)" }} />
          Stone<span className="text-white/60">&</span>Resin
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/#surfaces" className="link-invert">Surfaces</Link>
          <Link href="/pricing" className="link-invert">Pricing</Link>
          <Link href="/learn" className="link-invert">Learn</Link>
          <Link href="/about" className="link-invert">About</Link>
          <Link href="/contact" className="btn-brand" aria-label="Get an instant estimate">Get Instant Estimate</Link>
        </div>

        <button aria-label="Toggle menu" className="md:hidden btn-ghost-invert" onClick={() => setOpen(o => !o)}>
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-indigo-900 bg-indigo-950">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <Link href="/#surfaces" className="link-invert" onClick={() => setOpen(false)}>Surfaces</Link>
            <Link href="/pricing" className="link-invert" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/learn" className="link-invert" onClick={() => setOpen(false)}>Learn</Link>
            <Link href="/about" className="link-invert" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" className="btn-brand" onClick={() => setOpen(false)}>Get Instant Estimate</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
