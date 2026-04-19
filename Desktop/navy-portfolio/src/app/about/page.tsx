// src/app/about/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About' };

const LANGUAGES = [
  { lang: 'Thai', native: 'ภาษาไทย', level: 'Native', bars: 5, note: 'Mother tongue. I dream in this.' },
  { lang: 'English', native: 'English', level: 'Fluent', bars: 5, note: 'Second language. Primary language of thought for research.' },
  { lang: 'Japanese', native: '日本語', level: 'Fluent', bars: 4, note: 'From years of anime and manga. Functional in all contexts.' },
  { lang: 'Korean', native: '한국어', level: 'Advanced', bars: 4, note: 'Currently living in Seoul. B2 proficiency and improving.' },
  { lang: 'Sign Language', native: '手話 / ASL', level: 'Intermediate', bars: 3, note: 'A language I deeply love. Ongoing learning.' },
];

const TIMELINE = [
  { year: '2003', event: 'Born in Thailand. Began collecting frequencies.' },
  { year: '2017', event: 'Published first original manga at age 14. 40+ pages, no regrets.' },
  { year: '2020', event: 'Started seriously studying Japanese. Discovered that language is a technology.' },
  { year: '2022', event: 'Admitted to Korea University. Chose Financial Engineering × International Commerce because the intersection felt most alive.' },
  { year: '2023', event: 'First research paper submitted. Began learning Korean through complete immersion.' },
  { year: '2024', event: 'Launched three concurrent research projects. Started teaching ESL on weekends.' },
  { year: '2025', event: 'Still here. Still writing, drawing, researching, decoding.' },
];

const CREATIVE = [
  {
    title: 'Manga Illustration',
    desc: 'I draw doujin and original manga. Primarily shounen and slice-of-life. Currently working on an original series about a signal analyst in a post-communication world. Published independently.',
    tags: ['Doujin', 'Original Manga', 'Shounen', 'Slice of Life'],
  },
  {
    title: 'Animation',
    desc: 'Frame-by-frame animation for short sequences. Mostly used in webtoon-style storytelling and motion graphics. Learning 3D compositing.',
    tags: ['Frame-by-Frame', 'Webtoon', 'Motion Graphics'],
  },
  {
    title: 'Graphic Design',
    desc: 'Posters, editorial layout, cover art for my own publications. Heavy influence from Japanese graphic design — negative space, strong typographic hierarchy.',
    tags: ['Editorial', 'Poster Design', 'Cover Art', 'Typography'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Design systems, interaction design, user research. I think good design is good communication — same skill as writing, applied visually.',
    tags: ['Design Systems', 'Figma', 'User Research'],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-14">
      {/* ── Hero Panel ── manga-offset layout ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Large text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="signal-dot" />
                <span className="font-mono text-xs text-muted tracking-widest">IDENTITY FILE</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-8">
                Hi, I'm Navy.
              </h1>
              <div className="space-y-4 font-serif text-ink-2 text-lg leading-relaxed">
                <p>
                  Thai by birth. Korean by study. Borderless by temperament.
                  I'm a second-year undergraduate at{' '}
                  <span className="text-ink">Korea University</span> in Seoul, where I'm
                  double-majoring in{' '}
                  <span className="text-ink">Financial Engineering</span> and{' '}
                  <span className="text-ink">International Commerce</span>.
                </p>
                <p>
                  My main thing is research — specifically at the intersection of quantitative
                  finance, machine learning, and international economics. But calling that "my main
                  thing" is already an oversimplification.
                </p>
                <p>
                  I also draw manga. I publish it. I write fiction and journal entries and academic
                  papers and articles that don't fit either category. I speak four languages and
                  know sign language. I design, animate, and build. I teach ESL on weekends. I
                  debate and play badminton. I have a folder on my desktop called "ideas" with 847
                  files in it.
                </p>
                <p className="text-ink">
                  This is a site for all of that. Not a portfolio. A transmission.
                </p>
              </div>
            </div>

            {/* Right: Double-frame offset panel — manga aesthetic */}
            <div className="lg:col-span-5 relative">
              {/* Outer frame */}
              <div
                className="border border-border p-1 relative"
                style={{ transform: 'rotate(1deg)' }}
              >
                {/* Inner frame */}
                <div
                  className="border border-border-2 bg-surface-2 aspect-square relative overflow-hidden flex items-center justify-center"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  {/* Manga panel placeholder */}
                  <div className="absolute inset-0 grid-backdrop opacity-40" />
                  <div className="relative z-10 text-center p-8">
                    <div className="font-serif text-8xl text-ink/10 select-none mb-4">ナ</div>
                    <div className="font-mono text-[10px] text-muted tracking-widest mb-2">
                      NUNNAPAT · NAVY
                    </div>
                    <div className="font-mono text-[10px] text-muted/50">
                      B.Sc. CANDIDATE · KU · SEOUL
                    </div>
                  </div>
                  {/* Corner marks — manga crop marks */}
                  {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-3 h-3 border-signal/30`}
                      style={{
                        borderTop: i < 2 ? '1px solid rgba(155,255,110,0.3)' : 'none',
                        borderBottom: i >= 2 ? '1px solid rgba(155,255,110,0.3)' : 'none',
                        borderLeft: i % 2 === 0 ? '1px solid rgba(155,255,110,0.3)' : 'none',
                        borderRight: i % 2 === 1 ? '1px solid rgba(155,255,110,0.3)' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Offset caption box */}
              <div
                className="absolute -bottom-4 -right-4 bg-bg border border-border px-4 py-2"
              >
                <p className="font-mono text-[10px] text-muted">
                  <span className="text-signal">●</span> ONLINE · SEOUL, KR
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Languages ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted tracking-widest">LANGUAGES</span>
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] text-muted">5 FREQUENCIES</span>
          </div>

          <div className="space-y-0 divide-y divide-border">
            {LANGUAGES.map((lang) => (
              <div key={lang.lang} className="py-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="sm:w-40 shrink-0">
                  <p className="font-serif text-ink text-lg">{lang.lang}</p>
                  <p className="font-mono text-xs text-muted">{lang.native}</p>
                </div>
                <div className="sm:w-28 shrink-0">
                  <span className="font-mono text-[10px] text-ink-2 border border-border px-2 py-0.5">
                    {lang.level}
                  </span>
                </div>
                {/* Signal bars */}
                <div className="flex items-center gap-1 sm:w-24 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-sm"
                      style={{
                        height: `${8 + i * 3}px`,
                        backgroundColor: i < lang.bars ? 'var(--signal)' : 'var(--border-2)',
                        opacity: i < lang.bars ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
                <p className="font-sans text-sm text-ink-2 flex-1">{lang.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Creative Work ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted tracking-widest">CREATIVE WORK</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {CREATIVE.map((item, i) => (
              <div key={i} className="bg-surface hover:bg-surface-2 p-6 transition-colors duration-300 group">
                <div className="font-mono text-[10px] text-muted mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-serif text-ink text-xl mb-3 group-hover:text-signal transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-sans text-ink-2 text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-muted border border-border px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted tracking-widest">TRANSMISSION LOG</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-8 py-5 group">
                  <div className="w-16 shrink-0 text-right">
                    <span className="font-mono text-xs text-muted group-hover:text-signal transition-colors duration-200">
                      {item.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="relative flex items-center">
                    <div
                      className="w-2 h-2 rounded-full border border-border group-hover:border-signal group-hover:bg-signal/20 transition-all duration-200 -ml-1 z-10 bg-bg"
                    />
                  </div>
                  <p className="font-serif text-ink-2 text-base group-hover:text-ink transition-colors duration-200 flex-1 pt-0.5">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Currently ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <span className="signal-dot" />
          <span className="font-mono text-xs text-muted tracking-widest">CURRENTLY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
          {[
            { label: 'Reading', content: 'Rough volatility papers. Designing Terror by George Aiken. A Korean novel I keep having to look words up for.' },
            { label: 'Building', content: 'This site. An end-to-end algorithmic trading system. A manga chapter that\'s been 60% done for three months.' },
            { label: 'Thinking About', content: 'Whether information is ever actually lost. The semiotics of financial markets. What language sounds like from the inside.' },
          ].map((item) => (
            <div key={item.label} className="bg-surface p-6">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
                {item.label.toUpperCase()}
              </p>
              <p className="font-serif text-ink-2 text-sm leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/writing"
            className="font-mono text-xs tracking-widest text-ink-2 border border-border px-5 py-3 hover:border-border-2 hover:bg-surface transition-all duration-200"
          >
            READ MY WRITING →
          </Link>
          <Link
            href="/research"
            className="font-mono text-xs tracking-widest text-muted hover:text-ink-2 transition-colors duration-200"
          >
            SEE THE LAB →
          </Link>
        </div>
      </div>
    </div>
  );
}
