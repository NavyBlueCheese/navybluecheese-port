// src/components/Footer.tsx
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="signal-dot" />
              <span className="font-mono text-xs text-muted tracking-widest">NAVY.SYS — ONLINE</span>
            </div>
            <p className="font-serif text-ink-2 text-sm max-w-xs leading-relaxed">
              Nunnapat Pulsawas. Researcher, writer, illustrator. Seoul, Korea.
            </p>
          </div>

          {/* Center - links */}
          <div className="flex flex-col gap-2">
            {[
              { href: '/writing', label: 'Transmissions' },
              { href: '/research', label: 'Lab' },
              { href: '/about', label: 'About' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-xs text-muted hover:text-ink-2 transition-colors tracking-widest"
              >
                → {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="font-mono text-[10px] text-muted tracking-widest mb-1">
              TH · EN · JP · KR · SL
            </p>
            <p className="font-mono text-[10px] text-muted">
              © {new Date().getFullYear()} Navy Pulsawas
            </p>
            <p className="font-mono text-[10px] text-muted/50 mt-1">
              All frequencies reserved.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted/40 tracking-widest">
            SIGNAL STATUS: NOMINAL · UPTIME: ∞
          </span>
          <Link
            href="/admin"
            className="font-mono text-[10px] text-muted/30 hover:text-muted transition-colors tracking-widest"
          >
            [ADMIN]
          </Link>
        </div>
      </div>
    </footer>
  );
}
