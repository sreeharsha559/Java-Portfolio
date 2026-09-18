# K Sree Harsha — Portfolio

A premium, dark-mode developer portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a touch of **GSAP**. Dev-recruiter-friendly, production-grade, Lighthouse-optimized.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Before you ship — personalize these

| What | Where |
| --- | --- |
| LinkedIn / GitHub / email | `src/lib/data.ts` → `PROFILE` |
| GitHub username (lights up the GitHub section) | `src/lib/data.ts` → `PROFILE.githubUsername` |
| Hero portrait | `public/images/hero-portrait.{webp|png|jpg}` (drop it in — see `public/images/README.md`) |
| Background music | `public/audio/background-music.mp3` (add manually — see `public/audio/README.md`) |
| Project GitHub/demo links | `src/lib/data.ts` → `PROJECTS` |
| Resume content | `src/app/resume/` (print-ready page; also linked from hero) |
| Live site URL (sitemap/robots/OG) | `src/lib/data.ts` → `SITE_URL` |

## What's inside

- **Hero** — animated blueprint grid, canvas particle field, floating gradient lights, GSAP scroll parallax, floating tech chips, portrait with automatic background-dissolve mask + graceful monogram fallback.
- **Stats** — count-up numbers on scroll.
- **About** — four interactive profile cards.
- **Tech Stack** — filterable dashboard (languages / frontend / backend / database / tools / cloud) with animated proficiency bars and hover-revealed usage.
- **Projects** — SafeStride (animated phone mockup) & QueueFlow (live dashboard mockup) with 3D tilt, cursor-follow glow, magnetic buttons, expandable deep-dives.
- **Experience / Education / Achievements** — scroll-animated timelines and award cards.
- **GitHub** — live data from the GitHub API: profile, repo cards, language splits, activity heatmap (graceful fallbacks included).
- **Contact** — glowing CTA + method cards.
- **Music Player** — persistent floating control, off-by-default, localStorage preference, volume, 3-bar equalizer, fade in/out, safe handling of a missing audio file.
- **Custom cursor** — spring-follow dot that morphs into a glowing ring / arrow over cards and buttons; auto-disabled on touch and `prefers-reduced-motion`.
- **Command palette** — `Ctrl/Cmd + K`. Try typing `whoami`.
- **SEO** — meta tags, Open Graph, Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, generated `og.png`.

## Design system

- Colors: primary `#3B82F6`, secondary `#60A5FA`, accent `#38BDF8`, backgrounds `#050816 / #0B1120 / #111827`.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code).
- Dark premium glassmorphism, dashboard-meets-developer-console aesthetic.

## Performance & a11y notes

- 60fps canvas particles (DPR-capped, pause offscreen), CSS-only aurora/grid.
- `prefers-reduced-motion` respected everywhere (CSS + Framer Motion + GSAP).
- Keyboard navigation, skip link, focus rings, ARIA labels/roles throughout.
- `next build` output — lazy-loaded heavy client sections via dynamic imports where beneficial.

## Static OG image

`public/og.png` is generated locally (no fonts/network needed):

```bash
node scripts/generate-og.mjs
```