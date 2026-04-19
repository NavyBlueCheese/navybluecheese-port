'use client';
// src/components/Cursor.tsx

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hovering = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onMouseEnterLink = () => {
      hovering.current = true;
      ringEl.style.width = '48px';
      ringEl.style.height = '48px';
      ringEl.style.borderColor = 'rgba(155, 255, 110, 0.8)';
      ringEl.style.mixBlendMode = 'normal';
    };

    const onMouseLeaveLink = () => {
      hovering.current = false;
      ringEl.style.width = '32px';
      ringEl.style.height = '32px';
      ringEl.style.borderColor = 'rgba(155, 255, 110, 0.3)';
      ringEl.style.mixBlendMode = 'difference';
    };

    const animate = () => {
      const ease = 0.12;
      ring.current.x += (mouse.current.x - ring.current.x) * ease;
      ring.current.y += (mouse.current.y - ring.current.y) * ease;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);
    addLinkListeners();

    // Observe DOM for new links
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-signal rounded-full pointer-events-none z-[99999] transition-opacity duration-300"
        style={{ boxShadow: '0 0 8px rgba(155, 255, 110, 0.8)' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-signal/30 rounded-full pointer-events-none z-[99998] transition-[width,height,border-color] duration-300"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
}
