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
// and that section uses your verbatim version instead. The CV PDF is generated
// from src/data/cv/cv.md.
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
  featured: boolean;
}

export const resume = {
  // Identity + skills come from the shared profile (edit them there).
  ...profile,
  // Education comes from its own file (shared with /academia).
  education,

  // Where the "Formal CV" button points. The PDF is generated at build time from
  // src/data/cv/ (see cv.md), so there is no file to drop in public/.
  pdfPath: "/resume/joaoguedes_cv.pdf",

  // Contact block of the generated CV: [label shown, link].
  contact: {
    location: profile.location,
    website: ["Personal Website", "https://joaoguedes.net"] as [string, string],
    github: ["JoaoGuedes01", "https://github.com/JoaoGuedes01"] as [string, string],
    phone: "(+351) 926909235",
    homeServer: ["Home Server", "https://uptime.joaoguedes.net"] as [string, string],
    linkedin: ["joaom-guedes", "https://www.linkedin.com/in/joaom-guedes"] as [string, string],
    email: "joaoguedes.cjp@gmail.com",
  },

  // ----- OVERRIDES (leave empty to auto-generate) ----------------------------
  // Fill any of these to override that section verbatim.

  //   [] → pulled from src/content/experience/*  (most-recent first)
  experience: [] as ResumeExperience[],
  //   [] → pulled from src/content/certifications/*
  certifications: [] as ResumeCertification[],
  //   [] → every project with `resume: true`. Or list ids here to pick/order.
  projects: [] as string[],
};
