import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description: "Site-wide details used in the footer and homepage eyebrow.",
  fields: [
    defineField({
      name: "institution",
      title: "University",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      description: "Shown in the homepage eyebrow line.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Postal address",
      type: "text",
      rows: 2,
      description: "Shown in the footer under “Visit”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Lab email",
      type: "string",
      description: "A shared lab address, if there is one.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            value && /.+@.+\..+/.test(value)
              ? true
              : "That doesn't look like an email address.",
          ),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
