import type { Metadata } from "next";
import {
  getPublications,
  getResearchPage,
  getResearchThemes,
} from "@/lib/content";
import {
  CoauthorLegend,
  ContentFigure,
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
      <PageIntro title={page.title} />

      {/* Research vision — the prof's overview, verbatim */}
      <div
        data-depth
        className="mx-auto max-w-6xl px-5 sm:px-8 -mt-2 pb-16"
      >
        {/* Full container width on purpose — the prof asked for the text
            to span the page, not sit in a half-width column (2026-07) */}
        <div className="space-y-6 text-lg leading-relaxed">
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
                className="mt-6 space-y-6 text-lg leading-relaxed"
              >
                {theme.body?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>

              {theme.figure && (
                <ContentFigure image={theme.figure} className="mt-8" />
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
