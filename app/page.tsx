import { Fragment } from "react";
import Link from "next/link";
import {
  getFeaturedPublications,
  getNews,
  getProfile,
  getResearchThemes,
  getSiteSettings,
} from "@/lib/content";
import {
  CategoryTag,
  CoauthorLegend,
  Eyebrow,
  PublicationItem,
  formatDate,
} from "@/components/primitives";
import { HomeMotion } from "@/components/motion/home-motion";
import { SplitFlap } from "@/components/motion/split-flap";
import { TotemScrub } from "@/components/motion/totem-scrub";

export default async function HomePage() {
  const site = await getSiteSettings();
  const profile = await getProfile();
  const themes = await getResearchThemes();
  const news = await getNews(3);
  const featured = (await getFeaturedPublications()).slice(0, 3);

  // The animated headline is the professor's name, one word per flap.
  const nameWords = profile.name.split(" ");
  const lastWord = nameWords[nameWords.length - 1];
  const leadWords = nameWords.slice(0, -1);

  return (
    <>
      {/* data-motion is set pre-paint by the layout's inline script */}
      <HomeMotion />

      {/* Hero. The totem rotates with plain page scroll — no pin, no
          scroll-jacking. Deliberately no data-anim on it: its <img>
          must be visible from first server paint (the scrub component
          owns its own progressive enhancement). Below lg it's a static
          poster under the mission text; the sequence never loads there. */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-4 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-12">
        <div>
        <Eyebrow>
          <span className="hidden sm:inline">{site.department} · </span>
          {/* shortTitle keeps the flap narrow — full pillar titles would
              pad every phrase to ~70 chars */}
          <SplitFlap
            phrases={[
              site.institution,
              ...themes.map((t) => t.shortTitle ?? t.title),
            ]}
            loop
            holdMs={7000}
          />
        </Eyebrow>
        <h1
          data-parallax="0.14"
          className="mt-5 font-display font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-[5.25rem] leading-[1.02] max-w-4xl"
        >
          {leadWords.map((word) => (
            <Fragment key={word}>
              <span className="hero-word">
                <span data-anim="hero-word">{word}</span>
              </span>{" "}
            </Fragment>
          ))}
          <span className="whitespace-nowrap">
            <span className="hero-word">
              <span data-anim="hero-word">{lastWord}</span>
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
          className="mt-5 font-mono text-sm sm:text-base text-stone"
        >
          {profile.title} · {profile.affiliation}
        </p>
        <p
          data-anim="hero-mission"
          className="mt-6 text-lg sm:text-xl text-stone leading-relaxed max-w-2xl"
        >
          {profile.bio}
        </p>
        <p
          data-anim="hero-mission"
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm"
        >
          {/* the address itself is the label: mailto still works where a
              mail client exists, and everyone else can read/copy it */}
          <a
            href={`mailto:${profile.email}`}
            className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
          >
            {profile.email}
          </a>
          {profile.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
            >
              {link.label}
            </a>
          ))}
        </p>
        <ul
          aria-label="Education"
          data-anim="hero-mission"
          className="mt-8 space-y-1.5 font-mono text-sm text-stone"
        >
          {profile.education.map((entry) => (
            <li key={entry.degree}>
              {entry.year} — {entry.degree}, {entry.institution}
            </li>
          ))}
        </ul>
        </div>
        <div className="mt-12 lg:mt-0 w-full max-w-[240px] lg:max-w-none mx-auto">
          <TotemScrub />
        </div>
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
            <CoauthorLegend />
            {featured.map((pub) => (
              <div key={pub.id} data-anim="row">
                <PublicationItem pub={pub} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work-with-me CTA — signage band. The yellow band is never hidden;
          empty signage before the text arrives is intended. */}
      <section aria-labelledby="work-heading" className="bg-accent">
        <div
          data-motion-section="cta"
          data-parallax="0.08"
          className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center gap-8 justify-between"
        >
          <div data-anim="cta-copy">
            <h2
              id="work-heading"
              className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl"
            >
              Work with me.
            </h2>
            <p className="mt-4 text-lg max-w-xl leading-relaxed">
              Funded PhD positions, paid fieldwork roles, and collaborations
              for people who want research to change what gets built.
            </p>
          </div>
          {/* data-magnet edge, accepted: the cta-btn entrance timeline also
              animates transforms, but it fires once on scroll-in and ends
              before a pointer can settle on the button. */}
          <Link
            href="/work-with-me"
            data-anim="cta-btn"
            data-magnet
            className="inline-block shrink-0 bg-ink text-paper font-display font-bold text-lg px-8 py-4 rounded-sm hover:bg-ink/85 transition-colors"
          >
            How to work with me
          </Link>
        </div>
      </section>
    </>
  );
}
