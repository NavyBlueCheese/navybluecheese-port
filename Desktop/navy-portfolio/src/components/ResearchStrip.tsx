// src/components/ResearchStrip.tsx

interface Project {
  id: string;
  code: string;
  title: string;
  description: string;
  status: 'active' | 'ongoing' | 'draft';
  tags: string[];
  period: string;
}

const PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    code: 'NPDEO',
    title: 'Neural PDE Approaches to Option Pricing under Stochastic Volatility',
    description:
      'Physics-informed neural networks for solving high-dimensional PDEs arising in options pricing with Heston and rough volatility models. Embedding structural inductive bias into network architecture for improved calibration.',
    status: 'active',
    tags: ['PINNs', 'Heston Model', 'Deep Learning', 'Options Pricing', 'PyTorch'],
    period: '2024 — present',
  },
  {
    id: 'PRJ-002',
    code: 'CFASE',
    title: 'Capital Flow Sensitivity & Exchange Rate Volatility in ASEAN',
    description:
      'Regime-switching panel analysis of the asymmetric sensitivity of ASEAN exchange rates to foreign capital flow reversals. Documents a 2–4× amplification effect during reversal events not captured by linear models.',
    status: 'ongoing',
    tags: ['FX', 'Panel Econometrics', 'ASEAN', 'Capital Flows', 'Regime Switching'],
    period: '2024 — present',
  },
  {
    id: 'PRJ-003',
    code: 'EALGO',
    title: 'End-to-End Algorithmic Trading System with Integrated Risk Controls',
    description:
      'Full-stack live trading system covering signal generation, execution, portfolio construction, and real-time risk monitoring. Features a React dashboard and Python backend with broker API integration.',
    status: 'active',
    tags: ['Algorithmic Trading', 'Python', 'React', 'Market Microstructure', 'Risk Management'],
    period: '2025 — present',
  },
];

const STATUS_CONFIG = {
  active: { dot: 'signal-dot', label: 'ACTIVE', color: 'text-signal' },
  ongoing: { dot: 'signal-dot amber', label: 'ONGOING', color: 'text-amber' },
  draft: { dot: 'signal-dot muted', label: 'DRAFT', color: 'text-muted' },
};

export default function ResearchStrip() {
  return (
    <div className="grid grid-cols-1 gap-px bg-border">
      {PROJECTS.map((project, i) => {
        const statusCfg = STATUS_CONFIG[project.status];
        return (
          <div
            key={project.id}
            className="relative bg-surface hover:bg-surface-2 p-6 lg:p-8 transition-colors duration-300 group"
          >
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-muted tracking-widest">{project.id}</span>
                <span className="font-mono text-[10px] tracking-widest text-muted/40">/</span>
                <span className="font-mono text-[10px] text-ink-2 tracking-widest">{project.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={statusCfg.dot} />
                <span className={`font-mono text-[10px] tracking-widest ${statusCfg.color}`}>
                  {statusCfg.label}
                </span>
                <span className="font-mono text-[10px] text-muted ml-4">{project.period}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-serif text-ink text-xl leading-snug mb-3 group-hover:text-signal transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-ink-2 text-sm leading-relaxed mb-5 max-w-3xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-muted border border-border px-2 py-0.5 hover:border-border-2 hover:text-ink-2 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Index number decoration */}
            <div
              className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 font-mono text-6xl font-bold text-border/60 select-none pointer-events-none"
              aria-hidden
            >
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        );
      })}
    </div>
  );
}
