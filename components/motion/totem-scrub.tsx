"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed turntable in the hero: pre-rendered frames of the
 * lab's wayfinding totem, rotated by plain page scroll and nudged by
 * pointer hover. No pinning — the page never hijacks scroll.
 *
 * The server HTML is a plain <img> of the first frame — that IS the
 * whole experience for no-JS, reduced-motion, and sub-desktop widths
 * (which never fetch the frame sequence); the aria-hidden canvas takes
 * over only when JS mounts on a motion-allowed desktop.
 *
 * Deliberately plain rAF, no anime.js (precedent: split-flap.tsx): the
 * frame index is app state layered from scroll progress + hover offset +
 * nearest-loaded-frame fallback, which anime's onScroll abstraction
 * would fight rather than help.
 */

const FRAME_COUNT = 64;
// Native size of the extracted frames — keep in sync with the assets in
// public/totem/ (see HANDOFF.md for the regeneration pipeline).
const FRAME_W = 766;
const FRAME_H = 1022;
/** Flip if the shipped sequence is a trimmed <360° arc: scroll then runs
    the frames forward to the end and back, instead of assuming a loop. */
const PING_PONG = false;
/** Scroll distance (in viewports) that maps to one full pass through
    the frames. 0.8 ≈ the distance at which the hero leaves the
    viewport, so the whole 360° plays while the totem is still visible
    and it exits facing forward (first and last frames match). */
const SCROLL_VH = 0.8;
const HOVER_SPREAD = 8; // frames of nudge at full deflection ≈ ±45°
const SMOOTHING = 0.18;

const frameSrc = (i: number) =>
  `/totem/frame-${String(i).padStart(3, "0")}.webp`;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export function TotemScrub() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Below desktop the static poster is the whole treatment and the
    // sequence is never fetched (~0.5 MB saved). Decided once at mount;
    // a mid-session breakpoint crossing keeps the mounted mode.
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");

    // Decoded frames persist across reduced-motion toggles.
    const frames: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null);
    let loadStarted = false;
    let active = false;
    let cleanups: Array<() => void> = [];

    const setup = () => {
      if (active) return;
      active = true;
      const c: Array<() => void> = [];
      cleanups = c;

      let displayed = 0;
      let hoverOffset = 0;
      let drawnIdx = -1;
      let cssW = 0;
      let cssH = 0;
      let raf = 0;
      let running = false;

      const sizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        cssW = canvas.clientWidth;
        cssH = canvas.clientHeight;
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawnIdx = -1; // resizing clears the bitmap; force a redraw
      };

      const nearestLoaded = (i: number) => {
        if (frames[i]) return i;
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (i - d >= 0 && frames[i - d]) return i - d;
          if (i + d < FRAME_COUNT && frames[i + d]) return i + d;
        }
        return -1;
      };

      const draw = () => {
        const idx = clamp(Math.round(displayed), 0, FRAME_COUNT - 1);
        if (idx === drawnIdx) return;
        const use = nearestLoaded(idx);
        if (use < 0) return;
        ctx.clearRect(0, 0, cssW, cssH);
        ctx.drawImage(frames[use] as HTMLImageElement, 0, 0, cssW, cssH);
        drawnIdx = idx;
        root.dataset.frame = String(use);
      };

      const progress = () =>
        clamp(window.scrollY / (window.innerHeight * SCROLL_VH), 0, 1);

      const frameTarget = () => {
        let p = progress();
        if (PING_PONG) p = p <= 0.5 ? p * 2 : (1 - p) * 2;
        return clamp(p * (FRAME_COUNT - 1) + hoverOffset, 0, FRAME_COUNT - 1);
      };

      // One exponential lerp gives both scrub smoothing and the hover
      // ease-back; draw only re-paints when the rounded index changes.
      const tick = () => {
        if (!running) return;
        const target = frameTarget();
        displayed += (target - displayed) * SMOOTHING;
        if (Math.abs(target - displayed) < 0.05) displayed = target;
        draw();
        raf = requestAnimationFrame(tick);
      };

      const loopIO = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      loopIO.observe(root);
      c.push(() => {
        running = false;
        cancelAnimationFrame(raf);
        loopIO.disconnect();
      });

      const loadFrame = (i: number, attempt = 0): Promise<void> =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = frameSrc(i);
          img.decode().then(
            () => {
              frames[i] = img;
              drawnIdx = -1; // an exact frame may now beat the fallback
              resolve();
            },
            () => {
              // Chrome rejects decode() under parallel-decode pressure
              // even when the bytes are fine — keep the image if it
              // actually loaded, retry twice otherwise; a true miss is
              // covered by the nearest-loaded fallback.
              if (img.complete && img.naturalWidth > 0) {
                frames[i] = img;
                drawnIdx = -1;
                resolve();
              } else if (attempt < 2) {
                setTimeout(() => {
                  void loadFrame(i, attempt + 1).then(resolve);
                }, 300);
              } else {
                resolve();
              }
            }
          );
        });

      // Two passes: every 4th frame first (parallel) so an early scrub
      // shows coarse rotation instead of a frozen poster, then fill the
      // gaps sequentially — one decode at a time keeps Chrome's decoder
      // happy and the frames are small.
      const loadAll = async () => {
        if (loadStarted) return;
        loadStarted = true;
        const coarse: Promise<void>[] = [];
        for (let i = 0; i < FRAME_COUNT; i += 4) coarse.push(loadFrame(i));
        await Promise.all(coarse);
        if (!active) return;
        if (frames.some(Boolean)) {
          sizeCanvas();
          draw();
          root.dataset.ready = ""; // CSS crossfades img → canvas
        }
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (!frames[i]) await loadFrame(i);
        }
      };

      // The hero is in view on load, so this fires immediately — kept
      // as an IO for parity/cheapness rather than an eager call.
      const preloadIO = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            void loadAll();
            preloadIO.disconnect();
          }
        },
        { rootMargin: "100% 0px" }
      );
      preloadIO.observe(root);
      c.push(() => preloadIO.disconnect());

      const ro = new ResizeObserver(() => {
        if (!("ready" in root.dataset)) return; // nothing decoded yet
        sizeCanvas();
        draw();
      });
      ro.observe(root);
      c.push(() => ro.disconnect());

      // Hover scrub: pointer position nudges the target frame; the lerp
      // eases it back after pointerleave. Fine pointers only, and never
      // focus — keyboard scrolling already drives the scrub.
      if (pointerFine.matches) {
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          hoverOffset =
            (((e.clientX - r.left) / r.width) * 2 - 1) * HOVER_SPREAD;
        };
        const onLeave = () => {
          hoverOffset = 0;
        };
        root.addEventListener("pointermove", onMove);
        root.addEventListener("pointerleave", onLeave);
        c.push(() => {
          root.removeEventListener("pointermove", onMove);
          root.removeEventListener("pointerleave", onLeave);
        });
      }
    };

    const teardown = () => {
      if (!active) return;
      active = false;
      cleanups.forEach((fn) => fn());
      cleanups = [];
      delete root.dataset.ready; // crossfade back to the static img
      delete root.dataset.frame;
    };

    if (!reduce.matches) setup();
    const onReduceChange = () => (reduce.matches ? teardown() : setup());
    reduce.addEventListener("change", onReduceChange);

    return () => {
      reduce.removeEventListener("change", onReduceChange);
      teardown();
    };
  }, []);

  return (
    <div ref={rootRef} className="totem-scrub w-full max-w-[360px] mx-auto">
      <div className="totem-media relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized
            static WebP served straight from public/; next/image is unused
            site-wide and its optimizer adds nothing to a fixed sequence */}
        <img
          src={frameSrc(0)}
          alt="A freestanding wayfinding totem sign: a dark pylon with a yellow tactile band and a three-stop route pictogram"
          width={FRAME_W}
          height={FRAME_H}
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <p aria-hidden className="totem-hint mt-4 text-center font-mono text-sm text-stone">
        Scroll to walk around it
      </p>
    </div>
  );
}
