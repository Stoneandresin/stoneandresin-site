'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { track } from '@vercel/analytics';
import type { MouseEvent } from 'react';
import { heroImage } from '@/lib/frontPageContent';

type Settings = Record<string, any> | null;

export default function Hero() {
  const [settings, setSettings] = useState<Settings>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let mounted = true;
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => mounted && setSettings(data))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center">
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
        <div className="absolute inset-0 bg-black/50" />
        {/* Gradient at bottom for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-[1.1] mb-6 drop-shadow-sm">
            Resin-Bound Driveways <br />
            & Patios Built to <br />
            Outlast Concrete
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-sm">
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
            <a
              href="/colors"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              See color options
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1">
              <span aria-hidden>★</span> 4.9 on Google
            </span>
            <span className="h-4 w-px bg-white/20" />
            <span>10‑year warranty</span>
            {settings?.badge && (
              <>
                <span className="h-4 w-px bg-white/20" />
                <span>Certified: {settings.badge}</span>
              </>
            )}
          </div>
        </div>

        <div 
          className="relative mt-12 md:mt-0 hidden md:block"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 overflow-hidden">
            <div 
              className="absolute -inset-12 -z-10 bg-gradient-to-tr from-cyan-500/15 via-sky-400/10 to-transparent blur-2xl"
              style={{
                transform: `translateY(${scrollY * -0.1}px) scale(${1 + scrollY * 0.0005})`,
              }}
            />
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{
                  transform: `scale(${1 + scrollY * 0.0003})`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
