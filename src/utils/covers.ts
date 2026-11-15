// A `cover.{png,jpg,jpeg,webp,avif}` in src/content/projects/img/<id>/ is picked up
// as that project's hero and card image.
const coverModules = import.meta.glob<{ default: ImageMetadata }>(
  "../content/projects/img/*/cover.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

const covers: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(coverModules)) {
  // ../content/projects/img/bracelhertz/cover.png -> "bracelhertz"
  const match = path.match(/\/img\/([^/]+)\/cover\.[^/.]+$/);
  if (match) covers[match[1]] = mod.default;
}

export function projectCover(id: string): ImageMetadata | undefined {
  return covers[id];
}
