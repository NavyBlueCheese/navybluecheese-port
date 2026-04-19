// src/app/page.tsx
import Link from 'next/link';
import GlitchHero from '@/components/GlitchHero';
import TransmissionCard from '@/components/TransmissionCard';
import ResearchStrip from '@/components/ResearchStrip';
import { prisma } from '@/lib/prisma';
import { Post } from '@/types';

async function getLatestPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });
    return posts.map((p) => ({
      ...p,
      publishedAt: p.publishedAt?.toISOString() ?? null,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    })) as Post[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      {/* ── Hero ── */}
      <GlitchHero />

      {/* ── Latest Transmissions ── */}
      <section id="transmissions" className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="signal-dot" />
              <span className="font-mono text-xs text-muted tracking-widest">
                LATEST TRANSMISSIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl text-ink">Recent Writings</h2>
          </div>
          <Link
            href="/writing"
            className="hidden sm:block font-mono text-xs tracking-widest text-muted hover:text-ink-2 transition-colors duration-200 border-b border-muted/30 pb-0.5"
          >
            ALL TRANSMISSIONS →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <p className="font-mono text-muted text-xs tracking-widest">NO SIGNAL — CHECK BACK SOON</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {posts.map((post, i) => (
              <div key={post.id} className="bg-bg">
                <TransmissionCard post={post} index={i} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            href="/writing"
            className="font-mono text-xs tracking-widest text-muted hover:text-ink-2 transition-colors"
          >
            ALL TRANSMISSIONS →
          </Link>
        </div>
      </section>

      {/* ── Research Lab ── */}
      <section className="border-t border-border py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="signal-dot amber" />
                <span className="font-mono text-xs text-muted tracking-widest">
                  RESEARCH LAB
                </span>
              </div>
              <h2 className="font-serif text-3xl text-ink">Active Projects</h2>
            </div>
            <Link
              href="/research"
              className="hidden sm:block font-mono text-xs tracking-widest text-muted hover:text-ink-2 transition-colors border-b border-muted/30 pb-0.5"
            >
              FULL LAB →
            </Link>
          </div>

          <ResearchStrip />
        </div>
      </section>

      {/* ── About Strip ── */}
      <section className="border-t border-border py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="signal-dot" style={{ background: 'var(--amber)', boxShadow: '0 0 6px var(--amber)' }} />
                <span className="font-mono text-xs text-muted tracking-widest">SIGNAL SOURCE</span>
              </div>
              <h2 className="font-serif text-4xl text-ink mb-6 leading-tight">
                A human who contains multitudes.
              </h2>
              <p className="font-serif text-ink-2 text-lg leading-relaxed mb-6">
                Thai by origin, Korean by study, borderless by curiosity. I research financial
                markets by day, draw manga by night, and spend the in-between writing things that
                don't fit neatly anywhere.
              </p>
              <p className="font-sans text-ink-2 text-sm leading-relaxed mb-8">
                Four spoken languages. One signed. Interests that span from stochastic calculus
                to storyboarding. Currently based in Seoul.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 font-mono text-xs tracking-widest text-ink-2 border border-border px-5 py-3 hover:border-border-2 hover:bg-surface transition-all duration-300"
              >
                FULL SIGNAL →
              </Link>
            </div>

            {/* Right: language + interest pills */}
            <div>
              {/* Languages */}
              <div className="mb-8">
                <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
                  LANGUAGES
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { lang: 'Thai', level: 'Native', color: 'text-signal border-signal/30' },
                    { lang: 'English', level: 'Fluent', color: 'text-ink border-border-2' },
                    { lang: '日本語', level: 'Fluent', color: 'text-ink border-border-2' },
                    { lang: '한국어', level: 'Advanced', color: 'text-amber border-amber/30' },
                    { lang: 'Sign Lang', level: 'Intermediate', color: 'text-ink-2 border-border' },
                  ].map((l) => (
                    <span
                      key={l.lang}
                      className={`font-mono text-xs border px-3 py-1.5 ${l.color}`}
                    >
                      {l.lang}
                      <span className="text-muted text-[10px] ml-2">{l.level}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
                  FREQUENCIES
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Quant Finance', 'Market Microstructure', 'FX Derivatives',
                    'Applied ML', 'Manga Illustration', 'Animation', 'Graphic Design',
                    'Cryptography', 'ESL Teaching', 'Debate', 'Badminton', 'Web Dev',
                  ].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[10px] text-muted border border-border px-2 py-1 hover:text-ink-2 hover:border-border-2 transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
