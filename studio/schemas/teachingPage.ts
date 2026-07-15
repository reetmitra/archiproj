import { defineField, defineType } from "sanity";

export const teachingPage = defineType({
  name: "teachingPage",
  title: "Teaching page",
  type: "document",
  description: "The teaching-philosophy text above the course list.",
  fields: [
    defineField({
      name: "title",
      title: "Page heading",
      type: "string",
      description: "The big heading at the top of the page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "array",
      description: "Shown under the heading. One box per paragraph.",
      of: [{ type: "text", rows: 5 }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "The teaching-philosophy sections, in order.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "array",
              description: "One box per paragraph.",
              of: [{ type: "text", rows: 5 }],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "photo",
              title: "Photo (optional)",
              type: "image",
              description: "Shown after this section's text.",
              fields: [
                defineField({
                  name: "alt",
                  title: "Image description",
                  type: "string",
                  description: "What the photo shows, for screen readers.",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "caption",
                  title: "Caption (optional)",
                  type: "string",
                  description: "Shown under the photo — who is in it, where, when.",
                }),
              ],
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
      name: "coursesIntro",
      title: "Course list introduction (optional)",
      type: "text",
      rows: 4,
      description: "A paragraph shown above the list of courses taught.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Teaching page" };
    },
  },
});
