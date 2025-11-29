
'use client';
import Link from 'next/link';
import AdminGate from '@/components/AdminGate';

function AdminContent() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <ul className="grid gap-4 sm:grid-cols-2">
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
      </ul>
    </main>
  );
}

export default function AdminIndex() {
  return (
    <AdminGate title="Admin">
      <AdminContent />
    </AdminGate>
  );
}
