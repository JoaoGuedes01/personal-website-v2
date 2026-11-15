// Builds three PDFs from src/data/cv/: the default (cv.md's `use:` picks manual or auto),
// -manual (cv.md) and -auto (cv.auto.md)
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import manualSrc from "../../data/cv/cv.md?raw";
import autoSrc from "../../data/cv/cv.auto.md?raw";
import { resume } from "../../data/resume";
import { resolveSystemIcon } from "../../icons";
import { buildCvPdf, expandCv, readMeta, splitFrontMatter, type CvContext } from "../../utils/cv";

const published = readMeta(splitFrontMatter(manualSrc).meta).use;

export const getStaticPaths = (() => [
  { params: { file: "joaoguedes_cv" }, props: { which: published } },
  { params: { file: "joaoguedes_cv-manual" }, props: { which: "manual" } },
  { params: { file: "joaoguedes_cv-auto" }, props: { which: "auto" } },
]) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const src = props.which === "auto" ? autoSrc : manualSrc;

  const jobs = (await getCollection("experience"))
    .filter((e) => !e.data.draft && !e.data.cv?.hide)
    .sort((a, b) => b.data.order - a.data.order);
  const ctx: CvContext = {
    name: resume.name,
    title: resume.title,
    contact: resume.contact,
    experience: jobs.map((e) => ({
      role: e.data.cv?.role ?? e.data.role,
      company: e.data.company,
      start: e.data.start,
      end: e.data.end,
      type: e.data.cv?.type ?? "Full Time",
      bullets: e.data.cv?.bullets ?? e.data.highlights,
    })),
    education: resume.education.map((e) => ({ degree: e.degree, school: e.school, start: e.start, end: e.end, location: e.location })),
    certifications: (await getCollection("certifications"))
      .filter((c) => !c.data.draft)
      .sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order || b.data.issued.localeCompare(a.data.issued))
      .map((c) => ({ name: c.data.name, issuer: c.data.issuer, issued: c.data.issued, featured: c.data.featured })),
    skills: resume.skills,
  };

  const { meta, body } = splitFrontMatter(src);
  const cvMeta = readMeta(meta);
  const { pdf, fontSize, pages } = await buildCvPdf(expandCv(body, ctx), cvMeta, { title: `${resume.name} - CV`, author: resume.name }, resolveSystemIcon);
  if (cvMeta.fit === "one-page" && pages > 1) console.warn(`[cv] ${props.which}: needs ${pages} pages even at ${fontSize}pt`);
  return new Response(new Uint8Array(pdf), { headers: { "Content-Type": "application/pdf" } });
};
