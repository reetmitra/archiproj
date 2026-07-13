import { defineField, defineType } from "sanity";

export const researchPage = defineType({
  name: "researchPage",
  title: "Research page",
  type: "document",
  description: "The introduction at the top of the research page.",
  fields: [
    defineField({
      name: "title",
      title: "Page heading",
      type: "string",
      description: "The big heading on the research page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      description:
        "The research vision shown above the pillars. One box per paragraph.",
      of: [{ type: "text", rows: 6 }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Research page" };
    },
  },
});
