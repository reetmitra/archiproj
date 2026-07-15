import type { Metadata } from "next";
import { getCourses, getTeachingPage, type Course } from "@/lib/content";
import { ContentFigure, PageIntro } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Teaching",
};

/** Institutions in order of their first course; courses arrive sorted. */
function groupByInstitution(courses: Course[]) {
  const groups = new Map<string, Course[]>();
  for (const course of courses) {
    const list = groups.get(course.institution) ?? [];
    list.push(course);
    groups.set(course.institution, list);
  }
  return [...groups.entries()];
}

export default async function TeachingPage() {
  const page = await getTeachingPage();
  const courses = await getCourses();
  const institutions = groupByInstitution(courses);

  return (
    <>
      <PageIntro title={page.title} />

      {/* Teaching philosophy — full container width, like the research
          overview (the prof's preference from feedback round 1) */}
      <div data-depth className="mx-auto max-w-4xl px-5 sm:px-8 -mt-2 pb-16">
        <div className="space-y-6 text-lg leading-relaxed">
          {page.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-8 space-y-16">
        {page.sections.map((section, i) => {
          const headingId = `teaching-${i}-heading`;
          return (
            <section key={section.title} aria-labelledby={headingId}>
              <h2
                id={headingId}
                data-depth
                className="font-mono text-sm uppercase tracking-[0.2em] text-stone pb-4 border-b-[3px] border-ink"
              >
                {section.title}
              </h2>
              <div data-depth className="mt-8 space-y-6 text-lg leading-relaxed">
                {section.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
              {section.photo && (
                <ContentFigure image={section.photo} className="mt-8" />
              )}
            </section>
          );
        })}

        {institutions.length > 0 && (
          <section aria-labelledby="courses-heading">
            <h2
              id="courses-heading"
              data-depth
              className="font-mono text-sm uppercase tracking-[0.2em] text-stone pb-4 border-b-[3px] border-ink"
            >
              Courses taught
            </h2>
            {page.coursesIntro && (
              <p data-depth className="mt-8 text-lg leading-relaxed">
                {page.coursesIntro}
              </p>
            )}
            <div className="mt-10 space-y-10">
              {institutions.map(([institution, list]) => (
                <div key={institution} data-depth>
                  <h3 className="font-display font-semibold text-xl tracking-tight">
                    {institution}
                  </h3>
                  {/* timetable rows: course left, details right */}
                  <ul className="mt-4 border-t border-line">
                    {list.map((course) => (
                      <li
                        key={course.title}
                        className="py-3 border-b border-line sm:flex sm:items-baseline sm:justify-between sm:gap-6"
                      >
                        <span className="font-medium">{course.title}</span>
                        <span className="block mt-0.5 sm:mt-0 sm:text-right font-mono text-sm text-stone shrink-0">
                          {course.meta}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
