import { notFound } from "next/navigation"
import RevealOnScroll from "@/components/RevealOnScroll"

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
        <div className="mt-8 not-prose relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-4 h-20 rounded-2xl bg-gradient-to-r from-green-50 via-transparent to-gray-50"></div>
          <div className="mb-4 flex items-center justify-between relative">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-green-700 to-gray-700 bg-clip-text text-transparent">Vuba vs. Alternatives</h2>
            <div className="hidden md:flex items-center gap-3 text-xs sticky top-20">
              <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-green-500"></span> Vuba</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-gray-400"></span> Alternatives</span>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="rounded border border-gray-200 p-4 transition hover:shadow-sm hover:border-gray-300 hover:ring-1 hover:ring-green-100">
              <div className="font-medium mb-2">🌤️ UV stability</div>
              <div className="grid gap-3 md:grid-cols-2">
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-green-50 p-2 md:p-3 transition-colors hover:bg-green-100 border border-transparent md:border-r-0 md:rounded-r-none" delayMs={60}>
                  <span className="text-green-600 leading-6" aria-hidden="true">✔</span><span className="sr-only">Vuba advantage</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✓</span> Vuba</span>
                    <p className="text-sm text-gray-800 mt-1">Aliphatic, UV‑stable resins designed for outdoor use</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-gray-50 p-2 md:p-3 transition-colors hover:bg-gray-100 md:border-l md:border-dashed md:border-gray-200 md:rounded-l-none" delayMs={140}>
                  <span className="text-red-500 leading-6" aria-hidden="true">✖</span><span className="sr-only">Alternative drawback</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✖</span> Typical alternatives</span>
                    <p className="text-sm text-gray-700 mt-1">Often aromatic resins that can amber/yellow</p>
                  </div>
                </RevealOnScroll>
              </div>
            </li>
            <li className="rounded border border-gray-200 p-4 transition hover:shadow-sm hover:border-gray-300 hover:ring-1 hover:ring-green-100">
              <div className="font-medium mb-2">💧 Porosity & drainage</div>
              <div className="grid gap-3 md:grid-cols-2">
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-green-50 p-2 md:p-3 transition-colors hover:bg-green-100 border border-transparent md:border-r-0 md:rounded-r-none" delayMs={60}>
                  <span className="text-green-600 leading-6" aria-hidden="true">✔</span><span className="sr-only">Vuba advantage</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✓</span> Vuba</span>
                    <p className="text-sm text-gray-800 mt-1">Permeable resin‑bound system to reduce puddling</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-gray-50 p-2 md:p-3 transition-colors hover:bg-gray-100 md:border-l md:border-dashed md:border-gray-200 md:rounded-l-none" delayMs={140}>
                  <span className="text-red-500 leading-6" aria-hidden="true">✖</span><span className="sr-only">Alternative drawback</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✖</span> Typical alternatives</span>
                    <p className="text-sm text-gray-700 mt-1">Frequently non‑porous, higher puddling and runoff</p>
                  </div>
                </RevealOnScroll>
              </div>
            </li>
            <li className="rounded border border-gray-200 p-4 transition hover:shadow-sm hover:border-gray-300 hover:ring-1 hover:ring-green-100">
              <div className="font-medium mb-2">🪨 Aggregates</div>
              <div className="grid gap-3 md:grid-cols-2">
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-green-50 p-2 md:p-3 transition-colors hover:bg-green-100 border border-transparent md:border-r-0 md:rounded-r-none" delayMs={60}>
                  <span className="text-green-600 leading-6" aria-hidden="true">✔</span><span className="sr-only">Vuba advantage</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✓</span> Vuba</span>
                    <p className="text-sm text-gray-800 mt-1">Pre‑tested, graded blends matched to resin</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-gray-50 p-2 md:p-3 transition-colors hover:bg-gray-100 md:border-l md:border-dashed md:border-gray-200 md:rounded-l-none" delayMs={140}>
                  <span className="text-red-500 leading-6" aria-hidden="true">✖</span><span className="sr-only">Alternative drawback</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✖</span> Typical alternatives</span>
                    <p className="text-sm text-gray-700 mt-1">Mixed sources; size/consistency can vary</p>
                  </div>
                </RevealOnScroll>
              </div>
            </li>
            <li className="rounded border border-gray-200 p-4 transition hover:shadow-sm hover:border-gray-300 hover:ring-1 hover:ring-green-100">
              <div className="font-medium mb-2">📐 Install specification</div>
              <div className="grid gap-3 md:grid-cols-2">
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-green-50 p-2 md:p-3 transition-colors hover:bg-green-100 border border-transparent md:border-r-0 md:rounded-r-none" delayMs={60}>
                  <span className="text-green-600 leading-6" aria-hidden="true">✔</span><span className="sr-only">Vuba advantage</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✓</span> Vuba</span>
                    <p className="text-sm text-gray-800 mt-1">Clear spec and trained installer network</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-gray-50 p-2 md:p-3 transition-colors hover:bg-gray-100 md:border-l md:border-dashed md:border-gray-200 md:rounded-l-none" delayMs={140}>
                  <span className="text-red-500 leading-6" aria-hidden="true">✖</span><span className="sr-only">Alternative drawback</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✖</span> Typical alternatives</span>
                    <p className="text-sm text-gray-700 mt-1">Specs vary by installer; less standardization</p>
                  </div>
                </RevealOnScroll>
              </div>
            </li>
            <li className="rounded border border-gray-200 p-4 transition hover:shadow-sm hover:border-gray-300 hover:ring-1 hover:ring-green-100">
              <div className="font-medium mb-2">🧰 Technical support</div>
              <div className="grid gap-3 md:grid-cols-2">
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-green-50 p-2 md:p-3 transition-colors hover:bg-green-100 border border-transparent md:border-r-0 md:rounded-r-none" delayMs={60}>
                  <span className="text-green-600 leading-6" aria-hidden="true">✔</span><span className="sr-only">Vuba advantage</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✓</span> Vuba</span>
                    <p className="text-sm text-gray-800 mt-1">Dedicated support before, during, and after install</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-gray-50 p-2 md:p-3 transition-colors hover:bg-gray-100 md:border-l md:border-dashed md:border-gray-200 md:rounded-l-none" delayMs={140}>
                  <span className="text-red-500 leading-6" aria-hidden="true">✖</span><span className="sr-only">Alternative drawback</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✖</span> Typical alternatives</span>
                    <p className="text-sm text-gray-700 mt-1">Limited or ad‑hoc support</p>
                  </div>
                </RevealOnScroll>
              </div>
            </li>
            <li className="rounded border border-gray-200 p-4 transition hover:shadow-sm hover:border-gray-300 hover:ring-1 hover:ring-green-100">
              <div className="font-medium mb-2">🛡️ Warranty</div>
              <div className="grid gap-3 md:grid-cols-2">
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-green-50 p-2 md:p-3 transition-colors hover:bg-green-100 border border-transparent md:border-r-0 md:rounded-r-none" delayMs={60}>
                  <span className="text-green-600 leading-6" aria-hidden="true">✔</span><span className="sr-only">Vuba advantage</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✓</span> Vuba</span>
                    <p className="text-sm text-gray-800 mt-1">Documented system warranty options</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll className="flex items-start gap-2 rounded-md bg-gray-50 p-2 md:p-3 transition-colors hover:bg-gray-100 md:border-l md:border-dashed md:border-gray-200 md:rounded-l-none" delayMs={140}>
                  <span className="text-red-500 leading-6" aria-hidden="true">✖</span><span className="sr-only">Alternative drawback</span>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[11px] font-medium"><span aria-hidden>✖</span> Typical alternatives</span>
                    <p className="text-sm text-gray-700 mt-1">Varies widely by product and installer</p>
                  </div>
                </RevealOnScroll>
              </div>
            </li>
          </ul>
          <div className="mt-3 md:hidden text-xs text-gray-600">Legend: <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block"></span> Vuba</span> · <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-gray-400 inline-block"></span> Alternatives</span></div>
          <div className="mt-4 h-1 w-full bg-gradient-to-r from-green-200 via-gray-100 to-gray-200 rounded"></div>
        </div>
      )}
      {params.slug === 'vuba-vs-competitors' && (
        <div className="not-prose mt-6 p-4 rounded border border-gray-200 bg-gray-50">
          <h3 className="font-semibold mb-2">What this means for your project</h3>
          <p className="text-gray-700 mb-3">If you want a durable, UV‑stable, low‑maintenance surface that drains well and looks consistent for years, Vuba’s resin‑bound system is a strong choice for Ohio driveways, patios, and pool decks.</p>
          <div className="flex gap-3">
            <a href="/contact" className="btn">Get a tailored recommendation</a>
            <a href="/gallery" className="btn-outline">See real installs</a>
          </div>
        </div>
      )}
      <div className="not-prose mt-8 flex gap-3">
        <a href="/contact" className="btn">Request a Site Visit</a>
        <a href="/pricing" className="btn-outline">See Pricing</a>
      </div>
    </section>
  )
}
