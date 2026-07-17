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
    school: "TODO: University",
    degree: "MSc in TODO (Software Engineering / Informatics?)",
    start: "TODO",
    end: "TODO",
    location: "TODO",
    detail:
      "Master's thesis: an interoperability system for integrating ABI systems in healthcare environments.",
    // url: "https://…",
  },
  {
    school: "TODO: University",
    degree: "BSc in TODO",
    start: "TODO",
    end: "TODO",
    location: "TODO",
  },
];
