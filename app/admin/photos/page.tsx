// app/admin/photos/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import AdminGate from '@/components/AdminGate';

export default function AdminPhotosPage() {
  return (
    <AdminGate title="Admin · Photos">
      <main className="mx-auto max-w-3xl px-6 py-12 space-y-4">
        <h1 className="text-2xl font-semibold">Cloud uploads disabled</h1>
        <p className="text-sm text-gray-600">
          Cloudinary-powered photo management has been removed from this deployment. Uploads are no
          longer accepted through the website to prevent third-party media storage from loading on
          the admin surface.
        </p>
        <p className="text-sm text-gray-600">
          Please coordinate photo updates through the internal ops workflow or contact engineering
          if you need the feature restored.
        </p>
      </main>
    </AdminGate>
  );
}
