import type { Metadata } from "next";
import {
  getPublications,
  getResearchPage,
  getResearchThemes,
} from "@/lib/content";
import {
  CoauthorLegend,
  PageIntro,
  PublicationItem,
} from "@/components/primitives";

export const metadata: Metadata = {
  title: "Research",
};

export default async function ResearchPage() {
  const page = await getResearchPage();
  const themes = await getResearchThemes();
  const allPubs = await getPublications();

  return (
    <>
      <PageIntro eyebrow="Research" title={page.title} />

      {/* Research vision — the prof's overview, verbatim */}
      <div
        data-depth
        className="mx-auto max-w-6xl px-5 sm:px-8 -mt-2 pb-16"
      >
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
          {page.overview.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-8 space-y-20">
        {themes.map((theme) => {
          // publicationIds order is the on-page order; a dangling id
          // (e.g. a pub deleted in the Studio) just drops out
          const selected = (theme.publicationIds ?? [])
            .map((id) => allPubs.find((p) => p.id === id))
            .filter((p) => p !== undefined);
          return (
            <section
              key={theme.slug}
              id={theme.slug}
              aria-labelledby={`${theme.slug}-heading`}
              className="scroll-mt-24"
            >
              <div
                data-depth
                className="flex items-center gap-4 pb-6 border-b-[3px] border-ink"
              >
                <span
                  aria-hidden
                  data-depth="pop"
                  className="size-4 shrink-0 rounded-full bg-accent border-[3px] border-ink"
                />
                <p className="font-mono text-sm text-stone">{theme.code}</p>
                <h2
                  id={`${theme.slug}-heading`}
                  className="font-display font-bold text-3xl tracking-tight"
                >
                  {theme.title}
                </h2>
              </div>

              <div
                data-depth
                className="mt-6 max-w-2xl space-y-6 text-lg leading-relaxed"
              >
                {theme.body?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>

              {theme.figure && (
                <figure
                  data-depth
                  // never stretch a small original (the P2 chart is 379px)
                  className="mt-8 max-w-3xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image
                      is unused site-wide; src may be a Sanity CDN URL */}
                  <img
                    src={theme.figure.src}
                    alt={theme.figure.alt}
                    loading="lazy"
                    className="h-auto max-w-full border border-line rounded-sm bg-white"
                  />
                  {theme.figure.caption && (
                    <figcaption className="mt-2 max-w-2xl font-mono text-xs text-stone leading-relaxed">
                      {theme.figure.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {selected.length > 0 && (
                <div data-depth className="mt-10 max-w-4xl">
                  <h3 className="font-display font-semibold text-xl tracking-tight">
                    Selected publications
                  </h3>
                  <div className="mt-3">
                    <CoauthorLegend />
                  </div>
                  <div className="mt-1">
                    {selected.map((pub) => (
                      <PublicationItem key={pub.id} pub={pub} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
