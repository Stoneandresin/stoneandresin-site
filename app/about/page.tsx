export const metadata = { 
  title: "About Stone & Resin",
  description: "Family-run resin-bound surface contractor in Amelia, OH. Vuba certified installer serving Greater Cincinnati with permeable, UV-stable driveways, patios, and pool decks.",
  openGraph: {
    title: "About Stone & Resin | Local Ohio Resin-Bound Contractor",
    description: "Amelia-based, family-run contractor specializing in Vuba resin-bound systems. Serving Cincinnati with craftsmanship and accountability.",
    type: "website",
    images: ["/img/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Stone & Resin",
    description: "Ohio's trusted Vuba resin-bound installer serving Greater Cincinnati.",
    images: ["/img/hero.jpg"],
  }
}

export default function AboutPage(){
  return (
    <main>
      <div className="bg-slate-900 pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-serif text-white mb-4">About Stone & Resin</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Family-run resin-bound surface contractor serving Amelia and Greater Cincinnati.
          </p>
        </div>
      </div>
      
      <section className="container py-14 space-y-6">
        <h2 className="section-title">Built in Amelia, serving Ohio</h2>
        <p className="subtle max-w-3xl">
         We're a local, family-run contractor specializing in resin-bound surfaces—permeable, UV-stable systems that stand up to Ohio weather.
          We repair, prepare, and install with meticulous care. Community matters; so does craftsmanship.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6"><div className="font-bold">Permeable engineering</div><p className="subtle">Rainwater drains through—reducing puddles and runoff.</p></div>
          <div className="card p-6"><div className="font-bold">UV‑stable color</div><p className="subtle">Formulated to resist yellowing and fading under sun.</p></div>
          <div className="card p-6"><div className="font-bold">Local & accountable</div><p className="subtle">Amelia‑based crew, Ohio references, and clear warranties.</p></div>
        </div>
      </section>
      
      <section className="container py-12">
        <div className="surface-light rounded-2xl p-8 md:p-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Ready to start your project?
            </h2>
            <p className="text-slate-600">
              Get an instant estimate or schedule your free on-site consultation
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/pricing" className="btn-accent inline-flex items-center gap-2">
              Get Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/contact" className="btn inline-flex items-center">
              Request Site Visit
            </a>
            <a href="/gallery" className="btn-outline inline-flex items-center">
              View Projects
            </a>
          </div>
        </div>
      </section>
      
    </main>
  )
}
