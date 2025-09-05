export const metadata = { title: "About" }

export default function AboutPage(){
  return (
    <main>
      
      <section className="container py-14 space-y-6">
        <h1 className="section-title">Built in Amelia, serving Ohio</h1>
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
      
    </main>
  )
}
