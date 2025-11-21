'use client'
import Link from "next/link"
import { useState } from "react"

export default function FAQContent(){
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: "Cost & Pricing",
      questions: [
        {
          q: "How much does a resin-bound driveway cost?",
          a: "Resin-bound surfaces typically range from $12-18 per square foot installed, depending on site conditions, sub-base preparation needs, and project size. Our instant estimator provides accurate ranges based on your specific measurements. While the upfront cost is higher than basic asphalt, total cost of ownership over 20 years is typically 30-40% lower due to minimal maintenance and longer lifespan."
        },
        {
          q: "Do you offer financing options?",
          a: "Yes, we offer flexible financing options to make your project more affordable. Contact us to discuss payment plans that work for your budget."
        },
        {
          q: "Is resin-bound more expensive than concrete or asphalt?",
          a: "Initial installation costs more than standard concrete or asphalt, but resin-bound surfaces last 15-25+ years with minimal maintenance versus 10-15 years for asphalt and 20-30 for concrete. Factor in resealing, crack repairs, and replacement costs—resin-bound often costs less over its lifetime."
        }
      ]
    },
    {
      category: "Installation",
      questions: [
        {
          q: "How long does installation take?",
          a: "Most residential driveways (400-800 sq ft) take 2-3 days: Day 1 for site prep and sub-base work, Day 2 for the resin-bound installation, and often a partial Day 3 for curing and final touches. Larger projects may take 4-5 days. Weather and site conditions can affect timing."
        },
        {
          q: "Can you install over existing concrete or asphalt?",
          a: "Yes, in many cases! If the existing surface is structurally sound, level, and properly drained, we can install resin-bound directly over it. This reduces costs and installation time. We'll assess your surface during the free site visit to determine if this is an option."
        },
        {
          q: "What's the best time of year to install in Ohio?",
          a: "Spring (April-May) and fall (September-October) are ideal for installation in Ohio. We need temperatures above 50°F and dry conditions for proper curing. We can install in summer, but prefer cooler mornings. Winter installations are possible during warm spells but not ideal."
        },
        {
          q: "How soon can you start my project?",
          a: "Current lead time is typically 2-4 weeks from site visit to installation. Spring is our busiest season (April-June), when lead times may extend to 4-6 weeks. Fall and late summer offer shorter wait times. Contact us for current availability."
        }
      ]
    },
    {
      category: "Durability & Performance",
      questions: [
        {
          q: "How long does resin-bound surfacing last?",
          a: "With proper maintenance, expect 15-25+ years. The Vuba system we use includes UV-stable resins that won't yellow or degrade in sunlight, and the permeable design prevents freeze-thaw damage common with traditional surfaces in Ohio's climate."
        },
        {
          q: "Will it crack in Ohio winters?",
          a: "Resin-bound surfaces are highly resistant to freeze-thaw damage because they're permeable—water drains through rather than pooling and freezing. The flexible resin also accommodates minor ground movement better than rigid concrete. Proper sub-base preparation is key to preventing any issues."
        },
        {
          q: "Can heavy vehicles drive on it?",
          a: "Yes! When properly installed with adequate sub-base, resin-bound surfaces easily support regular vehicle traffic including SUVs, trucks, and delivery vehicles. The surface is used commercially in parking lots and high-traffic areas."
        },
        {
          q: "Does the color fade over time?",
          a: "Vuba's UV-stable aliphatic resins are specifically designed to resist yellowing and fading. You'll see minimal color change over 10-15 years, far superior to epoxy-based products that can amber significantly in just 2-3 years of sun exposure."
        }
      ]
    },
    {
      category: "Maintenance",
      questions: [
        {
          q: "How much maintenance is required?",
          a: "Very little! Sweep or blow off debris weekly, rinse monthly with a hose, and power-wash annually (max 2000 PSI). Address spills promptly. That's it. No sealing, no crack filling, no resurfacing for 15-25 years. See our comprehensive maintenance guide for details."
        },
        {
          q: "What if it gets stained?",
          a: "Most stains (oil, rust, organic matter) can be removed with appropriate cleaners. Act quickly on spills for best results. Our maintenance guide includes specific stain removal techniques. The surface is more stain-resistant than porous concrete."
        },
        {
          q: "Can weeds grow through it?",
          a: "Extremely rare when properly installed. The resin-bound surface is solid and permeable throughout—there are no gaps for weeds to penetrate. Occasionally you might see weeds at the edges where it meets grass or landscaping, but never through the surface itself."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          q: "Is it really permeable? How does drainage work?",
          a: "Yes, completely permeable. Water drains through at rates up to 600 liters per square meter per minute. The resin-coated stones create a porous matrix that allows water to flow through into the sub-base below, then into the soil or drainage system. No standing water, no runoff."
        },
        {
          q: "What warranty do you offer?",
          a: "We provide a 2-year workmanship warranty covering installation defects. Vuba's manufacturer warranty is 5 years on standard installs, extended to 10 years when installed over their VubaMac primer system. We'll recommend the best option for your project during the site visit."
        },
        {
          q: "Is it safe for pool decks?",
          a: "Absolutely! The textured surface provides excellent slip resistance even when wet. We use lighter-colored blends for pool areas (they stay cooler underfoot), and the permeable design means no standing water. Many customers choose resin-bound specifically for pool decks."
        },
        {
          q: "Will it increase my home value?",
          a: "Quality hardscaping typically adds 5-10% to property value and strong curb appeal can significantly impact sale price. Resin-bound surfaces are still relatively unique in Ohio, making your property stand out. Plus, buyers appreciate the low maintenance and modern aesthetic."
        }
      ]
    },
    {
      category: "Local & Compliance",
      questions: [
        {
          q: "Do I need a permit in Cincinnati or Amelia?",
          a: "Requirements vary by municipality. In most residential cases, driveway resurfacing doesn't require a permit, but new driveways or significant grading might. We're familiar with local requirements and can advise during your site visit. We recommend checking with your local building department."
        },
        {
          q: "Does it meet Ohio stormwater requirements?",
          a: "Yes! Permeable resin-bound surfaces help meet stormwater management requirements and can even qualify for incentives in some areas. The system reduces runoff and allows natural groundwater recharge, which many Ohio municipalities encourage or require for new construction."
        }
      ]
    }
  ]

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 100 + questionIndex
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="bg-slate-50">
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-200 max-w-3xl">
            Common questions about resin-bound driveways, patios, and walkways in Cincinnati and Amelia, Ohio. Don't see your question? <Link href="/contact" className="text-cyan-400 underline">Contact us</Link>.
          </p>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-cyan-500">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const index = catIndex * 100 + qIndex
                  const isOpen = openIndex === index
                  return (
                    <div key={qIndex} className="bg-white rounded-lg shadow">
                      <button
                        onClick={() => toggleFAQ(catIndex, qIndex)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition"
                      >
                        <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                        <span className={`text-cyan-600 text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          ↓
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-slate-700 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6">Schedule a free site visit and we'll answer all your questions in person.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
                Schedule Free Estimate
              </Link>
              <a href="tel:+15137878798" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition">
                📞 Call (513) 787-8798
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
