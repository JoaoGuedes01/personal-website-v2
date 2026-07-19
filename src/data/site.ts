// Central place for site metadata, navigation and social links.
// Edit these values to change what shows in the header, footer and <head>.

export const site = {
  name: "João Guedes",
  shortName: "Guedes",
  role: "Backend Software Engineer",
  // One-line description used for SEO / social cards.
  description:
    "Backend software engineer at Uphold. Security Professional. I'm passionate about security, engineering and systems design",
  // Absolute site URL — keep in sync with `site` in astro.config.mjs.
  url: "https://joaoguedes.net",
  locale: "en",
  // Default social image (1200×630). Regenerate if you rebrand.
  ogImage: "/og-default.png",
};

// Primary navigation. The logo links Home, so it's not repeated here.
// Shown in the header (desktop ≥ lg) and the mobile menu.
export const nav = [
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Certifications", path: "/certifications" },
  { label: "Academia", path: "/academia" },
  { label: "Snippets", path: "/snippets" },
  { label: "Blog", path: "/blog" },
  { label: "Resume", path: "/resume" },
  { label: "About", path: "/about" },
];

// Social / contact links. Replace the TODO placeholders with your real URLs.
// `icon` maps to an entry in src/icons/index.ts.
export const socials = [
  { label: "GitHub", href: "https://github.com/JoaoGuedes01", handle: "@JoaoGuedes01", icon: "github", stroke: "none", fill:"currentColor" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joaom-guedes", handle: "in/TODO", icon: "linkedin", stroke: "currentColor", fill:"none" },
  { label: "Email", href: "mailto:joaoguedes.cjp@gmail.com", handle: "joaoguedes.cjp@gmail.com", icon: "mail", stroke: "currentColor", fill:"none" },
];

/**
 * Build an internal href that respects `base` from astro.config.mjs.
 * Use this for every internal link so a project-page deploy (sub-path) works.
 *   href("/projects")  → "/projects"  (user page)  |  "/personal_website/projects" (project page)
 */
export function href(path = "/"): string {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  if (path === "/") return prefix === "" ? "/" : prefix + "/";
  return prefix + (path.startsWith("/") ? path : "/" + path);
}
