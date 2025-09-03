'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

type Uploaded = { id: string; url: string };

export default function PhotosAdmin() {
  const [items, setItems] = useState<Uploaded[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (files: File[]) => {
    setBusy(true);
    setError(null);
    const next: Uploaded[] = [];

    for (const file of files) {
      const body = new FormData();
      body.append('file', file);                          // iPhone HEIC is okay
      body.append('upload_preset', UPLOAD_PRESET);        // unsigned preset
      // optional: body.append('folder', 'stoneandresin/gallery');

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body
      });

      if (!res.ok) {
        setError(`Upload failed: ${res.status} ${res.statusText}`);
        continue;
      }

      const json = await res.json();
      next.push({ id: json.public_id, url: json.secure_url });
    }

    setItems((prev) => [...next, ...prev]);
    setBusy(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop
  });

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Upload photos</h1>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
        ${isDragActive ? 'bg-gray-50' : 'bg-white'}`}
      >
        <input
          {...getInputProps()}
          accept="image/*"
          capture="environment"   // iPhone: allow camera
        />
        <p className="mb-2">{isDragActive ? 'Drop to upload…' : 'Drag & drop or tap to choose / take a photo'}</p>
        <p className="text-sm text-gray-500">JPEG/PNG/HEIC supported. Multiple files okay.</p>
      </div>

      {busy && <p className="mt-4 text-sm">Uploading…</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

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
