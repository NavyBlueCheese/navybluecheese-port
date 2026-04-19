// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="font-mono text-[10px] text-muted tracking-widest mb-6">
          <span className="signal-dot mr-2" style={{ background: 'var(--muted)', boxShadow: 'none', animation: 'none' }} />
          SIGNAL LOST · ERROR 404
        </div>
        <h1 className="font-serif text-7xl text-ink mb-4" style={{ opacity: 0.15 }}>404</h1>
        <p className="font-serif text-xl text-ink-2 mb-2">Transmission not found.</p>
        <p className="font-mono text-xs text-muted mb-10">
          This frequency doesn&apos;t exist or has been discontinued.
        </p>
        <Link
          href="/"
          className="font-mono text-xs tracking-widest text-signal border border-signal/30 px-5 py-3 hover:bg-signal/5 transition-all"
        >
          ← RETURN TO SIGNAL
        </Link>
      </div>
    </div>
  );
}
