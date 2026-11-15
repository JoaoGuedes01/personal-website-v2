// fallback cover: gradient seeded by the first tag or title, so a topic keeps its colour
export function tileGradient(seed: string): string {
  let hue = 0;
  for (const ch of seed.toLowerCase()) hue = (hue * 31 + ch.charCodeAt(0)) % 360;
  return `linear-gradient(135deg, oklch(0.66 0.12 ${hue}), oklch(0.46 0.13 ${(hue + 45) % 360}))`;
}
