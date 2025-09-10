// app/admin/uploads/page.tsx
'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState, useCallback } from "react";
import DropzoneUpload from "@/components/DropzoneUpload";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type UploadItem = {
  name: string;
  status: "queued" | "uploading" | "done" | "error";
  url?: string;
  err?: string;
};

export default function Uploads() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;

  if (!cloudName || !unsignedPreset) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-2">Uploads (temporarily unavailable)</h1>
        <p className="text-sm text-gray-600">
          Missing Cloudinary envs. Set <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and
          <code> NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET</code> in Vercel, then redeploy.
        </p>
      </main>
    );
  }

  const [ok, setOk] = useState(false);

  // Load Cloudinary widget script (keeps your existing button working)
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  // Simple gate via ?key=
  useEffect(() => {
    const urlKey = new URLSearchParams(window.location.search).get("key");
    const storedKey = sessionStorage.getItem("ADMIN_KEY");
    if (urlKey) sessionStorage.setItem("ADMIN_KEY", urlKey);
    setOk(Boolean(urlKey || storedKey));
  }, []);

  // Helper: upload a single file using unsigned upload
  const uploadFile = (file: File) =>
    new Promise<{ secure_url: string }>((resolve, reject) => {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", unsignedPreset);
      form.append("folder", "before-after"); // keep gallery tidy
      form.append("tags", "beforeafter");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/upload`);
      xhr.onload = () => {
        try {
          if (xhr.status >= 200 && xhr.status < 300)
            resolve(JSON.parse(xhr.responseText));
          else reject(new Error(`Cloudinary ${xhr.status}: ${xhr.responseText}`));
        } catch (e: any) {
          reject(e);
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(form);
    });

  const afterBatch = async () => {
    // Ask server to refresh pairs
    await fetch("/api/reindex", { method: "POST" }).catch(() => {});
  };

  const openWidget = useCallback(() => {
    if (!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset: unsignedPreset,
        folder: "before-after",
        multiple: true,
        sources: ["local", "google_drive", "instagram"],
        tags: ["beforeafter"],
        maxImageFileSize: 15_000_000,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          afterBatch().catch(() => {});
        }
      }
    );
    widget.open();
  }, [cloudName, unsignedPreset]);

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
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Before/After Photos</h1>
      <p className="text-sm text-gray-600">
        Name files like <code>jobid-before-1.jpg</code> and{" "}
        <code>jobid-after-1.jpg</code>. Matching pairs appear on{" "}
        <code>/gallery</code>.
      </p>

      {/* Drag & Drop component */}
      <DropzoneUpload uploadFile={uploadFile} onAfterBatch={afterBatch} />

      {/* Keep your existing widget as an alternate path */}
      <div className="text-center">
        <div className="text-sm text-gray-600 mt-3">or</div>
        <button
          onClick={openWidget}
          className="mt-3 rounded-xl px-5 py-3 bg-black text-white"
        >
          Open Upload Widget
        </button>
      </div>
    </main>
  );
}
