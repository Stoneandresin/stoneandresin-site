// app/contact/page.tsx (server component)

import ContactForm from "./ContactForm";
import Link from "next/link";

// Metadata for the contact page.
export const metadata = {
  title: "Schedule Free Site Visit | Stone & Resin",
  description: "Schedule your free on-site estimate. Multiple contact options: call, text, email, or fill out our quick form.",
};

export default function ContactPage() {
  return (
    <main>
      
      <section className="container py-14">
        <h1 className="section-title mb-4">Schedule Your Free Site Visit</h1>
        <p className="subtle max-w-2xl mb-8">
          Get an accurate quote and expert recommendations for your project. Choose how you'd like to connect:
        </p>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mb-12">
          <a 
            href="tel:+15137878798" 
            className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl p-6 text-center hover:shadow-lg transition group"
          >
            <div className="text-4xl mb-2">📞</div>
            <div className="font-bold text-lg mb-1">Call Us</div>
            <div className="text-sm opacity-90">(513) 787-8798</div>
            <div className="text-xs mt-2 opacity-75">Available Mon-Sat 8am-6pm</div>
          </a>
          
          <a 
            href="sms:+15137878798" 
            className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl p-6 text-center hover:shadow-lg transition group"
          >
            <div className="text-4xl mb-2">💬</div>
            <div className="font-bold text-lg mb-1">Text Us</div>
            <div className="text-sm opacity-90">(513) 787-8798</div>
            <div className="text-xs mt-2 opacity-75">Quick responses during business hours</div>
          </a>
          
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">📧</div>
            <div className="font-bold text-lg mb-1">Email Form</div>
            <div className="text-sm opacity-90">Fill out below</div>
            <div className="text-xs mt-2 opacity-75">Response within 24 hours</div>
          </div>
        </div>

        {/* Interactive form imported as a client component */}
        <ContactForm />

        {/* Additional Info */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">What to Expect:</h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">1.</span>
              <span><strong>Quick Response:</strong> We'll get back to you within 24 hours (usually much sooner)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">2.</span>
              <span><strong>Free Site Visit:</strong> We'll visit your property to assess the project and answer questions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">3.</span>
              <span><strong>Accurate Quote:</strong> You'll receive a detailed quote with no hidden fees</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">4.</span>
              <span><strong>No Pressure:</strong> Take your time to decide. We're here when you're ready.</span>
            </li>
          </ul>
          
          <div className="mt-8 bg-cyan-50 rounded-lg p-6 border border-cyan-200">
            <p className="text-sm text-slate-700 mb-3">
              <strong>Have questions first?</strong> Check out our <Link href="/faq" className="text-cyan-600 underline">FAQ page</Link> or <Link href="/compare" className="text-cyan-600 underline">compare resin-bound to other options</Link>.
            </p>
          </div>
        </div>
      </section>
      
    </main>
  );
}
