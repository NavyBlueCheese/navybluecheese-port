// src/app/research/page.tsx
import type { Metadata } from 'next';
import ResearchStrip from '@/components/ResearchStrip';

export const metadata: Metadata = { title: 'Research Lab' };

const INTERESTS = [
  { area: 'Quantitative Finance', desc: 'Stochastic calculus, derivatives pricing, risk models.' },
  { area: 'Financial Engineering', desc: 'Structured products, numerical methods, model calibration.' },
  { area: 'Market Microstructure', desc: 'Price formation, liquidity, order book dynamics.' },
  { area: 'Algorithmic Trading', desc: 'Signal generation, execution strategy, HFT mechanics.' },
  { area: 'Applied ML in Finance', desc: 'Neural PDEs, forecasting, representation learning.' },
  { area: 'International Finance', desc: 'FX dynamics, capital flows, sovereign risk.' },
  { area: 'FX Derivatives', desc: 'Exotic options, volatility surfaces, FX hedging.' },
  { area: 'Accessible Education Tech', desc: 'Tools and frameworks for equitable learning access.' },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen pt-14">
      {/* ── Header ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="signal-dot amber" />
            <span className="font-mono text-xs text-muted tracking-widest">
              RESEARCH LAB · ACTIVE EXPERIMENTS
            </span>
          </div>
          <h1 className="font-serif text-5xl text-ink leading-tight mb-4">The Lab</h1>
          <p className="font-sans text-ink-2 text-base max-w-xl">
            A lab notebook. Three active research streams, all sitting at the edge of
            where mathematics meets financial reality.
          </p>
        </div>
      </div>

      {/* ── Projects ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-muted tracking-widest">ACTIVE PROJECTS</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <ResearchStrip />
      </div>

      {/* ── Research Interests ── */}
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted tracking-widest">RESEARCH INTERESTS</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {INTERESTS.map((interest, i) => (
              <div key={i} className="bg-surface hover:bg-surface-2 p-6 transition-colors duration-300 group">
                <div className="font-mono text-[10px] text-muted mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-serif text-ink text-base leading-snug mb-2 group-hover:text-signal transition-colors duration-200">
                  {interest.area}
                </h3>
                <p className="font-sans text-muted text-xs leading-relaxed">
                  {interest.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Methods / Stack ── */}
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-xs text-muted tracking-widest">TOOLS &amp; METHODS</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: 'Languages',
                items: ['Python', 'R', 'MATLAB', 'Julia', 'SQL', 'TypeScript'],
              },
              {
                category: 'Libraries / Frameworks',
                items: ['PyTorch', 'JAX', 'NumPy', 'pandas', 'statsmodels', 'scikit-learn', 'QuantLib'],
              },
              {
                category: 'Methods',
                items: ['Monte Carlo', 'PINNs', 'Panel Econometrics', 'Regime Switching', 'Kalman Filtering', 'Backtesting'],
              },
            ].map((group) => (
              <div key={group.category}>
                <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
                  {group.category.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs text-ink-2 border border-border px-2.5 py-1 hover:border-border-2 hover:text-ink transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact for research ── */}
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-muted tracking-widest mb-2">COLLABORATION</p>
              <p className="font-serif text-ink text-lg">
                Open to research collaborations, paper co-authorship, and academic discussion.
              </p>
            </div>
            <a
              href="mailto:navy@nunnapat.com"
              className="font-mono text-xs tracking-widest text-signal border border-signal/30 px-5 py-3 hover:bg-signal/5 transition-all shrink-0 whitespace-nowrap"
            >
              INITIATE CONTACT →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
