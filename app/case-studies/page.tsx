import Link from "next/link"

export const metadata = { 
  title: "Project Case Studies | Stone & Resin",
  description: "Detailed case studies of resin-bound driveway, patio, and walkway installations in Cincinnati and Amelia, Ohio. See the process, challenges, and results."
}

export default function CaseStudiesPage(){
  const caseStudies = [
    { 
      slug: "cincinnati-driveway-resurfacing", 
      title: "Cincinnati Driveway Resurfacing",
      location: "Cincinnati, OH",
      size: "~600 sq ft",
      blend: "Grey mix",
      summary: "Complete driveway transformation from cracked asphalt to permeable resin-bound surface with improved drainage.",
      featured: true
    },
    {
      slug: "amelia-patio-installation",
      title: "Amelia Backyard Patio",
      location: "Amelia, OH",
      size: "~400 sq ft",
      blend: "Natural stone",
      summary: "Custom patio installation with integrated drainage and UV-stable finish for year-round enjoyment.",
      featured: false
    },
    {
      slug: "pool-deck-renovation",
      title: "Pool Deck Renovation",
      location: "Cincinnati area",
      size: "~800 sq ft",
      blend: "Beach blend",
      summary: "Slip-resistant, permeable pool deck replacement that stays cool underfoot and drains perfectly.",
      featured: false
    }
  ]

  return (
    <main className="bg-slate-50">
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4">
            Project Case Studies
          </h1>
          <p className="text-lg text-slate-200 max-w-3xl">
            Real projects from Cincinnati and Amelia, Ohio. See the process, challenges solved, and stunning results of our resin-bound installations.
          </p>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map(study => (
              <article key={study.slug} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 ${study.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <span className="text-slate-400 text-sm">Project Photo Coming Soon</span>
                </div>
                <div className="p-6">
                  {study.featured && (
                    <span className="inline-block px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full mb-2">
                      Featured
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{study.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-3 text-xs text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">{study.location}</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">{study.size}</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">Blend: {study.blend}</span>
                  </div>
                  <p className="text-slate-600 mb-4">{study.summary}</p>
                  <Link 
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold"
                  >
                    Read full case study →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12 bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">More Case Studies Coming Soon</h2>
            <p className="text-slate-600 mb-6">
              We're documenting our recent projects with detailed before/after photos, installation process, and customer stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-accent">
                Request a Site Visit
              </Link>
              <Link href="/gallery" className="btn-outline">
                View Photo Gallery
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-cyan-600 hover:text-cyan-700 underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
