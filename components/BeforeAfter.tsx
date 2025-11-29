// components/BeforeAfter.tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  alt,
}: {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const setFromEvent = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    setPos(pct);
  };

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl shadow"
      style={{ aspectRatio: "16 / 9", touchAction: "none" }}
      onMouseMove={(e) => setFromEvent(e.clientX)}
      onTouchMove={(e) => setFromEvent(e.touches[0].clientX)}
    >
      <Image
        src={afterSrc}
 setup/agent-hq-scaffold
        alt={alt ? `${alt} after` : "after"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        className="object-cover"
        priority={false}

        alt={alt || "after"}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 main
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
 setup/agent-hq-scaffold
        <div className="relative h-full w-full">
          <Image
            src={beforeSrc}
            alt={alt ? `${alt} before` : "before"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            className="object-cover"
            priority={false}
          />
        </div>

        <Image
          src={beforeSrc}
          alt={alt || "before"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
 main
      </div>
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${pos}%` }}
      >
        <div className="h-full w-0.5 bg-white/80 shadow"></div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
        Before
      </div>
      <div className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
        After
      </div>
    </div>
  );
}
