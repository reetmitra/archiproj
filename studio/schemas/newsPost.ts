import { defineField, defineType } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "News post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: "One plain sentence, e.g. “Paper accepted at Urban Studies”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "The date shown next to the post. Newest posts appear first.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "array",
      description:
        "The post, one box per paragraph. Only the first paragraph appears on the homepage, so put the news itself there.",
      of: [{ type: "text", rows: 4 }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Photo (optional)",
      type: "image",
      description:
        "Shown under the post text — a photo from the event, a conference logo.",
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          description: "What the image shows, for screen readers.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption (optional)",
          type: "string",
          description: "Shown under the image.",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Shown as a small tag next to the post.",
      options: {
        list: [
          { title: "Paper", value: "paper" },
          { title: "Talk", value: "talk" },
          { title: "Grant", value: "grant" },
          { title: "Media", value: "media" },
          { title: "Lab", value: "lab" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link (optional)",
      type: "object",
      description:
        "Add a link only if there is somewhere useful to send readers — an article, a video, a form.",
      fields: [
        defineField({
          name: "label",
          title: "Link text",
          type: "string",
          description: "e.g. “Read the article”.",
        }),
        defineField({
          name: "url",
          title: "Web address",
          type: "url",
          validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          const { label, url } = value as { label?: string; url?: string };
          if ((label && !url) || (!label && url)) {
            return "Fill in both the link text and the web address, or leave both empty.";
          }
          return true;
        }),
    }),
  ],
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", category: "category" },
    prepare({ title, date, category }) {
      return { title, subtitle: [date, category].filter(Boolean).join(" · ") };
    },
  },
});
