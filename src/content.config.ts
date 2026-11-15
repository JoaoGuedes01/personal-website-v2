import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Every collection is a folder of markdown/MDX under src/content/.
// To add an entry: drop a new file in the folder with the frontmatter below.

const PROJECT_CATEGORIES = [
  "Web",
  "Backend & Systems Architecture",
  "Devops & Infrastructure",
  "Data Science & ML",
  "Game Development",
] as const;

// Context in which a project was built.
const PROJECT_TYPES = ["Personal", "Academic", "Professional"] as const;

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  // `image()` optimizes covers/gallery images placed next to the entry.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      // Was this built for yourself, at university, or on the job?
      type: z.enum(PROJECT_TYPES).default("Personal"),
      // For Professional projects: the employer, and an optional link to it.
      // NOTE: `org` also links a project to an Experience entry whose `company`
      // matches, which is how /experience/<role> lists its related projects.
      org: z.string().optional(),
      orgUrl: z.string().url().optional(),
      // Pin this project to specific Experience entries by id (the filename
      // without extension), e.g.  experience: "checkmarx-swe"  or
      // experience: ["checkmarx-swe", "checkmarx-appsec"].
      // Use this when you have MULTIPLE roles at the same company so each
      // project attaches to the right one(s). With a single role at a company,
      // matching `org` to that role's `company` is enough, no need to set this.
      // A string or an array both work; it's normalized to an array.
      experience: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .transform((v) => (v == null ? [] : Array.isArray(v) ? v : [v])),
      category: z.enum(PROJECT_CATEGORIES),
      stack: z.array(z.string()).default([]),
      year: z.number().optional(),
      featured: z.boolean().default(false),
      // Include this project on the auto-generated /resume page.
      resume: z.boolean().default(false),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      video: z.string().url().optional(),
      // Optional image gallery shown on the project page (with a lightbox).
      // Co-locate the files and reference them relatively:
      //   gallery:
      //     - { src: ./shot-1.png, alt: "Dashboard", caption: "The overview." }
      //     - { src: ./shot-2.png, alt: "Detail view" }
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      // Lower numbers sort first within a group.
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // Pin to the featured block at the top of /blog (newest featured = the big hero).
      // Featuring any part of a series features the whole series as ONE card (one of the 3 slots).
      featured: z.boolean().default(false),
      // Multi-part posts: `series` is a key from src/data/series.ts and `part` is
      // this post's number in it (1-based). Both are needed for the series UI.
      series: z.string().optional(),
      part: z.number().int().positive().optional(),
      // Optional hero image (co-located, relative path), optimized.
      cover: image().optional(),
      coverAlt: z.string().default(""),
      // Optional image gallery (with a lightbox), co-located and referenced
      // relatively, same shape as projects.
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

// Snippets are grouped by discipline; tool tags (git, docker, …) filter within.
const SNIPPET_CATEGORIES = [
  "Software Engineering",
  "Systems",
  "DevOps",
  "Cybersecurity",
  "Data",
] as const;

const snippets = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/snippets" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      // Discipline this snippet belongs to (its "class" in the /snippets nav).
      // Must match a label in src/data/taxonomy.ts.
      category: z.enum(SNIPPET_CATEGORIES).default("Software Engineering"),
      // Where this came from (a course, a CTF, work), shown as a small badge.
      // Purely informational; group/subgroup nav is derived from folder nesting,
      // not from this field, so it never gates navigation.
      source: z.string().optional(),
      // Primary language/tool, shown as a small label on the snippet.
      lang: z.string().default("shell"),
      // Tool tags, e.g. ["git"], ["docker", "compose"].
      tags: z.array(z.string()).default([]),
      // Optional image gallery (with a lightbox), co-located and referenced
      // relatively, same shape as projects.
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experience" }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      role: z.string(),
      start: z.string(),
      end: z.string().default("Present"),
      location: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // One-line summary shown on the /experience list card.
      summary: z.string().optional(),
      // Bullet points for the role page and the generated resume.
      highlights: z.array(z.string()).default([]),
      // Optional image gallery (with a lightbox), co-located and referenced
      // relatively, same shape as projects.
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      // Optional overrides for the generated PDF CV (src/data/cv/). Everything else
      // is taken from the fields above.
      cv: z
        .object({
          role: z.string().optional(), // title as it should read on the CV
          type: z.string().optional(), // "Full Time" (default), "Internship", …
          bullets: z.array(z.string()).optional(), // short CV bullets (default: highlights)
          hide: z.boolean().default(false), // leave this role off the CV
        })
        .optional(),
      // Sort order: most recent gets the highest number.
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const papers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/papers" }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(["Thesis", "Paper"]).default("Paper"),
    authors: z.array(z.string()).default([]),
    venue: z.string().optional(),
    year: z.number(),
    // Link to an external page, DOI, or repository.
    link: z.string().url().optional(),
    // A PDF of the work itself. Put the file in public/ and reference it by
    // absolute path, e.g. "/papers/my-thesis.pdf". Enables "Open PDF" (opens in
    // the browser) and "Download" buttons alongside the external `link`.
    pdf: z.string().optional(),
    abstract: z.string(),
  }),
});

// Certifications, grouped by provider on /certifications and
// pulled into the auto-generated /resume.
const certifications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/certifications" }),
  schema: z.object({
    name: z.string(),
    // The provider/issuer, e.g. "AWS", "INE", "Coursera", "Udemy",
    // "LinkedIn Learning". This is what the provider filter groups by.
    issuer: z.string(),
    // When you earned it. Freeform, so "2024" or "Mar 2024" both work.
    issued: z.string(),
    // Optional expiry (leave off if it doesn't expire).
    expires: z.string().optional(),
    // Optional verification link + credential id.
    url: z.string().url().optional(),
    credentialId: z.string().optional(),
    // Optional skills/topics the cert covers, shown as small tags.
    skills: z.array(z.string()).default([]),
    // Feature it (sorts to the front); and manual sort within a provider.
    featured: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog, snippets, experience, papers, certifications };
