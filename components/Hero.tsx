'use client';

import Link from 'next/link';
import Image from 'next/image';
import { track } from '@vercel/analytics';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero.webp"
          alt="Resin-bound driveway"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        {/* Gradient at bottom for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-32">
        <div className="max-w-3xl">
          <p className="text-white/80 uppercase tracking-[0.25em] text-sm md:text-base font-medium mb-3">
            Stone & Resin
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-[1.05] mb-4">
            STONE & RESIN
          </h1>

          <p className="text-2xl md:text-3xl text-white font-medium mb-4">
            Permeable Resin-Bound Driveways & Patios
          </p>

          <p className="text-lg md:text-2xl text-white/90 mb-6 max-w-2xl leading-relaxed font-light">
            Upgrade worn concrete or asphalt with a seamless stone surface that drains water, resists cracking, and looks high-end for decades.
          </p>

          <ul className="text-base md:text-xl text-white/95 mb-10 space-y-2 max-w-2xl">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fully permeable</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Freeze-thaw durable</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Installed as a complete system — not a coating</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <a
              href="#estimate"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => track('cta_click', { location: 'hero', label: 'Get instant estimate' })}
            >
              Get an Instant Estimate
            </a>
            <Link
              href="/colors"
              className="bg-white/90 text-slate-900 hover:bg-white px-8 py-4 rounded-md font-medium text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              See color options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
