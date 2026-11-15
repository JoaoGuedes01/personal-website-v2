/**
 * CV generator: small markdown dialect in, plain Helvetica PDF out.
 * One line is one line, nothing merges.
 *
 *   # Name              centred title with a rule
 *   ## Section          bold heading with a rule
 *   | a | b | c |       aligned row: first cell left, last right, the rest centred
 *   - bullet            wraps
 *   **bold** [t](url)   inline, links stay black but clickable
 *   :github:            site icon, drawn as vector paths
 *   {{placeholder}}     filled from site content (see expandCv)
 *
 * Front matter (all optional): use, page, font, min-font, margin, fit.
 */
import PDFDocument from "pdfkit";

export interface CvMeta {
  use: "manual" | "auto";
  page: "A4" | "LETTER";
  font: number;
  minFont: number;
  margin: number;
  fit: "one-page" | "flow";
}

export function splitFrontMatter(src: string): { meta: Record<string, string>; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: src };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.replace(/\s+#.*$/, "").match(/^([\w-]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: src.slice(m[0].length) };
}

export function readMeta(raw: Record<string, string>): CvMeta {
  const num = (v: string | undefined, d: number) => (v && Number.isFinite(+v) ? +v : d);
  return {
    use: raw.use === "auto" ? "auto" : "manual",
    page: (raw.page ?? "A4").toUpperCase() === "LETTER" ? "LETTER" : "A4",
    font: num(raw.font, 10),
    minFont: num(raw["min-font"], 8.5),
    margin: num(raw.margin, 28),
    fit: raw.fit === "flow" ? "flow" : "one-page",
  };
}

export interface CvContext {
  name: string;
  title: string;
  contact: { location: string; website: [string, string]; github: [string, string]; phone: string; homeServer: [string, string]; linkedin: [string, string]; email: string };
  experience: { role: string; company: string; start: string; end: string; type: string; bullets: string[] }[];
  education: { degree: string; school: string; start: string; end: string; location?: string }[];
  certifications: { name: string; issuer: string; issued: string; featured: boolean }[];
  skills: Record<string, string[]>;
}

// a literal "|" in site data must not start a new cell
const esc = (s: string) => s.replace(/\|/g, "\\|");
const link = ([label, url]: [string, string]) => `[${esc(label)}](${url})`;

export function expandCv(md: string, c: CvContext): string {
  const gens: Record<string, (arg: string) => string> = {
    name: () => c.name,
    title: () => c.title,
    contact: () =>
      [
        `| :user: ${link(c.contact.website)} | :github: ${link(c.contact.github)} | :phone: ${c.contact.phone} |`,
        `| :home: ${link(c.contact.homeServer)} | :linkedin: ${link(c.contact.linkedin)} | :mail: [${c.contact.email}](mailto:${c.contact.email}) |`,
        `| :map-pin: ${esc(c.contact.location)} | | |`,
      ].join("\n"),
    experience: () =>
      c.experience
        .map((j) => [`| **${esc(j.role)}** | **${esc(j.company)}** | **${j.start} - ${j.end}** | **${esc(j.type)}** |`, ...j.bullets.map((b) => `- ${b}`)].join("\n"))
        .join("\n\n"),
    education: () =>
      c.education
        .map((e) => [`| **${esc(e.degree)}** | **${e.start} - ${e.end}** |`, `| ${esc(e.school)} | ${esc(e.location ?? "")} |`].join("\n"))
        .join("\n"),
    certifications: (arg) =>
      c.certifications
        .filter((x) => arg.trim() === "all" || x.featured)
        .map((x) => `| **${esc(x.name)}**, ${esc(x.issuer)} | ${esc(x.issued)} |`)
        .join("\n"),
    skills: (arg) => {
      const picked = arg.trim() ? arg.split(",").map((s) => s.trim()) : Object.keys(c.skills);
      return picked
        .filter((g) => c.skills[g])
        .map((g) => `**${g}:** ${c.skills[g].join(", ")}`)
        .join("\n");
    },
  };
  return md.replace(/\{\{\s*([\w-]+)\s*(?::([^}]*))?\}\}/g, (whole, key: string, arg?: string) => {
    const g = gens[key];
    if (!g) throw new Error(`CV: unknown placeholder ${whole} (known: ${Object.keys(gens).join(", ")})`);
    return g(arg ?? "");
  });
}

interface Tok {
  text: string;
  bold: boolean;
  link?: string;
  icon?: string; // inner SVG markup (24x24 grid)
  filled?: boolean; // brand marks are filled, the rest stroked
}

// set by buildCvPdf
let resolveIcon: (name: string) => string | undefined = () => undefined;
const FILLED_ICONS = new Set(["github", "linkedin"]);
type Block =
  | { t: "title"; text: string }
  | { t: "h2"; text: string }
  | { t: "row"; cells: string[] }
  | { t: "bullet"; text: string }
  | { t: "line"; text: string }
  | { t: "gap" };

// the built-in PDF fonts only support WinAnsi, so translate or drop anything else
const WIN_EXTRA = new Set([0x2013, 0x2014, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2026, 0x20ac, 0x2122]);
function clean(s: string): string {
  return [...s.replace(/→/g, "->").replace(/←/g, "<-").replace(/[   ]/g, " ").replace(/[‐‑−]/g, "-")]
    .filter((ch) => ch.codePointAt(0)! < 256 || WIN_EXTRA.has(ch.codePointAt(0)!))
    .join("");
}

function parseInline(s: string): Tok[] {
  const out: Tok[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|:([a-z][a-z0-9_-]*):/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ text: s.slice(last, m.index), bold: false });
    if (m[1] !== undefined) for (const t of parseInline(m[1])) out.push({ ...t, bold: true });
    else if (m[4] !== undefined) {
      const svg = resolveIcon(m[4]);
      if (svg) out.push({ text: "", bold: false, icon: svg, filled: FILLED_ICONS.has(m[4]) });
      else out.push({ text: m[0], bold: false }); // not an icon, keep as written
    } else out.push({ text: m[2], bold: false, link: m[3] });
    last = re.lastIndex;
  }
  if (last < s.length) out.push({ text: s.slice(last), bold: false });
  return out.map((t) => ({ ...t, text: clean(t.text) })).filter((t) => t.text || t.icon);
}

function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      if (blocks.length && blocks[blocks.length - 1].t !== "gap") blocks.push({ t: "gap" });
    } else if (line.startsWith("## ")) blocks.push({ t: "h2", text: line.slice(3) });
    else if (line.startsWith("# ")) blocks.push({ t: "title", text: line.slice(2) });
    else if (line.startsWith("|")) {
      if (/^\|[\s:|-]+\|?$/.test(line)) continue; // table separator row
      blocks.push({ t: "row", cells: line.replace(/^\||(?<!\\)\|$/g, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|")) });
    } else if (/^[-*] /.test(line)) blocks.push({ t: "bullet", text: line.slice(2) });
    else blocks.push({ t: "line", text: line });
  }
  return blocks;
}

const REG = "Helvetica";
const BOLD = "Helvetica-Bold";

function draw(doc: PDFKit.PDFDocument, blocks: Block[], fs: number, margin: number) {
  const L = margin;
  const W = doc.page.width - 2 * margin;
  const bottom = () => doc.page.height - margin;
  let y = margin;
  const lh = fs * 1.22;
  const font = (t: Tok) => doc.font(t.bold ? BOLD : REG).fontSize(fs);
  const ensure = (h: number) => {
    if (y + h > bottom()) {
      doc.addPage();
      y = margin;
    }
  };
  const iconSize = fs * 1.0;
  const iconGap = fs * 0.4;
  const widthOf = (toks: Tok[]) => toks.reduce((n, t) => n + (t.icon ? iconSize + iconGap : font(t).widthOfString(t.text)), 0);

  const drawIcon = (t: Tok, x: number) => {
    const iy = y + fs * 0.55 - iconSize / 2;
    doc.save().translate(x, iy).scale(iconSize / 24);
    if (t.filled) doc.fillColor("black");
    else doc.lineWidth(2).lineCap("round").lineJoin("round").strokeColor("black");
    const done = () => (t.filled ? doc.fill("black", "even-odd") : doc.stroke());
    for (const m of t.icon!.matchAll(/<(\w+)\s+([^>]*?)\/?>/g)) {
      const a: Record<string, string> = {};
      for (const kv of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) a[kv[1]] = kv[2];
      const n = (k: string) => parseFloat(a[k] ?? "0");
      const pts = () => (a.points ?? "").trim().split(/[\s,]+/).map(Number);
      if (m[1] === "path") doc.path(a.d);
      else if (m[1] === "circle") doc.circle(n("cx"), n("cy"), n("r"));
      else if (m[1] === "rect") doc.roundedRect(n("x"), n("y"), n("width"), n("height"), n("rx"));
      else if (m[1] === "line") doc.moveTo(n("x1"), n("y1")).lineTo(n("x2"), n("y2"));
      else if (m[1] === "polyline" || m[1] === "polygon") {
        const p = pts();
        doc.moveTo(p[0], p[1]);
        for (let i = 2; i < p.length; i += 2) doc.lineTo(p[i], p[i + 1]);
        if (m[1] === "polygon") doc.closePath();
      } else continue;
      done();
    }
    doc.restore();
  };

  const run = (toks: Tok[], x: number) => {
    for (const t of toks) {
      if (t.icon) {
        drawIcon(t, x);
        x += iconSize + iconGap;
        continue;
      }
      font(t);
      const w = doc.widthOfString(t.text);
      doc.fillColor("black").text(t.text, x, y, { lineBreak: false, link: t.link, underline: false });
      x += w;
    }
  };
  const wrapped = (toks: Tok[], x: number, width: number) => {
    ensure(lh);
    toks = toks.filter((t) => !t.icon); // icons only in aligned rows
    toks.forEach((t, i) => {
      font(t);
      doc.fillColor("black");
      const o = { width, continued: i < toks.length - 1, link: t.link, underline: false, lineGap: fs * 0.1 };
      if (i === 0) doc.text(t.text, x, y, o);
      else doc.text(t.text, o);
    });
    y = doc.y;
  };

  // contact block: middle cells of consecutive 3-cell rows share a left edge so icons line up
  const midLeft = new Map<Block, number>();
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.t !== "row" || b.cells.length !== 3 || midLeft.has(b)) continue;
    const group: Block[] = [];
    for (let j = i; j < blocks.length; j++) {
      const r = blocks[j];
      if (r.t === "row" && r.cells.length === 3) group.push(r);
      else break;
    }
    const widest = Math.max(...group.map((r) => widthOf(parseInline((r as { cells: string[] }).cells[1]))));
    for (const r of group) midLeft.set(r, L + W / 2 - widest / 2);
  }

  for (const b of blocks) {
    if (b.t === "gap") {
      y += fs * 0.45;
    } else if (b.t === "title") {
      ensure(fs * 3);
      doc.font(BOLD).fontSize(fs * 2.1).fillColor("black");
      doc.text(clean(b.text), L, y, { width: W, align: "center", characterSpacing: fs * 0.22, lineBreak: false });
      y += fs * 2.1 * 1.25;
      doc.moveTo(L, y).lineTo(L + W, y).lineWidth(0.6).strokeColor("black").stroke();
      y += fs * 0.45;
    } else if (b.t === "h2") {
      ensure(fs * 3);
      y += fs * 0.5;
      doc.font(BOLD).fontSize(fs * 1.3).fillColor("black");
      doc.text(clean(b.text), L, y, { lineBreak: false });
      y += fs * 1.3 * 1.15;
      doc.moveTo(L, y).lineTo(L + W, y).lineWidth(0.6).strokeColor("black").stroke();
      y += fs * 0.3;
    } else if (b.t === "row") {
      ensure(lh);
      const cells = b.cells.map(parseInline);
      const n = cells.length;
      cells.forEach((toks, i) => {
        const w = widthOf(toks);
        let x: number;
        if (i === 0) x = L;
        else if (i === n - 1) x = L + W - w;
        else if (n === 3) x = midLeft.get(b) ?? L + W / 2 - w / 2;
        else if (n === 4) x = i === 1 ? L + W * 0.31 : L + W * 0.67 - w / 2;
        else x = L + (W * i) / (n - 1) - w / 2;
        run(toks, x);
      });
      y += lh;
    } else if (b.t === "bullet") {
      ensure(lh);
      doc.font(REG).fontSize(fs).fillColor("black").text("•", L + 3, y, { lineBreak: false });
      wrapped(parseInline(b.text), L + 13, W - 13);
    } else {
      wrapped(parseInline(b.text), L, W);
    }
  }
}

function make(blocks: Block[], fs: number, meta: CvMeta, info: { title: string; author: string }): Promise<{ buf: Buffer; pages: number }> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: meta.page, margin: meta.margin, info: { Title: info.title, Author: info.author } });
    const chunks: Buffer[] = [];
    let pages = 1;
    doc.on("pageAdded", () => pages++);
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve({ buf: Buffer.concat(chunks), pages }));
    doc.on("error", reject);
    draw(doc, blocks, fs, meta.margin);
    doc.end();
  });
}

// shrinks the font in 0.25 steps until it fits one page
export async function buildCvPdf(expanded: string, meta: CvMeta, info: { title: string; author: string }, icons: (name: string) => string | undefined = () => undefined): Promise<{ pdf: Buffer; fontSize: number; pages: number }> {
  resolveIcon = icons;
  const blocks = parseBlocks(expanded);
  let fs = meta.font;
  let out = await make(blocks, fs, meta, info);
  if (meta.fit === "one-page") {
    while (out.pages > 1 && fs - 0.25 >= meta.minFont - 1e-9) {
      fs -= 0.25;
      out = await make(blocks, fs, meta, info);
    }
  }
  return { pdf: out.buf, fontSize: fs, pages: out.pages };
}
