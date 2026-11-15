export const site = {
  name: "João Guedes",
  shortName: "Guedes",
  role: "Backend Software Engineer",
  // SEO / social cards
  description:
    "Backend software engineer at Uphold. Security Professional. I'm passionate about security, engineering and systems design",
  // keep in sync with `site` in astro.config.mjs
  url: "https://joaoguedes.net",
  locale: "en",
  // 1200x630
  ogImage: "/og-default.png",
};

// Header and mobile menu. The logo links Home, so it's not listed.
export const nav = [
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Certifications", path: "/certifications" },
  { label: "Academia", path: "/academia" },
  { label: "Snippets", path: "/snippets" },
  { label: "Ramblings", path: "/blog" },
  { label: "Resume", path: "/resume" },
  { label: "About", path: "/about" },
];

// `icon` maps to an entry in src/icons/index.ts.
export const socials = [
  { label: "GitHub", href: "https://github.com/JoaoGuedes01", handle: "@JoaoGuedes01", icon: "github", stroke: "none", fill:"currentColor" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joaom-guedes", handle: "in/joaom-guedes", icon: "linkedin", stroke: "none", fill:"currentColor" },
  { label: "Email", href: "mailto:joaoguedes.cjp@gmail.com", handle: "joaoguedes.cjp@gmail.com", icon: "mail", stroke: "currentColor", fill:"none" },
];

// internal href that respects `base` from astro.config.mjs
export function href(path = "/"): string {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  if (path === "/") return prefix === "" ? "/" : prefix + "/";
  return prefix + (path.startsWith("/") ? path : "/" + path);
}
