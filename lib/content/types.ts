/**
 * Content model. Each type mirrors a planned Sanity document schema
 * one-to-one, so migrating from local placeholder data to Sanity is a
 * matter of replacing the accessors in lib/content/index.ts with GROQ
 * queries — no page or component changes.
 */

export type SiteSettings = {
  labName: string;
  tagline: string;
  mission: string;
  institution: string;
  department: string;
  address: string;
  email: string;
};

export type ResearchTheme = {
  slug: string;
  /** Route-style code shown on theme markers, e.g. "R1" */
  code: string;
  title: string;
  summary: string;
};

export type ProjectStatus = "active" | "completed";

export type Project = {
  slug: string;
  title: string;
  themeSlug: string;
  summary: string;
  body: string[];
  years: string;
  status: ProjectStatus;
  collaborators?: string[];
  funding?: string;
  /** ids into publications */
  publicationIds?: string[];
};

export type PublicationType = "journal" | "conference" | "book" | "report";

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  doi?: string;
  pdf?: string;
  featured?: boolean;
};

export type PersonRole = "faculty" | "phd" | "masters" | "alumni";

export type Person = {
  slug: string;
  name: string;
  role: PersonRole;
  title: string;
  bio: string;
  email?: string;
  links?: { label: string; url: string }[];
};

export type NewsCategory = "paper" | "talk" | "grant" | "media" | "lab";

export type NewsPost = {
  id: string;
  /** ISO date, e.g. "2026-06-12" */
  date: string;
  title: string;
  body: string;
  category: NewsCategory;
  link?: { label: string; url: string };
};

export type Course = {
  code: string;
  title: string;
  term: string;
  level: "undergraduate" | "graduate";
  description: string;
};

export type JoinUsContent = {
  heading: string;
  intro: string;
  openings: { title: string; description: string; open: boolean }[];
  howToApply: string;
};
