import type { NewsCategory, Publication } from "@/lib/content";

/** Mono uppercase kicker above headings — the timetable voice */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-sm uppercase tracking-[0.2em] text-stone">
      {children}
    </p>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div
      data-parallax="0.1"
      className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-12"
    >
      <div data-anim="intro">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1
        data-anim="intro"
        className="mt-4 font-display font-bold tracking-tight text-4xl sm:text-6xl max-w-3xl"
      >
        {title}
      </h1>
      {lede && (
        <p
          data-anim="intro"
          className="mt-6 text-xl text-stone leading-relaxed max-w-2xl"
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export const categoryLabels: Record<NewsCategory, string> = {
  paper: "Paper",
  talk: "Talk",
  grant: "Grant",
  media: "Media",
  lab: "Lab",
};

export function CategoryTag({ category }: { category: NewsCategory }) {
  return (
    <span className="inline-block font-mono text-xs uppercase tracking-widest border border-line rounded-sm px-2 py-1 text-stone">
      {categoryLabels[category]}
    </span>
  );
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Citation-style publication entry */
export function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <article className="grid grid-cols-[3.5rem_1fr] gap-x-5 py-6 border-b border-line">
      <p className="font-mono text-sm text-stone pt-1">{pub.year}</p>
      <div>
        <h3 className="font-display font-semibold text-lg leading-snug">
          {pub.title}
        </h3>
        <p className="mt-1.5 text-stone">
          {pub.authors.join(", ")} ·{" "}
          <span className="italic">{pub.venue}</span>
        </p>
        <p className="mt-2 flex gap-4 font-mono text-sm">
          <span className="uppercase tracking-widest text-stone">{pub.type}</span>
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
            >
              DOI
            </a>
          )}
          {pub.pdf && (
            <a
              href={pub.pdf}
              className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
            >
              PDF
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
