import type { StructureResolver } from "sanity/structure";

/**
 * Singletons: exactly one of each exists, with a fixed document id.
 * They are pinned in the sidebar, removed from the "create new"
 * menu (sanity.config.ts filters templates), and stripped of the
 * delete/duplicate actions.
 */
export const singletonTypes = new Set(["profile", "workWithMe", "siteSettings"]);

/** News first — the thing the professor edits most often. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("newsPost").title("News"),
      S.documentTypeListItem("publication").title("Publications"),
      S.listItem()
        .title("Research")
        .child(
          S.list()
            .title("Research")
            .items([
              S.documentTypeListItem("project").title("Projects"),
              S.documentTypeListItem("researchTheme").title("Themes"),
            ]),
        ),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("course").title("Teaching"),
      S.divider(),
      S.listItem()
        .title("Profile")
        .child(
          S.document().schemaType("profile").documentId("profile"),
        ),
      S.listItem()
        .title("Work with me")
        .child(
          S.document().schemaType("workWithMe").documentId("workWithMe"),
        ),
      S.listItem()
        .title("Site settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
