import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address name",
      type: "slug",
      description:
        "Used internally to identify the person. Click “Generate” after typing the name.",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Group",
      type: "string",
      description: "Which section of the People page they appear in.",
      options: {
        list: [
          { title: "Principal Investigator", value: "faculty" },
          { title: "PhD researcher", value: "phd" },
          { title: "Masters student", value: "masters" },
          { title: "Alumni", value: "alumni" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Role line",
      type: "string",
      description: "Shown under the name, e.g. “PhD Candidate”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "One or two sentences about what they work on.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email (optional)",
      type: "string",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return /.+@.+\..+/.test(value) || "That doesn't look like an email address.";
        }),
    }),
    defineField({
      name: "links",
      title: "Links (optional)",
      type: "array",
      description: "e.g. Google Scholar or a personal site.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Link text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Web address",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort position (optional)",
      type: "number",
      description:
        "Lower numbers appear first within a group. Leave empty to sort by name.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
  },
});
