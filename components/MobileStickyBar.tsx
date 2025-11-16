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
      className="sr-mbar"
      role="region"
      aria-label="Quick actions: Estimate or Call"
      style={{ display: visible ? undefined : 'none' }}
    >
      <style>{`
        .sr-mbar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#0f1a2a;color:#e6f1f8;border-top:1px solid #183355}
        .sr-mbar .wrap{max-width:1100px;margin:0 auto;padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px))}
        .sr-mbar .row{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch}
        .sr-mbar a{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;font-weight:800;text-decoration:none;border-radius:999px;border:1px solid rgba(255,255,255,.08)}
        .sr-mbar .btn-estimate{background:#06b6d4;color:#022a37;border-color:#0dd1ef}
        .sr-mbar .btn-estimate:hover{background:#0891b2}
        .sr-mbar .btn-call{background:#13243c;color:#e6f1f8}
        @media(min-width:768px){.sr-mbar{display:none}}
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
      <div className="wrap">
        <div className="row">
          <a
            href="/#estimate"
            className="btn-estimate"
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
            className="btn-call animate-pulse-call"
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
                borderRadius: '999px',
                border: '2px solid rgba(6, 182, 212, 0.6)',
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
