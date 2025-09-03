// components/DropzoneUpload.tsx
"use client";
import { useState } from "react";

type UploadItem = {
  name: string;
  status: "queued" | "uploading" | "done" | "error";
  url?: string;
  err?: string;
};

export default function DropzoneUpload({
  uploadFile,
  onAfterBatch,
}: {
  uploadFile: (file: File) => Promise<{ secure_url: string }>;
  onAfterBatch: () => Promise<void>;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!files.length) return;

    // seed UI list
    setItems((prev) => [
      ...files.map((f) => ({ name: f.name, status: "queued" as const })),
      ...prev,
    ]);

    // upload sequentially (safer); switch to Promise.all for parallel
    for (const file of files) {
      setItems((prev) =>
        prev.map((it) =>
          it.name === file.name ? { ...it, status: "uploading" } : it
        )
      );
      try {
        const res = await uploadFile(file);
        setItems((prev) =>
          prev.map((it) =>
            it.name === file.name
              ? { ...it, status: "done", url: res.secure_url }
              : it
          )
        );
      } catch (err: any) {
        setItems((prev) =>
          prev.map((it) =>
            it.name === file.name
              ? { ...it, status: "error", err: String(err?.message || err) }
              : it
          )
        );
      }
    }
    await onAfterBatch();
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={[
        "border-2 border-dashed rounded-2xl p-10 text-center transition",
        dragOver ? "bg-gray-50 border-black" : "border-gray-300",
      ].join(" ")}
    >
      <div className="text-lg font-medium mb-2">Drag & drop images here</div>
      <div className="text-sm text-gray-600">
        Name files like <code>jobid-before-1.jpg</code> and{" "}
        <code>jobid-after-1.jpg</code>. Matching pairs appear on <code>/gallery</code>.
      </div>

      {items.length > 0 && (
        <div className="mt-6 text-left">
          <h2 className="text-base font-semibold">Uploads</h2>
          <ul className="text-sm space-y-1">
            {items.map((it) => (
              <li key={it.name} className="flex items-center gap-3">
                <span className="w-64 truncate">{it.name}</span>
                {it.status === "queued" && (
                  <span className="text-gray-500">queued</span>
                )}
                {it.status === "uploading" && (
                  <span className="text-blue-600">uploading…</span>
                )}
                {it.status === "done" && (
                  <span className="text-green-600">done</span>
                )}
                {it.status === "error" && (
                  <span className="text-red-600">error: {it.err}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
