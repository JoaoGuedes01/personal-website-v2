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
    blurb: "The machine underneath — OS, processes, networking, performance.",
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
    icon: "shield",
    blurb: "Hardening, tooling, and the security-minded habits that stuck.",
  },
  {
    label: "Data",
    slug: "data",
    icon: "database",
    blurb: "SQL, pipelines, and wrangling data into shape.",
  },
  {
    label: "Guedes",
    slug: "guedes",
    icon: "guedes",
    blurb: "Test category meant for testing"
  }
];

// Project contexts. Order defines display order in filters/listings.
export const PROJECT_TYPES: Taxon[] = [
  { label: "Professional", slug: "professional", icon: "briefcase", blurb: "Projects built on the job" },
  { label: "Academic", slug: "academic", icon: "graduation-cap", blurb: "Academic work" },
  { label: "Personal", slug: "personal", icon: "user", blurb: "Built for myself" },
];

const bySlug = (list: Taxon[], slug: string) => list.find((t) => t.slug === slug);
const byLabel = (list: Taxon[], label: string) => list.find((t) => t.label === label);

export const snippetCategoryBySlug = (slug: string) => bySlug(SNIPPET_CATEGORIES, slug);
export const snippetCategoryByLabel = (label: string) => byLabel(SNIPPET_CATEGORIES, label);
export const projectTypeBySlug = (slug: string) => bySlug(PROJECT_TYPES, slug);
export const projectTypeByLabel = (label: string) => byLabel(PROJECT_TYPES, label);

/** Slug for a snippet's category (falls back to a slugified label). */
export function snippetCategorySlug(label: string): string {
  return snippetCategoryByLabel(label)?.slug ?? slugify(label);
}

/** Canonical URL for a snippet: /snippets/<category>/<id>. */
export function snippetUrl(entry: CollectionEntry<"snippets">): string {
  return href(`/snippets/${snippetCategorySlug(entry.data.category)}/${entry.id}`);
}

/** Generic slugify for anything not in a table above. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
