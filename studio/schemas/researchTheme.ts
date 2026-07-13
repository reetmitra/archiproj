import { defineField, defineType } from "sanity";

export const researchTheme = defineType({
  name: "researchTheme",
  title: "Research pillar",
  type: "document",
  description:
    "The three pillars of the research programme, each a section on the research page.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "e.g. “Planning for Accessibility Capability in an Aging Society”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address name",
      type: "slug",
      description:
        "The pillar's name in web addresses. Click “Generate” after typing the title, then leave it alone.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "Route code",
      type: "string",
      description:
        "The short marker shown on the route line, like a transit line number — “P1”, “P2”, “P3”.",
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: "shortTitle",
      title: "Short title (optional)",
      type: "string",
      description:
        "A two-or-three-word handle for tight spots like the homepage ticker, e.g. “Car dependence”. Keep it under about 30 characters.",
      validation: (rule) => rule.max(32),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the homepage and research page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Pillar text",
      type: "array",
      description:
        "The pillar's section on the research page. One box per paragraph.",
      of: [{ type: "text", rows: 5 }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "figure",
      title: "Figure (optional)",
      type: "image",
      description:
        "A chart or photo shown with the pillar text — usually a figure from one of the papers.",
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          description:
            "What the image shows, for screen readers — e.g. “Chart of transportation mismatch among zero-vehicle older people”.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption (optional)",
          type: "string",
          description: "Shown under the figure. Name the paper it comes from.",
        }),
      ],
    }),
    defineField({
      name: "publications",
      title: "Selected publications",
      type: "array",
      description:
        "The publications listed under this pillar, in the order they should appear.",
      of: [{ type: "reference", to: [{ type: "publication" }] }],
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
