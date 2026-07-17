// ---------------------------------------------------------------------------
// PAGINATION
//
// A tiny, framework-free paginator. Page 1 lives at the base URL (e.g. /blog);
// pages 2..N live at <base>/page/2, /page/3, … The `pageHref` helper builds
// those URLs so the <Pagination /> component and getStaticPaths agree.
//
// Change PAGE_SIZE to taste (or pass a custom size per call).
// ---------------------------------------------------------------------------

export const PAGE_SIZE = 9;

export interface Page<T> {
  items: T[];
  current: number; // 1-based
  total: number; // total pages
  size: number;
  count: number; // total items across all pages
  hasPrev: boolean;
  hasNext: boolean;
}

/** Slice `items` for a given 1-based page number. */
export function paginate<T>(items: T[], current: number, size = PAGE_SIZE): Page<T> {
  const count = items.length;
  const total = Math.max(1, Math.ceil(count / size));
  const page = Math.min(Math.max(1, current), total);
  const start = (page - 1) * size;
  return {
    items: items.slice(start, start + size),
    current: page,
    total,
    size,
    count,
    hasPrev: page > 1,
    hasNext: page < total,
  };
}

/** Page numbers 2..total — feed to getStaticPaths for the /page/[page] route. */
export function extraPageNumbers<T>(items: T[], size = PAGE_SIZE): number[] {
  const total = Math.max(1, Math.ceil(items.length / size));
  const out: number[] = [];
  for (let p = 2; p <= total; p++) out.push(p);
  return out;
}

/**
 * Build the href for a page within a list.
 *   pageHref("/blog", 1) → "/blog"
 *   pageHref("/blog", 3) → "/blog/page/3"
 * `base` should already be run through href() by the caller.
 */
export function pageHref(base: string, page: number): string {
  if (page <= 1) return base;
  const trimmed = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmed}/page/${page}`;
}
