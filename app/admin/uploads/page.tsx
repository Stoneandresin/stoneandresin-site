// app/admin/uploads/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import AdminGate from "@/components/AdminGate";

export default function Uploads() {
  return (
    <AdminGate title="Admin · Uploads">
      <main className="mx-auto max-w-3xl px-6 py-12 space-y-4">
        <h1 className="text-2xl font-semibold">Third-party uploads removed</h1>
        <p className="text-sm text-gray-600">
          Direct uploads to Cloudinary have been intentionally disabled. This keeps the marketing
          site free of vendor widgets and prevents accidental media syncs outside the new pipeline.
        </p>
        <p className="text-sm text-gray-600">
          Use the shared drive process (or reach out to ops) if you need to add before/after pairs.
        </p>
      </main>
    </AdminGate>
  );
}
