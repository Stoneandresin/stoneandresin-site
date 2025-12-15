'use client';
import AdminGate from "@/components/AdminGate";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

type UploadItem = {
  name: string;
  status: "queued" | "uploading" | "done" | "error";
  path?: string;
  error?: string;
};

type GalleryPhoto = {
  src: string;
  label: string;
  category: string;
};

const CATEGORIES = [
  { value: "", label: "Gallery (root)" },
  { value: "Driveway", label: "Driveway" },
  { value: "Patio", label: "Patio" },
  { value: "Steps", label: "Steps" },
  { value: "Pool Deck", label: "Pool Deck" },
  { value: "Before + After", label: "Before + After" },
  { value: "Best Photos", label: "Best Photos" },
];

function UploadContent() {
  const [dragOver, setDragOver] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [category, setCategory] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const passwordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH || "";

  const loadGallery = useCallback(async () => {
    if (!passwordHash) return;
    
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        headers: {
          authorization: `Bearer ${passwordHash}`,
        },
      });
      const data = await res.json();
      if (data.ok) {
        setGalleryPhotos(data.photos.slice(0, 12)); // Show first 12 for preview
        setGalleryCount(data.count);
      }
    } catch (error) {
      console.error("Failed to load gallery:", error);
    } finally {
      setLoadingGallery(false);
    }
  }, [passwordHash]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const uploadFile = async (file: File): Promise<{ path: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    if (category) {
      formData.append("category", category);
    }

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: {
        authorization: `Bearer ${passwordHash}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!data.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return { path: data.path };
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);

      const files = Array.from(e.dataTransfer.files || []).filter((f) =>
        f.type.startsWith("image/")
      );

      if (!files.length) return;

      // Add files to upload queue
      setUploads((prev) => [
        ...files.map((f) => ({ name: f.name, status: "queued" as const })),
        ...prev,
      ]);

      // Upload files sequentially
      for (const file of files) {
        setUploads((prev) =>
          prev.map((it) =>
            it.name === file.name ? { ...it, status: "uploading" } : it
          )
        );

        try {
          const result = await uploadFile(file);
          setUploads((prev) =>
            prev.map((it) =>
              it.name === file.name
                ? { ...it, status: "done", path: result.path }
                : it
            )
          );
        } catch (error: any) {
          setUploads((prev) =>
            prev.map((it) =>
              it.name === file.name
                ? { ...it, status: "error", error: error?.message || "Upload failed" }
                : it
            )
          );
        }
      }

      // Auto-regenerate manifest and reload gallery after uploads complete
      if (passwordHash) {
        try {
          await fetch("/api/admin/regenerate-gallery", {
            method: "POST",
            headers: {
              authorization: `Bearer ${passwordHash}`,
            },
          });
        } catch (error) {
          console.error("Failed to regenerate manifest:", error);
        }
      }
      await loadGallery();
    },
    [category, passwordHash, loadGallery]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((f) =>
        f.type.startsWith("image/")
      );

      if (!files.length) return;

      // Add files to upload queue
      setUploads((prev) => [
        ...files.map((f) => ({ name: f.name, status: "queued" as const })),
        ...prev,
      ]);

      // Upload files sequentially
      for (const file of files) {
        setUploads((prev) =>
          prev.map((it) =>
            it.name === file.name ? { ...it, status: "uploading" } : it
          )
        );

        try {
          const result = await uploadFile(file);
          setUploads((prev) =>
            prev.map((it) =>
              it.name === file.name
                ? { ...it, status: "done", path: result.path }
                : it
            )
          );
        } catch (error: any) {
          setUploads((prev) =>
            prev.map((it) =>
              it.name === file.name
                ? { ...it, status: "error", error: error?.message || "Upload failed" }
                : it
            )
          );
        }
      }

      // Reset file input
      e.target.value = "";

      // Auto-regenerate manifest and reload gallery after uploads complete
      if (passwordHash) {
        try {
          await fetch("/api/admin/regenerate-gallery", {
            method: "POST",
            headers: {
              authorization: `Bearer ${passwordHash}`,
            },
          });
        } catch (error) {
          console.error("Failed to regenerate manifest:", error);
        }
      }
      await loadGallery();
    },
    [category, passwordHash, loadGallery]
  );

  const handleRegenerate = async () => {
    if (!passwordHash) return;

    setRegenerating(true);
    try {
      const res = await fetch("/api/admin/regenerate-gallery", {
        method: "POST",
        headers: {
          authorization: `Bearer ${passwordHash}`,
        },
      });

      const data = await res.json();
      if (data.ok) {
        await loadGallery();
        alert("Gallery manifest regenerated successfully!");
      } else {
        alert(`Failed to regenerate: ${data.error}`);
      }
    } catch (error: any) {
      alert(`Error: ${error?.message || "Failed to regenerate gallery"}`);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Photo Upload</h1>
        <p className="text-gray-600">
          Upload images to the gallery. They will be automatically added to the gallery manifest.
        </p>
      </div>

      {/* Category Selection */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category (optional)
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-3 py-2 min-w-[200px]"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Select a category to organize photos into subdirectories
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={[
          "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
          dragOver ? "bg-gray-50 border-black" : "border-gray-300 bg-white",
        ].join(" ")}
      >
        <div className="space-y-4">
          <div>
            <div className="text-lg font-medium mb-2">Drag & drop images here</div>
            <div className="text-sm text-gray-600 mb-4">
              or click to select files
            </div>
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="inline-block rounded-lg bg-black px-6 py-2 text-white cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Select Files
            </label>
          </div>
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG, WebP, GIF (max 10MB per file)
          </p>
        </div>
      </div>

      {/* Upload Status */}
      {uploads.length > 0 && (
        <div className="rounded-lg border p-4">
          <h2 className="text-base font-semibold mb-3">Upload Status</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {uploads.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <span className="w-64 truncate font-mono text-xs">{item.name}</span>
                {item.status === "queued" && (
                  <span className="text-gray-500">Queued</span>
                )}
                {item.status === "uploading" && (
                  <span className="text-blue-600">Uploading...</span>
                )}
                {item.status === "done" && (
                  <span className="text-green-600">✓ Uploaded</span>
                )}
                {item.status === "error" && (
                  <span className="text-red-600">✗ {item.error}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Preview */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold">Gallery Preview</h2>
            <p className="text-sm text-gray-600">
              Showing {galleryPhotos.length} of {galleryCount} photos
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadGallery}
              disabled={loadingGallery}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              {loadingGallery ? "Loading..." : "Refresh"}
            </button>
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="rounded-lg bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {regenerating ? "Regenerating..." : "Regenerate Manifest"}
            </button>
          </div>
        </div>

        {loadingGallery ? (
          <div className="text-center py-8 text-gray-500">Loading gallery...</div>
        ) : galleryPhotos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No photos in gallery yet. Upload some images to get started!
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                  {photo.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function Uploads() {
  return (
    <AdminGate title="Admin · Uploads">
      <UploadContent />
    </AdminGate>
  );
}
