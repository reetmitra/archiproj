import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  description: "You — the homepage hero and the site's identity.",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description:
        "Your name as it should appear everywhere — the big homepage headline, the header, the browser tab.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      description: "e.g. “Associate Professor”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
      description:
        "Shown after your job title, e.g. “Department of Architecture, National University of Singapore”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 4,
      description:
        "Two to four sentences, written as “I …”. This appears on the homepage and in search results.",
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: "about",
      title: "About page",
      type: "array",
      description:
        "The full bio shown on the About page. One box per paragraph.",
      of: [{ type: "text", rows: 6 }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "photo",
      title: "Photo (optional)",
      type: "image",
      description: "Your photo on the About page.",
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          description:
            "A short description of the photo, for screen readers.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption (optional)",
          type: "string",
          description:
            "Shown under the photo, e.g. where and when it was taken.",
        }),
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      description: "Newest degree first.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "degree",
              title: "Degree",
              type: "string",
              description: "e.g. “PhD, City & Regional Planning”.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "institution",
              title: "Institution",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "year",
              title: "Year completed",
              type: "string",
              description: "Four digits, e.g. “2014”.",
              validation: (rule) =>
                rule
                  .required()
                  .regex(/^\d{4}$/, { name: "four-digit year", invert: false }),
            }),
          ],
          preview: {
            select: { title: "degree", subtitle: "year" },
          },
        },
      ],
    }),
    defineField({
      name: "links",
      title: "Profile links",
      type: "array",
      description: "e.g. Google Scholar, ORCID.",
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
      name: "email",
      title: "Email",
      type: "string",
      description: "The address shown on the site and used for “Write to me”.",
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
      return { title: "Profile" };
    },
  },
});
