import type { CollectionEntry } from "astro:content";
import { seriesDef } from "../data/series";

type Post = CollectionEntry<"blog">;

export interface SeriesPart {
  part: number;
  title: string;
  id?: string; // only when a post exists for this part
  state: "current" | "published" | "upcoming"; // upcoming = not written yet, or still a draft
}

export interface SeriesInfo {
  key: string;
  title: string;
  blurb?: string;
  total: number;
  current: number;
  parts: SeriesPart[];
  prev?: SeriesPart; // nearest published part before this one
  next?: SeriesPart; // the part right after this one (published or upcoming)
}

/** "Homelab · Part 3" for cards, or undefined for posts outside a series. */
export function seriesLabel(data: Post["data"]): string | undefined {
  if (!data.series || !data.part) return undefined;
  return `${seriesDef(data.series)?.title ?? data.series} · Part ${data.part}`;
}

/** Everything the post page and the series box need, or undefined outside a series. */
export function buildSeries(all: Post[], current: Post): SeriesInfo | undefined {
  const key = current.data.series;
  const currentPart = current.data.part;
  if (!key || !currentPart) return undefined;

  const def = seriesDef(key);
  const members = all.filter((p) => p.data.series === key && p.data.part);
  const total = Math.max(def?.planned.length ?? 0, ...members.map((m) => m.data.part!));

  const parts: SeriesPart[] = [];
  for (let n = 1; n <= total; n++) {
    const m = members.find((p) => p.data.part === n);
    if (m) {
      parts.push({
        part: n,
        title: m.data.title,
        id: m.id,
        state: m.id === current.id ? "current" : m.data.draft ? "upcoming" : "published",
      });
    } else {
      parts.push({ part: n, title: def?.planned[n - 1] ?? `Part ${n}`, state: "upcoming" });
    }
  }

  return {
    key,
    title: def?.title ?? key,
    blurb: def?.blurb,
    total,
    current: currentPart,
    parts,
    prev: [...parts].reverse().find((p) => p.part < currentPart && p.state === "published"),
    next: parts.find((p) => p.part === currentPart + 1),
  };
}

/** Newest first; posts with the same date in one series order by part (higher part = newer). */
export function compareBlog(a: Post, b: Post): number {
  const d = b.data.pubDate.getTime() - a.data.pubDate.getTime();
  if (d !== 0) return d;
  if (a.data.series && a.data.series === b.data.series) return (b.data.part ?? 0) - (a.data.part ?? 0);
  return 0;
}

/** One slot in the Featured block: a single post, or a whole series standing in for all its parts. */
export type FeaturedSlot =
  | { kind: "post"; entry: Post }
  | { kind: "series"; key: string; title: string; blurb?: string; parts: Post[]; total: number };

/**
 * Picks what the Featured block shows (newest first, at most `max` slots).
 * Featuring ANY part of a series features the whole series, as ONE slot, so a
 * five-part series never crowds out the other featured posts.
 */
export function featuredSlots(items: Post[], max = 3): FeaturedSlot[] {
  const inSeries = (p: Post) => !!(p.data.series && p.data.part);
  const featuredSeries = new Set(items.filter((p) => p.data.featured && inSeries(p)).map((p) => p.data.series!));
  const slots: FeaturedSlot[] = [];
  const seen = new Set<string>();
  for (const p of items) {
    if (inSeries(p) && featuredSeries.has(p.data.series!)) {
      const key = p.data.series!;
      if (seen.has(key)) continue;
      seen.add(key);
      const parts = items.filter((m) => m.data.series === key && m.data.part).sort((a, b) => a.data.part! - b.data.part!);
      const def = seriesDef(key);
      slots.push({
        kind: "series",
        key,
        title: def?.title ?? key,
        blurb: def?.blurb,
        parts,
        total: Math.max(def?.planned.length ?? 0, ...parts.map((m) => m.data.part!)),
      });
    } else if (p.data.featured) {
      slots.push({ kind: "post", entry: p });
    }
    if (slots.length >= max) break;
  }
  return slots;
}
