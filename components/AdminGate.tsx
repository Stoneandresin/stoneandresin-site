'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'ADMIN_DASHBOARD_OK';

async function sha256(text: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

type GateState = 'checking' | 'needs-auth' | 'ready';

export default function AdminGate({
  children,
  title = 'Admin',
}: {
  children: ReactNode;
  title?: string;
}) {
  const passwordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH;
  const [state, setState] = useState<GateState>('checking');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { hash?: string };
        if (parsed?.hash && passwordHash && parsed.hash === passwordHash) {
          setState('ready');
          return;
        }
      } catch {
        // ignore and fall through to needs-auth
      }
    }
    setState('needs-auth');
  }, [passwordHash]);

  const missingPassword = useMemo(() => !passwordHash, [passwordHash]);

  const verifyPassword = useCallback(
    async (value: string) => {
      if (!passwordHash) return false;
      const hashed = await sha256(value);
      return hashed === passwordHash;
    },
    [passwordHash],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!password.trim()) {
      setError('Enter the admin password.');
      return;
    }

    if (!passwordHash) {
      setError('Admin password hash is not configured.');
      return;
    }

    setSubmitting(true);
    try {
      const ok = await verifyPassword(password.trim());
      if (!ok) {
        setError('Incorrect password. Try again.');
        return;
      }
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ hash: passwordHash }),
      );
      setState('ready');
      setPassword('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState('needs-auth');
  };

  if (missingPassword) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-gray-600">
          Missing <code>NEXT_PUBLIC_ADMIN_PASSWORD_HASH</code>. Set it in your environment
          variables (locally and on Vercel) to enable the admin area.
        </p>
      </main>
    );
  }

  if (state !== 'ready') {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-4">{title} · Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">
              Admin password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border px-3 py-2"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {submitting ? 'Checking…' : 'Unlock admin'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end px-6 pt-6">
        <button type="button" onClick={handleSignOut} className="text-sm text-gray-500 underline">
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
