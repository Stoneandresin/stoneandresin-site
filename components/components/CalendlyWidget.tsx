// components/CalendlyWidget.tsx
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";

export default function CalendlyWidget({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}
