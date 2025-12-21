import { notFound } from "next/navigation"
import ResourceDownload from "./ResourceDownload"

const resources: Record<string, {
  title: string
  description: string
  pdfUrl: string
  icon: string
}> = {
  "maintenance-checklist": {
    title: "Resin-Bound Surface Maintenance Checklist",
    description: "Comprehensive seasonal maintenance guide for resin-bound driveways, patios, and pool decks. Includes spring, summer, fall, and winter care tasks to maximize your surface's lifespan.",
    pdfUrl: "/resources/maintenance-checklist.pdf",
    icon: "📋"
  },
  "preparation-guide": {
    title: "Driveway Preparation Guide",
    description: "Complete guide to preparing your property for resin-bound installation. Covers base requirements, grading, drainage, and site preparation best practices.",
    pdfUrl: "/resources/preparation-guide.pdf",
    icon: "🏗️"
  },
  "drainage-guide": {
    title: "Ohio Drainage & Permitting Guide",
    description: "Local drainage regulations, stormwater management requirements, and permitting information for resin-bound installations in the Greater Cincinnati area.",
    pdfUrl: "/resources/drainage-guide.pdf",
    icon: "💧"
  }
}

export function generateStaticParams() {
  return Object.keys(resources).map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const resource = resources[params.slug]
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: `${resource.title} | Stone & Resin`,
      description: resource.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: resource.title,
      description: resource.description,
    }
  }
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = resources[params.slug]
  
  if (!resource) {
    return notFound()
  }
  
  return (
    <main>
      <div className="bg-slate-900 pt-32 pb-12">
        <div className="mx-auto max-w-2xl px-6">
          <p className="mb-4"><a href="/resources" className="text-sm font-medium text-white/60 hover:text-white transition-colors">← Back to Resources</a></p>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl md:text-5xl">{resource.icon}</div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{resource.title}</h1>
          </div>
        </div>
      </div>
      
      <div className="container py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-slate-600 mb-8">{resource.description}</p>
          
          <ResourceDownload 
            resourceTitle={resource.title}
            pdfUrl={resource.pdfUrl}
            slug={params.slug}
          />
        </div>
      </div>
    </main>
  )
}
