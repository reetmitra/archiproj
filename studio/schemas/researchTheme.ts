import { defineField, defineType } from "sanity";

export const researchTheme = defineType({
  name: "researchTheme",
  title: "Research theme",
  type: "document",
  description:
    "The three broad lines of work. Projects hang off these — you will rarely need to change them.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. “Ageing in place”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address name",
      type: "slug",
      description:
        "The theme's name in web addresses. Click “Generate” after typing the title, then leave it alone.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "Route code",
      type: "string",
      description:
        "The short marker shown on the route line, like a transit line number — “R1”, “R2”, “R3”.",
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the homepage and research page.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Route code",
      name: "codeAsc",
      by: [{ field: "code", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", code: "code" },
    prepare({ title, code }) {
      return { title: [code, title].filter(Boolean).join(" — ") };
    },
  },
});
