import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The full title of the paper, chapter, or report.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
      description:
        "One author per line, in the order they appear on the paper, e.g. “Li, X.”.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "venue",
      title: "Where it appeared",
      type: "string",
      description:
        "Journal, conference, or publisher — e.g. “Journal of Transport & Health”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Publication year, e.g. 2025.",
      validation: (rule) => rule.required().integer().min(1990).max(2035),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      description: "Used by the filter buttons on the publications page.",
      options: {
        list: [
          { title: "Journal article", value: "journal" },
          { title: "Conference paper", value: "conference" },
          { title: "Book / chapter", value: "book" },
          { title: "Report", value: "report" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "citation",
      title: "Volume / pages (optional)",
      type: "string",
      description:
        "What follows the journal name in the citation, e.g. “88 (1): 15–29” or “140 (March), 104616”.",
    }),
    defineField({
      name: "note",
      title: "Label (optional)",
      type: "string",
      description:
        "A short label shown alongside the type, e.g. “Commentary” or “Editorial”.",
    }),
    defineField({
      name: "doi",
      title: "DOI (optional)",
      type: "string",
      description:
        "Just the DOI itself, e.g. “10.1016/j.jth.2025.101234” — not the full web address. The article title on the site links here.",
    }),
    defineField({
      name: "pdf",
      title: "PDF link (optional)",
      type: "url",
      description: "A link to an open-access PDF, if one exists.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "featured",
      title: "Show on the homepage",
      type: "boolean",
      description:
        "Turn this on for up to three publications you want on the front page.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", year: "year", venue: "venue" },
    prepare({ title, year, venue }) {
      return { title, subtitle: [year, venue].filter(Boolean).join(" · ") };
    },
  },
});
