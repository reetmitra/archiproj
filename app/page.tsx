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

export default function HomePage() {
  const site = getSiteSettings();
  const themes = getResearchThemes();
  const news = getNews(3);
  const featured = getFeaturedPublications().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-4">
        <Eyebrow>
          <span className="hidden sm:inline">{site.department} · </span>
          {site.institution}
        </Eyebrow>
        <h1 className="mt-5 font-display font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-[5.25rem] leading-[1.02] max-w-4xl">
          Cities that work at{" "}
          <span className="whitespace-nowrap">
            every age
            <span aria-hidden className="text-accent">
              .
            </span>
          </span>
        </h1>
        <p className="mt-7 text-xl sm:text-2xl text-stone leading-relaxed max-w-2xl">
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
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="hidden md:block w-full h-6 overflow-visible"
        >
          <line
            x1="0"
            y1="12"
            x2="1200"
            y2="12"
            pathLength={1200}
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
                <span className="size-4 shrink-0 rounded-full bg-accent border-[3px] border-ink" />
                <span className="w-[3px] flex-1 bg-ink/15" />
              </div>
              <div className="pb-2">
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
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="news-heading"
              className="font-display font-bold text-3xl tracking-tight"
            >
              Latest from the lab
            </h2>
            <Link
              href="/news"
              className="font-mono text-sm text-moss underline underline-offset-4 decoration-line hover:decoration-moss shrink-0"
            >
              All news
            </Link>
          </div>
          <div className="mt-8">
            {news.map((post) => (
              <article
                key={post.id}
                className="grid gap-2 sm:grid-cols-[9rem_1fr_auto] sm:gap-6 py-5 border-b border-line items-baseline"
              >
                <time
                  dateTime={post.date}
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
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="pubs-heading"
              className="font-display font-bold text-3xl tracking-tight"
            >
              Selected publications
            </h2>
            <Link
              href="/publications"
              className="font-mono text-sm text-moss underline underline-offset-4 decoration-line hover:decoration-moss shrink-0"
            >
              All publications
            </Link>
          </div>
          <div className="mt-4">
            {featured.map((pub) => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA — signage band */}
      <section aria-labelledby="join-heading" className="bg-accent">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center gap-8 justify-between">
          <div>
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
          <Link
            href="/join"
            className="inline-block shrink-0 bg-ink text-paper font-display font-bold text-lg px-8 py-4 rounded-sm hover:bg-ink/85 transition-colors"
          >
            Join the lab
          </Link>
        </div>
      </section>
    </>
  );
}
