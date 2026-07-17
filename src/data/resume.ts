// ---------------------------------------------------------------------------
// RESUME DATA / CONFIG
//
// The /resume page is auto-generated from the site's own content and this
// file. The rule is simple:
//
//   • MANUAL sections: summary, tech skills, soft skills, languages (here) and
//     education (now in its own file, src/data/education.ts).
//   • AUTO-OR-OVERRIDE sections (experience, certifications, projects) are
//     generated from your content collections BY DEFAULT. Fill the matching
//     array below and it OVERRIDES the auto version verbatim. Leave it empty
//     and the page builds it for you.
//
//       experience: []      → pulled from src/content/experience/*
//       certifications: []  → pulled from src/content/certifications/*
//       projects: []        → the projects you flagged with `resume: true`
//
// Keep everything short — this is a résumé, not the site.
// Drop your real CV pdf at:  public/resume/joaoguedes_cv.pdf
// ---------------------------------------------------------------------------

import { education } from "./education";

export type FocusArea = "Backend" | "Security" | "Systems" | "Data";

export interface ResumeExperience {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  focus: FocusArea[];
  summary?: string;
  highlights: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  issued: string;
}

export const resume = {
  name: "João Guedes",
  title: "Backend Software Engineer",
  location: "Braga, Portugal", // TODO confirm (Porto?)
  // 2–3 lines in your own voice.
  summary:
    "Backend engineer who moved into product development from a cybersecurity background. I care about clean systems, reliable services, and the boring details that keep things running. Off the clock: homelab tinkering, two wheels, and dogs.",
  pdfPath: "/resume/joaoguedes_cv.pdf", // TODO: drop this file in public/resume/

  // Filter chips on the page. Each experience entry lists which of these it
  // belongs to (via the `focus` field in its markdown frontmatter).
  focusAreas: ["Backend", "Security", "Systems", "Data"] as FocusArea[],

  // ----- MANUAL sections -----------------------------------------------------

  // Education lives in src/data/education.ts (shared with the /academia page).
  education,

  // Technical skills — grouped chips. Edit freely.
  skills: {
    Languages: ["TODO", "TODO", "TODO"],
    "Backend & APIs": ["REST", "gRPC", "GraphQL", "TODO"],
    "Data & storage": ["PostgreSQL", "TODO"],
    "Infra & DevOps": ["Docker", "TODO"],
    Security: ["TODO"],
  } as Record<string, string[]>,

  // Soft skills — short list. Edit to taste.
  softSkills: ["Ownership", "Clear communication", "Pragmatism", "Mentoring"],

  // Spoken languages.
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Professional" }, // TODO confirm level
  ] as { name: string; level: string }[],

  // ----- AUTO-OR-OVERRIDE sections -------------------------------------------
  // Leave empty to auto-generate from your content. Fill to override verbatim.

  experience: [] as ResumeExperience[],
  certifications: [] as ResumeCertification[],
  // Project ids (filenames without extension) to feature, in order. Empty →
  // every project with `resume: true` in its frontmatter.
  projects: [] as string[],
};
