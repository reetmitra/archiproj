/**
 * Content accessors. Pages import only from here.
 *
 * With SANITY_PROJECT_ID set (.env.local), content comes from Sanity at
 * build time. Without it, the local placeholder data in data.ts is used —
 * a clean clone with no env vars always builds and runs.
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
import * as sanity from "./sanity";
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

const useSanity = Boolean(process.env.SANITY_PROJECT_ID);

export async function getSiteSettings(): Promise<SiteSettings> {
  return useSanity ? sanity.fetchSiteSettings() : siteSettings;
}

export async function getProfile(): Promise<Profile> {
  return useSanity ? sanity.fetchProfile() : profile;
}

export async function getResearchThemes(): Promise<ResearchTheme[]> {
  return useSanity ? sanity.fetchResearchThemes() : researchThemes;
}

export async function getTheme(
  slug: string,
): Promise<ResearchTheme | undefined> {
  return useSanity
    ? sanity.fetchTheme(slug)
    : researchThemes.find((t) => t.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  return useSanity ? sanity.fetchProjects() : projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return useSanity
    ? sanity.fetchProject(slug)
    : projects.find((p) => p.slug === slug);
}

export async function getProjectsByTheme(
  themeSlug: string,
): Promise<Project[]> {
  return useSanity
    ? sanity.fetchProjectsByTheme(themeSlug)
    : projects.filter((p) => p.themeSlug === themeSlug);
}

export async function getPublications(): Promise<Publication[]> {
  return useSanity
    ? sanity.fetchPublications()
    : [...publications].sort((a, b) => b.year - a.year);
}

export async function getPublication(
  id: string,
): Promise<Publication | undefined> {
  return useSanity
    ? sanity.fetchPublication(id)
    : publications.find((p) => p.id === id);
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return (await getPublications()).filter((p) => p.featured);
}

export async function getPeopleByRole(role: PersonRole): Promise<Person[]> {
  return useSanity
    ? sanity.fetchPeopleByRole(role)
    : people.filter((p) => p.role === role);
}

export async function getNews(limit?: number): Promise<NewsPost[]> {
  const sorted = useSanity
    ? await sanity.fetchNews()
    : [...news].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getCourses(): Promise<Course[]> {
  return useSanity ? sanity.fetchCourses() : courses;
}

export async function getWorkWithMe(): Promise<WorkWithMeContent> {
  return useSanity ? sanity.fetchWorkWithMe() : workWithMe;
}
