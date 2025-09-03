'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

export default function PhotosAdmin() {
  const [items, setItems] = useState<{ id: string; url: string }[]>([]);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Upload photos</h1>

      <CldUploadWidget
        uploadPreset={UPLOAD_PRESET}
        options={{
          // optional niceties:
          multiple: true,
          sources: ['local', 'camera', 'url'],
          cropping: false,                  // set true if you want in-widget cropping
          folder: 'stoneandresin/gallery',  // keep assets organized
          maxFiles: 20
        }}
        onSuccess={(res) => {
          // @ts-ignore
          const info = res?.info;
          if (info?.public_id && info?.secure_url) {
            setItems((prev) => [{ id: info.public_id, url: info.secure_url }, ...prev]);
          }
        }}
      >
        {({ open }) => (
          <button onClick={() => open()} className="px-4 py-2 border rounded-lg">
            Open uploader
          </button>
        )}
      </CldUploadWidget>

      <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((u) => (
          <li key={u.id} className="text-sm">
            <img src={u.url} alt={u.id} className="w-full h-40 object-cover rounded-lg" />
            <code className="block mt-2 break-all">{u.id}</code>
          </li>
        ))}
      </ul>
    </main>
  );
}
