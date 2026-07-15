/**
 * Content model. Each type mirrors a planned Sanity document schema
 * one-to-one, so migrating from local placeholder data to Sanity is a
 * matter of replacing the accessors in lib/content/index.ts with GROQ
 * queries — no page or component changes.
 */

export type SiteSettings = {
  institution: string;
  department: string;
  address: string;
  email: string;
};

export type EducationEntry = {
  degree: string;
  institution: string;
  /** Year completed, e.g. "2014" */
  year: string;
};

/**
 * A content image. `src` is a plain string either way the site is built:
 * a `/images/...` path (local fallback data) or a cdn.sanity.io URL
 * (Sanity image asset).
 */
export type SiteImage = {
  src: string;
  alt: string;
  caption?: string;
};

/** The professor. Singleton — the site is his; the lab lives inside it. */
export type Profile = {
  name: string;
  title: string;
  affiliation: string;
  /** First-person, 2–4 sentences */
  bio: string;
  /** The About page, one paragraph per entry */
  about: string[];
  photo?: SiteImage;
  education: EducationEntry[];
  links: { label: string; url: string }[];
  email: string;
};

/** A research pillar — a section on the research page. */
export type ResearchTheme = {
  slug: string;
  /** Route-style code shown on theme markers, e.g. "P1" */
  code: string;
  title: string;
  /** Short handle for tight spots like the homepage ticker */
  shortTitle?: string;
  summary: string;
  /** Pillar essay, one paragraph per entry */
  body: string[];
  figure?: SiteImage;
  /** ids into publications — the pillar's selected publications, in order */
  publicationIds?: string[];
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
  /** Volume / issue / pages, e.g. "88 (1): 15–29" */
  citation?: string;
  /** Short label shown with the type, e.g. "Commentary" */
  note?: string;
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
  bio?: string;
  /** Headshot; the People page falls back to initials without one */
  photo?: SiteImage;
  email?: string;
  links?: { label: string; url: string }[];
};

export type NewsCategory = "paper" | "talk" | "grant" | "media" | "lab";

export type NewsPost = {
  id: string;
  /** ISO date, e.g. "2026-06-12" */
  date: string;
  title: string;
  /** One paragraph per entry; the homepage shows only the first */
  body: string[];
  category: NewsCategory;
  image?: SiteImage;
  link?: { label: string; url: string };
};

/** One taught course; the Teaching page groups these by institution. */
export type Course = {
  institution: string;
  title: string;
  /** The prof's parenthetical, e.g. "Master's required, Fall 2024 and 2025" */
  meta: string;
  /** Lower numbers first; also drives the institution group order */
  sortOrder?: number;
};

export type TeachingSection = {
  title: string;
  /** One paragraph per entry */
  body: string[];
  photo?: SiteImage;
};

/** The teaching page intro + philosophy essay. Singleton. */
export type TeachingPageContent = {
  title: string;
  /** Opening paragraph(s) shown under the title */
  intro: string[];
  sections: TeachingSection[];
  /** Paragraph introducing the grouped course list */
  coursesIntro?: string;
};

/** The research page intro. Singleton. */
export type ResearchPageContent = {
  title: string;
  /** Research vision, one paragraph per entry */
  overview: string[];
};

export type WorkWithMeSection = {
  /** e.g. "Current Availability", "PhD Recruitment (Fall 2027)" */
  title: string;
  /** Paragraphs before the bullet list, one per entry */
  body: string[];
  /** Optional bullet list */
  bullets?: string[];
  /** Paragraphs after the bullet list */
  after?: string[];
};

export type WorkWithMeContent = {
  heading: string;
  intro: string;
  sections: WorkWithMeSection[];
  openings?: { title: string; description: string; open: boolean }[];
  howToApply: string;
  /** Where the contact button points; falls back to profile.email */
  contactEmail?: string;
};
