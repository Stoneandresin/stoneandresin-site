"use client";

import RevealOnScroll from "./RevealOnScroll";
import CompareSlider from "./CompareSlider";
import Image from "next/image";

const PROJECTS = [
  {
    id: "cincy-driveway",
    title: "Modern Driveway Transformation",
    location: "Cincinnati, OH",
    description: "A complete resurfacing project transforming a worn concrete driveway into a stunning, permeable resin-bound surface. The 'Grey Mix' aggregate complements the home's brickwork while providing superior drainage.",
    type: "compare",
    before: "/gallery/driveway-cincy-before.jpg",
    after: "/gallery/driveway-cincy-after-2.jpg",
    altBefore: "Cracked and stained concrete driveway before resurfacing",
    altAfter: "Smooth, modern resin-bound driveway in grey tones",
    tags: ["Driveway", "Resurfacing", "Grey Mix"]
  },
  {
    id: "waterfront-patio",
    title: "Waterfront Patio Upgrade",
    location: "Loveland, OH",
    description: "This lakeside patio needed a durable, slip-resistant surface that could withstand the elements. Our resin-bound system provided the perfect solution, creating a seamless transition from home to water.",
    type: "compare",
    before: "/gallery/Before + After/Waterfront before.JPG",
    after: "/gallery/Before + After/Waterfront after.JPG",
    altBefore: "Old weathered patio pavers",
    altAfter: "New continuous resin-bound patio surface",
    tags: ["Patio", "Waterfront", "Slip-Resistant"]
  },
  {
    id: "hussein-steps",
    title: "Entryway Steps & Walkway",
    location: "Mason, OH",
    description: "Revitalizing the front entrance with a custom blend to match the existing stonework. The precision edging ensures a clean, professional finish that boosts curb appeal instantly.",
    type: "compare",
    before: "/gallery/Before + After/Hussein Before 1.jpg",
    after: "/gallery/Before + After/Hussein After 1.jpg",
    altBefore: "Worn concrete steps",
    altAfter: "Resin-bound steps with crisp edges",
    tags: ["Steps", "Walkway", "Custom Blend"]
  }
];

export default function RecentProjects() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <RevealOnScroll className="reveal-slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
              Recent Transformations
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              See the difference a day makes. Our resin-bound surfaces don't just cover up old concrete—they completely reinvent your outdoor space.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-24">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Visual Side */}
              <div className="w-full lg:w-3/5">
                <RevealOnScroll className={index % 2 === 0 ? "reveal-slide-right" : "reveal-slide-left"}>
                  <CompareSlider
                    before={project.before}
                    after={project.after}
                    altBefore={project.altBefore}
                    altAfter={project.altAfter}
                    className="shadow-2xl shadow-slate-200/50"
                  />
                </RevealOnScroll>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/5">
                <RevealOnScroll className="reveal-slide-up" delayMs={200}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-serif text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-cyan-600 font-medium mb-6">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <a 
                    href="/#estimate" 
                    className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-cyan-600 transition-colors group"
                  >
                    Get a quote for your {project.tags[0].toLowerCase()}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </RevealOnScroll>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <RevealOnScroll className="reveal-fade">
            <a 
              href="/gallery" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20"
            >
              View Full Gallery
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
