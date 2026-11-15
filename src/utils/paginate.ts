// Page 1 lives at the base URL (/blog), the rest at <base>/page/N.

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

// 2..total, for getStaticPaths
export function extraPageNumbers<T>(items: T[], size = PAGE_SIZE): number[] {
  const total = Math.max(1, Math.ceil(items.length / size));
  const out: number[] = [];
  for (let p = 2; p <= total; p++) out.push(p);
  return out;
}

// pageHref("/blog", 3) -> "/blog/page/3". base should already go through href().
export function pageHref(base: string, page: number): string {
  if (page <= 1) return base;
  const trimmed = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmed}/page/${page}`;
}
