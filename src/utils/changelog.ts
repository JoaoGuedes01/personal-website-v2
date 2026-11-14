// Reads the project's version and parses CHANGELOG.md into structured data.
//
// Both are release-please artefacts: `package.json` holds the current version
// and CHANGELOG.md is regenerated on every release. Everything here runs at
// build time (static site), so `fs` is available and there's no runtime cost.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import pkg from "../../package.json";

/** Current project version, e.g. "0.6.0" — the source of truth for the site. */
export const version: string = pkg.version;

export interface ChangelogItem {
  /** Conventional-commit scope, e.g. "snippets" (from a leading `**scope:**`). */
  scope?: string;
  /** Change description with the commit link and scope stripped, first letter capitalised. */
  text: string;
  /** `text` as safe inline HTML: `code`, **bold**, [links](url). Use with set:html. */
  html: string;
  /** Short commit hash, when release-please linked one. */
  hash?: string;
  /** Commit URL, when present. */
  url?: string;
}

export type ChangelogKind = "feature" | "fix" | "content" | "docs" | "other";

export interface ChangelogGroup {
  /** Section heading with emoji and symbols stripped (e.g. "Features"). */
  title: string;
  /** Normalised category, used for colour. */
  kind: ChangelogKind;
  items: ChangelogItem[];
}

export interface ChangelogRelease {
  /** Version string, e.g. "0.6.0". */
  version: string;
  /** ISO date (YYYY-MM-DD) of the release, when present. */
  date?: string;
  /** Compare/diff URL for the release, when present. */
  url?: string;
  groups: ChangelogGroup[];
}

// `## [0.6.0](url) (2026-07-28)` — url and date are both optional so an
// unreleased/plain heading (`## 0.6.0`) still parses.
const RELEASE_RE =
  /^##\s+(?:\[([^\]]+)\]\(([^)]+)\)|([^\s(]+))\s*(?:\((\d{4}-\d{2}-\d{2})\))?\s*$/;
const GROUP_RE = /^###\s+(.+?)\s*$/;
const ITEM_RE = /^\s*[*-]\s+(.+?)\s*$/;
// Trailing `([abc1234](url))` commit reference on a bullet.
const COMMIT_RE = /\s*\(\[([0-9a-f]{6,40})\]\(([^)]+)\)\)\s*$/i;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Tiny, safe inline-markdown renderer (HTML is escaped first, then `code`, **bold** and links are re-added). */
export function inlineMd(src: string): string {
  return escapeHtml(src)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function kindOf(title: string): ChangelogKind {
  const t = title.toLowerCase();
  if (/feature|add/.test(t)) return "feature";
  if (/fix|bug/.test(t)) return "fix";
  if (/content/.test(t)) return "content";
  if (/doc/.test(t)) return "docs";
  return "other";
}

function parse(md: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  let release: ChangelogRelease | null = null;
  let group: ChangelogGroup | null = null;

  for (const line of md.split(/\r?\n/)) {
    const rel = RELEASE_RE.exec(line);
    if (rel) {
      release = {
        version: rel[1] ?? rel[3] ?? "",
        url: rel[2],
        date: rel[4],
        groups: [],
      };
      releases.push(release);
      group = null;
      continue;
    }
    if (!release) continue;

    const grp = GROUP_RE.exec(line);
    if (grp) {
      // Drop the leading emoji/symbols release-please adds ("✨ Features" -> "Features").
      const title = grp[1].replace(/^[^\p{L}\p{N}]+/u, "").trim();
      group = { title, kind: kindOf(title), items: [] };
      release.groups.push(group);
      continue;
    }

    const item = ITEM_RE.exec(line);
    if (item && group) {
      const commit = COMMIT_RE.exec(item[1]);
      let text = commit ? item[1].replace(COMMIT_RE, "").trim() : item[1];
      // A leading "**scope:**" becomes its own field.
      const sc = /^\*\*([^*]+?):\*\*\s*/.exec(text);
      if (sc) text = text.slice(sc[0].length);
      text = text.charAt(0).toUpperCase() + text.slice(1);
      group.items.push({
        scope: sc?.[1],
        text,
        html: inlineMd(text),
        hash: commit?.[1],
        url: commit?.[2],
      });
    }
  }

  return releases;
}

// `process.cwd()` is the project root under both `astro dev` and `astro build`,
// unlike `import.meta.url`, which points into `dist/` once the module is bundled.
const raw = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf-8");

/** Every release, newest first (CHANGELOG.md order). */
export const releases: ChangelogRelease[] = parse(raw);

/** The most recent release, or `undefined` if the changelog is empty. */
export const latest: ChangelogRelease | undefined = releases[0];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Format an ISO date as "Jul 28, 2026" without any timezone drift. */
export function formatReleaseDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
