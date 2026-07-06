"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  animate,
  createAnimatable,
  createScope,
  cubicBezier,
  onScroll,
  stagger,
  utils,
} from "animejs";

/**
 * Site-wide "signage has depth" layer. Attribute-driven so pages stay
 * server components:
 *
 *   data-anim="intro"     page-arrival reveal (pre-hidden by the existing
 *                         [data-anim] CSS gate; plays on mount, staggered)
 *   data-depth            one-shot entrance: soft perspective tilt-up
 *   data-depth="pop"      one-shot entrance: route-stop pop (scale)
 *   data-depth-group      container; children rise together, staggered
 *   data-parallax="0.15"  scroll-linked drift; value scales travel,
 *                         capped so nothing moves more than ~±24px
 *   data-tilt             pointer-following panel tilt (fine pointers only)
 *
 * Unlike the homepage hero, data-depth targets are NOT pre-hidden in CSS:
 * initial states are set here, after mount, and only for elements still
 * below the fold — no-JS, crawlers, and reduced-motion users get the
 * fully static page. On the homepage only the parallax scan finds
 * targets; home-motion.tsx owns everything else there, including the
 * data-motion/data-motion-live gate flags.
 */

const ENTER_LINE = 0.88; // fraction of viewport height; matches IO margin
const TILT_MAX_DEG = 2;
const RISE = {
  opacity: [0, 1],
  rotateX: [4, 0],
  y: [20, 0],
  duration: 600,
  ease: cubicBezier(0.22, 1, 0.36, 1),
};
const POP = {
  opacity: [0, 1],
  scale: [0.4, 1],
  duration: 320,
  ease: "outBack(1.4)",
};

function setInitial(el: HTMLElement) {
  if (el.getAttribute("data-depth") === "pop") {
    utils.set(el, { opacity: 0, scale: 0.4 });
  } else {
    utils.set(el, { opacity: 0, perspective: 900, rotateX: 4, y: 20 });
  }
}

export function ScrollDepth() {
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === "/";
    if (!isHome) document.documentElement.setAttribute("data-motion", "");

    const scope = createScope({
      defaults: { duration: 600 },
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        pointerFine: "(pointer: fine)",
      },
    }).add((self) => {
      if (!self) return;
      if (self.matches.reduceMotion) return;

      const winH = window.innerHeight;
      const belowFold = (el: HTMLElement) =>
        el.getBoundingClientRect().top > winH * ENTER_LINE;
      const cleanups: Array<() => void> = [];

      // --- Page arrival: reveal the intro block, staggered ---
      const intros = utils.$("[data-anim='intro']");
      if (intros.length > 0) {
        utils.set(intros, { perspective: 800 });
        animate(intros, {
          y: [14, 0],
          rotateX: [3, 0],
          opacity: 1,
          duration: 550,
          ease: cubicBezier(0.22, 1, 0.36, 1),
          delay: stagger(80),
        });
      }

      // --- Scroll entrances ---
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            if (el.hasAttribute("data-depth-group")) {
              const items = (
                Array.from(el.children) as HTMLElement[]
              ).filter((c) => c.dataset.depthInit === "");
              animate(items, { ...RISE, delay: stagger(70) });
            } else {
              animate(
                el,
                el.getAttribute("data-depth") === "pop" ? POP : RISE
              );
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      cleanups.push(() => io.disconnect());

      document
        .querySelectorAll<HTMLElement>("[data-depth-group]")
        .forEach((group) => {
          const pending = (Array.from(group.children) as HTMLElement[]).filter(
            belowFold
          );
          if (pending.length === 0) return;
          pending.forEach((item) => {
            // Marks the child as owned by its group so the individual
            // [data-depth] pass below skips it.
            item.dataset.depthInit = "";
            utils.set(item, { opacity: 0, perspective: 900, rotateX: 4, y: 20 });
          });
          io.observe(group);
        });

      document.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        if (el.closest("[data-depth-group]")) return;
        if (!belowFold(el)) return;
        setInitial(el);
        io.observe(el);
      });

      // --- Parallax ---
      // Anchored so each element sits exactly at its designed position
      // when the page is at scrollY = 0: p0 is the traversal progress the
      // element would report there, and the keyframes are offset so
      // y(p0) = 0. Travel is capped — this is drift, not a ride.
      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const rate = parseFloat(el.dataset.parallax ?? "");
          if (!Number.isFinite(rate) || rate <= 0) return;
          const rect = el.getBoundingClientRect();
          const docTop = rect.top + window.scrollY;
          const p0 = utils.clamp(
            (winH - docTop) / (winH + rect.height),
            0,
            1
          );
          const travel = utils.clamp(rate, 0, 0.3) * 160;
          animate(el, {
            y: [travel * p0, -travel * (1 - p0)],
            ease: "linear",
            autoplay: onScroll({
              sync: true,
              enter: "bottom top",
              leave: "top bottom",
            }),
          });
        });

      // --- Pointer tilt ---
      if (self.matches.pointerFine) {
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
          const tilt = createAnimatable(el, {
            rotateX: 350,
            rotateY: 350,
            ease: "outQuad",
          });
          const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * 2 - 1;
            const py = ((e.clientY - r.top) / r.height) * 2 - 1;
            tilt.rotateX(-py * TILT_MAX_DEG);
            tilt.rotateY(px * TILT_MAX_DEG);
          };
          const onEnter = () => utils.set(el, { perspective: 600 });
          const onLeave = () => {
            tilt.rotateX(0);
            tilt.rotateY(0);
          };
          el.addEventListener("pointerenter", onEnter);
          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("pointerenter", onEnter);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      return () => cleanups.forEach((c) => c());
    });

    // Scope constructed without throwing: JS owns the intro reveal now,
    // so disarm the 4s CSS safety net. On the homepage home-motion makes
    // this call — and must stay the only one to, so a failure there
    // still trips the net.
    if (!isHome) document.documentElement.setAttribute("data-motion-live", "");

    return () => {
      scope.revert();
      if (!isHome) document.documentElement.removeAttribute("data-motion-live");
      // Reverting clears anime's inline styles but not the ownership
      // marker; stale markers would confuse the next route's scan.
      document
        .querySelectorAll<HTMLElement>("[data-depth-init]")
        .forEach((el) => delete el.dataset.depthInit);
    };
  }, [pathname]);

  return null;
}
