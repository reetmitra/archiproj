# Shengxiao (Alex) Li — personal academic website

Prototype personal website for Prof Li (age-friendly planning & transportation
equity, NUS), with his lab folded inside (People page, lab-voice news). Built
as a static Next.js site designed to be handed over to a non-technical owner:
all content will live in Sanity, all design lives in code. Modeled on a blend
of urbantransitionslab.com (lab-site anatomy) and xiaofanliang.com (profile
hero, work-with-me tiers).

**All names, papers, grants, and people in the current content are placeholders**
pending discovery with the prof. Replace via `lib/content/data.ts` for now.

## Stack

- Next.js (App Router) + TypeScript + Tailwind v4 — fully static output
- Content: local typed data (`lib/content/`) now → Sanity free tier later
- Planned hosting: Vercel Hobby + Sanity publish webhook for revalidation

## Design system — "Wayfinding"

Transit signage is the one design discipline that has always served older
adults, and it is the lab's subject. Tokens in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAFAF7` | background |
| `ink` | `#1B211D` | text, footer |
| `stone` | `#545B54` | secondary text (AA on paper) |
| `moss` | `#2D5D4B` | links (AA on paper) |
| `accent` | `#F2C230` | tactile-paving yellow: route line stops, focus rings, CTA band, footer platform edge — graphic use or under ink text only (never yellow text) |

Type: Bricolage Grotesque (display) · Public Sans (body) · IBM Plex Mono
(dates, codes, meta). Base font size is 18px (`html { font-size: 112.5% }`)
so the whole rem scale sits one notch larger — an accessibility decision, not
a style one. Signature element: the route line with stops on the homepage
(horizontal on desktop, vertical on mobile), drawn in once on load,
`prefers-reduced-motion` respected.

## Structure

- `lib/content/types.ts` — content model; mirrors the Sanity schemas 1:1
- `lib/content/data.ts` — placeholder content; the local fallback and the
  seed source for Sanity
- `lib/content/index.ts` — accessors; pages import only from here. With
  `SANITY_PROJECT_ID` set they fetch from Sanity at build time; without it
  they serve `data.ts` (a clean clone always builds)
- `lib/content/sanity.ts` — build-time GROQ fetchers. Deliberately uses
  `node:https`, not `fetch`: Next's patched fetch persists responses in
  `.next/cache` across builds (stale content after a Sanity publish), and
  opting out with `cache: "no-store"` flips routes to dynamic
- `studio/` — Sanity Studio (own package.json). Hosted at
  https://alex-li-site.sanity.studio · project `37x9ig4j`, dataset
  `production` (public read — that's why the site needs no token)
- `components/` — header, footer, shared primitives
- `app/` — 7 routes: home, research (+ project detail), publications, people,
  news, teaching, work-with-me

## Run

```
npm run dev    # http://localhost:3000
npm run build  # static check — all routes must prerender (○/●)
npm run studio # Sanity Studio locally (or use the hosted URL above)
npm run seed   # regenerate studio/seed.ndjson from lib/content/data.ts
```

Content env vars live in `.env.local` (gitignored, not secret — the dataset
is public-read):

```
SANITY_PROJECT_ID=37x9ig4j
SANITY_DATASET=production
```

To import the seed: `cd studio && npx sanity dataset import seed.ndjson
production --replace` (needs `npx sanity login` first).

## Handover roadmap (from the project plan)

1. Discovery with the prof: real content, lab name, domain, NUS branding
2. Real content replaces the placeholder documents in Sanity (and
   `lib/content/data.ts` for the fallback)
3. Deploy to Vercel, Sanity publish webhook → rebuild
4. Recreate/transfer the Sanity project + Vercel + domain under accounts
   the prof owns (schemas are code; content moves via `sanity dataset
   export` / `import`); illustrated "how to update your site" guide +
   training session
