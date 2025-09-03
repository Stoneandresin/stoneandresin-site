import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = { title: "Privacy Policy" }

export default function PrivacyPage(){
  return (
    <main>
      <Navbar />
      <section className="container py-14 prose max-w-3xl">
        <h1>Privacy Policy</h1>
        <p>We collect contact information you submit to provide quotes and services. We don't sell your data. For questions, contact hello@stoneandresin.com.</p>
      </section>
      <Footer />
    </main>
  )
}
