"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type RevealOnScrollProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

export default function RevealOnScroll({ children, className = "", delayMs = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              const timeout = setTimeout(() => setVisible(true), delayMs)
              return () => clearTimeout(timeout)
            }
            setVisible(true)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delayMs])

  return (
    <div
      ref={ref}
      className={[
        // Stronger, but still smooth
        "transform-gpu transition-all duration-900 ease-out will-change-transform",
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-[0.94] translate-y-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  )
}
