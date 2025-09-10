// app/admin/photos/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

type Item = { id: string; url: string };

export default function AdminPhotosPage() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;

  if (!cloudName || !unsignedPreset) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-2">Photos (temporarily unavailable)</h1>
        <p className="text-sm text-gray-600">
          Missing Cloudinary envs. Set <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and
          <code> NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET</code> in Vercel, then redeploy.
        </p>
      </main>
    );
  }

  const [items, setItems] = useState<Item[]>([]);

  const handleUpload = (res: CloudinaryUploadWidgetResults) => {
    const info = res?.info;
    if (info && typeof info !== 'string') {
      const { public_id, secure_url } = info as CloudinaryUploadWidgetInfo;
      if (public_id && secure_url) {
        setItems((prev) => [{ id: public_id, url: secure_url }, ...prev]);
      }
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin · Photos</h1>
        <CldUploadWidget
          uploadPreset={unsignedPreset}
          options={{
            cloudName,
            multiple: true,
            sources: ['local', 'camera', 'url', 'google_drive'],
            maxFiles: 20,
            resourceType: 'image',
          }}
          onUpload={handleUpload}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open?.()}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Upload photos
            </button>
          )}
        </CldUploadWidget>
      </header>

      <section>
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">No uploads yet. Use “Upload photos” to add images.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((it) => (
              <li key={it.id} className="overflow-hidden rounded-lg border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt={it.id} className="h-40 w-full object-cover" />
                <div className="truncate px-2 py-1 text-[11px] text-gray-600">{it.id}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
