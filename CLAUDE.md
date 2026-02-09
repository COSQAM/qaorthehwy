# CLAUDE.md

## Project Overview
QA or the Highway — a conference website for a Midwest quality engineering conference (June 12, 2026, Columbus, OH). Static site built with Astro, deployed to GitHub Pages at www.qaorthehwy.com.

## Tech Stack
- **Framework:** Astro 5 (static site generation)
- **UI:** React 19 (interactive components only)
- **Styling:** Tailwind CSS v4 (via Vite plugin)
- **Carousel:** Flickity v3
- **TypeScript:** Strict mode (extends `astro/tsconfigs/strict`)
- **Hosting:** GitHub Pages with automatic deployment via GitHub Actions

## Commands
- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Build static site to `./dist/`
- `npm run preview` — Preview production build locally
- `npm run fetch:sessionize` — Fetch speaker/session data from Sessionize API (requires SESSIONIZE_EVENT_ID in .env)

## Project Structure
```
src/
├── assets/images/       # Images (sponsors, committee, venue, etc.)
├── components/          # Astro components (.astro files)
│   └── sponsorship/     # Sponsorship-specific components
├── config/              # TypeScript config files (feature flags, data)
├── data/                # sessionize.json (auto-updated via CI)
├── layouts/             # Layout.astro (base page wrapper)
├── pages/               # File-based routing (each .astro = a route)
│   └── speakers/[id].astro  # Dynamic speaker detail pages
└── styles/              # global.css (Tailwind theme + custom utilities)
scripts/                 # fetch-sessionize.js (data fetching script)
public/                  # Static assets (videos, PDFs, CNAME)
```

## Architecture & Key Patterns

### Config-Driven Feature Flags
Conference state is managed through TypeScript config files in `src/config/`. Update these to change site behavior — no component code changes needed:

- **`speakers.ts`** — Speaker visibility phase: `'keynotes-only'` | `'full-lineup'`
- **`tickets.ts`** — Ticket sales phase: `'early-bird'` | `'regular'` | `'last-chance'` | `'sold-out'`
- **`schedule.ts`** — Schedule visibility: `'coming-soon'` | `'published'`
- **`announcements.ts`** — Toggle announcement banners (Call for Speakers, Feedback)
- **`sponsors.ts`** — Sponsor logos and links
- **`sponsorship.ts`** — Sponsorship tiers, benefits, pricing, FAQs

### Sessionize Data Pipeline
Speaker and session data comes from Sessionize (external API):
1. `scripts/fetch-sessionize.js` fetches data from two endpoints (`/view/All` and `/view/GridSmart`)
2. Merges service sessions (breaks, networking) into main data
3. Saves to `src/data/sessionize.json`
4. GitHub Actions runs this weekly (Sundays) and auto-commits changes with `[skip ci]`
5. Components import directly from `sessionize.json` at build time

### Component Conventions
- All components are `.astro` files (server-rendered by default)
- PascalCase file names: `SpeakerCard.astro`, `PageHeader.astro`
- Related components grouped in subdirectories: `components/sponsorship/`
- Props defined with `interface Props {}` in the frontmatter
- Client-side JS uses `<script>` tags within Astro components
- React is only used where Astro's island architecture requires it

### Styling Conventions
- Tailwind CSS v4 with custom theme in `src/styles/global.css`
- Custom CSS properties: `--color-primary` (#3148F6), `--color-accent` (#ffc300), `--color-background` (#000814)
- Utility classes for sections: `.section-light`, `.section-dark`, `.section-primary`
- Glow effects: `.glow-section`, `.glow-card`
- Mobile-first responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`)

### Third-Party Integrations
- **Web3Forms** — Contact and sponsorship form submissions
- **Givebutter** — Ticket sales widget (embedded in Layout)
- **DocuSeal** — Sponsorship agreement signing
- **Google Maps** — Embedded venue maps
- **Sessionize** — Speaker/session data + Call for Speakers submissions

### Routing
Astro file-based routing in `src/pages/`:
- Static pages: `index.astro`, `speakers.astro`, `schedule.astro`, `venue.astro`, `sponsorship.astro`, `contact.astro`, `faq.astro`, `committee.astro`, `archive.astro`
- Dynamic routes: `speakers/[id].astro` generates a page per speaker via `getStaticPaths()`

## Git Workflow
- Feature branches with pull requests to `main`
- Pushing to `main` triggers automatic GitHub Pages deployment
- Sessionize data commits use `[skip ci]` to avoid triggering deploys

## Environment Variables
- `SESSIONIZE_EVENT_ID` — Required for fetching Sessionize data (see `.env.example`)

## Important Notes
- This is a static site — all pages are pre-rendered at build time. Changes require a rebuild.
- Feature flag changes in `src/config/` require a rebuild to take effect.
- `src/data/sessionize.json` is checked into git and auto-updated by CI. Don't manually edit it.
- No test framework is currently configured.
- The inline API keys (Web3Forms, Givebutter) are intentionally public-facing and should stay inline.
