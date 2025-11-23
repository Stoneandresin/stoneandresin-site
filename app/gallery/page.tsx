// app/gallery/page.tsx
import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";
import { loadLocalGallery } from "@/lib/local-gallery";

type Pair = {
  jobId: string;
  before: string[];
  after: string[];
};

async function fetchPairs(): Promise<Pair[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/reindex`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return (data.pairs as Pair[]) || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const [pairs, localPhotos] = await Promise.all([fetchPairs(), loadLocalGallery()]);
  const hasPairs = pairs.length > 0;
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-semibold mb-2">Before &amp; After</h1>
      <p className="text-gray-600 mb-6">
        Recent installs using premium UV-resistant binders.
      </p>

      {hasPairs ? (
        <div className="grid gap-6 md:grid-cols-2">
          {pairs.map((p) => (
            <div key={p.jobId} className="space-y-2">
              <BeforeAfter
                beforeSrc={p.before[0]}
                afterSrc={p.after[0]}
                alt={p.jobId}
              />
              <div className="text-sm text-gray-700">
                {p.jobId.replace(/-/g, " ").toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Cloudinary credentials aren&apos;t configured yet, so we&apos;re showing the
            on-device gallery instead. Add <code>CLOUDINARY_*</code> env vars to
            enable live before/after pairs.
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localPhotos.map((photo) => (
              <figure key={photo.src} className="card overflow-hidden">
                <div className="relative h-60 w-full">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-slate-100 p-3 text-sm text-slate-600">
                  <div className="font-medium text-slate-800">{photo.label}</div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    {photo.category}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
