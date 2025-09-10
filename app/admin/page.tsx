'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminIndex() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlKey = params.get('key');
    const stored = sessionStorage.getItem('ADMIN_KEY');
    if (urlKey) sessionStorage.setItem('ADMIN_KEY', urlKey);
    setOk(Boolean(urlKey || stored));
  }, []);

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
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <li className="rounded-lg border p-4">
          <h2 className="font-medium mb-1">Photos</h2>
          <p className="text-sm text-gray-600 mb-2">Upload and manage images.</p>
          <Link className="underline" href="/admin/photos">Open /admin/photos</Link>
        </li>

        <li className="rounded-lg border p-4">
          <h2 className="font-medium mb-1">Before/After Uploads</h2>
          <p className="text-sm text-gray-600 mb-2">Drag-drop paired images for the gallery.</p>
          <Link className="underline" href="/admin/uploads">Open /admin/uploads</Link>
        </li>

        <li className="rounded-lg border p-4">
          <h2 className="font-medium mb-1">Site Photos</h2>
          <p className="text-sm text-gray-600 mb-2">Pick HERO and homepage card images.</p>
          <a className="underline" href="/admin/site-photos">Open /admin/site-photos</a>
        </li>
      </ul>
    </main>
  );
}
