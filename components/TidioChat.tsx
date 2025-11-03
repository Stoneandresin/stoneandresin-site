"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

interface TidioChatProps {
  userName?: string;
  userEmail?: string;
}

export default function TidioChat({ userName, userEmail }: TidioChatProps) {
  const pathname = usePathname();
  const tidioKey = process.env.NEXT_PUBLIC_TIDIO_KEY;

  // Only load Tidio in production and when the key is available
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  if (!tidioKey || tidioKey.trim() === "") {
    return null;
  }

  // Routes where chat should be hidden
  const hiddenRoutes = ["/admin", "/quote-builder", "/checkout"];
  if (hiddenRoutes.some((r) => pathname?.startsWith(r))) {
    return null;
  }

  // Poll for tidioChatApi availability and identify visitor
  const identifyVisitor = () => {
    if (!userName && !userEmail) return;

    let attempts = 0;
    const maxAttempts = 20; // Poll for up to 2 seconds
    const interval = 100; // Check every 100ms

    const pollForApi = () => {
      attempts++;

      if (typeof window !== "undefined" && window.tidioChatApi) {
        try {
          window.tidioChatApi("identify", {
            name: userName,
            email: userEmail,
          });
        } catch (error) {
          // Silently fail - Tidio API may not be ready yet
        }
      } else if (attempts < maxAttempts) {
        setTimeout(pollForApi, interval);
      }
    };

    pollForApi();
  };

  const tidioSrc = `https://code.tidio.co/${tidioKey}.js`;

  return (
    <Script
      src={tidioSrc}
      strategy="lazyOnload"
      onLoad={() => {
        identifyVisitor();
      }}
    />
  );
}
