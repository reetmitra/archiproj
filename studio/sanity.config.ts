import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure, singletonTypes } from "./structure";
import { projectId, dataset } from "./project";

export default defineConfig({
  name: "default",
  title: "Alex Li — site content",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons never appear in the global "create new document" menu
    templates: (templates) =>
      templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    // Singletons cannot be deleted, duplicated, or unpublished
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action !== undefined &&
              ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },
});
