// Resume page config. Everything is generated from the site's own data unless overridden below.
//   identity, skills, languages -> profile.ts
//   education -> education.ts
//   experience, certifications, projects -> content collections (override arrays at the bottom)
// The CV PDF comes from src/data/cv/cv.md.

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
  // identity and skills come from profile.ts
  ...profile,
  // shared with /academia
  education,

  // "Formal CV" button target. The PDF is built from src/data/cv/cv.md, nothing to drop in public/.
  pdfPath: "/resume/joaoguedes_cv.pdf",

  // contact block of the CV: [label shown, link]
  contact: {
    location: profile.location,
    website: ["Personal Website", "https://joaoguedes.net"] as [string, string],
    github: ["JoaoGuedes01", "https://github.com/JoaoGuedes01"] as [string, string],
    phone: "(+351) 926909235",
    homeServer: ["Home Server", "https://uptime.joaoguedes.net"] as [string, string],
    linkedin: ["joaom-guedes", "https://www.linkedin.com/in/joaom-guedes"] as [string, string],
    email: "joaoguedes.cjp@gmail.com",
  },

  // Overrides: leave empty to auto-generate, fill to use that section verbatim.
  //   [] → pulled from src/content/experience/*  (most-recent first)
  experience: [] as ResumeExperience[],
  //   [] → pulled from src/content/certifications/*
  certifications: [] as ResumeCertification[],
  //   [] → every project with `resume: true`. Or list ids here to pick/order.
  projects: [] as string[],
};
