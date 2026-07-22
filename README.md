# TECH VIBES

A premium, bilingual (Arabic-first / English) digital-agency website with an
immersive, cinematic portfolio of case studies. Built with React 19, Vite,
Tailwind CSS v4, Framer Motion, and i18next.

- **Bilingual & RTL** — Arabic default with full right-to-left layout, English fully supported.
- **Immersive case studies** — each project renders category-specific sections (mobile app frames, cinematic web showcases, branding systems, marketing dashboards).
- **Fast by default** — route-level code splitting, vendor chunking, lazy-loaded case-study experience, `prefers-reduced-motion` respected throughout.
- **SEO-ready** — per-route meta/OG/Twitter via a `useSeo` hook, JSON-LD, `robots.txt`, `sitemap.xml`.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| i18n | i18next + react-i18next (lazy-loaded locale bundles) |
| Routing | React Router 7 |
| Contact form | EmailJS |
| Language | JavaScript (app) + TypeScript (case-study system) |

## Quick start

```bash
npm install
cp .env.example .env      # then fill in your EmailJS keys
npm run dev               # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (HMR). |
| `npm run build` | Production build → `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run type-check` | Run the TypeScript compiler (no emit). |

## Environment

The contact form reads EmailJS keys from `VITE_*` env vars. See
[ENVIRONMENT.md](./ENVIRONMENT.md) for the full list, and copy `.env.example`
to `.env` to get started. Never commit `.env` (it is gitignored).

## Project structure

```
src/
├── assets/                 # images per project (portfolio screenshots)
├── components/
│   ├── casestudy/          # immersive case-study sections (TS) + web showcase
│   ├── layout/             # Navbar, Footer, ScrollToTop
│   ├── sections/           # homepage / page sections
│   └── ui/                 # reusable primitives (Button, cards, SectionHeading)
├── constants/data.js       # structural data (nav, portfolio grid, socials)
├── data/                   # typed case-study content (EN base + AR overlay)
├── hooks/                  # useSeo, useMouseGlow
├── i18n/                   # i18next config + locale bundles (ar/en)
├── pages/                  # route components
└── types/                  # TypeScript contracts
```

## Deployment

Ready for **Vercel**, **Netlify**, **Docker**, and **VPS (Nginx)**. See
[DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions for each.

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) — deploy to any of the four targets.
- [ENVIRONMENT.md](./ENVIRONMENT.md) — environment variables.
- [SECURITY.md](./SECURITY.md) — security posture, headers, CSP.
