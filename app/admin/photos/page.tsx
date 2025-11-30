// app/admin/photos/page.tsx
'use client';
import AdminGate from '@/components/AdminGate';

export default function AdminPhotosPage() {
  return (
    <AdminGate title="Admin · Photos">
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Admin · Photos</h1>
        <p className="mt-4 text-gray-600">
          Photo management has been disabled. Cloudinary integration is removed.
        </p>
      </main>
    </AdminGate>
  );
}
