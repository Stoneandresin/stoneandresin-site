"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import clsx from "clsx"

type ColorItem = {
  name: string
  image?: string
  img?: string
  src?: string
}

type ColorsSliderProps = {
  colors?: ColorItem[]
  showHeading?: boolean
  className?: string
}

// Optional local fallback list if none is provided
const defaultColors: ColorItem[] = [
  { name: "Palazzo", image: "/colors/palazzo.jpg" },
  { name: "Rio Grande", image: "/colors/rio-grande.jpg" },
  { name: "Ipanema Beach", image: "/colors/ipanema-beach.jpg" },
  { name: "The Burj", image: "/colors/the-burj.jpg" },
]

export default function ColorsSlider({
  colors = defaultColors,
  showHeading = true,
  className = "",
}: ColorsSliderProps) {
  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index)
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const getSrc = (c: ColorItem) => c.image || c.src || c.img || "/placeholder.svg"

  return (
    <section className={clsx("py-10", className)}>
      <div className="container mx-auto px-4">
        {showHeading && (
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Choose Your Vuba Blend
          </h2>
        )}

        <div className="embla relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container -ml-3 flex">
              {colors.map((c, i) => {
                const src = getSrc(c)
                return (
                  <div
                    className="embla__slide pl-3 basis-[80%] sm:basis-[48%] md:basis-[33%] lg:basis-[25%] shrink-0"
                    key={`${c.name}-${i}`}
                  >
                    <div className="group h-full">
                      <article className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow h-full flex flex-col">
                        <div className="relative w-full aspect-[16/10]">
                          <Image
                            src={src}
                            alt={`Resin-bound color: ${c.name}`}
                            fill
                            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, (max-width: 1280px) 32vw, 24vw"
                            className="object-cover"
                          />
                          {/* Subtle bottom gradient for legibility */}
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />
                          {/* High-contrast name pill */}
                          <div className="absolute inset-x-0 bottom-0 p-2">
                            <span className="inline-block max-w-full truncate rounded-md bg-white/90 text-slate-900 px-2.5 py-1 text-sm font-medium shadow ring-1 ring-slate-200 backdrop-blur-sm">
                              {c.name}
                            </span>
                          </div>
                        </div>
                        {/* If you prefer below-image caption, uncomment this and remove the pill above */}
                        {/* <div className="p-3 text-center font-medium mt-auto">{c.name}</div> */}
                      </article>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Prev/Next */}
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={scrollPrev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={scrollNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              ›
            </button>

            {/* Dots */}
            <div className="ml-auto flex items-center gap-1.5">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full transition",
                    selectedIndex === i
                      ? "bg-indigo-600"
                      : "bg-slate-300 hover:bg-slate-400"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm copy-muted">
          See a blend you love?{" "}
          <a className="underline underline-offset-2" href="/#contact">
            Request a sample & site visit →
          </a>
        </p>
      </div>
    </section>
  )
}