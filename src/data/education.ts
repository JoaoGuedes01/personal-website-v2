// ---------------------------------------------------------------------------
// EDUCATION
//
// Your academic background — where you studied and what you earned. This is the
// single place to edit it; it's shown on BOTH the /academia page (at the top)
// and the /resume page. Add or remove entries freely; most recent first.
// ---------------------------------------------------------------------------

export interface EducationEntry {
  school: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
  detail?: string; // one line: thesis, focus, honours, …
  url?: string; // optional link to the institution / programme
}

export const education: EducationEntry[] = [
    {
    school: "University of Minho | School of Engineering",
    degree: "Master's degree in Engineering and Management of Information Systems",
    start: "2021",
    end: "2024",
    location: "Azurém, Guimarães, Portugal",
    detail: "Advanced specialization in software and system architecture and development, machine learning engineering, and enterprise IT strategy. Developed high-level skills in designing intelligent systems, training predictive data models, and deploying robust digital infrastructures to solve complex business problems. Designed and implemented an advanced interoperability system for integrating ABI systems in healthcare environments with real world application.",
    url: "https://tsiuminho.dsi.uminho.pt/oferta-educativa/miegsi"
  },
  {
    school: "University of Minho | School of Engineering",
    degree: "Bachelor's degree in Engineering and Management of Information Systems",
    start: "2018",
    end: "2021",
    location: "Azurém, Guimarães, Portugal",
    detail:
      "Focused on building a strong foundation in software engineering, database management, and business processes. Developed core competencies in application development, data modeling, and analyzing organizational workflows to align technology with business goals.",
    url: "https://tsiuminho.dsi.uminho.pt/oferta-educativa/miegsi",
  }
];
