// Blog series. A post joins one with frontmatter: series: "homelab" and part: 3
export interface SeriesDef {
  title: string;
  blurb: string;
  planned: string[];
}

export const SERIES: Record<string, SeriesDef> = {
  homelab: {
    title: "Homelab",
    blurb: "The story of my homelab, from a zero-euro pile of spare parts to the machine I run today.",
    planned: ["The Frankenlab", "The Rebuild", "The Media Stack", "The Infrastructure", "Keeping It Alive"],
  },
};

export function seriesDef(key: string | undefined): SeriesDef | undefined {
  return key ? SERIES[key] : undefined;
}
