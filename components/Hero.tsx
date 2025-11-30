'use client';

import Link from 'next/link';
import Image from 'next/image';
import { track } from '@vercel/analytics';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center">
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
        {/* Gradient at bottom for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-[1.1] mb-6 drop-shadow-lg">
            Resin-Bound Driveways <br />
            & Patios Built to <br />
            Outlast Concrete
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-md">
            Premium permeable surfacing for Southwest Ohio that resists cracking, puddling, and looks amazing
          </p>

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
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-md font-medium text-lg transition-all backdrop-blur-sm"
            >
              See color options
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Signals Bar - Integrated into Hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 py-8 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border-2 border-slate-900">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-xs md:text-sm leading-tight">Fully Licensed <br /> & Insured</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border-2 border-slate-900">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium text-xs md:text-sm leading-tight">10 Year Workmanship <br /> Warranty</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border-2 border-slate-900">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="font-medium text-xs md:text-sm leading-tight">Certified Resin- <br /> Bound Training</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border-2 border-slate-900">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-medium text-xs md:text-sm leading-tight">Local <br /> Small Business</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
