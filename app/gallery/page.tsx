// app/gallery/page.tsx
import { BeforeAfter } from "@/components/BeforeAfter";

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
  const pairs = await fetchPairs();
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-semibold mb-2">Before &amp; After</h1>
      <p className="text-gray-600 mb-6">
        Recent installs using premium UV-resistant binders.
      </p>
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
    </main>
  );
}
