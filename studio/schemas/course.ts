import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Course code",
      type: "string",
      description: "e.g. “AR4102”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "term",
      title: "Term",
      type: "string",
      description: "e.g. “Semester 1”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Undergraduate", value: "undergraduate" },
          { title: "Graduate", value: "graduate" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Two or three sentences on what the course covers.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Course code",
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
