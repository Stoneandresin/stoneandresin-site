'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function Hero() {
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/80153019-f1dd-4d4e-ae1a-373c293ba650', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'A',
        location: 'components/Hero.tsx:hero-mount',
        message: 'Hero variant render',
        data: {
          variant: 'separate-trust-section',
          ctaSecondaryStyle: 'grey-gradient',
          host: typeof window !== 'undefined' ? window.location.host : 'server',
          path: typeof window !== 'undefined' ? window.location.pathname : 'server'
        },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
  }, []);

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
              className="bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900 hover:from-slate-100 hover:to-slate-200 border border-white/30 px-8 py-4 rounded-md font-medium text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              See color options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
