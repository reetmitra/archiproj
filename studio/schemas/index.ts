import { newsPost } from "./newsPost";
import { publication } from "./publication";
import { researchTheme } from "./researchTheme";
import { project } from "./project";
import { person } from "./person";
import { course } from "./course";
import { profile } from "./profile";
import { researchPage } from "./researchPage";
import { siteSettings } from "./siteSettings";
import { workWithMe } from "./workWithMe";

export const schemaTypes = [
  // The three things the professor updates regularly, first
  newsPost,
  publication,
  project,
  researchTheme,
  person,
  course,
  // Singletons
  profile,
  researchPage,
  workWithMe,
  siteSettings,
];
