// app/admin/uploads/page.tsx
'use client';
import AdminGate from "@/components/AdminGate";

export default function Uploads() {
  return (
    <AdminGate title="Admin · Uploads">
      <main className="mx-auto max-w-4xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Uploads</h1>
        <p className="text-gray-600">
          Upload functionality has been disabled. Cloudinary integration is removed.
        </p>
      </main>
    </AdminGate>
  );
}
