"use client";

// Import Slick styles directly here so the carousel renders correctly.
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import Image from 'next/image';
import { vubaColors } from './colors';

// Helper to convert a colour name into a slug for file names.  This
// function lowercases the name, replaces ampersands with "and", and
// collapses non-alphanumeric characters into single hyphens.
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ColorsSlider() {
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
      { breakpoint: 640,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section aria-labelledby="colors-heading" className="py-8">
      <h2 id="colors-heading" className="text-3xl font-bold mb-6">
        View Our Color Blends
      </h2>
      {/* Allow slides to overflow so the scale effect on hover isn't clipped */}
      <div className="[&_.slick-list]:overflow-visible">
        <Slider {...settings}>
          {vubaColors.map((color) => {
            // Prefer an explicitly provided image URL on the color object; otherwise
            // use a generic placeholder image so that missing local files don't break
            // the build.  If you add local photos into `public/colors/vuba` with
            // slugified names, they will automatically override this placeholder.
            const file = color.image ?? '/colors/placeholder.jpg';
            return (
              <div key={color.name} className="px-3">
                <a
                  href={color.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label={`Open ${color.name} on Vuba in a new tab`}
                >
                  <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-transform duration-200 group-hover:scale-[1.05] group-hover:shadow-md">
                    <Image
                      src={file}
                      alt={`Resin-bound color: ${color.name}`}
                      width={480}
                      height={320}
                      className="w-full h-48 object-cover"
                      priority={false}
                    />
                    <div className="p-3 text-center font-medium">{color.name}</div>
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        You’ll be taken to Vuba Stone for each blend. Images used with installer permission.
      </p>
    </section>
  );
}
