import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site, href } from "../data/site";

export async function GET(context) {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${site.name} — Blog`,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: href(`/blog/${post.id}`),
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
