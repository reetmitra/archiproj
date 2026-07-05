"use client";

import { useEffect } from "react";
import {
  createScope,
  createTimeline,
  cubicBezier,
  stagger,
  steps,
  svg,
  utils,
} from "animejs";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Scramble each date's characters (digits->digits, letters->A-Z) and
    settle left to right — the "departures board refresh". No anime dep;
    <time> text is restored exactly so the accessible value is unchanged. */
function shuffleSettle(el: HTMLElement, rowDelay: number) {
  const final = el.textContent ?? "";
  const chars = final.split("");
  const start = performance.now();
  const settleMs = 300;
  const lockAt = chars.map((_, i) => (i / Math.max(chars.length, 1)) * settleMs);

  const scramble = (ch: string) => {
    if (/\d/.test(ch)) return String(Math.floor(Math.random() * 10));
    if (/[a-zA-Z]/.test(ch)) return GLYPHS[Math.floor(Math.random() * 26)];
    return ch;
  };

  let raf = 0;
  const tick = (now: number) => {
    const elapsed = now - start - rowDelay;
    if (elapsed < 0) {
      raf = requestAnimationFrame(tick);
      return;
    }
    let done = true;
    let out = "";
    for (let i = 0; i < chars.length; i++) {
      if (elapsed >= lockAt[i]) {
        out += chars[i];
      } else {
        done = false;
        out += scramble(chars[i]);
      }
    }
    el.textContent = out;
    if (done) {
      el.textContent = final;
    } else {
      raf = requestAnimationFrame(tick);
    }
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export function HomeMotion() {
  useEffect(() => {
    // Backup for client-side nav (inline pre-paint script doesn't re-run):
    // one visible frame accepted, per plan.
    document.documentElement.setAttribute("data-motion", "");

    const root = document.getElementById("main");
    if (!root) return;

    const cancels: Array<() => void> = [];

    const scope = createScope({
      root,
      defaults: { ease: "outCubic", duration: 450 },
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMobile: "(max-width: 767px)",
      },
    }).add((self) => {
      // The type marks self optional, but the scope always passes itself.
      if (!self) return;
      // Reduced motion: CSS never pre-hid [data-anim] for these users, so
      // everything is already visible. Create nothing.
      if (self.matches.reduceMotion) return;

      const isMobile = self.matches.isMobile;

      // --- Hero timeline (autoplays once) ---
      const hero = createTimeline();

      hero.add(
        "[data-anim='hero-word']",
        {
          translateY: ["110%", "0%"],
          opacity: { to: 1, duration: 180 },
          duration: 650,
          ease: "outQuint",
        },
        stagger(70)
      );

      hero.add(
        "[data-anim='hero-mission']",
        { y: [12, 0], opacity: 1, duration: 500, ease: "outCubic" },
        550
      );

      hero.add(
        "[data-anim='hero-dot']",
        { scale: [0, 1], opacity: 1, duration: 350, ease: "outBack(1.6)" },
        720
      );

      if (!isMobile) {
        // Desktop: horizontal route draws, three stops pop, cards slide in.
        // Synchronous init before the timeline starts: line at draw:0 and
        // stops hidden BEFORE the svg un-hides, so nothing flashes. Kept
        // out of the mobile branch — the svg is display:none there and
        // createDrawable would call geometry APIs on an unrendered element.
        const drawables = svg.createDrawable(".route-path");
        utils.set(drawables, { draw: "0 0" });
        utils.set(".route-stop", { opacity: 0, scale: 0.4 });
        utils.set("[data-anim='route-svg']", { opacity: 1 });

        hero.add(
          drawables,
          { draw: "0 1", duration: 1100, ease: cubicBezier(0.55, 0, 0.15, 1) },
          450
        );

        // Pop each stop as the drawhead crosses it: inverse of the bezier
        // at progress 1/6, 1/2, 5/6 → 302/426/608ms into the 1100ms draw.
        const stops = utils.$(".route-stop");
        const stopPos = [752, 876, 1058];
        stops.forEach((stop, i) => {
          hero.add(
            stop,
            { scale: [0.4, 1], opacity: 1, duration: 320, ease: "outBack(1.4)" },
            stopPos[i]
          );
        });

        const cards = utils.$("[data-anim='theme-card']");
        const cardPos = [892, 1016, 1198];
        cards.forEach((card, i) => {
          hero.add(
            card,
            { x: [-16, 0], opacity: 1, duration: 450, ease: "outCubic" },
            cardPos[i]
          );
        });
      } else {
        // Mobile: per theme, the dot pops, the vertical line grows, the
        // card rises. Desktop SVG is display:none here so it's untouched.
        const dots = utils.$("[data-anim='m-dot']");
        const lines = utils.$("[data-anim='m-line']");
        const cards = utils.$("[data-anim='theme-card']");
        dots.forEach((dot, i) => {
          const T = 450 + i * 250;
          hero.add(
            dot,
            { scale: [0.4, 1], opacity: 1, duration: 300, ease: "outBack(1.4)" },
            T
          );
          if (lines[i]) {
            hero.add(
              lines[i],
              { scaleY: [0, 1], opacity: 1, duration: 400, ease: "outCubic" },
              T + 80
            );
          }
          if (cards[i]) {
            hero.add(
              cards[i],
              { y: [12, 0], opacity: 1, duration: 450, ease: "outCubic" },
              T + 140
            );
          }
        });
      }

      // --- Section timelines (paused; IO plays each once) ---
      const buildSection = (section: "news" | "pubs") => {
        const sel = `[data-motion-section='${section}'] `;
        const tl = createTimeline({ autoplay: false });
        tl.add(
          `${sel}[data-anim='section-rule']`,
          { scaleX: [0, 1], opacity: 1, duration: 400, ease: "outQuint" },
          0
        );
        tl.add(
          `${sel}[data-anim='row']`,
          {
            y: [10, 0],
            opacity: 1,
            duration: 400,
            ease: "outCubic",
            delay: stagger(80),
          },
          100
        );
        if (section === "news") {
          tl.add(
            `${sel}[data-anim='row-date']`,
            {
              opacity: [0, 1],
              duration: 240,
              ease: steps(4),
              delay: stagger(80),
            },
            150
          );
        }
        return tl;
      };

      const newsTl = buildSection("news");
      const pubsTl = buildSection("pubs");

      const ctaTl = createTimeline({ autoplay: false });
      ctaTl.add(
        "[data-anim='cta-copy']",
        { y: [14, 0], opacity: 1, duration: 500, ease: "outQuint" },
        0
      );
      ctaTl.add(
        "[data-anim='cta-btn']",
        {
          y: [14, 0],
          scale: [0.97, 1],
          opacity: 1,
          duration: 450,
          ease: "outBack(1.2)",
        },
        120
      );

      const timelines: Record<string, ReturnType<typeof createTimeline>> = {
        news: newsTl,
        pubs: pubsTl,
        cta: ctaTl,
      };

      // Play each section once on first scroll-in; the news dates also do
      // the character-shuffle "board refresh" via rAF.
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const key = (entry.target as HTMLElement).dataset.motionSection;
            if (!key) continue;
            timelines[key]?.play();
            if (key === "news") {
              const dates = root.querySelectorAll<HTMLElement>(
                "[data-motion-section='news'] [data-anim='row-date']"
              );
              dates.forEach((d, i) => cancels.push(shuffleSettle(d, i * 80)));
            }
            io.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );

      root
        .querySelectorAll<HTMLElement>("[data-motion-section]")
        .forEach((el) => io.observe(el));

      cancels.push(() => io.disconnect());
    });

    // Scope constructed without throwing: JS owns every reveal now, so
    // disarm the 4s CSS safety net (it would force scroll-triggered
    // sections visible before the user reaches them).
    document.documentElement.setAttribute("data-motion-live", "");

    return () => {
      // Disconnect the observer before reverting the scope so a scroll
      // during teardown can't queue a play on a reverted timeline.
      cancels.forEach((c) => c());
      scope.revert();
      document.documentElement.removeAttribute("data-motion-live");
    };
  }, []);

  return null;
}
