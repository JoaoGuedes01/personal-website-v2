// ---------------------------------------------------------------------------
// RESUME CONFIG
//
// The /resume page is FULLY auto-generated from the site's own data — and every
// section can be overridden here whenever you want the résumé to differ from the
// site.
//
//   Identity + skills + soft skills + languages → src/data/profile.ts
//   Education                                    → src/data/education.ts
//   Experience / Certifications / Projects       → your content collections,
//                                                  overridable via the arrays
//                                                  at the bottom of this file.
//
// So: touch nothing and the résumé builds itself. Fill an override array below
// and that section uses your verbatim version instead. Drop your real CV pdf at
// public/resume/joaoguedes_cv.pdf.
// ---------------------------------------------------------------------------

import { profile } from "./profile";
import { education } from "./education";

export interface ResumeExperience {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary?: string;
  highlights: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  issued: string;
}

export const resume = {
  // Identity + skills come from the shared profile (edit them there).
  ...profile,
  // Education comes from its own file (shared with /academia).
  education,

  // Where the "Download PDF" button points. Drop the file in public/resume/.
  pdfPath: "/resume/joaoguedes_cv.pdf",

  // ----- OVERRIDES (leave empty to auto-generate) ----------------------------
  // Fill any of these to override that section verbatim.

  //   [] → pulled from src/content/experience/*  (most-recent first)
  experience: [] as ResumeExperience[],
  //   [] → pulled from src/content/certifications/*
  certifications: [] as ResumeCertification[],
  //   [] → every project with `resume: true`. Or list ids here to pick/order.
  projects: [] as string[],
};
