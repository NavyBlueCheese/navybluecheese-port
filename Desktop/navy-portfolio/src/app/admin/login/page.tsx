'use client';
// src/app/admin/login/page.tsx

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid credentials. Try again.');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="signal-dot" />
            <span className="font-mono text-xs text-muted tracking-widest">NAVY.SYS · ADMIN AUTH</span>
          </div>
          <h1 className="font-mono text-xl text-ink">Access Required</h1>
          <p className="font-mono text-xs text-muted mt-1">Authenticate to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] text-muted tracking-widest block mb-2">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              placeholder="username"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-muted tracking-widest block mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-rose-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE →'}
          </button>
        </form>
      </div>
    </div>
  );
}
