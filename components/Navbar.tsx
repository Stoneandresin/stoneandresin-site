'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuId = 'site-nav-menu';

  const handleEstimateClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();

    const onHome = pathname === '/' || pathname === '';

    if (onHome) {
      const target = document.getElementById('estimate');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.hash = 'estimate';
      }
    } else {
      router.push('/#estimate');
    }

    setOpen(false);
  }, [pathname, router]);

  const isHome = pathname === '/' || pathname === '';
  const styles = useMemo(() => {
    if (isHome) {
      return {
        nav: 'absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-white/10',
        logo: 'flex items-center gap-1.5 sm:gap-2 font-serif text-lg sm:text-2xl text-white min-w-0 flex-shrink',
        link: 'text-sm font-medium text-white/80 hover:text-white transition-colors',
        cta: 'bg-white text-slate-900 px-6 py-2.5 rounded-md font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-white/10',
        menuButton: 'md:hidden text-white flex-shrink-0 ml-2',
        mobilePanel: 'md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-xl',
        mobileLink: 'text-white/80 hover:text-white',
        mobileCta: 'bg-white text-slate-900 px-6 py-3 rounded-md font-bold text-center',
      };
    }

    return {
      nav: 'sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200',
      logo: 'flex items-center gap-1.5 sm:gap-2 font-serif text-lg sm:text-2xl text-slate-900 min-w-0 flex-shrink',
      link: 'text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors',
      cta: 'bg-slate-900 text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10',
      menuButton: 'md:hidden text-slate-900 flex-shrink-0 ml-2',
      mobilePanel: 'md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-xl',
      mobileLink: 'text-slate-700 hover:text-slate-900',
      mobileCta: 'bg-slate-900 text-white px-6 py-3 rounded-md font-bold text-center',
    };
  }, [isHome]);

  return (
    <nav className={styles.nav}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between py-6 max-w-full">
        <Link href="/" className={styles.logo}>
          <span
            className={[
              'inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full flex-shrink-0',
              isHome
                ? 'bg-white/20 backdrop-blur-sm border border-white/30'
                : 'bg-slate-900/5 border border-slate-200',
            ].join(' ')}
          />
          <span className="truncate">
            Stone <span className={isHome ? 'text-white/60' : 'text-slate-400'}>&</span> Resin
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#surfaces" className={styles.link}>Surfaces</Link>
          <Link href="/gallery" className={styles.link}>Gallery</Link>
          <Link href="/pricing" className={styles.link}>Pricing</Link>
          <Link href="/learn" className={styles.link}>Learn</Link>
          <Link href="/resources" className={styles.link}>Resources</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <a
            href="/#estimate"
            className={styles.cta}
            aria-label="Jump to instant estimator on the homepage"
            onClick={handleEstimateClick}
          >
            Get Instant Estimate
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={menuId}
          className={styles.menuButton}
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div id={menuId} className={styles.mobilePanel}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/#surfaces" className={styles.mobileLink} onClick={() => setOpen(false)}>Surfaces</Link>
            <Link href="/gallery" className={styles.mobileLink} onClick={() => setOpen(false)}>Gallery</Link>
            <Link href="/pricing" className={styles.mobileLink} onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/learn" className={styles.mobileLink} onClick={() => setOpen(false)}>Learn</Link>
            <Link href="/resources" className={styles.mobileLink} onClick={() => setOpen(false)}>Resources</Link>
            <Link href="/about" className={styles.mobileLink} onClick={() => setOpen(false)}>About</Link>
            <a
              href="/#estimate"
              className={styles.mobileCta}
              onClick={handleEstimateClick}
            >
              Get Instant Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
