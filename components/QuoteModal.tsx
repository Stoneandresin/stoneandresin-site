'use client'

import { useState } from 'react';

type Step = 1 | 2 | 3 | 4 | 5;

export default function QuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState('driveway');
  const [sqft, setSqft] = useState<number | ''>('');
  const [condition, setCondition] = useState<'new' | 'cracked' | 'heavy'>('new');
  const [blend, setBlend] = useState('neutral');
  const [photos, setPhotos] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(1);
    setType('driveway');
    setSqft('');
    setCondition('new');
    setBlend('neutral');
    setPhotos([]);
    setName('');
    setPhone('');
    setEmail('');
    setZip('');
    setBusy(false);
    setDone(false);
  };

  const closeModal = () => {
    reset();
    onClose();
  };

  function next() {
    setStep((s) => (s < 5 ? (s + 1) as Step : s));
  }

  function prev() {
    setStep((s) => (s > 1 ? (s - 1) as Step : s));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      // TODO: integrate submission API
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
    } catch (err) {
      alert('Could not submit. Please call 513-787-8798.');
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div aria-modal className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeModal}
      />
      <div className="absolute inset-0 grid place-items-center p-4">
        <form onSubmit={submit} className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div className="font-bold">Free On-Site Estimate</div>
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {!done ? (
            <>
              <div className="p-4">
                {/* progress dots */}
                <div className="flex gap-2 mb-4">
                  {[1,2,3,4,5].map((n) => (
                    <span
                      key={n}
                      className={`h-2 w-2 rounded-full ${
                        n <= step ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    />
                  ))
                }

                {step === 1 && (
                  <div className="space-y-3">
                    <div className="text-sm uppercase subtle">Step 1 of 5</div>
                    <div className="text-lg font-semibold">
                      What are you resurfacing?
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['driveway','patio','pool deck','walkway'].map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setType(t)}
                          className={`rounded-lg border px-4 py-3 text-left ${
                            type === t ? 'border-emerald-600 ring-1 ring-emerald-600' : ''
                          }`}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-4">
                    <div className="text-sm uppercase subtle">Step 2 of 5</div>
                    <label className="grid gap-2">
                      <span className="font-medium">Approx. size (sq ft)</span>
                      <input
                        className="input"
                        type="number"
                        min={0}
                        value={sqft}
                        onChange={(e) =>
                          setSqft(e.target.value === '' ? '' : Number(e.target.value))
                        }
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="font-medium">Surface condition</span>
                      <select
                        className="input"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value as any)}
                      >
                        <option value="new">New / sound slab</option>
                        <option value="cracked">Cracked / moderate repair</option>
                        <option value="heavy">Heavily damaged / buildup</option>
                      </select>
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-4">
                    <div className="text-sm uppercase subtle">Step 3 of 5</div>
                    <label className="grid gap-2">
                      <span className="font-medium">Color blend preference</span>
                      <select
                        className="input"
                        value={blend}
                        onChange={(e) => setBlend(e.target.value)}
                      >
                        <option value="neutral">Neutral / greys</option>
                        <option value="earth">Earth / browns</option>
                        <option value="warm">Warm / reds</option>
                        <option value="mixed">Mixed stone look</option>
                      </select>
                    </label>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-4">
                    <div className="text-sm uppercase subtle">Step 4 of 5</div>
                    <div className="font-medium">Upload photos (optional)</div>
                    <input
                      className="input"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setPhotos(Array.from(e.target.files || []))
                      }
                    />
                    {photos.length > 0 && (
                      <div className="text-xs subtle">
                        {photos.length} photo(s) added
                      </div>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="grid gap-4">
                    <div className="text-sm uppercase subtle">Step 5 of 5</div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="grid gap-1">
                        <span className="font-medium">Full name</span>
                        <input
                          className="input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="font-medium">Phone</span>
                        <input
                          className="input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="font-medium">Email</span>
                        <input
                          className="input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="font-medium">ZIP</span>
                        <input
                          className="input"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t p-4">
                <div className="text-xs subtle">
                  We never share your info. Licensed & insured.
                </div>
                <div className="flex gap-2">
                  {step > 1 && (
                    <button type="button" onClick={prev} className="btn-outline">
                      Back
                    </button>
                  )}
                  {step < 5 && (
                    <button type="button" onClick={next} className="btn">
                      Next
                    </button>
                  )}
                  {step === 5 && (
                    <button type="submit" disabled={busy} className="btn">
                      {busy ? 'Sending…' : 'Book My On-Site Quote'}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-10 text-center space-y-2">
              <div className="text-2xl font-extrabold">Thanks!</div>
              <div className="subtle">
                We’ll text or email to confirm your on-site measure.
              </div>
              <button type="button" onClick={closeModal} className="btn mt-4">
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
