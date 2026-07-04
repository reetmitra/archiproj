/**
 * Content accessors. Pages import only from here — when the site moves
 * to Sanity, these functions become GROQ-backed (and async) and nothing
 * else changes.
 */

import {
  siteSettings,
  researchThemes,
  projects,
  publications,
  people,
  news,
  courses,
  joinUs,
} from "./data";
import type {
  NewsPost,
  Person,
  PersonRole,
  Project,
  Publication,
  ResearchTheme,
} from "./types";

export type * from "./types";

export function getSiteSettings() {
  return siteSettings;
}

export function getResearchThemes(): ResearchTheme[] {
  return researchThemes;
}

export function getTheme(slug: string): ResearchTheme | undefined {
  return researchThemes.find((t) => t.slug === slug);
}

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByTheme(themeSlug: string): Project[] {
  return projects.filter((p) => p.themeSlug === themeSlug);
}

export function getPublications(): Publication[] {
  return [...publications].sort((a, b) => b.year - a.year);
}

export function getPublication(id: string): Publication | undefined {
  return publications.find((p) => p.id === id);
}

export function getFeaturedPublications(): Publication[] {
  return getPublications().filter((p) => p.featured);
}

export function getPeopleByRole(role: PersonRole): Person[] {
  return people.filter((p) => p.role === role);
}

export function getNews(limit?: number): NewsPost[] {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getCourses() {
  return courses;
}

export function getJoinUs() {
  return joinUs;
}
