'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

type AnalyticsWindow = typeof window & {
  gtag?: (...args: any[]) => void;
  va?: { track?: (event: string, data?: Record<string, unknown>) => void };
};

function isZoneVisible(zones: NodeListOf<HTMLElement>): boolean {
  const viewportHeight = window.innerHeight || 0;
  for (let i = 0; i < zones.length; i += 1) {
    const rect = zones[i].getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      return true;
    }
  }
  return false;
}

export default function MobileStickyBar() {
  const barRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const clearPadding = useCallback(() => {
    const body = document.body;
    if (!body) return;
    body.classList.remove('sr-mobilebar-pad');
    body.style.removeProperty('--sr-mobilebar-pad');
  }, []);

  const applyPadding = useCallback(() => {
    const bar = barRef.current;
    const body = document.body;
    if (!bar || !body) return;
    const height = bar.offsetHeight || 60;
    body.style.setProperty('--sr-mobilebar-pad', `${height}px`);
    body.classList.add('sr-mobilebar-pad');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const update = () => {
      const width = window.innerWidth || 0;
      if (width >= 768) {
        setVisible((prev) => {
          if (prev) {
            clearPadding();
          }
          return false;
        });
        return;
      }

      const zones = document.querySelectorAll<HTMLElement>('#estimate, [data-sticky-suppress="estimate"]');
      const shouldShow = !isZoneVisible(zones);

      setVisible((prev) => {
        if (prev === shouldShow) {
          if (shouldShow) {
            requestAnimationFrame(applyPadding);
          }
          return prev;
        }

        if (shouldShow) {
          requestAnimationFrame(applyPadding);
        } else {
          clearPadding();
        }
        return shouldShow;
      });
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      clearPadding();
    };
  }, [applyPadding, clearPadding]);

  const handleAnalytics = useCallback((action: string) => {
    if (typeof window === 'undefined') return;
    const w = window as AnalyticsWindow;

    if (typeof w.gtag === 'function') {
      try {
        w.gtag('event', action, {
          event_category: 'CTA',
          event_label: 'mobile_sticky_bar',
        });
      } catch (err) {
        // noop: analytics should never block CTA
      }
    }

    if (w.va && typeof w.va.track === 'function') {
      try {
        w.va.track('cta_click', { location: 'mobile_bar', action });
      } catch (err) {
        // noop
      }
    }
  }, []);

  const navigateToEstimator = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    if (typeof window === 'undefined') return;
    const onHome = window.location.pathname === '/' || window.location.pathname === '';
    if (onHome) {
      const target = document.getElementById('estimate');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.location.href = '/#estimate';
  }, []);

  return (
    <nav
      ref={barRef}
      id="sr-mobilebar"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-slate-200 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
      role="region"
      aria-label="Quick actions: Estimate or Call"
      style={{ display: visible ? undefined : 'none' }}
    >
      <style>{`
        .sr-mobilebar-pad{padding-bottom:var(--sr-mobilebar-pad,60px)!important}
        @media(min-width:768px){.sr-mobilebar-pad{padding-bottom:0!important}}
        
        @keyframes pulse-call {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes ping-call {
          75%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        
        .btn-call:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="w-full max-w-none mx-auto px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))]">
        <div className="grid grid-cols-2 gap-4 items-stretch">
          <a
            href="/#estimate"
            className="inline-flex items-center justify-center gap-2 h-12 font-bold no-underline rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
            data-analytics="cta"
            data-action="estimate_click"
            aria-label="Jump to instant estimate"
            onClick={(event) => {
              handleAnalytics('estimate_click');
              navigateToEstimator(event);
            }}
          >
            ⚡ Estimate
          </a>
          <a
            href="tel:+15137878798"
            className="btn-call inline-flex items-center justify-center gap-2 h-12 font-bold no-underline rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition-colors"
            data-analytics="cta"
            data-action="call_click"
            aria-label="Tap to call Stone & Resin"
            onClick={() => handleAnalytics('call_click')}
            style={{
              position: 'relative',
              animation: 'pulse-call 3s ease-in-out infinite'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>📞 Call</span>
            <div 
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '14px',
                border: '2px solid rgba(15, 23, 42, 0.1)',
                animation: 'ping-call 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                pointerEvents: 'none'
              }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
