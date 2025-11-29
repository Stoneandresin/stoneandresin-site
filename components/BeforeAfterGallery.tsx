import { BeforeAfter } from "@/components/BeforeAfter";
import { BeforeAfterPair, defaultBeforeAfterPairs } from "@/data/before-after-pairs";

export function BeforeAfterGallery({
  pairs = defaultBeforeAfterPairs,
}: {
  pairs?: BeforeAfterPair[];
}) {
  if (!pairs.length) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">Gallery</p>
            <h2 className="text-2xl font-bold">Real before &amp; after installs</h2>
            <p className="text-slate-600">
              Drag the slider to compare prep work and the finished resin-bound surface.
            </p>
          </div>
          <a href="/gallery" className="btn-outline w-full justify-center md:w-auto">
            View full gallery
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {pairs.map((pair) => (
            <article key={pair.id} className="card space-y-3 p-4">
              <BeforeAfter beforeSrc={pair.before} afterSrc={pair.after} alt={pair.label} />
              <div className="flex flex-col">
                <span className="font-semibold">{pair.label}</span>
                <span className="text-sm text-slate-500">{pair.location}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
