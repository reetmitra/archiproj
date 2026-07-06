import type { Metadata } from "next";
import Link from "next/link";
import { getProjectsByTheme, getResearchThemes } from "@/lib/content";
import { PageIntro } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  const themes = getResearchThemes();

  return (
    <>
      <PageIntro
        eyebrow="Research"
        title="Three lines of work"
        lede="Every project starts in the field and ends in something a city can act on — a design guide, an index, a policy brief, a retrofit."
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-8 space-y-20">
        {themes.map((theme) => {
          const projects = getProjectsByTheme(theme.slug);
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
                  className="size-4 rounded-full bg-accent border-[3px] border-ink"
                />
                <p className="font-mono text-sm text-stone">{theme.code}</p>
                <h2
                  id={`${theme.slug}-heading`}
                  className="font-display font-bold text-3xl tracking-tight"
                >
                  {theme.title}
                </h2>
              </div>
              <p data-depth className="mt-5 text-lg text-stone leading-relaxed max-w-2xl">
                {theme.summary}
              </p>

              <div data-depth-group className="mt-8 grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/research/${project.slug}`}
                    data-tilt
                    className="group block border border-line rounded-sm p-6 hover:border-ink transition-colors"
                  >
                    <p className="font-mono text-sm text-stone flex items-center gap-3">
                      {project.years}
                      {project.status === "active" && (
                        <span className="inline-block bg-accent text-ink px-2 py-0.5 text-xs uppercase tracking-widest rounded-sm">
                          Active
                        </span>
                      )}
                    </p>
                    <h3 className="mt-3 font-display font-bold text-xl tracking-tight group-hover:text-moss transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-stone leading-relaxed">
                      {project.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
