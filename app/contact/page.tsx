// app/contact/page.tsx (server component)

import ContactForm from "./ContactForm";

// Metadata for the contact page.
export const metadata = {
  title: "Contact",
  description: "Book your on-site quote or ask a question.",
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
