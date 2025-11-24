import Link from "next/link"

export const metadata = { 
  title: "Learn About Resin-Bound Surfaces",
  description: "Expert guides on resin-bound driveways for Ohio homeowners. Learn about permeability, drainage regulations, maintenance, and UV-stable systems from Vuba certified installers.",
  openGraph: {
    title: "Resin-Bound Surface Guides | Stone & Resin",
    description: "Comprehensive guides on resin-bound vs epoxy, Ohio drainage requirements, maintenance tips, and more.",
    type: "website",
    images: ["/placeholder.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Resin-Bound Guides | Stone & Resin",
    description: "Expert advice for Ohio homeowners considering resin-bound surfaces.",
  }
}

export default function LearnPage(){
  const posts = [
    { slug: "resin-vs-epoxy", title: "Resin‑Bound vs. Epoxy‑Pebble: What Ohio Homeowners Should Know", summary: "Comprehensive comparison of resin-bound and epoxy-pebble systems. Learn about permeability, UV stability, freeze-thaw performance, and which option works best in Ohio's climate." },
    { slug: "permeable-driveways-ohio", title: "Permeable Driveways & Ohio Drainage Requirements", summary: "Complete guide to permeable driveways in Ohio. Understand local drainage regulations, stormwater management requirements, and how resin-bound surfaces help with runoff and flooding." },
    { slug: "maintenance", title: "Resin-Bound Surface Maintenance: Keep Your Driveway Looking New", summary: "Detailed maintenance guide for all four seasons. Learn routine cleaning, stain removal, power-washing tips, and how to maintain permeability for 20+ years." },
    { slug: "vuba-vs-competitors", title: "Vuba vs. Competitors: Why We Choose Vuba", summary: "UV stability, tested aggregates, and spec‑driven installs." }
  ]
  return (
    <main className="bg-slate-950 text-white">
      <section className="py-16">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-8">Guides &amp; resources</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(p => (
              <article key={p.slug} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg shadow-cyan-900/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20">
                <h2 className="text-lg font-semibold text-white">{p.title}</h2>
                <p className="mt-2 text-sm text-slate-300">{p.summary}</p>
                <Link href={`/learn/${p.slug}`} className="btn-accent mt-6 inline-flex items-center justify-center">Read</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
