// app/admin/uploads/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import DropzoneUpload from "@/components/Dropzone"; //
declare global {
  interface Window { cloudinary: any }
}

type UploadItem = { name: string; status: "queued" | "uploading" | "done" | "error"; url?: string; err?: string };

export default function Uploads() {
  const [ok, setOk] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET!;

  // Load Cloudinary widget script (keeps your existing button working)
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
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
          if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText));
          else reject(new Error(`Cloudinary ${xhr.status}: ${xhr.responseText}`));
        } catch (e: any) { reject(e); }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(form);
    });

  const afterBatch = async () => {
    // Ask server to refresh pairs
    await fetch("/api/reindex", { method: "POST" }).catch(() => {});
  };

  // Drag & drop handlers
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith("image/"));
    if (!files.length) return;

    // seed UI
    setItems(prev => [...files.map(f => ({ name: f.name, status: "queued" as const })), ...prev]);

    // Upload sequentially (safer for rate limits); switch to Promise.all if you prefer speed
    for (const file of files) {
      setItems(prev => prev.map(it => it.name === file.name ? { ...it, status: "uploading" } : it));
      try {
        const res = await uploadFile(file);
        setItems(prev => prev.map(it => it.name === file.name ? { ...it, status: "done", url: res.secure_url } : it));
      } catch (err: any) {
        setItems(prev => prev.map(it => it.name === file.name ? { ...it, status: "error", err: String(err?.message || err) } : it));
      }
    }
    await afterBatch();
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
        clientAllowedFormats: ["jpg","jpeg","png","webp"],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          afterBatch().catch(()=>{});
        }
      }
    );
    widget.open();
  }, [cloudName, unsignedPreset]);

  if (!ok) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-2">Restricted</h1>
        <p className="text-gray-600">Append <code>?key=YOUR_ADMIN_KEY</code> to the URL.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Before/After Photos</h1>
      <p className="text-sm text-gray-600">
        Name files like <code>jobid-before-1.jpg</code> and <code>jobid-after-1.jpg</code>. Matching pairs appear on <code>/gallery</code>.
      </p>

      {/* Drag & Drop area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          "border-2 border-dashed rounded-2xl p-10 text-center transition",
          dragOver ? "bg-gray-50 border-black" : "border-gray-300"
        ].join(" ")}
      >
        <div className="text-lg font-medium mb-2">Drag & drop images here</div>
        <div className="text-sm text-gray-600">or</div>
        <button onClick={openWidget} className="mt-3 rounded-xl px-5 py-3 bg-black text-white">
          Open Upload Widget
        </button>
      </div>

      {/* Simple upload status list */}
      {items.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-base font-semibold">Uploads</h2>
          <ul className="text-sm">
            {items.map(it => (
              <li key={it.name} className="flex items-center gap-3">
                <span className="w-64 truncate">{it.name}</span>
                {it.status === "queued" && <span className="text-gray-500">queued</span>}
                {it.status === "uploading" && <span className="text-blue-600">uploading…</span>}
                {it.status === "done" && <span className="text-green-600">done</span>}
                {it.status === "error" && <span className="text-red-600">error: {it.err}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
