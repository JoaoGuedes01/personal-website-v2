// Registry for every tech in a project's `stack:` frontmatter. Stack strings stay as authored in the
// markdown; this gives each one a slug (filter facet), a group (project page) and an icon.
// Icon order: TECH_CUSTOM_ICONS, then simple-icons, then the group's line icon from src/icons.
// All icons render in currentColor, no brand colours.
import * as simpleIcons from "simple-icons";
import { resolveSystemIcon } from "../icons";

// slug -> path from simple-icons. Server-side only, the client just gets the paths we render.
const BY_SLUG: Record<string, string> = {};
for (const key in simpleIcons) {
  const ic = (simpleIcons as Record<string, unknown>)[key] as { slug?: string; path?: string } | undefined;
  if (ic && ic.slug && ic.path) BY_SLUG[ic.slug] = ic.path;
}

export type TechGroup = "language" | "framework" | "data" | "infra" | "tool";

// Display order and line icon (key in src/icons) per group. Also the icon fallback for techs with no logo.
export const TECH_GROUPS: { key: TechGroup; label: string; icon: string }[] = [
  { key: "language", label: "Languages", icon: "code" },
  { key: "framework", label: "Frameworks & Libraries", icon: "puzzle" },
  { key: "data", label: "Data & Storage", icon: "database" },
  { key: "infra", label: "Infrastructure & DevOps", icon: "server" },
  { key: "tool", label: "Tools & Platforms", icon: "terminal" },
];
const GROUP_ICON: Record<TechGroup, string> = Object.fromEntries(
  TECH_GROUPS.map((g) => [g.key, g.icon]),
) as Record<TechGroup, string>;

// keyed by the lowercased stack string
const REGISTRY: Record<string, TechGroup> = {
  javascript: "language", typescript: "language", jsx: "language", java: "language",
  "c#": "language", "c++": "language", python: "language", r: "language",
  perl: "language", prolog: "language", html: "language", css: "language",

  react: "framework", "node.js": "framework", "express.js": "framework",
  "spring boot": "framework", flask: "framework", "ant design": "framework",
  "chakra ui": "framework", "framer motion": "framework", mongoose: "framework",
  sequelize: "framework", axios: "framework", "scikit-learn": "framework",
  numpy: "framework", pandas: "framework", shiny: "framework", unity: "framework",
  webgl: "framework", "web audio api": "framework", websockets: "framework",
  "monaco editor": "framework", javafx: "framework", typer: "framework",
  forecast: "framework", rminer: "framework",

  mongodb: "data", mysql: "data", postgresql: "data", redis: "data",
  dynamodb: "data", elasticsearch: "data", tableau: "data", powerbi: "data",

  docker: "infra", "docker compose": "infra", "aws lambda": "infra", "aws s3": "infra",
  "aws route 53": "infra", github: "infra", "github actions": "infra",
  "github pages": "infra", heroku: "infra", jenkins: "infra", "azure devops": "infra",
  traefik: "infra", portainer: "infra", debian: "infra", zerotier: "infra",
  replit: "infra", "shinyapps.io": "infra", pypi: "infra", npm: "infra", rabbitmq: "infra",

  vite: "tool", cypress: "tool", selenium: "tool", "apache jmeter": "tool", grpc: "tool",
  "rest api": "tool", "tcp sockets": "tool", "java rmi": "tool", powershell: "tool",
  jira: "tool", photoshop: "tool", rstudio: "tool", anaconda: "tool",
  "jupyter notebooks": "tool", "scene builder": "tool", "swagger openapi": "tool",
  jwt: "tool", twilio: "tool", paypal: "tool", salesforce: "tool", hubspot: "tool",
  emailjs: "tool", nodemailer: "tool", "mirth connect": "tool",
  "talend data quality": "tool", "talend open studio": "tool", moloni: "tool",
  easyinvoice: "tool", "google api": "tool", "google maps": "tool",
  "facebook api": "tool", "twitter api": "tool", "github api": "tool",
  arduino: "tool", esp32: "tool", bumpversion: "tool",
};

// tech (lowercased) -> simple-icons slug. Anything missing falls back to the group icon.
const LIB_ICON: Record<string, string> = {
  javascript: "javascript", typescript: "typescript", "c++": "cplusplus",
  python: "python", r: "r", perl: "perl", html: "html5", css: "css",
  react: "react", "node.js": "nodedotjs", "express.js": "express",
  "spring boot": "springboot", flask: "flask", "ant design": "antdesign",
  "chakra ui": "chakraui", "framer motion": "framer", mongoose: "mongoose",
  sequelize: "sequelize", axios: "axios", "scikit-learn": "scikitlearn",
  numpy: "numpy", pandas: "pandas", unity: "unity", webgl: "webgl",
  mongodb: "mongodb", mysql: "mysql", postgresql: "postgresql", redis: "redis",
  elasticsearch: "elasticsearch", docker: "docker", "docker compose": "docker",
  github: "github", "github actions": "githubactions", "github pages": "githubpages",
  "github api": "github", jenkins: "jenkins", traefik: "traefikproxy",
  portainer: "portainer", debian: "debian", zerotier: "zerotier", replit: "replit",
  pypi: "pypi", npm: "npm", rabbitmq: "rabbitmq", vite: "vite", cypress: "cypress",
  selenium: "selenium", "apache jmeter": "apachejmeter", jira: "jira",
  anaconda: "anaconda", "jupyter notebooks": "jupyter", "swagger openapi": "swagger",
  jwt: "jsonwebtokens", paypal: "paypal", hubspot: "hubspot",
  "talend data quality": "talend", "talend open studio": "talend",
  "google api": "google", "google maps": "googlemaps", "facebook api": "facebook",
  "twitter api": "x", arduino: "arduino", esp32: "espressif",
};

// Custom icon per tech, wins over the library logo. Paste the inner markup of a 0 0 24 24 SVG
// (no <svg> wrapper). mode is "fill" (default, brand-logo style) or "stroke" (2px line icon).
// e.g. "mirth connect": { svg: '<path d="M4 12h16M12 4v16"/>', mode: "stroke" },
export const TECH_CUSTOM_ICONS: Record<string, { svg: string; mode?: "fill" | "stroke" }> = {};

export type IconMode = "fill" | "stroke";
export interface TechIcon {
  svg: string; // inner markup, 0 0 24 24 viewBox
  mode: IconMode;
}
export interface ResolvedTech {
  id: string; // slug for facets and data attributes
  label: string; // as authored
  group: TechGroup;
  icon: TechIcon;
}

const norm = (raw: string) => raw.trim().toLowerCase();

// "C++" -> "cplusplus", "C#" -> "csharp", "Node.js" -> "node-js"
const slugify = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function resolveIcon(key: string, group: TechGroup): TechIcon {
  const custom = TECH_CUSTOM_ICONS[key];
  if (custom) return { svg: custom.svg, mode: custom.mode ?? "fill" };

  const path = LIB_ICON[key] ? BY_SLUG[LIB_ICON[key]] : undefined;
  if (path) return { svg: `<path d="${path}"/>`, mode: "fill" };

  return { svg: resolveSystemIcon(GROUP_ICON[group]) ?? "", mode: "stroke" };
}

export function resolveTech(raw: string): ResolvedTech {
  const key = norm(raw);
  const group = REGISTRY[key] ?? "tool";
  return { id: slugify(raw), label: raw.trim(), group, icon: resolveIcon(key, group) };
}

// Distinct techs with usage counts, most used first. Same-slug variants ("Javascript"/"JavaScript") merge.
export function collectTech(stacks: string[][]): (ResolvedTech & { count: number })[] {
  const map = new Map<string, ResolvedTech & { count: number }>();
  for (const stack of stacks) {
    for (const raw of stack) {
      const t = resolveTech(raw);
      const hit = map.get(t.id);
      if (hit) hit.count += 1;
      else map.set(t.id, { ...t, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
