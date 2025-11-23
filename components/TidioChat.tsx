"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function TidioChat() {
  const pathname = usePathname();
  const tidioKey = process.env.NEXT_PUBLIC_TIDIO_KEY;

  // Load Tidio when the key is available (both dev and production)
  const shouldLoad = tidioKey && tidioKey.trim() !== "";

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
    <>
      <style>{`
        /* Ensure Tidio chat is visible on mobile and above mobile sticky bar */
        #tidio-chat-iframe,
        #tidio-chat,
        [id^="tidio-chat"] {
          z-index: 9999 !important;
        }
        
        /* Adjust Tidio position to account for mobile sticky bar */
        @media (max-width: 767px) {
          #tidio-chat-iframe,
          #tidio-chat,
          [id^="tidio-chat"] {
            bottom: 70px !important;
          }
        }
      `}</style>
      <Script
        src={`https://code.tidio.co/${tidioKey}.js`}
        strategy="lazyOnload"
        onLoad={() => {
          // Wait a brief moment for Tidio API to initialize
          setTimeout(() => {
            if (shouldHide && window.tidioChatApi) {
              try {
                window.tidioChatApi.hide();
              } catch (error) {
                console.error("Tidio API error:", error);
              }
            }
          }, 100);
        }}
      />
    </>
  );
}
