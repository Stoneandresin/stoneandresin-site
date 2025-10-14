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
      {params.slug === 'vuba-vs-competitors' && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="text-left subtle mb-2">Quick comparison: Vuba vs. typical alternatives</caption>
            <thead>
              <tr>
                <th className="text-left py-2 pr-4">Criterion</th>
                <th className="text-left py-2 pr-4">Vuba</th>
                <th className="text-left py-2">Typical alternatives</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-top py-2 pr-4">UV stability</td>
                <td className="align-top py-2 pr-4">Aliphatic, UV‑stable resins designed for outdoor use</td>
                <td className="align-top py-2">Often aromatic resins that can amber/yellow</td>
              </tr>
              <tr>
                <td className="align-top py-2 pr-4">Porosity & drainage</td>
                <td className="align-top py-2 pr-4">Permeable resin‑bound system to reduce puddling</td>
                <td className="align-top py-2">Frequently non‑porous, higher puddling and runoff</td>
              </tr>
              <tr>
                <td className="align-top py-2 pr-4">Aggregates</td>
                <td className="align-top py-2 pr-4">Pre‑tested, graded blends matched to resin</td>
                <td className="align-top py-2">Mixed sources; size/consistency can vary</td>
              </tr>
              <tr>
                <td className="align-top py-2 pr-4">Install specification</td>
                <td className="align-top py-2 pr-4">Clear spec and trained installer network</td>
                <td className="align-top py-2">Specs vary by installer; less standardization</td>
              </tr>
              <tr>
                <td className="align-top py-2 pr-4">Technical support</td>
                <td className="align-top py-2 pr-4">Dedicated support before, during, and after install</td>
                <td className="align-top py-2">Limited or ad‑hoc support</td>
              </tr>
              <tr>
                <td className="align-top py-2 pr-4">Warranty</td>
                <td className="align-top py-2 pr-4">Documented system warranty options</td>
                <td className="align-top py-2">Varies widely by product and installer</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="not-prose mt-8 flex gap-3">
        <a href="/contact" className="btn">Request a Site Visit</a>
        <a href="/pricing" className="btn-outline">See Pricing</a>
      </div>
    </section>
  )
}
