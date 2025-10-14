import { notFound } from "next/navigation"

const content: Record<string,{title:string, body:string}> = {
  "resin-vs-epoxy": {
    title: "Resin‑Bound vs. Epoxy‑Pebble: What to Know",
    body: `Resin‑bound is porous and UV‑stable—great for outdoors and drainage. Epoxy‑pebble is often non‑porous and can amber in sun. For driveways, patios, and pool decks, resin‑bound typically performs better in Ohio’s wet seasons.`
  },
  "permeable-driveways-ohio": {
    title: "Permeable Driveways: Ohio Basics",
    body: `Permeable surfaces reduce puddles and runoff. They can help with local drainage rules and stormwater management. Site prep and sub‑base matter—verify soils and local requirements.`
  },
  "maintenance": {
    title: "Maintenance: Keep It Looking New",
    body: `Rinse routinely and remove debris. Use a light power‑wash as needed. For oil or rust, use the installer‑recommended cleaners.`
  },
  "vuba-vs-competitors": {
    title: "Vuba vs. Competitors: Why We Choose Vuba",
    body: `Vuba’s UV‑stable resins, tested aggregates, and clear install specs deliver consistent results. Their systems are engineered for outdoor performance and backed by strong technical support—one reason we prefer Vuba for driveways, patios, and pool decks.`
  }
}

export function generateStaticParams(){ return Object.keys(content).map(slug=>({slug})) }

export default function PostPage({ params }: { params: { slug: string } }){
  const post = content[params.slug]
  if (!post) return notFound()
  return (
    <section className="container py-14 prose max-w-3xl">
      <p className="mb-4"><a href="/learn" className="text-sm underline">← Back to Learn</a></p>
      <h1 className="section-title">{post.title}</h1>
      <p className="text-gray-800 mt-4">{post.body}</p>
      <div className="not-prose mt-8 flex gap-3">
        <a href="/contact" className="btn">Request a Site Visit</a>
        <a href="/pricing" className="btn-outline">See Pricing</a>
      </div>
    </section>
  )
}
