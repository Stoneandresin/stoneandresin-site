"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CompareSliderProps {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  className?: string;
}

export default function CompareSlider({ before, after, altBefore, altAfter, className = "" }: CompareSliderProps) {
  const [pos, setPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  
  // Reset position on window resize to prevent layout issues
  useEffect(() => {
    const handleResize = () => setIsResizing(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <figure className={`relative border border-slate-200 rounded-xl overflow-hidden select-none group ${className}`}>
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10]" style={{ ['--pos' as any]: `${pos}%` }}>
        {/* Before Image (Background) */}
        <Image 
          src={before} 
          alt={altBefore} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* After Image (Clipped) */}
        <div 
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
        >
          <Image 
            src={after} 
            alt={altAfter} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Labels */}
        <span className="absolute top-4 right-4 z-10 text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-sm border border-white/10 shadow-lg">
          BEFORE
        </span>
        <span className="absolute top-4 left-4 z-10 text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-cyan-500/90 text-slate-900 backdrop-blur-sm border border-white/20 shadow-lg">
          AFTER
        </span>

        {/* Slider Handle Line */}
        <div 
          className="absolute inset-y-0 z-20 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
            </svg>
          </div>
        </div>

        {/* Range Input (Invisible Interaction Layer) */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Slide to compare before and after"
          onChange={(e) => setPos(parseInt(e.target.value, 10))}
          className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize touch-none"
        />
      </div>
    </figure>
  );
}
