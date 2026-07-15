import { defineField, defineType } from "sanity";

export const workWithMe = defineType({
  name: "workWithMe",
  title: "Work with me",
  type: "document",
  description: "The page for prospective students and collaborators.",
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      description: "The big title at the top of the page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      description: "One or two sentences under the heading.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Guidance sections",
      type: "array",
      description:
        "One section per topic — availability, PhD recruitment, application materials, and so on.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section heading",
              type: "string",
              description: "e.g. “PhD Recruitment (Fall 2027)”.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "array",
              description: "One box per paragraph.",
              of: [{ type: "text", rows: 4 }],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "bullets",
              title: "Bullet points (optional)",
              type: "array",
              description: "Shown as a bulleted list after the text.",
              of: [{ type: "text", rows: 2 }],
            }),
            defineField({
              name: "after",
              title: "Text after the bullets (optional)",
              type: "array",
              description: "Paragraphs shown after the bulleted list.",
              of: [{ type: "text", rows: 4 }],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "openings",
      title: "Current openings (optional)",
      type: "array",
      description:
        "Specific funded positions or roles. Switch one off instead of deleting it when it closes.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Position",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "open",
              title: "Currently open",
              type: "boolean",
              description: "Only openings with this switched on are shown.",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "title", open: "open" },
            prepare({ title, open }) {
              return { title, subtitle: open ? "Open" : "Closed" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "howToApply",
      title: "How to get in touch",
      type: "text",
      rows: 4,
      description: "What you want people to send you, written as “Email me …”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email (optional)",
      type: "string",
      description:
        "Where this page's “Write to me” button points. Leave empty to use the Profile email.",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return /.+@.+\..+/.test(value) || "That doesn't look like an email address.";
        }),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Work with me" };
    },
  },
});
