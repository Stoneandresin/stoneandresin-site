import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"

export const metadata = { title: "Learn" }

export default function LearnPage(){
  const posts = [
    { slug: "resin-vs-epoxy", title: "Resin‑Bound vs. Epoxy‑Pebble: What Ohio Homeowners Should Know", summary: "Permeability, UV stability, and where each system fits." },
    { slug: "permeable-driveways-ohio", title: "Permeable Driveways & Ohio Drainage Basics", summary: "Why permeability matters and how it helps with runoff." },
    { slug: "maintenance", title: "Maintenance: Keeping Your Surface Looking New", summary: "Simple cleaning tips and seasonal checks." }
  ]
  return (
    <main>
      <Navbar />
      <section className="container py-14">
        <h1 className="section-title mb-6">Guides & resources</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(p=>(
            <article key={p.slug} className="card p-6">
              <h2 className="font-bold">{p.title}</h2>
              <p className="subtle mt-2">{p.summary}</p>
              <Link href={`/learn/${p.slug}`} className="btn-outline mt-4 inline-block">Read</Link>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
