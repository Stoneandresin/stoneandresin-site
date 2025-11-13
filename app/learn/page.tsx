import Link from "next/link"

export const metadata = { title: "Learn" }

export default function LearnPage(){
  const posts = [
    { slug: "resin-vs-epoxy", title: "Resin‑Bound vs. Epoxy‑Pebble: What Ohio Homeowners Should Know", summary: "Permeability, UV stability, and where each system fits." },
    { slug: "permeable-driveways-ohio", title: "Permeable Driveways & Ohio Drainage Basics", summary: "Why permeability matters and how it helps with runoff." },
    { slug: "maintenance", title: "Maintenance: Keeping Your Surface Looking New", summary: "Simple cleaning tips and seasonal checks." },
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
