# HANDOFF — session-to-session state

Purpose: let a fresh Claude Code session (or future Reet) resume this project
with zero prior context. **Read this file first, then CLAUDE.md for the
standing rules.** Static background lives elsewhere — don't duplicate it here:

- Standing dev rules & design system: `CLAUDE.md`
- Full project plan & stack decisions: `~/.claude/plans/i-have-to-work-zippy-summit.md`
- Prof meeting checklist: `docs/prof-meeting-checklist.md`
- Architecture & handover roadmap: `README.md`

## Update protocol

At the end of every working session: update **Current state**, append a dated
entry to the **Session log** (what changed, why, anything surprising), and
prune **Next up**. Keep entries short — this file is read at the start of
every session and must stay cheap.

## Current state (2026-07-05)

**Phase:** prototype complete, pre-discovery. Waiting on the meeting with
Prof Li before any real content or infrastructure work.

- Working static prototype, all placeholder content: 7 routes — `/`,
  `/research` (+ 4 project detail pages), `/publications` (client-side type
  filter), `/people`, `/news`, `/teaching`, `/join`
- `npx next build` passes, every route static — keep it that way
- No Sanity, no Vercel, no domain yet (deliberately: all accounts must be
  created under the prof's email, decided at the meeting)
- Dev: `npm run dev` → localhost:3000; preview config `.claude/launch.json`
  (server name `lab-site`)

## Session log

### 2026-07-05 — ideation, plan, prototype
- Analyzed the prof's 5 example sites (all self-serve platforms: Google
  Sites, Wix, WordPress, Hugo Blox, Squarespace) → same section anatomy;
  differentiation opportunity is custom design + real CMS
- Locked decisions with Reet: Next.js + Sanity free tier + Vercel Hobby;
  hybrid prof/lab site; manual publication entry; editorial-minimal design
- Built the "Wayfinding" design system (transit-signage language; tokens in
  `app/globals.css`; deliberately avoided the cream/serif/terracotta AI-default
  look). Signature: homepage route line, horizontal desktop / vertical mobile
- Built typed content layer: `lib/content/types.ts` (mirrors future Sanity
  schemas 1:1), `data.ts` (placeholder content — all invented), `index.ts`
  (accessors = the Sanity swap seam; pages import only from here)
- Wrote `docs/prof-meeting-checklist.md` and project `CLAUDE.md`
- Verified in preview at desktop + mobile widths; publications filter works
  (note: preview_click tool missed the button twice pre-hydration — was a
  tooling artifact, not a bug)
- Gotcha: first dev-server page load compiles on demand and can screenshot
  blank — reload before judging
- Docs pass: wrote `docs/prof-meeting-checklist.md` (checkbox meeting doc,
  ⚠ = launch-blocking items), project `CLAUDE.md` (standing rules; keeps the
  `@AGENTS.md` import — that Next.js version warning is load-bearing), and
  this HANDOFF.md. All committed; repo clean at `0a569df`. Reet walked
  through the live preview and is happy with the design direction
- Nothing code-wise is in flight or half-done — next session starts clean at
  "Next up" step 1

## Next up (in order)

1. **Discovery meeting with Prof Li** — bring `docs/prof-meeting-checklist.md`;
   send him the content section a few days ahead so files arrive at the meeting
2. Replace `lib/content/data.ts` placeholders with real content; rename lab
   if needed (name appears in: `data.ts` siteSettings, `components/header.tsx`
   wordmark, `README.md`)
3. Sanity project **on the prof's account**: schemas from
   `lib/content/types.ts`, plain-English field descriptions, validation,
   locked singletons, News-first desk structure; then swap `lib/content/index.ts`
   accessors to GROQ (pages must not change)
4. GitHub + Vercel on prof's accounts, auto-deploy, Sanity publish webhook →
   revalidation; domain per meeting decision
5. Handover package: illustrated 5-task editing guide, short screen
   recordings, break-glass sheet, weekly Sanity export GitHub Action, uptime
   monitor → acceptance test: prof publishes a news post unaided

## Open questions (blocked on the prof)

Lab name · domain & who pays · NUS branding/hosting rules · account-owner
email · other editors · launch date · analytics yes/no · support window
