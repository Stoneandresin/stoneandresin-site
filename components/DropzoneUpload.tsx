"use client";
import { useState } from "react";
type Item = { name:string; status:"queued"|"uploading"|"done"|"error"; url?:string; err?:string };

export default function DropzoneUpload() {
  const [dragOver, setDragOver] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const afterBatch = async () => {
    await fetch("/api/reindex", {
      method: "POST",
      headers: { "x-admin-key": sessionStorage.getItem("ADMIN_KEY") || "" },
    }).catch(()=>{});
  };

  async function getSignature() {
    const res = await fetch("/api/cloudinary/sign", {
      method: "POST",
      headers: { "x-admin-key": sessionStorage.getItem("ADMIN_KEY") || "" },
    });
    if (!res.ok) throw new Error("sign failed");
    return res.json() as Promise<{ cloudName:string; apiKey:string; folder:string; timestamp:number; signature:string }>;
  }

  async function uploadSigned(file: File) {
    const { cloudName, apiKey, folder, timestamp, signature } = await getSignature();
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", apiKey);
    form.append("timestamp", String(timestamp));
    form.append("folder", folder);
    form.append("signature", signature);
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const res = await fetch(endpoint, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Cloudinary ${res.status}`);
    return res.json() as Promise<{ secure_url: string }>;
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith("image/"));
    if (!files.length) return;

    setItems(prev => [...files.map(f => ({ name:f.name, status:"queued" as const })), ...prev]);

    for (const f of files) {
      setItems(prev => prev.map(i => i.name===f.name ? { ...i, status:"uploading" } : i));
      try {
        const r = await uploadSigned(f);
        setItems(prev => prev.map(i => i.name===f.name ? { ...i, status:"done", url:r.secure_url } : i));
      } catch (err:any) {
        setItems(prev => prev.map(i => i.name===f.name ? { ...i, status:"error", err:String(err?.message||err) } : i));
      }
    }
    await afterBatch();
  };

  return (
    <div
      onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
      onDragLeave={()=>setDragOver(false)}
      onDrop={onDrop}
      className={[
        "border-2 border-dashed rounded-2xl p-10 text-center transition",
        dragOver ? "bg-gray-50 border-black" : "border-gray-300"
      ].join(" ")}
    >
      <div className="text-lg font-medium mb-2">Drag & drop images here</div>
      <div className="text-sm text-gray-600">Use filenames like <code>jobid-before-1.jpg</code> and <code>jobid-after-1.jpg</code>.</div>
    </div>
  );
}
