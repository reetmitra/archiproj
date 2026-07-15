import type { Metadata } from "next";
import { getCourses } from "@/lib/content";
import { PageIntro } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Teaching",
};

export default async function TeachingPage() {
  const courses = await getCourses();

  return (
    <>
      <PageIntro
        title="Courses"
        lede="Studio-adjacent and methods courses at NUS. Syllabi are shared with enrolled students."
      />
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-8 space-y-6">
        {courses.map((course) => (
          <article
            key={course.code}
            data-depth
            data-tilt
            className="border border-line rounded-sm p-6 sm:p-8 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-8"
          >
            {/* course code as a signage plate */}
            <p className="mb-4 sm:mb-0">
              <span className="inline-block bg-ink text-paper font-mono text-sm px-3 py-2 rounded-sm">
                {course.code}
              </span>
            </p>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                {course.title}
              </h2>
              <p className="mt-1 font-mono text-sm text-stone">
                {course.term} · {course.level}
              </p>
              <p className="mt-4 text-stone leading-relaxed">
                {course.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
