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

## Current state (2026-07-06)

**Phase:** prototype complete + site-wide motion, pre-discovery.
Waiting on the meeting with Prof Li before any real content or
infrastructure work.

- Site-wide "signage has depth" scroll layer (subtle 3D): attribute-driven
  `components/motion/scroll-depth.tsx` mounted in `app/layout.tsx`
  (`data-anim="intro"` page-arrival reveal, `data-depth`/`data-depth-group`
  entrance tilts, `data-parallax` anchored drift, `data-tilt` pointer tilt
  on bordered panels). Homepage keeps home-motion ownership; scroll-depth
  only runs parallax there and never touches the gate flags on `/`

- Working static prototype, all placeholder content: 7 routes — `/`,
  `/research` (+ 4 project detail pages), `/publications` (client-side type
  filter), `/people`, `/news`, `/teaching`, `/join`
- Landing page has an anime.js (4.5.0) motion layer — "the site arrives
  like a train": hero timeline (headline word rise, route line draws with
  stops popping as the drawhead passes), split-flap eyebrow cycling
  content-layer phrases, scroll-triggered timetable-board section reveals.
  All in `components/motion/` + `data-anim` attributes in `app/page.tsx`;
  reduced-motion → zero motion; no-JS → full content (pre-hide is gated on
  a JS-set `data-motion` attr with a 4s CSS safety net)
- `npx next build` passes, every route static — keep it that way
- No Sanity, no Vercel, no domain yet (deliberately: all accounts must be
  created under the prof's email, decided at the meeting)
- Dev: `npm run dev` → localhost:3000; preview config `.claude/launch.json`
  (server name `lab-site`)

## Session log

### 2026-07-06 (later) — site-wide 3D scroll depth ("signage has depth")
- Brainstormed with Reet (21st.dev inspiration → quieted to fit Wayfinding):
  perspective transforms + parallax across all pages, subtle-depth intensity
  chosen deliberately for the older audience. New `components/motion/
  scroll-depth.tsx` mounted in layout; pages opt in via data attributes only
  and stay server components
- Vocabulary: intro reveal (reuses the existing `[data-anim]` CSS pre-hide
  gate — the inline pre-paint script MOVED from `app/page.tsx` to
  `app/layout.tsx` so it fires on every route); `data-depth` entrances with
  NO pre-hide (JS sets initial state post-mount for below-fold elements
  only — no-JS/crawlers/reduced-motion always see everything); anchored
  `data-parallax` (keyframes offset by p0 so rest position = designed
  position, verified ≈0.1px); `data-tilt` ≤2° via `createAnimatable`,
  pointer-fine only, no focus listeners (keyboard never tilts)
- Deviations from plan, on purpose: no tilt on people cards (borderless text
  blocks aren't panels — shadow under nothing looks broken); no parallax on
  the route-line svg (it must stay visually attached to its theme cards);
  footer content drifts, the accent strip stays put (the platform edge is
  the floor — you move, it doesn't); on `/` only home-motion sets
  data-motion-live so a home-motion failure still trips the 4s safety net
- Verified: build fully static; entrance/parallax/tilt via computed styles
  at 1280px and 375px; reduced-motion via matchMedia initScript patch (all
  targets untouched); publications filter re-renders stay visible; SSR HTML
  carries no data-motion attr and no inline styles; focus() on tilt cards
  leaves transform unchanged; console clean
- Tooling gotcha (new): preview_resize emulation changes what JS reports
  (innerWidth 1280) but preview_screenshot still captures the physical
  ~670px panel — screenshots after resize are misleading; verify layout via
  computed styles, screenshot only at native size. Committed at Reet's
  request after review

### 2026-07-06 — anime.js landing-page motion ("the site arrives like a train")
- Added animejs@4.5.0; motion design planned by Fable, code written by an
  Opus subagent, verified/tuned in preview. New: `components/motion/
  home-motion.tsx` (one client orchestrator, createScope + timelines + IO)
  and `split-flap.tsx` (rAF, no anime dep). Modified: `app/page.tsx`
  (data-anim attrs, headline word wrappers, inline pre-paint script),
  `app/globals.css` (pre-hide gate, .hero-word, .link-draw; old route-line
  keyframes removed — anime owns it now), `app/layout.tsx`
  (suppressHydrationWarning on <html> for the pre-paint attr)
- anime v4.5 gotchas fixed during verification: `ease: "cubicBezier(...)"`
  / `"steps(4)"` string syntax is REMOVED — import the functions; stop-pop
  sync needed real inverse-bezier math (752/876/1058ms), the agent's
  eyeballed values lagged the drawhead; 4s CSS safety net must disarm once
  JS is live (`data-motion-live`) or it force-reveals below-fold sections
  before their scroll trigger; `createDrawable` must not run on the
  display:none mobile SVG
- Tooling gotchas: anime's engine pauses while the preview tab is hidden —
  animations "not running" in evals is the engine correctly waiting, not a
  bug; preview screenshots at scrolled positions capture blank (verify via
  computed styles); running `npm run build` after `cd node_modules/animejs`
  executes THAT package's build script and `rm -rf`s its dist (reinstall
  fixes it)
- Bundle: `/` client JS +~19 kB gz (anime chunk, code-split, under the
  25 kB budget → root imports kept). Build fully static, a11y tree clean
  (h1 one phrase, flap reads as one phrase via aria-label). NOT committed —
  awaiting Reet's review

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
