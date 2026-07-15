import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  description:
    "One taught course. The Teaching page groups courses by institution.",
  fields: [
    defineField({
      name: "title",
      title: "Course title",
      type: "string",
      description: "e.g. “Planning Policy and Process”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      description:
        "Where you taught it, e.g. “National University of Singapore”. Spell it exactly the same for every course there — the page groups by this.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "meta",
      title: "Details",
      type: "string",
      description:
        "Level and term, shown after the title — e.g. “Master's required, Fall 2024 and 2025”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort position (optional)",
      type: "number",
      description:
        "Lower numbers appear first. Institutions appear in the order of their first course.",
    }),
  ],
  orderings: [
    {
      title: "Sort position",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "institution" },
  },
});
