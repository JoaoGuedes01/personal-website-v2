import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { getImage } from "astro:assets";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import sanitizeHtml from "sanitize-html";
import { site, href } from "../data/site";
import { compareBlog } from "../utils/series";

// Feed readers need absolute URLs, and plain markup: no styles, scripts or classes.
const clean = (html, origin) =>
  sanitizeHtml(html.replace(/(src|href)="\/(?!\/)/g, `$1="${origin}/`), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
    allowedAttributes: { a: ["href", "title"], img: ["src", "alt", "width", "height"] },
    allowedSchemes: ["http", "https", "mailto"],
  });

const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function imageUrl(src, origin, width) {
  const img = await getImage({ src, width, format: "webp" });
  return img.src.startsWith("/") ? origin + img.src : img.src;
}

export async function GET(context) {
  const origin = context.site.origin;
  const posts = (await getCollection("blog")).filter((p) => !p.data.draft).sort(compareBlog);
  const container = await AstroContainer.create();

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      let html = await container.renderToString(Content);

      // The gallery is part of the page template, not the markdown, so add it after the text.
      if (post.data.gallery.length) {
        const figures = await Promise.all(
          post.data.gallery.map(async (g) => {
            const url = await imageUrl(g.src, origin, 1000);
            return `<figure><img src="${url}" alt="${esc(g.alt)}" />${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}</figure>`;
          }),
        );
        html += figures.join("");
      }
      if (post.data.cover) {
        html = `<p><img src="${await imageUrl(post.data.cover, origin, 1200)}" alt="${esc(post.data.coverAlt)}" /></p>` + html;
      }

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: href(`/blog/${post.id}`),
        categories: post.data.tags,
        content: clean(html, origin),
      };
    }),
  );

  return rss({
    title: `${site.name} · Ramblings`,
    description: site.description,
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
