import { notFound } from "next/navigation"
import Link from "next/link"

const caseStudies: Record<string, {
  title: string
  location: string
  size: string
  blend: string
  duration: string
  challenge: string
  solution: string
  results: string[]
  testimonial?: { quote: string; author: string }
}> = {
  "cincinnati-driveway-resurfacing": {
    title: "Cincinnati Driveway Resurfacing",
    location: "Cincinnati, OH",
    size: "~600 square feet",
    blend: "Grey mix Vuba blend",
    duration: "2 days",
    challenge: `The existing asphalt driveway had multiple cracks and drainage issues, with water pooling near the garage after every rain. The homeowners wanted a permeable solution that would handle Ohio's heavy spring rains while improving curb appeal.`,
    solution: `We removed the top layer of deteriorated asphalt and prepared a proper sub-base with adequate drainage slope. A reinforcement grid was installed to prevent future cracking, followed by the Vuba resin-bound grey mix application. The new surface was designed with a 2% slope away from the garage to ensure proper water flow.`,
    results: [
      "Complete elimination of water pooling issues",
      "Smooth, attractive finish that complements the home's exterior",
      "Permeable surface that handles heavy Ohio rainstorms effectively",
      "UV-stable color that won't fade or yellow over time",
      "Improved property value and curb appeal"
    ],
    testimonial: {
      quote: "We love how it looks and the drainage is perfect. No more puddles by the garage door!",
      author: "Cincinnati Homeowner"
    }
  },
  "amelia-patio-installation": {
    title: "Amelia Backyard Patio Installation",
    location: "Amelia, OH",
    size: "~400 square feet",
    blend: "Natural stone blend",
    duration: "1.5 days",
    challenge: `The homeowners wanted to create an outdoor entertainment space but were concerned about drainage and maintenance. The existing grass area would become muddy after rain, making it unusable for much of spring and fall.`,
    solution: `We designed a custom patio with integrated drainage that ties into the property's existing drainage system. The natural stone Vuba blend was selected to complement the home's stone accents. We installed a proper sub-base to ensure longevity and optimal drainage performance.`,
    results: [
      "Beautiful, usable outdoor space year-round",
      "No standing water or mud after rain",
      "Low-maintenance surface that's easy to keep clean",
      "Natural stone aesthetic that enhances the backyard",
      "Permeable design supports environmentally-friendly water management"
    ]
  },
  "pool-deck-renovation": {
    title: "Pool Deck Renovation",
    location: "Cincinnati area",
    size: "~800 square feet",
    blend: "Beach blend (light colors)",
    duration: "3 days",
    challenge: `The existing concrete pool deck was showing its age with cracks and discoloration. More importantly, water wasn't draining properly, creating slip hazards. The homeowners wanted a surface that would stay cooler underfoot during hot Ohio summers.`,
    solution: `We selected Vuba's beach blend for its lighter color (stays cooler in direct sun) and slip-resistant texture. The permeable design ensures water drains immediately rather than pooling on the surface. We carefully prepared the sub-base to handle pool splash-out and Ohio's freeze-thaw cycles.`,
    results: [
      "Significantly cooler surface temperature in summer heat",
      "Slip-resistant texture provides safety around water",
      "Immediate water drainage eliminates standing water",
      "UV-stable colors remain vibrant in full sun exposure",
      "Freeze-thaw resistant for Ohio winter conditions",
      "Attractive, modern aesthetic that enhances the pool area"
    ]
  }
}

export function generateStaticParams(){ 
  return Object.keys(caseStudies).map(slug=>({slug})) 
}

export default function CaseStudyPage({ params }: { params: { slug: string } }){
  const study = caseStudies[params.slug]
  if (!study) return notFound()
  
  return (
    <main className="bg-slate-50">
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container px-4">
          <Link href="/case-studies" className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 inline-block">
            ← Back to Case Studies
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {study.title}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 bg-slate-700 rounded-full">{study.location}</span>
            <span className="px-3 py-1 bg-slate-700 rounded-full">{study.size}</span>
            <span className="px-3 py-1 bg-slate-700 rounded-full">{study.blend}</span>
            <span className="px-3 py-1 bg-slate-700 rounded-full">{study.duration}</span>
          </div>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Project Images Placeholder */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-slate-400 text-lg block mb-2">Before & After Photos</span>
                <span className="text-slate-500 text-sm">Project photos will be added as they become available</span>
              </div>
            </div>
          </div>

          {/* The Challenge */}
          <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎯</span> The Challenge
            </h2>
            <p className="text-slate-700 leading-relaxed">{study.challenge}</p>
          </div>

          {/* Our Solution */}
          <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">💡</span> Our Solution
            </h2>
            <p className="text-slate-700 leading-relaxed">{study.solution}</p>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">✅</span> Results
            </h2>
            <ul className="space-y-3">
              {study.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg mt-0.5">✓</span>
                  <span className="text-slate-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          {study.testimonial && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What the Client Says</h2>
              <blockquote className="text-lg text-slate-700 italic mb-3">
                "{study.testimonial.quote}"
              </blockquote>
              <cite className="text-slate-600 not-italic">— {study.testimonial.author}</cite>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for Your Own Transformation?</h2>
            <p className="mb-6">Get an instant estimate and schedule your free on-site consultation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
                Get Instant Estimate
              </Link>
              <Link href="/contact" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition">
                Request Site Visit
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link href="/case-studies" className="text-cyan-600 hover:text-cyan-700 underline">
              ← All Case Studies
            </Link>
            <Link href="/gallery" className="text-cyan-600 hover:text-cyan-700 underline">
              View Gallery →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
