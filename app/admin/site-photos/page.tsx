'use client';

import { useEffect, useState } from 'react';
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';

type SiteImages = {
  hero?: string;
  card1?: string;
  card2?: string;
  card3?: string;
  gallery?: string[];
};

export default function SitePhotos() {
  const [m, setM] = useState<SiteImages>({ gallery: [] });
  const [busy, setBusy] = useState(false);
  const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;

  // Load current settings
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/settings', { cache: 'no-store' });
      if (res.ok) setM(await res.json());
    })();
  }, []);

  const handleUpload =
    (slot?: keyof SiteImages) =>
    (res: CloudinaryUploadWidgetResults) => {
      const info = res?.info;
      if (!info || typeof info === 'string') return;
      const id = (info as CloudinaryUploadWidgetInfo).public_id;
      if (!id) return;

      if (!slot || slot === 'gallery') {
        setM(p => ({ ...p, gallery: [id, ...(p.gallery || [])] }));
      } else {
        setM(p => ({ ...p, [slot]: id }));
      }
    };

  async function save() {
    setBusy(true);
    await fetch('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify(m),
    });
    setBusy(false);
    alert('Saved ✓');
  }

  const Slot = ({ name, val }: { name: keyof SiteImages; val?: string }) => (
    <div className="rounded border p-3">
      <div className="mb-1 font-medium">{name.toUpperCase()}</div>
      <div className="text-xs text-gray-600 mb-2 break-all">{val || 'empty'}</div>
      {unsignedPreset ? (
        <CldUploadWidget uploadPreset={unsignedPreset} onUpload={handleUpload(name)}>
          {({ open }) => (
            <button type="button" className="rounded border px-3 py-2" onClick={() => open?.()}>
              Upload & set
            </button>
          )}
        </CldUploadWidget>
      ) : (
        <p className="text-xs rounded bg-yellow-50 p-2 text-yellow-900">
          Missing env: <code>NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET</code>
        </p>
      )}
      {val && (
        <button
          type="button"
          className="ml-2 text-sm underline"
          onClick={() => setM(p => ({ ...p, [name]: undefined }))}
        >
          Clear
        </button>
      )}
    </div>
  );

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin · Site Photos</h1>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Slot name="hero" val={m.hero} />
        <Slot name="card1" val={m.card1} />
        <Slot name="card2" val={m.card2} />
        <Slot name="card3" val={m.card3} />
      </section>

      <section className="rounded border p-3">
        <div className="mb-2 font-medium">Gallery</div>
        <div className="mb-3 flex flex-wrap gap-2">
          {unsignedPreset ? (
            <CldUploadWidget uploadPreset={unsignedPreset} onUpload={handleUpload('gallery')}>
              {({ open }) => (
                <button type="button" className="rounded border px-3 py-2" onClick={() => open?.()}>
                  Add to gallery
                </button>
              )}
            </CldUploadWidget>
          ) : null}

          {(m.gallery ?? []).map(id => (
            <div key={id} className="flex items-center gap-2 text-xs">
              <span className="truncate max-w-[240px]">{id}</span>
              <button
                type="button"
                className="text-red-600"
                onClick={() =>
                  setM(p => ({ ...p, gallery: (p.gallery || []).filter(x => x !== id) }))
                }
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        disabled={busy}
        onClick={save}
        className="rounded-lg border px-4 py-2"
      >
        {busy ? 'Saving…' : 'Save changes'}
      </button>
    </main>
  );
}
