// ---------------------------------------------------------------------------
// PROFILE
//
// The single source for "who I am" content that appears in more than one place:
// the About page AND the auto-generated Résumé both read from here. Edit once,
// updates everywhere. (Experience, certifications, projects, papers and
// education have their own files/collections — this is just the personal bits.)
// ---------------------------------------------------------------------------

export interface Interest {
  label: string;
  icon: string; // key in src/icons/index.ts
  note?: string; // optional one-liner shown under the label
}

export const profile = {
  name: "João Guedes",
  title: "Backend Software Engineer",
  location: "Porto, Portugal", // TODO confirm (Braga?)

  // A short one-liner (used as a subtitle on the About hero).
  tagline: "What a good looking guy over here",

  // 2–3 lines in your own voice — used as the résumé summary.
  summary:
    "Backend engineer who moved into product development from a cybersecurity background. I care about clean systems, reliable services, and the boring details that keep things running. Off the clock: homelab tinkering, two wheels, and dogs.",

  // Technical skills — grouped chips. Shown on About and the Résumé. Edit freely;
  // add or rename groups and they flow through to both pages.
  skills: {
    Languages: ["TODO", "TODO", "TODO"],
    "Backend & APIs": ["REST", "gRPC", "GraphQL", "TODO"],
    "Data & storage": ["PostgreSQL", "TODO"],
    "Infra & DevOps": ["Docker", "TODO"],
    Security: ["TODO"],
    "Guedes Things": ["guedes", "gudes"]
  } as Record<string, string[]>,

  // Soft skills — short list.
  softSkills: ["Ownership", "Clear communication", "Pragmatism", "Mentoring"],

  // Things I'm into outside code — shown on the About page as a small grid.
  // `icon` must exist in src/icons/index.ts (e.g. server, bike, heart, shield,
  // book-open, cpu, terminal, map-pin).
  interests: [
    { label: "Homelab", icon: "server", note: "Self-hosting and breaking things safely since 2022." },
    { label: "Motorcycles", icon: "bike", note: "Chasing a good road when the weather allows." },
    { label: "Dogs", icon: "heart", note: "Reliably out-prioritized by them." },
    { label: "Security mindset", icon: "shield", note: "Old habits from the QA/AppSec days." },
  ] as Interest[],

  // Spoken languages.
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Professional" }, // TODO confirm level
  ] as { name: string; level: string }[],
};
