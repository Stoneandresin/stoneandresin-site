// app/admin/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const urlKey = new URLSearchParams(window.location.search).get("key");
    const storedKey = sessionStorage.getItem("ADMIN_KEY");
    if (urlKey) sessionStorage.setItem("ADMIN_KEY", urlKey);
    setOk(Boolean(urlKey || storedKey));
  }, []);

  if (!ok) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="mb-2 text-2xl font-semibold">Restricted</h1>
        <p className="text-gray-600">
          Append <code>?key=YOUR_ADMIN_KEY</code> to the URL.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <nav className="flex flex-col gap-3">
        <Link
          href="/admin/photos"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Photos
        </Link>
        <Link
          href="/admin/uploads"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Uploads
        </Link>
      </nav>
    </main>
  );
}
