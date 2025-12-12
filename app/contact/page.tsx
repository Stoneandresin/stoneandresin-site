// app/contact/page.tsx (server component)

import ContactForm from "./ContactForm";

// Metadata for the contact page.
export const metadata = {
  title: "Contact Stone & Resin",
  description: "Book your free on-site quote for resin-bound surfaces in Cincinnati & Amelia, OH. Call 513-787-8798 or request a callback. Fast response guaranteed.",
  openGraph: {
    title: "Contact Stone & Resin | Free On-Site Quotes",
    description: "Book your free site visit for resin-bound driveways, patios, or pool decks. Serving Greater Cincinnati.",
    type: "website",
    images: ["/img/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Stone & Resin",
    description: "Call 513-787-8798 or request your free on-site quote today.",
    images: ["/img/hero.jpg"],
  }
};

export default function ContactPage() {
  return (
    <main>
      
      <section className="container py-14">
        <h1 className="section-title mb-4">Let’s talk</h1>
        <p className="subtle max-w-2xl">
          Tell us about your project. We’ll respond quickly.
        </p>
        {/* Interactive form imported as a client component */}
        <ContactForm />
      </section>
      
    </main>
  );
}
