"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function TidioChat() {
  const pathname = usePathname();
  const tidioKey = process.env.NEXT_PUBLIC_TIDIO_KEY;

  // Only load Tidio in production and when the key is available
  const shouldLoad =
    process.env.NODE_ENV === "production" && tidioKey && tidioKey.trim() !== "";

  // Hide chat on admin routes
  const shouldHide = pathname?.startsWith("/admin");

  useEffect(() => {
    if (!shouldLoad) return;

    // Hide/show chat based on route
    if (typeof window !== "undefined" && window.tidioChatApi) {
      try {
        if (shouldHide) {
          window.tidioChatApi.hide();
        } else {
          window.tidioChatApi.show();
        }
      } catch (error) {
        console.error("Tidio API error:", error);
      }
    }
  }, [shouldLoad, shouldHide]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <Script
      src={`https://code.tidio.co/${tidioKey}.js`}
      strategy="lazyOnload"
      onLoad={() => {
        // Initialize visibility on load
        if (shouldHide && window.tidioChatApi) {
          try {
            window.tidioChatApi.hide();
          } catch (error) {
            console.error("Tidio API error:", error);
          }
        }
      }}
    />
  );
}
