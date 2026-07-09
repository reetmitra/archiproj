/**
 * Content accessors. Pages import only from here — the functions are
 * async so that swapping the local placeholder data for Sanity GROQ
 * queries changes nothing outside this directory.
 */

import {
  siteSettings,
  profile,
  researchThemes,
  projects,
  publications,
  people,
  news,
  courses,
  workWithMe,
} from "./data";
import type {
  Course,
  NewsPost,
  Person,
  PersonRole,
  Profile,
  Project,
  Publication,
  ResearchTheme,
  SiteSettings,
  WorkWithMeContent,
} from "./types";

export type * from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getResearchThemes(): Promise<ResearchTheme[]> {
  return researchThemes;
}

export async function getTheme(
  slug: string,
): Promise<ResearchTheme | undefined> {
  return researchThemes.find((t) => t.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getProjectsByTheme(
  themeSlug: string,
): Promise<Project[]> {
  return projects.filter((p) => p.themeSlug === themeSlug);
}

export async function getPublications(): Promise<Publication[]> {
  return [...publications].sort((a, b) => b.year - a.year);
}

export async function getPublication(
  id: string,
): Promise<Publication | undefined> {
  return publications.find((p) => p.id === id);
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return (await getPublications()).filter((p) => p.featured);
}

export async function getPeopleByRole(role: PersonRole): Promise<Person[]> {
  return people.filter((p) => p.role === role);
}

export async function getNews(limit?: number): Promise<NewsPost[]> {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getWorkWithMe(): Promise<WorkWithMeContent> {
  return workWithMe;
}
