import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { notFound } from "next/navigation"

const content: Record<string,{title:string, body:string}> = {
  "resin-vs-epoxy": {
    title: "Resin‑Bound vs. Epoxy‑Pebble: What Ohio Homeowners Should Know",
    body: `Resin‑bound systems are porous and UV‑stable—ideal outdoors. Epoxy‑pebble floors are often non‑porous and can amber in UV. Choose resin‑bound for driveways, patios, and pool decks where drainage matters.`
  },
  "permeable-driveways-ohio": {
    title: "Permeable Driveways & Ohio Drainage Basics",
    body: `Permeability helps reduce puddling and runoff. In many sites, porous surfaces can support better stormwater management. Always verify local rules and soil conditions.`
  },
  "maintenance": {
    title: "Maintenance: Keeping Your Surface Looking New",
    body: `Routine rinse, occasional light power‑wash, and keep debris off the surface. For oil or rust, use appropriate cleaners as advised by your installer.`
  }
}

export function generateStaticParams(){ return Object.keys(content).map(slug=>({slug})) }

export default function PostPage({ params }: { params: { slug: string } }){
  const post = content[params.slug]
  if (!post) return notFound()
  return (
    <main>
      <Navbar />
      <section className="container py-14 prose max-w-3xl">
        <h1 className="section-title">{post.title}</h1>
        <p className="text-gray-800 mt-4">{post.body}</p>
      </section>
      <Footer />
    </main>
  )
}
