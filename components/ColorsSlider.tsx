"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import Image from 'next/image';
import type { TouchEvent } from 'react';
import { vubaColors } from './colors';

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ColorsSlider({ showHeading = true, className = "" }: { showHeading?: boolean; className?: string }) {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const Wrapper: any = showHeading ? 'section' : 'div';
  return (
    <Wrapper aria-labelledby={showHeading ? 'colors-heading' : undefined} className={[showHeading ? 'py-8' : '', 'relative z-0', className].join(' ').trim()}>
      {showHeading && (
        <h2 id="colors-heading" className="text-3xl font-bold mb-6">
          View Our Color Blends
        </h2>
      )}
      {/* prevent scaled tiles from clipping and prevent unwanted page scroll while swiping */}
      <div
        className="[&_.slick-list]:overflow-hidden overflow-x-clip [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full"
        style={{ touchAction: "pan-y" }}
        onTouchMove={(e: TouchEvent) => e.stopPropagation()}
      >
        <Slider {...settings}>
          {vubaColors.map((c) => {
            const file = `/colors/vuba/${slugify(c.name)}.jpg`;
            const src: string = (c as any).image || file;
            return (
              <div key={c.name} className="px-3 h-full">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label={`Open ${c.name} on Vuba in a new tab`}
                >
                  <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-transform duration-200 group-hover:scale-[1.05] group-hover:shadow-md h-full flex flex-col">
                    <Image
                      src={src}
                      alt={`Resin-bound color: ${c.name}`}
                      width={480}
                      height={320}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3 text-center font-medium mt-auto">{c.name}</div>
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
      {showHeading && (
        <p className="mt-3 text-xs text-gray-500">
          You'll be taken to Vuba Stone for each blend. Images used with installer permission.
        </p>
      )}
    </Wrapper>
  );
}
