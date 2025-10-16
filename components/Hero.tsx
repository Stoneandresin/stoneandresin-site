'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Settings = Record<string, any> | null;

export default function Hero() {
  const [settings, setSettings] = useState<Settings>(null);

  useEffect(() => {
    let mounted = true;
    // Client-side fetch so it doesn’t run at build time
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => mounted && setSettings(data))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Surfaces that make your home look modern
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl">
            Resin‑bound driveways, patios, and pool decks—durable, permeable, and low maintenance.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/pricing" className="btn-accent">Get Instant Estimate</a>
            <a href="/learn" className="btn-ghost">How it works</a>
          </div>
          {/* Example of using settings safely */}
          {settings?.badge && (
            <p className="mt-4 text-xs text-slate-500">Certified: {settings.badge}</p>
          )}
        </div>

        <div className="relative">
          <div className="surface-2 rounded-2xl p-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src="/hero/sample-surface.jpg"
                alt="Resin-bound surface example"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -z-10 -inset-6 rounded-[2rem] bg-gradient-to-tr from-cyan-500/10 via-sky-400/10 to-transparent blur-2xl" />
        </div>
      </div>
    </section>
  );
}
