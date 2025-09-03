'use client';

import { CldUploadWidget, type CloudinaryUploadWidgetInfo, type CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useState } from 'react';

type Item = { id: string; url: string };

export default function PhotosPage() {
  const [items, setItems] = useState<Item[]>([]);

  const handleUpload = (res: CloudinaryUploadWidgetResults) => {
    const info = res?.info;

    // Guard: only proceed when info is the object form (not a string)
    if (info && typeof info !== 'string') {
      const { public_id, secure_url } = info as CloudinaryUploadWidgetInfo;
      if (public_id && secure_url) {
        setItems(prev => [{ id: public_id, url: secure_url }, ...prev]);
      }
    }
  };

  return (
    <div className="p-6">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET!}
        onUpload={handleUpload}
      >
        {({ open }) => (
          <button onClick={() => open?.()} className="rounded-lg border px-4 py-2">
            Upload photos
          </button>
        )}
      </CldUploadWidget>

      <ul className="mt-4 grid grid-cols-2 gap-3">
        {items.map(it => (
          <li key={it.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt={it.id} className="w-full rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
}
