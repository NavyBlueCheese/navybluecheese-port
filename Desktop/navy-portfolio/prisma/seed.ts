// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        title: 'Neural PDEs and the Geometry of Option Pricing',
        slug: 'neural-pdes-option-pricing',
        excerpt: 'When stochastic volatility meets deep learning, something beautiful happens at the boundary of mathematics and machine learning.',
        content: `# Neural PDEs and the Geometry of Option Pricing

When Fischer Black and Myron Scholes published their famous equation in 1973, they couldn't have imagined that half a century later, we'd be solving its generalizations using artificial neural networks that learn the shape of the solution surface rather than computing it analytically.

## The Problem with Classical Methods

The Black-Scholes equation is tractable. Heston's stochastic volatility model is less so. Add jump processes, local volatility surfaces, or rough volatility (Gatheral et al., 2018), and classical finite-difference or Monte Carlo methods become computationally expensive—sometimes prohibitively so for real-time pricing.

## Enter Neural PDEs

A Physics-Informed Neural Network (PINN) for option pricing doesn't just fit data. It *satisfies the PDE* as a constraint. The loss function penalizes deviation from:

1. The PDE residual at collocation points
2. Boundary conditions (payoff at expiry)
3. Initial/terminal conditions

The result is a continuous, differentiable approximation to the option price surface that generalizes across strikes, maturities, and volatility regimes.

## What I Found

In my current research, we embed the Heston characteristic function structure directly into the network architecture—a form of structural inductive bias that dramatically reduces sample complexity. Preliminary results show 40× speedup over Monte Carlo at equivalent accuracy for European options.

The harder question is Greeks. Neural differentiability gives you delta and gamma for free via autograd. But calibration stability remains an open challenge.

*This is ongoing research. Full paper draft expected Q4 2025.*`,
        type: 'Academic',
        tags: JSON.stringify(['quantitative finance', 'neural networks', 'option pricing', 'stochastic volatility']),
        published: true,
        publishedAt: new Date('2025-03-15'),
        views: 142,
      },
      {
        title: 'On Learning Korean at 4am',
        slug: 'learning-korean-4am',
        excerpt: 'There\'s something about studying a language in the hour when your guard is completely down. The words enter differently.',
        content: `# On Learning Korean at 4am

Seoul is quieter at 4am than you'd expect for a city of ten million people.

I've been here almost two years now, studying at Korea University. My Korean started with survival vocabulary—convenience store transactions, subway announcements, the particular politeness required when you're a foreigner who looks somewhat like you might already know the language but clearly doesn't.

## The Intermediate Plateau

Every language learner hits it. You can hold a conversation. You can read a menu. You can understand about 60% of a drama if you're not too tired and the subtitles are on. And then you stop getting obviously better.

Japanese came easier, maybe because I had the hiragana/katakana scaffolding from anime-obsessed teenage years. Thai is my mother tongue—I think in it when I'm dreaming, which is the test I use. English arrived second and stayed. But Korean requires something different from me.

## What Changes at 4am

I'm not sure I'd recommend this as a pedagogy, but here's what I notice: the performance anxiety disappears. I'm not worried about making grammatical errors in front of a Korean friend or professor. I'm just reading webtoons and muttering conjugations to myself in an empty dorm room.

The subjunctive mood, which I had been avoiding for months, made sense to me at 4:17am last Tuesday.

Maybe fluency is partly just accumulated hours of unselfconscious contact with a language.

*더 열심히 공부해야겠다. 아직 갈 길이 멀다.*

*(I have to study harder. There's still a long way to go.)*`,
        type: 'Journal',
        tags: JSON.stringify(['language', 'korea', 'learning', 'personal']),
        published: true,
        publishedAt: new Date('2025-04-02'),
        views: 89,
      },
      {
        title: 'The Signal Collector',
        slug: 'the-signal-collector',
        excerpt: 'She catalogued frequencies the way other people collected stamps—obsessively, with the private certainty that pattern was hiding somewhere in the noise.',
        content: `# The Signal Collector

She catalogued frequencies the way other people collected stamps—obsessively, with the private certainty that pattern was hiding somewhere in the noise.

Room 7B of the Frequency Institute smelled like ozone and old paper. Yuna had been assigned here for three years without anyone checking on her work. This suited her perfectly.

The signals came from everywhere: satellite transmissions with corrupted checksums, deep-sea sonar reflections, the radio telescope data she wasn't technically authorized to access but did anyway because the firewalls were polite rather than enforced.

She was looking for the signal that repeated.

Not a repeating period—plenty of signals repeated. She was looking for the signal that, when you removed all its carrier information and stripped it to pure information content, matched another signal from a completely different source, in the way that two strangers' fingerprints might accidentally rhyme.

On a Tuesday in November, she found two.

The first had been transmitted from a weather balloon over the Bering Sea in 1987. The second had arrived last week from coordinates that her mapping software listed as empty ocean, 800 kilometers south of the Azores.

They were not the same signal. They were not encoded the same way. But when she ran both through her extraction algorithm—the one she'd written herself, the one that no one else in the institute understood—they resolved to identical information.

She sat with this for a long time.

Then she reached for her notebook and wrote: *If information is conserved, what is remembering it?*`,
        type: 'Fiction',
        tags: JSON.stringify(['short story', 'signal', 'science fiction', 'mystery']),
        published: true,
        publishedAt: new Date('2025-04-10'),
        views: 203,
      },
      {
        title: 'Why Capital Flows Don\'t Behave the Way You Think They Do',
        slug: 'capital-flows-asean-volatility',
        excerpt: 'A deep dive into the sensitivity of ASEAN exchange rates to sudden reversals in foreign capital—and why the textbook models get this embarrassingly wrong.',
        content: `# Why Capital Flows Don't Behave the Way You Think They Do

The standard narrative goes like this: emerging market currencies depreciate when foreign capital flees, appreciate when it arrives. The relationship is approximately linear, approximately predictable, and approximately manageable.

My research over the past year suggests the word "approximately" is doing a lot of heavy lifting.

## The ASEAN Dataset

We constructed a panel dataset covering six ASEAN economies (Thailand, Malaysia, Indonesia, Philippines, Vietnam, Singapore) from 2010–2024, tracking:

- Portfolio investment flows (equity + debt, from BIS locational banking statistics)
- Exchange rate volatility (realized, 30-day rolling)
- Current account positions
- Capital account openness (Chinn-Ito index)
- Global risk appetite proxies (VIX, EM bond spreads)

## The Nonlinearity Problem

What you find when you run regime-switching models on this data: the exchange rate sensitivity to capital flow shocks is **two to four times higher** during reversal events than during inflow periods of equivalent magnitude.

This asymmetry has real consequences. A $10B inflow might appreciate a currency by X%. A $10B outflow can depreciate it by 3X-4X%. The distribution is fat-tailed in the depreciation direction and this effect is not adequately captured by linear panel models.

## Implications

Central banks in the region are well aware of this. The policy toolkit—FX intervention, capital flow measures, macroprudential tools—is deployed asymmetrically as a result. What's less understood is how the threshold for asymmetric behavior shifts with global liquidity conditions.

*Full working paper in preparation. Dataset and replication code will be available on request.*`,
        type: 'Academic',
        tags: JSON.stringify(['international finance', 'ASEAN', 'exchange rates', 'capital flows', 'econometrics']),
        published: true,
        publishedAt: new Date('2025-02-28'),
        views: 317,
      },
      {
        title: 'What Drawing Manga Taught Me About Research',
        slug: 'manga-and-research',
        excerpt: 'Both require you to commit to a panel before you know how the story ends. Both punish you for refusing to start.',
        content: `# What Drawing Manga Taught Me About Research

I started drawing seriously at fourteen. I started doing quantitative research at nineteen. They feel like completely different activities, and they are. But the longer I do both, the more I notice they share a particular kind of discipline.

## The Blank Page Problem

Every manga artist knows the blank page. You have a scene in your head—the emotional beat you're trying to hit, the way light should fall through a window in panel three, the expression that makes everything click. And then you look at the actual empty paper and the scene doesn't want to transfer.

Research has an equivalent. You have an intuition about the data. You feel like something real is there—an anomaly in the autocorrelation structure, an asymmetry that shouldn't exist according to the theory. And then you open your laptop and the feeling refuses to become code.

## What Works in Both

The technique that works in both domains: **start with the constraint, not the vision.**

In manga, I draw the panel border first. The border tells the scene what size it is allowed to be, and size creates composition pressure. Suddenly I know where the figures go.

In research, I write the null hypothesis before I write a line of code. The null tells the analysis what it's supposed to disprove, and that pressure creates a path.

## The Deeper Similarity

Both are about learning to tolerate the gap between what you can see and what you can currently make. 

The good manga artists I know don't have better ideas than the struggling ones. They're just more comfortable with the fact that the first ten drafts will be bad.

The good researchers I know don't have cleaner intuitions. They run more regressions that don't work and log them systematically so they remember what the data has already told them doesn't work.

Commitment is the practice. In both fields.`,
        type: 'Article',
        tags: JSON.stringify(['reflection', 'research', 'manga', 'creativity', 'process']),
        published: true,
        publishedAt: new Date('2025-01-20'),
        views: 451,
      },
    ],
  });

  console.log('✓ Seeded 5 sample posts');
  console.log('✓ Database ready');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
