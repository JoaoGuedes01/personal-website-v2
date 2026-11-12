#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Content generator — scaffold a new content file from a per-type template.
//
//   node scripts/new-content.mjs <type> "<Title>"
//   npm run new -- <type> "<Title>"
//
// Types: project | blog | snippet | experience | certification | paper
// (plurals and a few aliases also work, e.g. "cert", "post", "thesis").
//
// It creates src/content/<collection>/<slug>.md with all the frontmatter that
// type needs (mirroring src/content.config.ts), pre-fills the date where it
// applies, and refuses to overwrite an existing file.
// ---------------------------------------------------------------------------
import { writeFileSync, existsSync, mkdirSync, readFileSync, copyFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const ALIASES = {
  project: "project", projects: "project",
  blog: "blog", post: "blog", posts: "blog",
  snippet: "snippet", snippets: "snippet",
  experience: "experience", role: "experience", job: "experience",
  certification: "certification", certifications: "certification", cert: "certification", certs: "certification",
  paper: "paper", papers: "paper", thesis: "paper",
};

const DIRS = {
  project: "src/content/projects",
  blog: "src/content/blog",
  snippet: "src/content/snippets",
  experience: "src/content/experience",
  certification: "src/content/certifications",
  paper: "src/content/papers",
};

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function usage(msg) {
  if (msg) console.error(`\n  ✖ ${msg}`);
  console.log(`
  Scaffold a new content file.

    node scripts/new-content.mjs <type> "<Title>"
    npm run new -- <type> "<Title>"

  Types:
    project        a project           → src/content/projects/
    blog           a blog post         → src/content/blog/
    snippet        a code snippet      → src/content/snippets/
    experience     a role/job          → src/content/experience/
    certification  a certification     → src/content/certifications/
    paper          a paper or thesis   → src/content/papers/

  Options:
    --slug <slug>        override the auto-generated filename
    --group <slug>       snippet only: nest under src/content/snippets/<group>/
    --subgroup <slug>    snippet only: nest under <group>/<subgroup>/ (requires --group)
    --template <name>    blog only: "showcase" = the "Everything a ramble can do" example post
                         (every block + cover + gallery; its images are copied next to it)
    -h, --help           show this help

  Examples:
    node scripts/new-content.mjs project "Realtime Chat Service"
    node scripts/new-content.mjs blog "What the homelab taught me"
    npm run new -- blog "Layout test" --template showcase
    npm run new -- snippet "Tail all compose logs"
    npm run new -- snippet "John the Ripper" --group tools --subgroup credential-attack-tools

  Snippet group/subgroup are folder-derived, not frontmatter (see src/data/
  snippetGroups.ts) — passing --group/--subgroup just nests the new file so it
  shows up under that group's page without a manual move afterward.
`);
}

const TEMPLATES = {
  project: (title) => `---
title: "${title}"
summary: "One or two lines describing what it is and why it exists."
type: "Personal"              # Personal | Academic | Professional
category: "Web"               #  Web | Backend & Systems Architecture | Devops & Infrastructure | Data Science & ML | Game Development
stack: []                     # e.g. ["TypeScript", "Postgres"]
featured: false               # surface on the homepage / top of the list
resume: false                 # include on the auto-generated /resume
order: 100                    # lower sorts first within a group
draft: false
# org: "Company"              # Professional/Academic: the employer/org
# orgUrl: "https://…"         # optional: makes the org name a link
# experience: "role-id"       # pin to a specific Experience entry (multi-role companies)
# repo: "https://…"           # optional repository link
# demo: "https://…"           # optional live demo link
# year: ${new Date().getFullYear()}
# gallery:                    # optional image gallery (co-located, with lightbox)
#   - { src: ./shot-1.png, alt: "Overview", caption: "The dashboard." }
---

Write the story here: the problem it solved, your role, the parts you're proud of,
and what you'd do differently now. Use \`## Headings\` — they power the on-page
table of contents.
`,

  blog: (title) => `---
title: "${title}"
description: "Shown in the list and used as the social description."
pubDate: ${today}
tags: []                      # each tag is a topic filter on /blog (→ /blog?tag=<tag>)
featured: false               # true → pinned to the Featured block on /blog
draft: false
# updatedDate: ${today}
# cover: ./cover.jpg          # optional hero image (co-located, optimized)
# coverAlt: "…"
# gallery:                    # optional image gallery (co-located, with lightbox)
#   - { src: ./shot-1.png, alt: "…" }
---

Open with the hook. Use \`## Headings\` to structure the piece — they drive the
table of contents on the side.
`,

  snippet: (title) => `---
title: "${title}"
description: "What it does, in one line."
pubDate: ${today}
category: "Software Engineering"   # Software Engineering | Systems | DevOps | Cybersecurity | Data
lang: "shell"                      # primary language/tool, shown as a label
tags: []                           # tool tags, e.g. ["git"] → filter within the class
draft: false
# source: "INE Certification"      # where this came from — shown as a small badge
---

A sentence of context, then the snippet:

\`\`\`bash
echo "your snippet here"
\`\`\`

Note any caveats or variations worth remembering.
`,

  experience: (title) => `---
company: "${title}"
role: "TODO: your role"
start: "2024"                 # freeform: "2024" or "Jan 2024"
end: "Present"
location: "TODO: City, Country"
tags: []                      # e.g. ["Backend", "Go", "Postgres"]
summary: "One line shown on the experience list card."
highlights:                   # bullets — power the role page AND the auto /resume
  - "Something you shipped or owned."
  - "Impact, ideally with a number."
order: 10                     # most recent should have the HIGHEST number
draft: false
# gallery:                    # optional image gallery (co-located, with lightbox)
#   - { src: ./shot-1.png, alt: "…" }
---

A short paragraph about the role — the team, the systems, what you focused on.
Use \`## Headings\` for a table of contents on longer entries.
`,

  certification: (title) => `---
name: "${title}"
issuer: "TODO: AWS / INE / Coursera / …"   # the provider filter groups by this
issued: "${new Date().getFullYear()}"       # freeform: "2024" or "Mar 2024"
skills: []                                  # topics it covers → shown as tags
featured: false
order: 100
draft: false
# expires: "2027"
# url: "https://…"            # verification link
# credentialId: "ABC-123"
---
`,

  paper: (title) => `---
title: "${title}"
kind: "Paper"                 # Paper | Thesis
authors: ["João Guedes"]
venue: "Conference / Journal"
year: ${new Date().getFullYear()}
abstract: "The abstract or a short summary."
# link: "https://…"          # external page / DOI / repository
# pdf: "/papers/${"${slug}"}.pdf"   # a file in public/papers/ (Open PDF + Download)
---
`,
};

// --- parse args ---
const argv = process.argv.slice(2);
if (argv.includes("-h") || argv.includes("--help") || argv.length === 0) {
  usage(argv.length === 0 ? null : undefined);
  process.exit(argv.length === 0 ? 1 : 0);
}

let slugOverride = null;
let group = null;
let subgroup = null;
let template = null;
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--slug") {
    slugOverride = argv[++i];
  } else if (argv[i] === "--group") {
    group = argv[++i];
  } else if (argv[i] === "--subgroup") {
    subgroup = argv[++i];
  } else if (argv[i] === "--template") {
    template = (argv[++i] || "").toLowerCase();
  } else if (argv[i] === "--example") {
    template = "showcase";
  } else {
    positional.push(argv[i]);
  }
}
if (subgroup && !group) {
  usage("--subgroup requires --group.");
  process.exit(1);
}

const TEMPLATE_DIR = path.join(ROOT, "scripts", "templates");
const TEMPLATES_FOR = { blog: ["showcase"] };

const typeArg = (positional.shift() || "").toLowerCase();
const type = ALIASES[typeArg];
if (!type) {
  usage(`Unknown type "${typeArg}". Try: ${Object.keys(DIRS).join(", ")}.`);
  process.exit(1);
}

const title = positional.join(" ").trim();
if (!title) {
  usage(`Missing title. Example: node scripts/new-content.mjs ${type} "My Title"`);
  process.exit(1);
}

const slug = slugify(slugOverride || title);
if (!slug) {
  usage("Could not derive a slug from that title — pass one with --slug.");
  process.exit(1);
}

// Reserved slugs that would collide with list routes.
const RESERVED = { project: ["page", "type"], blog: ["page", "tag"] };
if ((RESERVED[type] || []).includes(slug)) {
  usage(`"${slug}" is a reserved name for ${type}s (it collides with a list route). Pick another with --slug.`);
  process.exit(1);
}

const dir = path.join(ROOT, DIRS[type], ...(type === "snippet" ? [group, subgroup].filter(Boolean) : []));
const file = path.join(dir, `${slug}.md`);
if (existsSync(file)) {
  console.error(`\n  ✖ ${path.relative(ROOT, file)} already exists — not overwriting.\n`);
  process.exit(1);
}

if (template && !(TEMPLATES_FOR[type] || []).includes(template)) {
  const known = TEMPLATES_FOR[type];
  usage(known ? `Unknown ${type} template "${template}". Available: ${known.join(", ")}.` : `--template isn't available for ${type}.`);
  process.exit(1);
}

let body = TEMPLATES[type](title);
const copied = [];
if (type === "blog" && template === "showcase") {
  // The showcase post uses co-located images; copy them next to it, prefixed
  // with the slug so several showcase posts can coexist in the flat blog folder.
  const imgDir = path.join(TEMPLATE_DIR, "blog-showcase");
  const imgs = readdirSync(imgDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const targets = imgs.map((f) => path.join(dir, `${slug}-${f}`));
  const clash = targets.find((t) => existsSync(t));
  if (clash) {
    console.error(`\n  ✖ ${path.relative(ROOT, clash)} already exists — not overwriting.\n`);
    process.exit(1);
  }
  body = readFileSync(path.join(TEMPLATE_DIR, "blog-showcase.md"), "utf8")
    .replace(/\{\{title\}\}/g, title)
    .replace(/\{\{date\}\}/g, today)
    .replace(/\{\{slug\}\}/g, slug);
  mkdirSync(dir, { recursive: true });
  imgs.forEach((f, i) => {
    copyFileSync(path.join(imgDir, f), targets[i]);
    copied.push(path.relative(ROOT, targets[i]));
  });
}
// paper template references the slug for the pdf hint
body = body.replace(/\$\{slug\}/g, slug);

mkdirSync(dir, { recursive: true });
writeFileSync(file, body, "utf8");

console.log(`
  ✔ Created ${path.relative(ROOT, file)}${copied.length ? `\n    + ${copied.length} images: ${copied.map((c) => path.basename(c)).join(", ")}` : ""}

  Next:
    • open it and replace the TODO / placeholder values
    • run  npm run dev  and find it under /${{ blog: "blog", paper: "academia", certification: "certifications" }[type] ?? type + "s"}
`);
