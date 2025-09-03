'use client';

import { useEffect, useState } from 'react';
import { CldUploadWidget, type CloudinaryUploadWidgetInfo, type CloudinaryUploadWidgetResults } from 'next-cloudinary';

type SiteImages = { hero?: string; card1?: string; card2?: string; card3?: string; gallery?: string[] };

export default function Admin() {
  const [m, setM] = useState<SiteImages>({ gallery: [] });
  const [busy, setBusy] = useState(false);

  useEffect(() => { (async () => {
    const res = await fetch('/api/admin/settings', { cache: 'no-store' });
    setM(await res.json());
  })(); }, []);

  const handleUpload = (res: CloudinaryUploadWidgetResults, slot?: keyof SiteImages) => {
    const info = res?.info;
    if (info && typeof info !== 'string') {
      const id = (info as CloudinaryUploadWidgetInfo).public_id;
      if (!id) return;
      if (slot && slot !== 'gallery') setM(prev => ({ ...prev, [slot]: id }));
      else setM(prev => ({ ...prev, gallery: [id, ...(prev.gallery || [])] }));
    }
  };

  async function save() {
    setBusy(true);
    await fetch('/api/admin/settings', { method: 'POST', body: JSON.stringify(m) });
    setBusy(false);
    alert('Saved ✓');
  }

  const Uploader = ({ on, label }: { on: (r: CloudinaryUploadWidgetResults)=>void; label: string }) => (
    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET!} onUpload={on} options={{ sources: ['camera','local'], cropping: true }}>
      {({ open }) => <button className="rounded border px-3 py-2" onClick={() => open?.()}>{label}</button>}
    </CldUploadWidget>
  );

  const Slot = ({ name, val }: { name: keyof SiteImages; val?: string }) => (
    <div className="rounded border p-3">
      <div className="mb-2 font-medium">{name.toUpperCase()}</div>
      {val ? <div className="text-xs break-all mb-2">{val}</div> : <div className="text-xs text-gray-500 mb-2">empty</div>}
      <Uploader label="Upload & set" on={(r)=>handleUpload(r, name)} />
      {val && <button className="ml-2 text-sm underline" onClick={() => setM(p=>({ ...p, [name]: undefined }))}>Clear</button>}
    </div>
  );

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin · Site Photos</h1>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Slot name="hero"  val={m.hero}  />
        <Slot name="card1" val={m.card1} />
        <Slot name="card2" val={m.card2} />
        <Slot name="card3" val={m.card3} />
      </section>

      <section className="rounded border p-3">
        <div className="mb-2 font-medium">Gallery</div>
        <div className="mb-3 flex flex-wrap gap-2">
          <Uploader label="Add to gallery" on={(r)=>handleUpload(r, 'gallery')} />
          {(m.gallery ?? []).map(id => (
            <div key={id} className="flex items-center gap-2 text-xs">
              <span className="truncate max-w-[240px]">{id}</span>
              <button className="text-red-600" onClick={()=>setM(p=>({ ...p, gallery: (p.gallery||[]).filter(x=>x!==id) }))}>remove</button>
            </div>
          ))}
        </div>
      </section>

      <button disabled={busy} onClick={save} className="rounded-lg border px-4 py-2">{busy ? 'Saving…' : 'Save changes'}</button>
    </main>
  );
}
