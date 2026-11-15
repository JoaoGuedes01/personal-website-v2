// Version from package.json plus a parsed CHANGELOG.md (both maintained by
// release-please). Runs at build time only.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import pkg from "../../package.json";

export const version: string = pkg.version;

export interface ChangelogItem {
  scope?: string;
  text: string;
  /** escaped inline HTML, for set:html */
  html: string;
  hash?: string;
  url?: string;
}

export type ChangelogKind = "feature" | "fix" | "content" | "docs" | "other";

export interface ChangelogGroup {
  title: string;
  kind: ChangelogKind;
  items: ChangelogItem[];
}

export interface ChangelogRelease {
  version: string;
  date?: string;
  url?: string;
  groups: ChangelogGroup[];
}

// `## [0.6.0](url) (2026-07-28)`, url and date optional so a plain `## 0.6.0` parses
const RELEASE_RE =
  /^##\s+(?:\[([^\]]+)\]\(([^)]+)\)|([^\s(]+))\s*(?:\((\d{4}-\d{2}-\d{2})\))?\s*$/;
const GROUP_RE = /^###\s+(.+?)\s*$/;
const ITEM_RE = /^\s*[*-]\s+(.+?)\s*$/;
// trailing `([abc1234](url))` on a bullet
const COMMIT_RE = /\s*\(\[([0-9a-f]{6,40})\]\(([^)]+)\)\)\s*$/i;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// escape first, then re-add `code`, **bold** and links
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
      // strip the emoji release-please prepends
      const title = grp[1].replace(/^[^\p{L}\p{N}]+/u, "").trim();
      group = { title, kind: kindOf(title), items: [] };
      release.groups.push(group);
      continue;
    }

    const item = ITEM_RE.exec(line);
    if (item && group) {
      const commit = COMMIT_RE.exec(item[1]);
      let text = commit ? item[1].replace(COMMIT_RE, "").trim() : item[1];
      // leading "**scope:**" becomes its own field
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

// cwd is the project root in dev and build; import.meta.url points into dist/ once bundled
const raw = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf-8");

export const releases: ChangelogRelease[] = parse(raw);

export const latest: ChangelogRelease | undefined = releases[0];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// manual split so there is no timezone drift
export function formatReleaseDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
