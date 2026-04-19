'use client';
// src/components/GlitchHero.tsx

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

function useDecodeText(target: string, delay: number = 0) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        if (frame >= target.length * 3) {
          setDisplay(target);
          setDone(true);
          clearInterval(interval);
          return;
        }

        const resolved = Math.floor(frame / 3);
        let str = '';
        for (let i = 0; i < target.length; i++) {
          if (i < resolved) {
            str += target[i];
          } else if (target[i] === ' ') {
            str += ' ';
          } else {
            str += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(str);
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target, delay]);

  return { display, done };
}

export default function GlitchHero() {
  const [phase, setPhase] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const name = useDecodeText('NAVY', 900);
  const full = useDecodeText('Nunnapat Pulsawas', 1800);
  const title = useDecodeText('Financial Engineer · Researcher · Writer · Illustrator', 2600);

  const scrollDown = () => {
    const el = document.getElementById('transmissions');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-backdrop scanline-container"
      ref={scrollRef}
    >
      {/* Background grid glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(155,255,110,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Glitch overlay layers */}
      {phase >= 2 && (
        <>
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{ zIndex: 1 }}
            aria-hidden
          >
            <div
              className="absolute font-mono font-bold text-signal/10"
              style={{
                fontSize: 'clamp(80px, 18vw, 200px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                letterSpacing: '-0.04em',
                animation: 'glitch1 3s infinite',
                clipPath: 'inset(0 0 100% 0)',
              }}
            >
              NAVY
            </div>
            <div
              className="absolute font-mono font-bold text-amber/10"
              style={{
                fontSize: 'clamp(80px, 18vw, 200px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                letterSpacing: '-0.04em',
                animation: 'glitch2 3s infinite',
                clipPath: 'inset(0 0 100% 0)',
              }}
            >
              NAVY
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 w-full">
        {/* Signal prefix */}
        <div
          className="mb-8 flex items-center gap-3"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <span className="signal-dot" />
          <span className="font-mono text-xs text-muted tracking-widest">
            SIGNAL RECEIVED · DECODING IDENTITY
          </span>
        </div>

        {/* Big name */}
        <div
          className="mb-4"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <h1
            className="font-serif font-bold text-ink leading-none relative"
            style={{ fontSize: 'clamp(72px, 14vw, 160px)', letterSpacing: '-0.03em' }}
          >
            {name.display || '\u00A0'}
          </h1>
        </div>

        {/* Full name */}
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <p className="font-mono text-ink-2 text-sm tracking-widest mb-6">
            {full.display || '\u00A0'}
          </p>
        </div>

        {/* Title / description */}
        <div
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <p className="font-mono text-muted text-xs tracking-wider max-w-2xl mb-10">
            {title.display || '\u00A0'}
          </p>

          <p
            className="font-serif text-ink-2 text-xl max-w-lg leading-relaxed mb-12"
          >
            Undergrad at{' '}
            <span className="text-ink">Korea University</span>, double-majoring in{' '}
            <span className="text-ink">Financial Engineering</span> &{' '}
            <span className="text-ink">International Commerce</span>.
            I write, research, draw manga, and collect frequencies.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/writing"
              className="group flex items-center gap-3 font-mono text-xs tracking-widest text-signal border border-signal/30 px-5 py-3 hover:bg-signal/5 transition-all duration-300"
            >
              <span className="signal-dot w-1 h-1" />
              READ TRANSMISSIONS
              <span className="text-signal/40 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <Link
              href="/research"
              className="font-mono text-xs tracking-widest text-muted hover:text-ink-2 transition-colors duration-200"
            >
              VIEW LAB →
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll prompt */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-300"
        style={{
          opacity: phase >= 4 ? undefined : '0 !important',
          transition: 'opacity 0.8s ease 0.5s',
        }}
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] tracking-widest text-muted">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted to-transparent" />
      </button>

      {/* Corner decorations */}
      <div className="absolute top-16 right-8 font-mono text-[10px] text-muted/30 tracking-widest hidden lg:block">
        <div>LAT: 37.5894° N</div>
        <div>LNG: 127.0325° E</div>
        <div className="mt-1 text-signal/30">SEOUL · KR</div>
      </div>
    </section>
  );
}
