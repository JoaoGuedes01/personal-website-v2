/**
 * Fallback cover for posts without an image: a deterministic gradient tinted by
 * a seed (the first tag, else the title), so a topic always gets the same color.
 */
export function tileGradient(seed: string): string {
  let hue = 0;
  for (const ch of seed.toLowerCase()) hue = (hue * 31 + ch.charCodeAt(0)) % 360;
  return `linear-gradient(135deg, oklch(0.66 0.12 ${hue}), oklch(0.46 0.13 ${(hue + 45) % 360}))`;
}
