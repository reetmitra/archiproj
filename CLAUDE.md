@AGENTS.md

# Project: research lab website for Prof Li

Static Next.js site for a professor's research lab (age-friendly planning &
transportation equity, NUS). Full project plan and decisions:
`~/.claude/plans/i-have-to-work-zippy-summit.md`. Meeting checklist:
`docs/prof-meeting-checklist.md`.

**Session start: read `HANDOFF.md`** for current state, session log, and next
steps. **Session end: update it** (current state + dated log entry + prune
next-up) — it is how context survives between sessions.

## The one constraint that outranks everything

The site will be handed to a **non-technical professor** who maintains it
alone. Every decision must survive that handover:

- Content lives in structured data; **design and layout live only in code**.
  Never make a layout decision editable.
- Nothing may require Reet after handover: no manual redeploys, no paid
  services beyond the domain, no fragile scrapers or third-party APIs that
  break silently.

## Architecture rules

- Pages and components import content **only from `lib/content` (the
  accessors in `lib/content/index.ts`)** — never from `lib/content/data.ts`
  directly. The accessors are the seam where Sanity GROQ queries replace
  local data at migration; that swap must require zero page changes.
- The types in `lib/content/types.ts` mirror the planned Sanity schemas 1:1.
  If you add or change a field, you are changing the future CMS schema —
  keep fields simple, flat, and form-editable by a layperson.
- All content in `lib/content/data.ts` is **invented placeholder** (lab name,
  people, papers, grants). Do not treat it as fact, do not add real-sounding
  claims about the actual Prof Li, and keep the placeholder notice in the
  footer until real content lands.
- The site must stay **fully static**: `npm run build` must show every route
  as ○ (Static) or ● (SSG). No runtime data fetching, no API routes without a
  strong reason.

## Design system — "Wayfinding" (do not drift)

Language of accessible transit signage — the lab's own subject. Tokens are
defined once in `app/globals.css`; never hardcode hex values in components.

- `paper` bg / `ink` text / `stone` secondary / `moss` links /
  `accent` (#F2C230 tactile-paving yellow) / `line` hairlines
- **Accent yellow is graphic-only**: route line stops, focus rings, tags, CTA
  band, footer platform-edge strip, or as a background under ink text.
  **Never yellow text on paper** — it fails contrast.
- Fonts via `next/font` variables: Bricolage Grotesque (display), Public Sans
  (body), IBM Plex Mono (dates, codes, meta/eyebrows). Don't add faces.
- Base font size is 18px (`html { font-size: 112.5% }`) — an accessibility
  decision for the site's older audience. Don't shrink type below Tailwind's
  `text-sm` equivalent for body content.
- Signature element: the homepage route line (horizontal desktop / vertical
  mobile). Keep it the only "loud" element; everything else stays quiet.

## Accessibility floor (non-negotiable, it's the lab's subject)

- WCAG AA contrast; visible `:focus-visible` rings (already global)
- Semantic HTML: real headings in order, `aria-labelledby` on sections,
  `time` elements with `datetime`
- `prefers-reduced-motion` respected for any animation you add
- Everything keyboard-operable; test with Tab before calling UI done

## Copy voice

Plain, active, concrete; sentence case; no academic pomp and no marketing
filler. The existing headings ("What we've written", "Who does the work",
"Lab notebook") set the register — match it.

## Workflow

- Dev server: `npm run dev` (port 3000); preview config `.claude/launch.json`
  (name: `lab-site`)
- Verify before claiming done: `npx next build` passes fully static, then
  check the affected pages in the preview at desktop **and** mobile widths
- Commit style: short imperative subject, body explains why

## Pending (needs the prof, not code)

Sanity project + GROQ swap, Vercel deploy + publish webhook, domain — all on
**accounts the prof owns, never Reet's**. Real content replaces
`lib/content/data.ts` after the discovery meeting.
