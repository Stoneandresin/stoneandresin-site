'use client';
import Image from 'next/image';

async function getHero() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/settings`, {
    next: { revalidate: 30 }, // cache 30s
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.hero as string | undefined;
}

export default async function Hero() {
  const heroId = await getHero();
  if (!heroId) {
    return <div className="h-96 bg-gray-200 flex items-center justify-center">No hero set</div>;
  }
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Surfaces that make your home look modern
          </h1>
          <p className="mt-4 copy-muted max-w-xl">
            Resin‑bound driveways, patios, and pool decks—durable, permeable, and low maintenance.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/pricing" className="btn-accent">Get Instant Estimate</a>
            <a href="/learn" className="btn-ghost">How it works</a>
          </div>
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
