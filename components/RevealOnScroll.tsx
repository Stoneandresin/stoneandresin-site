'use client'

import React, { useEffect, useRef } from 'react'

type RevealOnScrollProps = {
  children: React.ReactNode
  className?: string
  threshold?: number
  once?: boolean
  delayMs?: number
}

export default function RevealOnScroll({
  children,
  className = '',
  threshold = 0.15,
  once = true,
  delayMs = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('is-inview')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            el.classList.remove('is-inview')
          }
        })
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: delayMs ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  )}
