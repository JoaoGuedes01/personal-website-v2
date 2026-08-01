/**
 * System icon registry
 * -------------------------------------------------------------------------
 * Every non-tech icon on the site (nav, categories, chevrons, socials, UI
 * chrome) resolves in this priority order:
 *   1. Your own SVG   — SYSTEM_ICON_OVERRIDES below (always wins)
 *   2. Library icon   — lucide-static (https://lucide.dev, ISC licensed)
 * A name that resolves to neither renders nothing — see SystemIcon.astro,
 * which is the component to actually use these through:
 *     <SystemIcon name="briefcase" />
 *     <SystemIcon name="github" size={18} class="text-primary" />
 *
 * Rendered markup is a 24×24 icon; callers control fill/stroke per-instance
 * via <SystemIcon fill=".." stroke=".."/> (see that component's props).
 *
 * ADD YOUR OWN: pick any name.
 *   - If lucide.dev has an icon under that exact name, it just works.
 *   - If lucide has it under a *different* name, add it to
 *     SYSTEM_ICON_ALIASES (local name -> lucide slug).
 *   - If lucide doesn't have it at all, or you want it to look different
 *     from what lucide ships, paste the inner SVG markup (the
 *     <path>/<circle>/… elements, NOT the <svg> wrapper) into
 *     SYSTEM_ICON_OVERRIDES.
 * -------------------------------------------------------------------------
 */
import iconNodesRaw from "lucide-static/icon-nodes.json";

type IconNode = [string, Record<string, string>];
const iconNodes = iconNodesRaw as unknown as Record<string, IconNode[]>;

function nodesToInner(nodes: IconNode[]): string {
  return nodes
    .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")}/>`)
    .join("");
}

// slug -> inner markup, built once at build time from the full lucide set.
const LUCIDE_BY_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(iconNodes).map(([slug, nodes]) => [slug, nodesToInner(nodes)]),
);

// Local name -> lucide slug, for icons this site refers to by a name lucide
// itself has since renamed or split in two.
const SYSTEM_ICON_ALIASES: Record<string, string> = {
  code: "code-xml", // lucide's current "code" is a different (simpler) glyph now
  shield: "shield-check", // the shield-with-checkmark used for the Cybersecurity category
};

// Icons lucide.dev doesn't have (brand marks, the personal logo mark, a
// couple of bespoke glyphs) — or anything deliberately styled differently
// from what the library ships. Inner markup only, 0 0 24 24 viewBox.
const SYSTEM_ICON_OVERRIDES: Record<string, string> = {
  // brand marks (filled) — GitHub from simple-icons; LinkedIn is the
  // canonical filled path (simple-icons dropped LinkedIn for legal reasons).
  github:
    '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
  linkedin:
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>',
  // lucide renamed this to "house" and redrew it; keeping the original look
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  // personal logo mark (site wordmark glyph) — not a lucide icon
  guedes:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 1C13.3982 1 15.1787 1.50369 16.7152 2.3847L14.4358 6.33287C13.5698 5.8398 12.5678 5.55814 11.5 5.55814C8.2184 5.55814 5.55814 8.2184 5.55814 11.5C5.55814 14.7816 8.2184 17.4419 11.5 17.4419C13.5796 17.4419 15.4096 16.3736 16.4713 14.7558H13.7791V11.5H17.4419H20.9419H22C22 17.299 17.299 22 11.5 22C5.70101 22 1 17.299 1 11.5C1 5.70101 5.70101 1 11.5 1Z" stroke-width="0.5" stroke-miterlimit="3.99393"/><path d="M11.5 0.0498047C13.5153 0.0498047 15.4089 0.570369 17.0537 1.48438L16.8926 1.74805C15.2946 0.862508 13.4562 0.357422 11.5 0.357422C5.34633 0.357422 0.357422 5.34633 0.357422 11.5C0.357422 17.6537 5.34633 22.6426 11.5 22.6426C17.6537 22.6426 22.6426 17.6537 22.6426 11.5C22.6426 11.3354 22.6389 11.1716 22.6318 11.0088L22.6299 10.9609H13.752V10.7344H22.9248C22.9415 10.9874 22.9502 11.2427 22.9502 11.5C22.9502 17.8237 17.8237 22.9502 11.5 22.9502C5.17634 22.9502 0.0498047 17.8237 0.0498047 11.5C0.0498047 5.17634 5.17634 0.0498047 11.5 0.0498047Z"  stroke-width="0.1"/>',
  dog_paw:
    '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
  chef: '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
};

/** Resolve a system icon name to its inner SVG markup, or undefined. */
export function resolveSystemIcon(name: string): string | undefined {
  return SYSTEM_ICON_OVERRIDES[name] ?? LUCIDE_BY_NAME[SYSTEM_ICON_ALIASES[name] ?? name];
}

/** Which icon represents each project context. */
export const projectTypeIcon: Record<string, string> = {
  Personal: "user",
  Academic: "graduation-cap",
  Professional: "briefcase",
};

/** Which icon represents each snippet discipline. */
export const disciplineIcon: Record<string, string> = {
  "Software Engineering": "code",
  Systems: "cpu",
  DevOps: "git-branch",
  Cybersecurity: "shield",
  Data: "database",
};

/**
 * Icon hint per certification provider. Falls back to "award" for anything
 * not listed — add your providers here if you want a specific glyph.
 */
export const providerIcon: Record<string, string> = {
  AWS: "server",
  "Amazon Web Services": "server",
  INE: "shield",
  eLearnSecurity: "shield",
  Coursera: "graduation-cap",
  Udemy: "book-open",
  "LinkedIn Learning": "linkedin",
  Google: "sparkles",
  Microsoft: "cpu",
  HashiCorp: "terminal",
};

/** Resolve a provider to its icon, defaulting to a generic award badge. */
export function iconForProvider(provider: string): string {
  return providerIcon[provider] ?? "award";
}
