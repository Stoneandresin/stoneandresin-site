'use client';

import { useEffect, useState, useCallback } from 'react';
import type { MouseEvent } from 'react';

export default function FloatingQuoteWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 100px, hide when near estimate section
      const scrolled = window.scrollY > 100;
      const estimateSection = document.getElementById('estimate');
      let nearEstimate = false;
      
      if (estimateSection) {
        const rect = estimateSection.getBoundingClientRect();
        nearEstimate = rect.top < window.innerHeight && rect.bottom > 0;
      }
      
      setIsVisible(scrolled && !nearEstimate);
    };

    const handleResize = () => {
      // Hide on mobile if screen is too small
      if (window.innerWidth < 1024) {
        setIsVisible(false);
      } else {
        handleScroll();
      }
    };

    handleScroll();
    handleResize();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigateToEstimator = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    
    // Analytics tracking
    if (typeof window !== 'undefined') {
      const w = window as any;
      if (w.gtag) {
        w.gtag('event', 'floating_widget_click', {
          event_category: 'CTA',
          event_label: 'floating_quote_widget'
        });
      }
      if (w.va?.track) {
        w.va.track('cta_click', { location: 'floating_widget', action: 'quote_click' });
      }
    }

    const target = document.getElementById('estimate');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.location.href = '/#estimate';
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      style={{
        animation: isVisible ? 'slideInRight 0.5s ease-out' : undefined,
      }}
    >
      <div
        className={`bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg transition-all duration-300 ${
          isExpanded ? 'px-6 py-3' : 'w-14 h-14'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        style={{
          boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)',
          cursor: 'pointer',
        }}
      >
        {isExpanded ? (
          <a
            href="/#estimate"
            onClick={navigateToEstimator}
            className="flex items-center gap-2 text-sm font-bold whitespace-nowrap text-white no-underline"
          >
            <span className="text-lg">💰</span>
            Free Quote
          </a>
        ) : (
          <a
            href="/#estimate"
            onClick={navigateToEstimator}
            className="w-full h-full flex items-center justify-center text-white no-underline"
          >
            <span className="text-xl">💰</span>
          </a>
        )}
      </div>
      
      {/* Pulsing ring animation */}
      <div
        className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-75 pointer-events-none"
        style={{
          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}