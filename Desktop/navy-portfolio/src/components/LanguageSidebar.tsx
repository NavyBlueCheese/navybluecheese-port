'use client';
// src/components/LanguageSidebar.tsx

import { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'TH', label: 'ภาษาไทย', native: 'Thai', level: 'native' },
  { code: 'EN', label: 'English', native: 'English', level: 'fluent' },
  { code: 'JP', label: '日本語', native: 'Japanese', level: 'fluent' },
  { code: 'KR', label: '한국어', native: 'Korean', level: 'advanced' },
  { code: 'SL', label: '手話', native: 'Sign Lang', level: 'intermediate' },
];

export default function LanguageSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {LANGUAGES.map((lang, i) => (
        <div
          key={lang.code}
          className="group flex items-center gap-3 pr-4 py-2.5 relative"
          style={{
            transitionDelay: `${i * 80}ms`,
          }}
        >
          {/* Tooltip on hover */}
          <div className="absolute right-full mr-3 px-2.5 py-1 bg-surface border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            <span className="font-sans text-xs text-ink-2">{lang.label}</span>
            <span className="font-mono text-[10px] text-muted ml-2">{lang.level}</span>
          </div>

          {/* Level indicator line */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {['native', 'fluent', 'advanced', 'intermediate'].map((lvl, j) => (
              <div
                key={j}
                className="w-1 rounded-full"
                style={{
                  height: '10px',
                  backgroundColor:
                    j <=
                    ['native', 'fluent', 'advanced', 'intermediate'].indexOf(lang.level)
                      ? 'var(--signal)'
                      : 'var(--border-2)',
                  opacity:
                    j <=
                    ['native', 'fluent', 'advanced', 'intermediate'].indexOf(lang.level)
                      ? 1
                      : 0.4,
                }}
              />
            ))}
          </div>

          {/* Code */}
          <span
            className="font-mono text-[10px] tracking-widest text-muted group-hover:text-ink-2 transition-colors duration-200"
            style={{ writingMode: 'horizontal-tb' }}
          >
            {lang.code}
          </span>

          {/* Dot */}
          <div
            className="w-1 h-1 rounded-full bg-border-2 group-hover:bg-signal transition-colors duration-200"
            style={{
              boxShadow: 'none',
            }}
          />
        </div>
      ))}

      {/* Vertical line */}
      <div className="w-px bg-border mt-2 mr-4" style={{ height: '60px' }} />
    </div>
  );
}
