/**
 * Build-time Sanity fetchers. Only lib/content/index.ts imports this —
 * pages never touch it. Every query runs during `next build` (server
 * components + generateStaticParams); the deployed site makes zero
 * runtime requests to Sanity.
 *
 * The dataset is public-read, so no token is needed anywhere.
 */

import { get as httpsGet } from "node:https";
import type {
  Course,
  NewsPost,
  Person,
  PersonRole,
  Profile,
  Project,
  Publication,
  ResearchPageContent,
  ResearchTheme,
  SiteSettings,
  WorkWithMeContent,
} from "./types";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2026-07-01";

/**
 * Queries go over node:https rather than fetch() on purpose. Next.js
 * patches global fetch and persists responses in .next/cache across
 * builds — a rebuild after a Sanity publish would silently serve the
 * previous content. Opting out with cache:"no-store" instead flips
 * every route to dynamic (ƒ), breaking the fully-static requirement.
 * Plain node:https is invisible to both mechanisms: routes stay
 * static, and every build reads the latest published content.
 */
function queryApi<T>(
  query: string,
  params: Record<string, unknown>,
): Promise<T> {
  const search = new URLSearchParams({ query, perspective: "published" });
  for (const [name, value] of Object.entries(params)) {
    search.set(`$${name}`, JSON.stringify(value));
  }
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  return new Promise<T>((resolve, reject) => {
    httpsGet(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(
            new Error(
              `Sanity query failed (HTTP ${res.statusCode}): ${body.slice(0, 300)}`,
            ),
          );
          return;
        }
        try {
          resolve((JSON.parse(body) as { result: T }).result);
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", reject);
  });
}

/**
 * GROQ returns null for absent fields; our types use undefined for
 * optionals. Strip nulls recursively so `pub.doi === undefined` stays
 * true and the types don't lie.
 */
function stripNulls<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(stripNulls) as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v !== null) out[k] = stripNulls(v);
    }
    return out as T;
  }
  return value;
}

async function fetchClean<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return stripNulls(await queryApi<T>(query, params));
}

const projectFields = `
  "slug": slug.current,
  title,
  "themeSlug": theme->slug.current,
  summary,
  body,
  years,
  status,
  collaborators,
  funding,
  "publicationIds": publications[]._ref
`;

const publicationFields = `
  "id": _id,
  title,
  authors,
  venue,
  year,
  type,
  citation,
  note,
  doi,
  pdf,
  featured
`;

/**
 * Image fields flatten to { src, alt, caption }. The URL params ask
 * Sanity's image CDN for a web-sized rendition of whatever original
 * the professor uploads; fit=max never upscales small figures.
 */
const themeFields = `
  "slug": slug.current,
  code,
  title,
  shortTitle,
  summary,
  body,
  "figure": figure{
    "src": asset->url + "?w=1600&fit=max&auto=format",
    alt,
    caption
  },
  "publicationIds": publications[]._ref
`;

export function fetchSiteSettings(): Promise<SiteSettings> {
  return fetchClean(
    `*[_id == "siteSettings"][0]{ labName, mission, institution, department, address, email }`,
  );
}

export function fetchProfile(): Promise<Profile> {
  return fetchClean(
    `*[_id == "profile"][0]{
      name, title, affiliation, bio,
      about,
      "photo": photo{
        "src": asset->url + "?w=1200&fit=max&auto=format",
        alt,
        caption
      },
      education[]{ degree, institution, year },
      links[]{ label, url },
      email
    }`,
  );
}

export function fetchResearchPage(): Promise<ResearchPageContent> {
  return fetchClean(`*[_id == "researchPage"][0]{ title, overview }`);
}

export function fetchResearchThemes(): Promise<ResearchTheme[]> {
  return fetchClean(
    `*[_type == "researchTheme"] | order(code asc) { ${themeFields} }`,
  );
}

export function fetchTheme(slug: string): Promise<ResearchTheme | undefined> {
  return fetchClean<ResearchTheme | undefined>(
    `*[_type == "researchTheme" && slug.current == $slug][0]{ ${themeFields} }`,
    { slug },
  ).then((theme) => theme ?? undefined);
}

export function fetchProjects(): Promise<Project[]> {
  return fetchClean(
    `*[_type == "project"] | order(title asc) { ${projectFields} }`,
  );
}

export function fetchProject(slug: string): Promise<Project | undefined> {
  return fetchClean<Project | undefined>(
    `*[_type == "project" && slug.current == $slug][0]{ ${projectFields} }`,
    { slug },
  ).then((project) => project ?? undefined);
}

export function fetchProjectsByTheme(themeSlug: string): Promise<Project[]> {
  return fetchClean(
    `*[_type == "project" && theme->slug.current == $themeSlug]
      | order(title asc) { ${projectFields} }`,
    { themeSlug },
  );
}

export function fetchPublications(): Promise<Publication[]> {
  return fetchClean(
    `*[_type == "publication"] | order(year desc, title asc) { ${publicationFields} }`,
  );
}

export function fetchPublication(id: string): Promise<Publication | undefined> {
  return fetchClean<Publication | undefined>(
    `*[_type == "publication" && _id == $id][0]{ ${publicationFields} }`,
    { id },
  ).then((pub) => pub ?? undefined);
}

export function fetchPeopleByRole(role: PersonRole): Promise<Person[]> {
  return fetchClean(
    `*[_type == "person" && role == $role]
      | order(coalesce(sortOrder, 9999) asc, name asc) {
      "slug": slug.current, name, role, title, bio, email,
      links[]{ label, url }
    }`,
    { role },
  );
}

export function fetchNews(): Promise<NewsPost[]> {
  return fetchClean(
    `*[_type == "newsPost"] | order(date desc) {
      "id": _id, date, title, body, category, link{ label, url }
    }`,
  );
}

export function fetchCourses(): Promise<Course[]> {
  return fetchClean(
    `*[_type == "course"] | order(code asc) {
      code, title, term, level, description
    }`,
  );
}

export function fetchWorkWithMe(): Promise<WorkWithMeContent> {
  return fetchClean(
    `*[_id == "workWithMe"][0]{
      heading, intro,
      sections[]{ title, body },
      openings[]{ title, description, open },
      howToApply
    }`,
  );
}
