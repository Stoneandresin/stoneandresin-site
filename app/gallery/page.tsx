// app/gallery/page.tsx
import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";
import { loadLocalGallery } from "@/lib/local-gallery";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Project Gallery | Resin-Bound Installations",
  description: "Browse our resin-bound driveway, patio, and pool deck installations in Cincinnati and Amelia, OH. Before & after photos of Vuba system installs with UV-stable finishes.",
  openGraph: {
    title: "Resin-Bound Project Gallery | Stone & Resin",
    description: "See real before & after photos of our resin-bound installations across Greater Cincinnati. UV-stable, permeable surfaces that last.",
    type: "website",
    images: ["/gallery/driveway-cincy-after.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | Stone & Resin",
    description: "Browse before & after photos of resin-bound installations in Cincinnati, OH.",
    images: ["/gallery/driveway-cincy-after.jpg"],
  }
};

type Pair = {
  jobId: string;
  before: string[];
  after: string[];
};

async function fetchPairs(): Promise<Pair[]> {
  const hasCloudinaryEnv =
    process.env.CLOUDINARY_CLOUD_NAME &&
    (process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) &&
    process.env.CLOUDINARY_API_SECRET;

  if (!hasCloudinaryEnv) return [];

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
    <main className="mx-auto max-w-6xl p-6 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Before &amp; After</h1>
        <p className="text-gray-600">
          Recent installs using premium UV-resistant binders.
        </p>
      </header>

      {hasPairs && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Latest uploads</h2>
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
        </section>
      )}

      {localPhotos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Gallery highlights</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localPhotos.map((photo) => {
              const categoryLower = photo.category.toLowerCase();
              const shouldShowLabel = ["patio", "driveway", "steps"].includes(categoryLower);
              const altText = shouldShowLabel ? photo.label : photo.category;

              return (
                <figure key={photo.src} className="card overflow-hidden">
                  <div className="relative h-60 w-full">
                    <Image
                      src={photo.src}
                      alt={altText}
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  {shouldShowLabel && (
                    <figcaption className="border-t border-slate-100 p-3 text-sm text-slate-600">
                      <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">
                        {photo.category}
                      </div>
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      <Testimonials />

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to transform your space?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get your instant estimate or book a free on-site consultation to discuss your project.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/pricing" className="btn-accent">Get Instant Estimate</a>
          <a href="/contact" className="btn">Request Site Visit</a>
        </div>
      </section>
    </main>
  );
}
