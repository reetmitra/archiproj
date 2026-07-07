import Link from "next/link";
import {
  getFeaturedPublications,
  getNews,
  getResearchThemes,
  getSiteSettings,
} from "@/lib/content";
import {
  CategoryTag,
  Eyebrow,
  PublicationItem,
  formatDate,
} from "@/components/primitives";
import { HomeMotion } from "@/components/motion/home-motion";
import { SplitFlap } from "@/components/motion/split-flap";
import { TotemScrub } from "@/components/motion/totem-scrub";

export default function HomePage() {
  const site = getSiteSettings();
  const themes = getResearchThemes();
  const news = getNews(3);
  const featured = getFeaturedPublications().slice(0, 3);

  return (
    <>
      {/* data-motion is set pre-paint by the layout's inline script */}
      <HomeMotion />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-4">
        <Eyebrow>
          <span className="hidden sm:inline">{site.department} · </span>
          <SplitFlap
            phrases={[site.institution, ...themes.map((t) => t.title)]}
            loop
            holdMs={7000}
          />
        </Eyebrow>
        <h1
          data-parallax="0.14"
          className="mt-5 font-display font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-[5.25rem] leading-[1.02] max-w-4xl"
        >
          <span className="hero-word">
            <span data-anim="hero-word">Cities</span>
          </span>{" "}
          <span className="hero-word">
            <span data-anim="hero-word">that</span>
          </span>{" "}
          <span className="hero-word">
            <span data-anim="hero-word">work</span>
          </span>{" "}
          <span className="hero-word">
            <span data-anim="hero-word">at</span>
          </span>{" "}
          <span className="whitespace-nowrap">
            <span className="hero-word">
              <span data-anim="hero-word">every</span>
            </span>{" "}
            <span className="hero-word">
              <span data-anim="hero-word">age</span>
            </span>
            <span
              aria-hidden
              data-anim="hero-dot"
              className="inline-block text-accent"
            >
              .
            </span>
          </span>
        </h1>
        <p
          data-anim="hero-mission"
          className="mt-7 text-xl sm:text-2xl text-stone leading-relaxed max-w-2xl"
        >
          {site.mission}
        </p>
      </section>

      {/* Route line + research themes */}
      <section
        aria-labelledby="themes-heading"
        className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-20"
      >
        <h2 id="themes-heading" className="sr-only">
          Research themes
        </h2>

        {/* the route: one line, three stops */}
        <svg
          aria-hidden
          data-anim="route-svg"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="hidden md:block w-full h-6 overflow-visible"
        >
          <line
            x1="0"
            y1="12"
            x2="1200"
            y2="12"
            className="route-path stroke-ink"
            strokeWidth="3"
          />
          {[200, 600, 1000].map((cx) => (
            <circle
              key={cx}
              cx={cx}
              cy="12"
              r="9"
              className="route-stop fill-accent stroke-ink"
              strokeWidth="3"
            />
          ))}
        </svg>

        <div className="md:mt-8 grid gap-10 md:gap-8 md:grid-cols-3">
          {themes.map((theme) => (
            <div key={theme.slug} className="flex gap-4 md:block">
              {/* mobile: the route runs vertically beside the text */}
              <div aria-hidden className="md:hidden flex flex-col items-center">
                <span
                  data-anim="m-dot"
                  className="size-4 shrink-0 rounded-full bg-accent border-[3px] border-ink"
                />
                <span
                  data-anim="m-line"
                  className="w-[3px] flex-1 bg-ink/15 origin-top"
                />
              </div>
              <div data-anim="theme-card" className="pb-2">
                <p className="font-mono text-sm text-stone">{theme.code}</p>
                <h3 className="mt-2 font-display font-bold text-2xl tracking-tight">
                  <Link
                    href={`/research#${theme.slug}`}
                    className="hover:text-moss transition-colors"
                  >
                    {theme.title}
                  </Link>
                </h3>
                <p className="mt-3 text-stone leading-relaxed">{theme.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest news — timetable rows */}
      <section aria-labelledby="news-heading" className="border-t border-line">
        <div
          data-motion-section="news"
          className="mx-auto max-w-6xl px-5 sm:px-8 py-16"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="news-heading"
              className="font-display font-bold text-3xl tracking-tight"
            >
              Latest from the lab
            </h2>
            <Link
              href="/news"
              className="link-draw font-mono text-sm text-moss shrink-0"
            >
              All news
            </Link>
          </div>
          <span
            aria-hidden
            data-anim="section-rule"
            className="mt-4 block h-px bg-line origin-left"
          />
          <div className="mt-8">
            {news.map((post) => (
              <article
                key={post.id}
                data-anim="row"
                className="grid gap-2 sm:grid-cols-[9rem_1fr_auto] sm:gap-6 py-5 border-b border-line items-baseline"
              >
                <time
                  dateTime={post.date}
                  data-anim="row-date"
                  className="font-mono text-sm text-stone"
                >
                  {formatDate(post.date)}
                </time>
                <div>
                  <h3 className="font-display font-semibold text-lg leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-stone leading-relaxed">{post.body}</p>
                </div>
                <CategoryTag category={post.category} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured publications */}
      <section aria-labelledby="pubs-heading" className="border-t border-line">
        <div
          data-motion-section="pubs"
          className="mx-auto max-w-6xl px-5 sm:px-8 py-16"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="pubs-heading"
              className="font-display font-bold text-3xl tracking-tight"
            >
              Selected publications
            </h2>
            <Link
              href="/publications"
              className="link-draw font-mono text-sm text-moss shrink-0"
            >
              All publications
            </Link>
          </div>
          <span
            aria-hidden
            data-anim="section-rule"
            className="mt-4 block h-px bg-line origin-left"
          />
          <div className="mt-4">
            {featured.map((pub) => (
              <div key={pub.id} data-anim="row">
                <PublicationItem pub={pub} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field object — scroll-scrubbed totem turntable. Deliberately no
          data-anim anywhere in here: the <img> must be visible from first
          server paint (the scrub component owns its own progressive
          enhancement), and the pre-hide gate must never touch it. The
          stage only grows tall enough to pin on JS+motion+desktop, via
          the html[data-motion] media query in globals.css. */}
      <section aria-labelledby="totem-heading" className="border-t border-line">
        <div className="totem-stage">
          <div className="totem-pin sticky top-16 flex items-center md:min-h-[calc(100svh-4rem)] py-16 md:py-0">
            <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <Eyebrow>Field object</Eyebrow>
                <h2
                  id="totem-heading"
                  className="mt-4 font-display font-bold text-3xl sm:text-4xl tracking-tight"
                >
                  Signage you can read at every speed.
                </h2>
                <p className="mt-4 text-stone leading-relaxed max-w-md">
                  We prototype the objects our research argues for. This totem
                  is the lab&rsquo;s test rig &mdash; high-contrast, glare-free,
                  legible from a bus window or a bench.
                </p>
              </div>
              <TotemScrub />
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA — signage band. The yellow band is never hidden; empty
          signage before the text arrives is intended. */}
      <section aria-labelledby="join-heading" className="bg-accent">
        <div
          data-motion-section="cta"
          data-parallax="0.08"
          className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center gap-8 justify-between"
        >
          <div data-anim="cta-copy">
            <h2
              id="join-heading"
              className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl"
            >
              We&rsquo;re recruiting.
            </h2>
            <p className="mt-4 text-lg max-w-xl leading-relaxed">
              Funded PhD positions and paid fieldwork roles for students who
              want research to change what gets built.
            </p>
          </div>
          {/* data-magnet edge, accepted: the cta-btn entrance timeline also
              animates transforms, but it fires once on scroll-in and ends
              before a pointer can settle on the button. */}
          <Link
            href="/join"
            data-anim="cta-btn"
            data-magnet
            className="inline-block shrink-0 bg-ink text-paper font-display font-bold text-lg px-8 py-4 rounded-sm hover:bg-ink/85 transition-colors"
          >
            Join the lab
          </Link>
        </div>
      </section>
    </>
  );
}
