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

## Current state (2026-07-09, evening)

**Phase:** personal-site pivot COMPLETE (all phases of the plan in
`~/.claude/plans/what-happened-effervescent-diffie.md`): identity
restructure + Sanity CMS live end-to-end. Content still placeholder
except the prof's real name.

- **Sanity is live**: project `37x9ig4j` ("Archi Proj", Reet's account,
  30-day Growth trial → auto-downgrades to Free, nothing to cancel),
  dataset `production` (public read, NO tokens anywhere). Studio:
  https://alex-li-site.sanity.studio (source `studio/`, deploy with
  `cd studio && ./node_modules/.bin/sanity deploy`). Desk is News-first;
  Profile/Work with me/Site settings are locked singletons. 29 seed
  docs imported from `data.ts` (`npm run seed` regenerates)
- **Editor loop verified**: edit in Sanity → `npm run build` → change is
  in the static HTML. `lib/content/sanity.ts` uses node:https on purpose
  — see gotchas in the 2026-07-09 (late) log entry before "fixing" it
- Sanity CLI: use `sanity@4` via npx or studio-local binary — latest CLI
  needs Node ≥22.12, machine has 20.19.5

- Site is now **person-branded**: wordmark/metadata/footer = "Shengxiao
  (Alex) Li" (the prof's REAL name, from Reet 2026-07-09 — title/bio/
  education/papers still invented), profile hero (name headline via the
  same hero-word spans,
  title · affiliation meta, first-person bio, email/Scholar/ORCID links,
  3 education lines) with the totem kept as the hero visual. New `Profile`
  type/singleton; `JoinUs` → `WorkWithMe` (3 tiered sections + optional
  openings); `/join` → `/work-with-me`; CTA band reworded "Work with me."
  SiteSettings lost `tagline` (nothing rendered it)
- **All content accessors are now async** (the Sanity seam): pages await
  them; `app/layout.tsx` uses `generateMetadata()` (the old module-scope
  accessor call is gone) and passes `wordmark` prop to the client Header
- Decided with Reet: Sanity NOW on Reet's dev account, transfer/recreate
  under the prof's account at handover (CLAUDE.md updated — don't "correct"
  this back); hosted studio (`studio/` folder, `sanity deploy`), no
  next-sanity, no tokens (public dataset + CLI-auth seeding), local-data
  fallback when `SANITY_PROJECT_ID` is unset

- Scroll-scrubbed 3D totem turntable (64 WebP frames in `public/totem/`,
  512 KB) lives in the HERO only: right column at lg+, rotating with
  plain page scroll (full 360° completes as the hero exits; no pin);
  static poster under the mission text below lg (sequence never
  fetched there). `components/motion/totem-scrub.tsx` owns progressive
  enhancement: server `<img>` baseline for no-JS / reduced-motion /
  small screens, canvas scrub + pointer hover-nudge on motion-allowed
  desktops only. The pinned "Field object" section was removed
  2026-07-08 (redundant once the hero had the interactive moment)
- Pointer vocabulary additions: `data-magnet` (≤5px pull, desktop nav +
  join CTA) and `data-tilt` now casts a pointer-tracked accent
  highlight — both in `scroll-depth.tsx`, fine-pointer only

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
- Code is backed up to github.com/reetmitra/archiproj (public, Reet's
  account) as a dev-time remote — this is NOT the handover repo; step 4
  still means creating/transferring to the prof's account post-meeting.
  All work through the totem showcase is on origin/main (PR #1, merged
  2026-07-09); keep local main synced with origin — don't let commits
  accumulate unpushed again
- Dev: `npm run dev` → localhost:3000; preview config `.claude/launch.json`
  (server name `lab-site`)

## Session log

### 2026-07-09 (late) — Sanity live (Phases B+C); prof's real name
- Reet: prof's real name is **Shengxiao (Alex) Li** — now in data.ts
  (profile, people, "Li, S." authors), metadata, README. Title
  "Assistant Professor" + bio/education/papers REMAIN INVENTED until
  discovery; footer placeholder notice stays
- Phase B: `studio/` scaffolded (9 schemas, plain-English field help,
  News-first desk, singleton locks via template filter + action strip),
  seeded via `scripts/build-seed.ts` → ndjson → `dataset import
  --replace` (idempotent, deterministic _ids). Deployed; host renamed
  xiang-li-site → alex-li-site after the name arrived (undeploy → new
  deploy, new appId in sanity.cli.ts)
- Phase C: accessors fetch Sanity when SANITY_PROJECT_ID is set
  (.env.local), fall back to data.ts otherwise. Verified: both builds
  fully static; content parity; zero sanity code in client chunks;
  editor loop (CLI-mutated bio marker appeared after plain rebuild)
- **Gotcha (the big one)**: Next's patched fetch persists responses in
  `.next/cache/fetch-cache` ACROSS builds — first rebuild after a
  Sanity edit served stale content. `cache: "no-store"` is NOT the fix:
  it flips every route to ƒ dynamic. Fix: `lib/content/sanity.ts` talks
  to the Sanity HTTP API over **node:https** — invisible to Next's
  fetch layer, routes stay ○/●, every build reads fresh. @sanity/client
  was removed from the root app (studio keeps its own)
- Gotcha: ESLint OOM'd after the studio deploy — it was crawling
  `studio/dist` minified bundles; `studio/**` added to eslint ignores
- Gotcha: latest sanity CLI refuses Node <22.12 — pin `npx sanity@4`
  (4.22.0 works on Node 20); undeploy/deploy must run from `studio/`
  (global npx errors when cwd is the repo root)
- Generated `demo.html` (repo root, gitignored, 2 MB): single-file
  send-to-prof preview — full-page captures of all 8 routes + 2 mobile,
  placeholder disclaimer up top. Regenerate: capture via Playwright
  against `next start -p 3005` with reducedMotion emulation, then the
  build-demo script (session scratchpad; rewrite from this note if gone)
- Gotcha: claude-in-chrome `resize_window` left a stale 390px viewport
  emulation stuck on the shared browser tab — pages rendered phone-width
  in the corner of a full-size window until resize_window was called
  again with desktop dimensions. If the site ever "renders in a corner",
  it's this, not CSS

### 2026-07-09 (evening) — personal-site pivot, Phase A
- Reet: rebuild as a personal site for Prof Li, replicating a blend of
  urbantransitionslab.com + xiaofanliang.com, keeping Wayfinding; News/
  Publications/Research must become prof-editable. Brainstormed + planned
  (plan file above); decisions: person-branded w/ lab inside, profile hero
  keeping totem, Join → Work with me (tiered), Sanity now on dev account
- Implemented Phase A (identity restructure on local data + async accessor
  flip). Verified: build fully static (`/work-with-me` in, `/join` gone),
  lint = only the pre-existing split-flap error, desktop 1280 via Chrome +
  mobile 390 via Playwright (profile hero stacks, poster under bio,
  vertical route line), publications filter works post-hydration, research
  page refactor (one getProjects + in-page filter) renders all 4 projects,
  reduced-motion safe (pre-hide CSS is inside the no-preference media
  query; new hero elements reuse existing `hero-mission`/`hero-word` attrs
  so home-motion needed zero changes)
- Gotchas (new): `.hero-word` is inline-block+overflow-hidden — the space
  between name words must stay OUTSIDE the span (Fragment wrapper);
  claude-in-chrome `resize_window` reported success but screenshots stayed
  at desktop width — used Playwright `setViewportSize` for mobile checks;
  Playwright MCP writes screenshots/snapshots into the repo root
  (`.playwright-mcp/`) — delete before committing

### 2026-07-09 — totem work pushed; main synced with origin
- The 9 local commits (totem assets → hero totem → section removal) had
  never been pushed. Moved them to a `hero-totem` branch, opened and
  merged PR #1 (merge commit 4d73125), reset local main to origin/main,
  deleted the branch on both ends. No code changes this session
- Workflow gotcha: `gh pr merge --delete-branch` run from a different
  checked-out branch left the local branch and stale remote ref behind —
  `git fetch --prune` + `git branch -d` finished the cleanup

### 2026-07-08 — Field object section removed; totem at all widths
- Reet: "hero is enough" — the pinned section was a second telling of
  the same idea. Removed it (markup + .totem-stage CSS + the
  mode/decorative props on TotemScrub, now hero-only). The hero
  instance carries the alt text again and renders at EVERY width:
  canvas scrub ≥1024px, static poster under the mission text below
  (zero sequence requests — verified)
- Root cause of "I don't see anything in the hero": the totem was
  lg-only and Reet's viewport (preview panel) was narrower than
  1024px. Design lesson: don't gate the page's one signature object
  behind a breakpoint with no small-screen fallback
- Console gotcha: React "deps array changed size" errors after editing
  a useEffect deps array are HMR artifacts (old mounted instance vs
  hot-swapped code) — the preview console buffer also persists across
  reloads, so check whether the entry COUNT grows on a fresh load
  before treating them as real

### 2026-07-07 (later) — totem in the hero
- Reet: hero needed the interactive 3D element ("that's what makes it
  interactive"). Decisions: rotate-in-place with page scroll (no pin /
  scroll-jacking), keep the Field object section as is, reuse the same
  frames. TotemScrub generalized: mode="hero" maps progress to
  scrollY/(0.8·100vh) so the full rotation is visible before the hero
  scrolls away; decorative flag → alt="" + aria-hidden (the section
  instance keeps the description, so AT hears the object once)
- Hero is now a lg:grid two-column (text / 17rem totem); below lg the
  column is display:none AND the component bails ≤1023px — zero frame
  requests on small screens, verified. Both instances share URLs so
  the browser cache dedupes the second load
- Gotcha: preview_resize immediately followed by reload can hydrate at
  the native panel width — components that matchMedia at mount silently
  bail; settle the viewport, then reload, then judge

### 2026-07-07 — totem turntable section + magnetic/tilt hover
- Reet asked for 3D scrolling + cursor hover effects with Higgsfield-
  generated frames. Brainstormed to: wayfinding totem turntable (the
  "signage has depth" metaphor made literal), new pinned homepage
  section, hover-scrub + magnetic nav/CTA + tilt highlight, quiet
  intensity, NO custom cursor
- Asset pipeline (dev-time only, committed as static assets): 
  nano_banana_pro still 3:4 (2cr, prompt bans readable text — video
  smears lettering) → seedance_2_0 fast 720p 8s orbit (28cr) with
  **start_image = end_image = same job_id**, which pins the orbit
  closed — no loop seam, no ping-pong needed → ffmpeg fps=64/dur +
  8% edge-crop → cwebp q58 → 64 frames. 30cr spent, ~10 left. Script:
  session scratchpad `extract-frames.sh` (rewrite from this log if
  needed). Frames were later re-extracted at the video's NATIVE
  766×1022 (512 KB) — the first pass needlessly downscaled to 674×900;
  don't add a scale step below source size, retina target is 720px
  wide at the 360px display width. Reet asked for Gemini/ChatGPT for
  a higher-res redo — not connected here, and chat image models can't
  hold 64-frame consistency anyway (frames must come from video);
  native re-extraction of the paid orbit covered the gap for free
- Component: plain rAF + IO (no anime dep; frame index is app state,
  anime onScroll would fight the hover offset + nearest-loaded
  fallback). Sticky pin via CSS only (`html[data-motion]` media query
  grows the stage to 190vh on desktop+motion — everyone else gets
  normal flow, no dead scroll). No data-anim in the section; gate
  flags untouched on `/`
- Gotchas (new): brew ffmpeg 8.x dropped the webp encoder AND drawtext
  — `brew install webp` for cwebp, PNG intermediate; Chrome
  `img.decode()` rejects under parallel-decode pressure (~48 at once)
  even with good bytes — retry + keep-if-complete + sequential fill
  pass fixed frames 62/63 never appearing; Seedance job metadata
  reports 1280×720 while in_progress but the finished video followed
  the start image's 3:4 (834×1112) — don't trust params.width/height;
  preview_resize preset "desktop" resets to the native panel, pass
  explicit width/height to emulate 1280
- Verified (computed styles at 1280 emulated + 398 native, not
  screenshots): build fully static; scrub 0→63 exact quarter mapping;
  hover +7/ease-back; magnet clamps at 5px, identity on leave; tilt
  --mx/--my track pointer; reduced-motion matchMedia patch → no scrub,
  no magnet, img visible; SSR HTML carries img+alt, no data-motion;
  1 request at page top, sequence loads one viewport out; publications
  filter still works; console clean; zero tabbables in the section
- `npm run lint` has ONE pre-existing error (split-flap.tsx setState-
  in-effect) — flagged as a separate task chip, not from this work

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

1. **Reet walks the studio** (https://alex-li-site.sanity.studio): edit the
   profile bio, publish, `npm run build`, confirm the change — the demo to
   show the prof
2. **Discovery meeting with Prof Li** — bring `docs/prof-meeting-checklist.md`;
   send him the content section a few days ahead so files arrive at the meeting
3. Replace placeholder content with real content — in Sanity (primary) AND
   `lib/content/data.ts` (fallback/seed); confirm real title (Assistant
   Professor is a guess), bio, education, links, emails
4. GitHub + Vercel on prof's accounts, auto-deploy, Sanity publish webhook →
   rebuild; recreate/transfer the Sanity project under the prof's account
   (new projectId in `studio/project.ts` + `.env.local`, re-deploy studio,
   `sanity dataset export`/`import` for content); domain per meeting decision
5. Handover package: illustrated 5-task editing guide, short screen
   recordings, break-glass sheet, weekly Sanity export GitHub Action, uptime
   monitor → acceptance test: prof publishes a news post unaided

## Open questions (blocked on the prof)

Lab name · domain & who pays · NUS branding/hosting rules · account-owner
email · other editors · launch date · analytics yes/no · support window
