'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Settings = Record<string, any> | null;

export default function Hero() {
  const [settings, setSettings] = useState<Settings>(null);

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

  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            New for 2025 • Permeable, UV‑stable, anti‑slip
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Resin‑bound surfaces that
            <span className="block accent-text">elevate your curb appeal</span>
          </h1>

          {/* Vuba micro-badge */}
          <span
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-900 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200"
            aria-label="Vuba‑trained installer: live, hands‑on training"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden />
            Vuba‑trained installer · live, hands‑on system training
          </span>

          <p className="mt-4 copy-muted max-w-xl">
            Modern driveways, patios, and pool decks—durable, permeable, and low maintenance. Installed by certified pros.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/pricing" className="btn-accent">Get Instant Estimate</a>
            <a href="/learn" className="btn-ghost">How it works</a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm copy-muted">
            <span className="inline-flex items-center gap-1">
              <span aria-hidden>★</span> 4.9 on Google
            </span>
            <span className="h-4 w-px bg-slate-700/60" />
            <span>10‑year warranty</span>
            {settings?.badge && (
              <>
                <span className="h-4 w-px bg-slate-700/60" />
                <span>Certified: {settings.badge}</span>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 overflow-hidden">
            <div className="absolute -inset-12 -z-10 bg-gradient-to-tr from-cyan-500/15 via-sky-400/10 to-transparent blur-2xl" />
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src="/gallery/driveway-cincy-after-2.jpg"
                alt="Resin‑bound driveway finished at garage"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
