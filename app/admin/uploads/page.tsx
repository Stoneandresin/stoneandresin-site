// app/admin/uploads/page.tsx
"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function Uploads() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const urlKey = new URLSearchParams(window.location.search).get("key");
    const storedKey = sessionStorage.getItem("ADMIN_KEY");
    if (urlKey) sessionStorage.setItem("ADMIN_KEY", urlKey);
    setOk(Boolean(urlKey || storedKey));
  }, []);

  const openWidget = () => {
    if (!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET,
        folder: "before-after",
        multiple: true,
        sources: ["local", "google_drive", "instagram"],
        tags: ["beforeafter"],
        maxImageFileSize: 15_000_000,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          fetch("/api/reindex", { method: "POST" }).catch(() => {});
        }
      }
    );
    widget.open();
  };

  if (!ok) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-2">Restricted</h1>
        <p className="text-gray-600">
          Append <code>?key=YOUR_ADMIN_KEY</code> to the URL.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        Upload Before/After Photos
      </h1>
      <p className="text-sm text-gray-600">
        Use names like <code>jobid-before-1.jpg</code> and{" "}
        <code>jobid-after-1.jpg</code>.
      </p>
      <button
        onClick={openWidget}
        className="rounded-xl px-5 py-3 bg-black text-white"
      >
        Open Upload Widget
      </button>
    </main>
  );
}
