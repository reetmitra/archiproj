"use client";

import { useEffect, useRef, useState } from "react";

type SplitFlapProps = {
  phrases: string[];
  loop?: boolean;
  holdMs?: number;
  settleMs?: number;
  className?: string;
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·";

/** Deterministic server/first-client render: plain text, byte-identical
    so hydration never mismatches and no-JS/crawlers get real content. */
export function SplitFlap({
  phrases,
  loop = false,
  holdMs = 7000,
  settleMs = 300,
  className,
}: SplitFlapProps) {
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Pad every phrase to the longest so the box never resizes as it flaps.
  const width = phrases.reduce((max, p) => Math.max(max, p.length), 0);
  const padded = phrases.map((p) => p.padEnd(width, " "));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);

    const el = containerRef.current;
    if (!el) return;

    // Build one span per character; each locks in left to right.
    const spans: HTMLSpanElement[] = [];
    const render = (text: string) => {
      el.textContent = "";
      spans.length = 0;
      for (const ch of text) {
        const s = document.createElement("span");
        s.setAttribute("aria-hidden", "true");
        s.textContent = ch;
        el.appendChild(s);
        spans.push(s);
      }
    };
    render(padded[0]);

    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let index = 0;
    let cancelled = false;

    const shuffleTo = (target: string, done: () => void) => {
      el.setAttribute("aria-label", target.trim());
      const start = performance.now();
      const lockAt = target.split("").map((_, i) => 150 + i * 35);
      const total = lockAt[lockAt.length - 1] + settleMs;

      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        let allLocked = true;
        for (let i = 0; i < spans.length; i++) {
          if (elapsed >= lockAt[i]) {
            spans[i].textContent = target[i];
          } else {
            allLocked = false;
            spans[i].textContent =
              GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        if (elapsed < total || !allLocked) {
          raf = requestAnimationFrame(tick);
        } else {
          for (let i = 0; i < spans.length; i++) spans[i].textContent = target[i];
          done();
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const advance = () => {
      index = (index + 1) % padded.length;
      shuffleTo(padded[index], () => {
        if (cancelled || !loop) return;
        holdTimer = setTimeout(advance, holdMs);
      });
    };

    // Settle the first phrase on mount, then (if looping) cycle forever.
    shuffleTo(padded[0], () => {
      if (cancelled) return;
      if (loop && padded.length > 1) holdTimer = setTimeout(advance, holdMs);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [padded, loop, holdMs, settleMs]);

  return (
    <span
      ref={containerRef}
      className={className}
      aria-label={animate ? padded[0].trim() : undefined}
    >
      {phrases[0]}
    </span>
  );
}
