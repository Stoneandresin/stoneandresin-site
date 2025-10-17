"use client"

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState, type TouchEvent } from 'react'
import { vubaColors } from './colors'

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function ColorsSlider({ showHeading = true, className = '' }: { showHeading?: boolean; className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: false, slidesToScroll: 1 },
    [Autoplay({ delay: 2800, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect()
    })
  }, [emblaApi, onSelect])

  const Wrapper: any = showHeading ? 'section' : 'div'

  const content = (
    <>
      {showHeading && (
        <h2 id="colors-heading" className="text-3xl font-bold mb-6 accent-text">View Our Color Blends</h2>
      )}

      <div
        className="embla"
        ref={emblaRef}
        style={{ touchAction: 'pan-y' }}
        onTouchMove={(e: TouchEvent) => e.stopPropagation()}
      >
        <div className="embla__container flex gap-4">
          {vubaColors.map((c) => {
            const file = `/colors/vuba/${slugify(c.name)}.jpg`
            const src: string = (c as any).image || file
            return (
              <div key={c.name} className="embla__slide basis-[75%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%] shrink-0">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <article className="rounded-xl border border-slate-800 bg-slate-900 text-slate-200 overflow-hidden transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-md h-full flex flex-col">
                    <div className="relative w-full aspect-[16/10]">
                      <Image
                        src={src}
                        alt={`Resin-bound color: ${c.name}`}
                        fill
                        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, (max-width: 1280px) 32vw, 24vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 text-center font-medium mt-auto">{c.name}</div>
                  </article>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} className="btn-ghost h-9 px-3 disabled:opacity-40" aria-label="Previous">‹</button>
          <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!canNext} className="btn-ghost h-9 px-3 disabled:opacity-40" aria-label="Next">›</button>
        </div>
        <div className="flex items-center gap-1">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={['h-2.5 w-2.5 rounded-full transition', selectedIndex === i ? 'bg-cyan-400' : 'bg-slate-600 hover:bg-slate-500'].join(' ')}
            />
          ))}
        </div>
      </div>

      {showHeading && (
        <p className="mt-3 text-xs copy-muted">
          You’ll be taken to Vuba Stone for each blend. Images used with installer permission.
        </p>
      )}
    </>
  )

  return (
    <Wrapper aria-labelledby={showHeading ? 'colors-heading' : undefined} className={['py-12', 'relative z-0', className].join(' ').trim()}>
      {showHeading ? (
        <div className="container mx-auto px-4">
          <div className="surface-1 rounded-2xl p-6 md:p-8">
            {content}
          </div>
        </div>
      ) : (
        content
      )}
    </Wrapper>
  )
}
