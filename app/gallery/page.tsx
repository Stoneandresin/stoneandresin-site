// app/gallery/page.tsx
import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";
import { defaultBeforeAfterPairs } from "@/data/before-after-pairs";
import { loadLocalGallery } from "@/lib/local-gallery";

type Pair = {
  jobId: string;
  before: string[];
  after: string[];
};

type NormalizedPair = {
  id: string;
  before: string;
  after: string;
  label: string;
  location: string;
};

async function fetchPairs(): Promise<Pair[]> {
  const hasCloudinary =
    process.env.CLOUDINARY_CLOUD_NAME &&
    (process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) &&
    process.env.CLOUDINARY_API_SECRET;

  if (!hasCloudinary) {
    return [];
  }

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
  const normalizedPairs: NormalizedPair[] = pairs.length
    ? pairs.map((p) => ({
        id: p.jobId,
        before: p.before[0],
        after: p.after[0],
        label: p.jobId.replace(/-/g, " ").toUpperCase(),
        location: "Recent project",
      }))
    : defaultBeforeAfterPairs;
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-semibold mb-2">Before &amp; After</h1>
      <p className="text-gray-600 mb-6">
        Recent installs using premium UV-resistant binders.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {normalizedPairs.map((p) => (
          <div key={p.id} className="space-y-2">
            <BeforeAfter beforeSrc={p.before} afterSrc={p.after} alt={p.label} />
            <div className="text-sm text-gray-700">
              <div className="font-medium text-slate-900">{p.label}</div>
              <div className="text-xs uppercase tracking-wide text-slate-400">{p.location}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Project gallery</h2>
          <p className="text-sm text-slate-600">Recent installs, finishes, and textures.</p>
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
    </main>
  );
}
