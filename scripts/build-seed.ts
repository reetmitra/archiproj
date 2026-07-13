/**
 * Generates studio/seed.ndjson from the local placeholder content so it
 * can be imported into Sanity with:
 *
 *   npx tsx scripts/build-seed.ts
 *   cd studio && npx sanity@4 dataset import seed.ndjson production --replace
 *
 * Deterministic _ids make the import idempotent (--replace overwrites).
 * data.ts stays the source of truth for seeding until real content lands.
 */

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  siteSettings,
  profile,
  researchPage,
  researchThemes,
  projects,
  publications,
  people,
  news,
  courses,
  workWithMe,
} from "../lib/content/data";
import type { SiteImage } from "../lib/content/types";

type SanityDoc = { _id: string; _type: string; [key: string]: unknown };

const docs: SanityDoc[] = [];

// Every object inside an array needs a _key for the Studio to edit it
let keyCounter = 0;
const key = () => `seed-${keyCounter++}`;

const slug = (current: string) => ({ _type: "slug" as const, current });
const ref = (_ref: string) => ({ _type: "reference" as const, _ref });
const keyed = <T extends object>(obj: T) => ({ _key: key(), ...obj });

/**
 * `dataset import` uploads the file behind an _sanityAsset ref and
 * rewrites it to a real asset reference (content-hash deduped, so
 * re-imports are idempotent). Paths are absolute — the import must run
 * on the machine that generated the ndjson.
 */
const imageAsset = (img: SiteImage) => {
  const file = join(import.meta.dirname, "..", "public", img.src);
  if (!existsSync(file)) {
    throw new Error(`Seed image missing on disk: ${file}`);
  }
  return {
    _type: "image" as const,
    _sanityAsset: `image@file://${file}`,
    alt: img.alt,
    ...(img.caption ? { caption: img.caption } : {}),
  };
};

// A theme referencing a publication id that doesn't exist would make the
// dataset import fail on a dangling strong reference — catch it here.
const pubIds = new Set(publications.map((p) => p.id));
for (const theme of researchThemes) {
  for (const id of theme.publicationIds ?? []) {
    if (!pubIds.has(id)) {
      throw new Error(
        `researchTheme "${theme.slug}" references unknown publication id "${id}"`,
      );
    }
  }
}

docs.push({ _id: "siteSettings", _type: "siteSettings", ...siteSettings });

docs.push({
  _id: "profile",
  _type: "profile",
  name: profile.name,
  title: profile.title,
  affiliation: profile.affiliation,
  bio: profile.bio,
  about: profile.about,
  ...(profile.photo ? { photo: imageAsset(profile.photo) } : {}),
  education: profile.education.map((e) => keyed(e)),
  links: profile.links.map((l) => keyed(l)),
  email: profile.email,
});

docs.push({ _id: "researchPage", _type: "researchPage", ...researchPage });

docs.push({
  _id: "workWithMe",
  _type: "workWithMe",
  heading: workWithMe.heading,
  intro: workWithMe.intro,
  sections: workWithMe.sections.map((s) => keyed(s)),
  openings: (workWithMe.openings ?? []).map((o) => keyed(o)),
  howToApply: workWithMe.howToApply,
});

for (const theme of researchThemes) {
  docs.push({
    _id: `theme-${theme.slug}`,
    _type: "researchTheme",
    title: theme.title,
    slug: slug(theme.slug),
    code: theme.code,
    ...(theme.shortTitle ? { shortTitle: theme.shortTitle } : {}),
    summary: theme.summary,
    body: theme.body,
    ...(theme.figure ? { figure: imageAsset(theme.figure) } : {}),
    ...(theme.publicationIds
      ? { publications: theme.publicationIds.map((id) => keyed(ref(id))) }
      : {}),
  });
}

for (const project of projects) {
  docs.push({
    _id: `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: slug(project.slug),
    theme: ref(`theme-${project.themeSlug}`),
    summary: project.summary,
    body: project.body,
    years: project.years,
    status: project.status,
    ...(project.collaborators ? { collaborators: project.collaborators } : {}),
    ...(project.funding ? { funding: project.funding } : {}),
    ...(project.publicationIds
      ? { publications: project.publicationIds.map((id) => keyed(ref(id))) }
      : {}),
  });
}

for (const pub of publications) {
  docs.push({
    _id: pub.id,
    _type: "publication",
    title: pub.title,
    authors: pub.authors,
    venue: pub.venue,
    year: pub.year,
    type: pub.type,
    ...(pub.citation ? { citation: pub.citation } : {}),
    ...(pub.note ? { note: pub.note } : {}),
    ...(pub.doi ? { doi: pub.doi } : {}),
    ...(pub.pdf ? { pdf: pub.pdf } : {}),
    featured: pub.featured ?? false,
  });
}

for (const person of people) {
  docs.push({
    _id: `person-${person.slug}`,
    _type: "person",
    name: person.name,
    slug: slug(person.slug),
    role: person.role,
    title: person.title,
    bio: person.bio,
    ...(person.email ? { email: person.email } : {}),
    ...(person.links ? { links: person.links.map((l) => keyed(l)) } : {}),
  });
}

for (const post of news) {
  docs.push({
    _id: post.id,
    _type: "newsPost",
    date: post.date,
    title: post.title,
    body: post.body,
    category: post.category,
    ...(post.link ? { link: post.link } : {}),
  });
}

for (const course of courses) {
  docs.push({
    _id: `course-${course.code}`,
    _type: "course",
    ...course,
  });
}

const outPath = join(import.meta.dirname, "..", "studio", "seed.ndjson");
writeFileSync(outPath, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to ${outPath}`);
