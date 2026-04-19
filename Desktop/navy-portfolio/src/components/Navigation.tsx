'use client';
// src/components/Navigation.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'home', mono: '~/' },
  { href: '/writing', label: 'writing', mono: './tx' },
  { href: '/research', label: 'research', mono: './lab' },
  { href: '/about', label: 'about', mono: './me' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Seoul',
        }) + ' KST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="signal-dot" />
          <span className="font-mono text-xs tracking-widest text-muted group-hover:text-ink transition-colors duration-200">
            NAVY.SYS
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: active ? 'var(--ink)' : 'var(--muted)' }}
              >
                <span className="group-hover:text-ink transition-colors duration-200">
                  {item.label}
                </span>
                {active && (
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-signal"
                    style={{ boxShadow: '0 0 4px var(--signal)' }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Time */}
        <div className="hidden lg:block font-mono text-[10px] text-muted tabular-nums">
          {time}
        </div>

        {/* Mobile menu — simple */}
        <div className="md:hidden flex items-center gap-4">
          {NAV_ITEMS.map((item) => {
            const active = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] tracking-widest"
                style={{ color: active ? 'var(--signal)' : 'var(--muted)' }}
              >
                {item.mono}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
