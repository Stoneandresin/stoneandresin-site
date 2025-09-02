// app/gallery/page.tsx
import { BeforeAfter } from "@/components/BeforeAfter";

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
