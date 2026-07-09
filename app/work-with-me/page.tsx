import type { Metadata } from "next";
import { getProfile, getWorkWithMe } from "@/lib/content";
import { PageIntro } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Work with me",
};

export default async function WorkWithMePage() {
  const content = await getWorkWithMe();
  const profile = await getProfile();
  const openings = content.openings?.filter((o) => o.open) ?? [];

  return (
    <>
      <PageIntro
        eyebrow="Work with me"
        title={content.heading}
        lede={content.intro}
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-8">
        {/* Tiered guidance: who you are decides what to read */}
        <div className="space-y-16">
          {content.sections.map((section, i) => {
            const headingId = `tier-${i}-heading`;
            return (
              <section key={section.title} aria-labelledby={headingId}>
                <h2
                  id={headingId}
                  data-depth
                  className="font-mono text-sm uppercase tracking-[0.2em] text-stone pb-4 border-b-[3px] border-ink"
                >
                  {section.title}
                </h2>
                <p data-depth className="mt-8 text-lg leading-relaxed max-w-2xl">
                  {section.body}
                </p>
              </section>
            );
          })}
        </div>

        {openings.length > 0 && (
          <section aria-labelledby="openings-heading" className="mt-16">
            <h2
              id="openings-heading"
              data-depth
              className="font-mono text-sm uppercase tracking-[0.2em] text-stone pb-4 border-b-[3px] border-ink"
            >
              Current openings
            </h2>
            <div className="mt-8 space-y-6">
              {openings.map((opening) => (
                <article
                  key={opening.title}
                  data-depth
                  data-tilt
                  className="border border-line rounded-sm p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display font-bold text-2xl tracking-tight">
                      {opening.title}
                    </h3>
                    <span className="bg-accent text-ink font-mono text-xs uppercase tracking-widest px-2 py-1 rounded-sm">
                      Open
                    </span>
                  </div>
                  <p className="mt-3 text-stone leading-relaxed">
                    {opening.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section data-depth aria-labelledby="apply-heading" className="mt-16">
          <h2
            id="apply-heading"
            className="font-mono text-sm uppercase tracking-[0.2em] text-stone pb-4 border-b-[3px] border-ink"
          >
            How to get in touch
          </h2>
          <p className="mt-8 text-lg leading-relaxed max-w-2xl">
            {content.howToApply}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block bg-ink text-paper font-display font-bold text-lg px-8 py-4 rounded-sm hover:bg-ink/85 transition-colors"
          >
            Write to me
          </a>
          <p className="mt-4 font-mono text-sm text-stone">{profile.email}</p>
        </section>
      </div>
    </>
  );
}
