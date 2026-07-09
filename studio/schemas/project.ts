import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. “The last 400 metres”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address name",
      type: "slug",
      description:
        "The project's name in web addresses. Click “Generate” after typing the title, then leave it alone.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "theme",
      title: "Research theme",
      type: "reference",
      to: [{ type: "researchTheme" }],
      description: "Which of the three themes this project belongs to.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "One or two sentences shown on the project card and at the top of its page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description:
        "The full write-up, one paragraph per box. Two or three paragraphs is usually right.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "years",
      title: "Years",
      type: "string",
      description: "e.g. “2024–present” or “2022–2025”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collaborators",
      title: "Collaborators (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Partner organisations, one per line.",
    }),
    defineField({
      name: "funding",
      title: "Funding (optional)",
      type: "string",
      description: "e.g. “MOE Academic Research Fund Tier 2”.",
    }),
    defineField({
      name: "publications",
      title: "Publications from this project (optional)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "publication" }] }],
      description: "Pick the publications that came out of this project.",
    }),
  ],
  preview: {
    select: { title: "title", years: "years", status: "status" },
    prepare({ title, years, status }) {
      return { title, subtitle: [years, status].filter(Boolean).join(" · ") };
    },
  },
});
