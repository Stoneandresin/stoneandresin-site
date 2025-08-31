import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Portfolio from "@/components/Portfolio"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Portfolio />
      <Testimonials />
      <section className="container py-14">
        <div className="card p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Ready for a precise quote?</h2>
            <p className="subtle">We’ll visit your site, confirm prep, and finalize your price.</p>
          </div>
          <Link href="/contact" className="btn">Book a Consultation</Link>
        </div>
      </section>
      <FAQ />
      <Footer />
    </main>
  )
}
