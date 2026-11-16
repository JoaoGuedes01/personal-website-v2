// Branded share cards for entries that have no cover image of their own.
// /og/<blog|projects|snippets>/<id>.png, drawn at build time by src/utils/og.ts.
import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { renderCard } from "../../../utils/og";
import { projectCover } from "../../../utils/covers";

export const getStaticPaths = (async () => {
  const [blog, projects, snippets] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
    getCollection("snippets"),
  ]);
  return [
    ...blog
      .filter((e) => !e.data.draft && !e.data.cover)
      .map((e) => ({
        params: { collection: "blog", slug: e.id },
        props: { title: e.data.title, kicker: ["Ramblings", e.data.tags[0]].filter(Boolean).join(" · "), subtitle: e.data.description },
      })),
    ...projects
      .filter((e) => !e.data.draft && !projectCover(e.id))
      .map((e) => ({
        params: { collection: "projects", slug: e.id },
        props: { title: e.data.title, kicker: ["Project", e.data.category].filter(Boolean).join(" · "), subtitle: e.data.summary },
      })),
    ...snippets
      .filter((e) => !e.data.draft)
      .map((e) => ({
        params: { collection: "snippets", slug: e.id },
        props: { title: e.data.title, kicker: `Snippet · ${e.data.category}`, subtitle: e.data.description },
      })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderCard(props as { title: string; kicker: string; subtitle?: string });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
