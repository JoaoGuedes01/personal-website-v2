/**
 * Auto-detected project cover images.
 *
 * Convention over configuration: drop a `cover.{png,jpg,jpeg,webp,avif}` next to
 * a project's other screenshots under `src/content/projects/img/<id>/` and it
 * becomes that project's hero on its detail page and its card in the grid.
 *
 * Every match is imported through Astro's asset pipeline, so the returned value
 * is optimizable `ImageMetadata` — pass it straight to <Image /> / getImage().
 */
const coverModules = import.meta.glob<{ default: ImageMetadata }>(
  "../content/projects/img/*/cover.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

const covers: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(coverModules)) {
  // e.g. ../content/projects/img/bracelhertz/cover.png  ->  "bracelhertz"
  const match = path.match(/\/img\/([^/]+)\/cover\.[^/.]+$/);
  if (match) covers[match[1]] = mod.default;
}

/** The auto-detected cover for a project id, or undefined if none exists. */
export function projectCover(id: string): ImageMetadata | undefined {
  return covers[id];
}
