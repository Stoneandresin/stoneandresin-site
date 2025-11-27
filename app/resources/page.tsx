import Link from "next/link"

export const metadata = { 
  title: "Resources & Guides | Resin-Bound Surface Care",
  description: "Free downloadable guides for resin-bound driveway owners. Maintenance checklists, preparation guides, and expert tips from Stone & Resin in Cincinnati, OH.",
  openGraph: {
    title: "Free Resin-Bound Resources | Stone & Resin",
    description: "Download maintenance checklists, preparation guides, and expert care tips for your resin-bound surfaces.",
    type: "website",
    images: ["/placeholder.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Free Resin-Bound Resources",
    description: "Expert guides and checklists for resin-bound surface owners.",
  }
}

const resources = [
  {
    title: "Maintenance Checklist",
    description: "Seasonal maintenance tasks to keep your resin-bound surface looking great for 20+ years. Covers spring, summer, fall, and winter care.",
    slug: "maintenance-checklist",
    type: "PDF Download",
    icon: "📋"
  },
  {
    title: "Driveway Preparation Guide",
    description: "How to prepare your existing driveway or patio for resin-bound resurfacing. Includes base requirements, grading tips, and drainage considerations.",
    slug: "preparation-guide",
    type: "PDF Download",
    icon: "🏗️"
  },
  {
    title: "Ohio Drainage & Permitting Guide",
    description: "Local drainage regulations, stormwater management tips, and permitting requirements for resin-bound installations in Greater Cincinnati.",
    slug: "drainage-guide",
    type: "PDF Download",
    icon: "💧"
  }
]

export default function ResourcesPage(){
  return (
    <main className="bg-slate-950 text-white">
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-cyan-400 mb-2">Free resources</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Guides &amp; Downloads</h1>
            <p className="text-slate-300 mb-8">
              Expert advice for homeowners considering or maintaining resin-bound surfaces. All guides are free—just enter your email to receive the download link.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {resources.map(r => (
              <article key={r.slug} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg shadow-cyan-900/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20">
                <div className="text-4xl mb-3">{r.icon}</div>
                <div className="text-xs uppercase tracking-wide text-cyan-400 mb-2">{r.type}</div>
                <h2 className="text-lg font-semibold text-white mb-2">{r.title}</h2>
                <p className="text-sm text-slate-300 mb-4">{r.description}</p>
                <Link href={`/resources/${r.slug}`} className="btn-accent inline-flex items-center justify-center">
                  Download
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-3xl">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-3">Need more help?</h2>
              <p className="text-slate-300 mb-4">
                Our team is here to answer your questions about resin-bound surfaces, maintenance, or project planning.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn">Contact us</Link>
                <Link href="/learn" className="btn-outline">Read our guides</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
