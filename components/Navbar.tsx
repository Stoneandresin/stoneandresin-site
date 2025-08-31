'use client'
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
          <span className="inline-block h-6 w-6 rounded-full" style={{background:"var(--brand)"}}/>
          Stone<span className="text-gray-500">&</span>Resin
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#surfaces" className="hover:underline">Surfaces</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/learn" className="hover:underline">Learn</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="btn" aria-label="Get an instant estimate">Get Instant Estimate</Link>
        </nav>
        <button aria-label="Toggle menu" className="md:hidden btn-outline" onClick={()=>setOpen(o=>!o)}>Menu</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container py-3 flex flex-col gap-3">
            <Link href="/#surfaces" onClick={()=>setOpen(false)}>Surfaces</Link>
            <Link href="/projects" onClick={()=>setOpen(false)}>Projects</Link>
            <Link href="/pricing" onClick={()=>setOpen(false)}>Pricing</Link>
            <Link href="/learn" onClick={()=>setOpen(false)}>Learn</Link>
            <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
            <Link href="/contact" className="btn" onClick={()=>setOpen(false)}>Get Instant Estimate</Link>
          </div>
        </div>
      )}
    </header>
  )
}
