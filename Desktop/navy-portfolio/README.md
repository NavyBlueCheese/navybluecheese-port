# Navy — Personal Portfolio & Blog

A signal-themed personal website for Navy (Nunnapat Pulsawas). Built with Next.js 14, Prisma + SQLite, and NextAuth.

## Stack

- **Next.js 14** (App Router) — framework
- **Tailwind CSS** — styling
- **Prisma + SQLite** — database (zero-config, file-based)
- **NextAuth** — admin authentication
- **react-markdown** — post rendering

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Then open `.env` and fill in:

```env
NEXTAUTH_SECRET=any-long-random-string-here
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=navy
ADMIN_PASSWORD=your-chosen-password
DATABASE_URL="file:./dev.db"
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 4. (Optional) Seed with sample posts

```bash
npx ts-node --skip-project prisma/seed.ts
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Admin Panel

Go to [http://localhost:3000/admin](http://localhost:3000/admin) and log in with the credentials you set in `.env`.

From the dashboard you can:
- Create new posts (Markdown editor)
- Edit existing posts
- Toggle draft / published
- Delete posts

---

## Site Structure

```
/                   → Hero + latest articles + research preview + about strip
/writing            → All writings (filterable by type, searchable, sortable)
/writing/[slug]     → Individual post with reactions + view counter
/research           → Research projects + interests + methods
/about              → Full about page
/admin              → Dashboard (protected)
/admin/login        → Auth page
/admin/new          → Create post
/admin/edit/[id]    → Edit post
```

## Post Types / Frequencies

| Type | Frequency | Use for |
|---|---|---|
| Article | 87.4 MHz | Essays, life stories, things worth sharing |
| Journal | 104.1 MHz | Personal entries, day-to-day reflections |
| Academic | 144.8 MHz | Research, papers, technical writing |
| Fiction | 432.0 MHz | Short stories, creative writing, novels |

---

## Deploying to Vercel

1. Push to a GitHub repo
2. Import into [vercel.com](https://vercel.com)
3. Add all environment variables from `.env` in the Vercel dashboard
4. For `DATABASE_URL`, use Vercel's Postgres or PlanetScale for production — or keep SQLite for personal use with a persistent volume

> **Note**: SQLite works great for personal/low-traffic use. If you want to scale, swap the Prisma provider to `postgresql` and update `DATABASE_URL`.

---

## Writing Posts

Posts are written in **Markdown**. Supported formatting:

```markdown
# Heading 1
## Heading 2

**bold**, *italic*, `inline code`

> Blockquote

```code block```

- List item
1. Numbered item

[Link text](https://url.com)
```

---

## Customisation

- **Colors**: Edit `tailwind.config.ts` and `src/app/globals.css` CSS variables
- **Research projects**: Edit `src/components/ResearchStrip.tsx`
- **About page content**: Edit `src/app/about/page.tsx`
- **Nav items**: Edit `src/components/Navigation.tsx`
- **Fonts**: Change in `src/app/layout.tsx` (currently Playfair Display + Space Mono + DM Sans)
