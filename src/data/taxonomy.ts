// ---------------------------------------------------------------------------
// TAXONOMY
//
// Central metadata for the two things visitors navigate *into*: snippet
// categories ("classes") and project types. Labels here must match the enum
// values in src/content.config.ts. Editing a label/blurb/icon updates the
// landing cards, the filter chips, and the page headings everywhere.
// ---------------------------------------------------------------------------
import { href } from "./site";
import type { CollectionEntry } from "astro:content";

export interface Taxon {
  label: string; // must match the content.config enum value exactly
  slug: string; // URL segment
  icon: string; // key in src/icons/index.ts
  blurb: string; // one line, shown on the landing card
}

// Snippet disciplines. Order defines display order on the landing page.
export const SNIPPET_CATEGORIES: Taxon[] = [
  {
    label: "Software Engineering",
    slug: "software-engineering",
    icon: "code",
    blurb: "Language features, patterns, and the everyday fixes worth remembering.",
  },
  {
    label: "Systems",
    slug: "systems",
    icon: "cpu",
    blurb: "The machine underneath: OS, processes, networking, performance.",
  },
  {
    label: "DevOps",
    slug: "devops",
    icon: "git-branch",
    blurb: "Docker, CI/CD, deployment, and keeping things running.",
  },
  {
    label: "Cybersecurity",
    slug: "cybersecurity",
    icon: "shield-check",
    blurb: "Command cheat sheets, tool configurations, and security software scripts.",
  },
  {
    label: "Data",
    slug: "data",
    icon: "database",
    blurb: "SQL, pipelines, and wrangling data into shape.",
  },
];

// Project contexts. Order defines display order in filters/listings.
export const PROJECT_TYPES: Taxon[] = [
  { label: "Professional", slug: "professional", icon: "briefcase", blurb: "Projects built on the job" },
  { label: "Academic", slug: "academic", icon: "graduation-cap", blurb: "Academic work" },
  { label: "Personal", slug: "personal", icon: "user", blurb: "Built for myself" },
];

// Project categories (discipline/domain). Labels MUST match the enum in
// src/content.config.ts. Powers the category filter; order = display order.
export const PROJECT_CATEGORIES: Taxon[] = [
  { label: "Web", slug: "web", icon: "code", blurb: "Web apps, sites, and everything in the browser." },
  { label: "Backend & Systems Architecture", slug: "backend-systems", icon: "server", blurb: "APIs, services, and the systems behind them." },
  { label: "Devops & Infrastructure", slug: "devops-infrastructure", icon: "git-branch", blurb: "Pipelines, containers, and keeping things running." },
  { label: "Data Science & ML", slug: "data-science-ml", icon: "database", blurb: "Models, data pipelines, and analysis." },
  { label: "Game Development", slug: "game-development", icon: "joystick", blurb: "Games and interactive experiences." },
];

const bySlug = (list: Taxon[], slug: string) => list.find((t) => t.slug === slug);
const byLabel = (list: Taxon[], label: string) => list.find((t) => t.label === label);

export const snippetCategoryBySlug = (slug: string) => bySlug(SNIPPET_CATEGORIES, slug);
export const snippetCategoryByLabel = (label: string) => byLabel(SNIPPET_CATEGORIES, label);
export const projectTypeBySlug = (slug: string) => bySlug(PROJECT_TYPES, slug);
export const projectTypeByLabel = (label: string) => byLabel(PROJECT_TYPES, label);
export const projectCategoryBySlug = (slug: string) => bySlug(PROJECT_CATEGORIES, slug);
export const projectCategoryByLabel = (label: string) => byLabel(PROJECT_CATEGORIES, label);

/** Slug for a project's category (falls back to a slugified label). */
export function projectCategorySlug(label: string): string {
  return projectCategoryByLabel(label)?.slug ?? slugify(label);
}

/** Slug for a snippet's category (falls back to a slugified label). */
export function snippetCategorySlug(label: string): string {
  return snippetCategoryByLabel(label)?.slug ?? slugify(label);
}

export interface SnippetPath {
  group?: string;
  subgroup?: string;
  slug: string;
}

/**
 * A snippet's group/subgroup come from folder nesting, not frontmatter: the
 * collection id is "group/subgroup/slug", "group/slug", or just "slug" for a
 * category with no groups. See src/data/snippetGroups.ts for group metadata.
 */
export function snippetPath(entry: CollectionEntry<"snippets">): SnippetPath {
  const parts = entry.id.split("/");
  const slug = parts[parts.length - 1];
  const [group, subgroup] = parts.slice(0, -1);
  return { group, subgroup, slug };
}

/** Canonical URL for a snippet: /snippets/<category>/[<group>/[<subgroup>/]]<slug>. */
export function snippetUrl(entry: CollectionEntry<"snippets">): string {
  const catSlug = snippetCategorySlug(entry.data.category);
  const { group, subgroup, slug } = snippetPath(entry);
  return href(`/snippets/${[catSlug, group, subgroup, slug].filter(Boolean).join("/")}`);
}

/** Generic slugify for anything not in a table above. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "remote-service-exploitation" -> "Remote Service Exploitation" — fallback
 *  label for a group/subgroup folder that exists without curated metadata. */
export function titleizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
