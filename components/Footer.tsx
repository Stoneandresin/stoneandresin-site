import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      {/* Main footer grid */}
      <div className="container py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-extrabold text-xl">Stone & Resin</div>
          <p className="subtle mt-2">Beautiful, permeable surfaces that last.</p>
          <p className="mt-3 text-sm">
            Call: <a href="tel:+15137878798" className="underline">513-787-8798</a>
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 subtle">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/learn" className="hover:underline">Learn</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Services</div>
          <ul className="space-y-2 subtle">
            <li>Driveways</li>
            <li>Patios & Walkways</li>
            <li>Pool Decks</li>
            <li>Commercial</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Get Started</div>
          <ul className="space-y-2 subtle">
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
          </ul>
        </div>
      </div>

      {/* BBB seal section */}
      <div className="container py-6 flex justify-center border-t border-gray-100">
        <a
          href="https://www.bbb.org/us/oh/amelia/profile/construction-services/spaulding-quality-renovations-0292-90050955"
          target="_blank"
          rel="nofollow noopener"
          aria-label="BBB Accredited Business"
        >
          <img
            src="https://m.bbb.org/terminuscontent/dist/img/business-profile/accreditation/AB-seal-horz.svg?tx=f_svg,w_175"
            alt="BBB Accredited Business"
            width={180}
            height={63}
            style={{ display: 'block' }}
          />
        </a>
      </div>

      {/* Copyright line */}
      <div className="container py-6 border-t border-gray-100 text-xs subtle">
        © {new Date().getFullYear()} Stone & Resin. All rights reserved.
      </div>
    </footer>
  );
}
