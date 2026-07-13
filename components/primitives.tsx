import { Fragment } from "react";
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
  lede?: React.ReactNode;
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

/**
 * The professor's own name, in any of the forms it takes in author
 * lists ("Li, Shengxiao (Alex)", "Shengxiao (Alex) Li", "Shengxiao Li").
 * Bolding happens here at render time so he never marks up author
 * lines in the Studio.
 */
function isProfAuthor(author: string) {
  return /shengxiao/i.test(author) && /\bli\b/i.test(author);
}

/** Citation-style author list: "A, B, and C", professor's name bold. */
function AuthorList({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((author, i) => (
        <Fragment key={`${i}-${author}`}>
          {i > 0 && (i === authors.length - 1 ? ", and " : ", ")}
          {isProfAuthor(author) ? (
            <strong className="font-semibold text-ink">{author}</strong>
          ) : (
            author
          )}
        </Fragment>
      ))}
    </>
  );
}

/** The `*` convention in author lists, shown once above each pub list */
export function CoauthorLegend() {
  return (
    <p className="font-mono text-xs text-stone">* student co-author</p>
  );
}

/** Citation-style publication entry */
export function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <article className="grid grid-cols-[3.5rem_1fr] gap-x-5 py-6 border-b border-line">
      <p className="font-mono text-sm text-stone pt-1">{pub.year}</p>
      <div>
        <h3 className="font-display font-semibold text-lg leading-snug">
          {/* The title IS the link — no raw DOI on the page (prof's rule) */}
          {pub.doi ? (
            <a
              href={`https://doi.org/${pub.doi}`}
              className="underline underline-offset-4 decoration-line hover:decoration-moss hover:text-moss transition-colors"
            >
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>
        <p className="mt-1.5 text-stone">
          <AuthorList authors={pub.authors} /> ·{" "}
          <span className="italic">{pub.venue}</span>
          {pub.citation && ` ${pub.citation}`}
        </p>
        <p className="mt-2 flex gap-4 font-mono text-sm">
          <span className="uppercase tracking-widest text-stone">{pub.type}</span>
          {pub.note && (
            <span className="uppercase tracking-widest text-stone">
              {pub.note}
            </span>
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
