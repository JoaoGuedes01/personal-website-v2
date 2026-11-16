// Draws the branded share card (1200x630 PNG). The text is converted to vector paths with
// opentype.js and rendered by sharp, so it does not depend on fonts installed on the machine
// and looks the same locally and in CI. Fonts: src/assets/fonts (Geist, OFL).
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const W = 1200;
const H = 630;
const PAD = 72;
const COLORS = { bg: "#0a1320", line: "#1d2d42", text: "#e8eef8", muted: "#8aa0bd", accent: "#6aa6ff" };

function loadFont(file: string) {
  const buf = fs.readFileSync(path.join(process.cwd(), "src/assets/fonts", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
let fonts: { bold: opentype.Font; medium: opentype.Font; mono: opentype.Font } | undefined;
const getFonts = () => (fonts ??= { bold: loadFont("Geist-Bold.ttf"), medium: loadFont("Geist-Medium.ttf"), mono: loadFont("GeistMono-Medium.ttf") });

/** Greedy word wrap by measured width. A single word wider than the line is split by characters. */
function wrap(font: opentype.Font, text: string, size: number, maxWidth: number): string[] {
  const width = (s: string) => font.getAdvanceWidth(s, size);
  const lines: string[] = [];
  let cur = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const test = cur ? `${cur} ${word}` : word;
    if (width(test) <= maxWidth) {
      cur = test;
      continue;
    }
    if (cur) lines.push(cur);
    cur = "";
    let chunk = "";
    for (const ch of word) {
      if (width(chunk + ch) > maxWidth && chunk) {
        lines.push(chunk);
        chunk = "";
      }
      chunk += ch;
    }
    cur = chunk;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Cut the last line so that, with an ellipsis, it still fits. */
function ellipsize(font: opentype.Font, line: string, size: number, maxWidth: number): string {
  let s = line;
  while (s.length > 1 && font.getAdvanceWidth(`${s}…`, size) > maxWidth) s = s.slice(0, -1);
  return `${s.trimEnd()}…`;
}

const textPath = (font: opentype.Font, text: string, x: number, baseline: number, size: number, fill: string) =>
  `<path d="${font.getPath(text, x, baseline, size).toPathData(1)}" fill="${fill}"/>`;

export interface CardInput {
  title: string;
  kicker: string; // small line above the title, e.g. "Snippet · Cybersecurity"
  subtitle?: string; // optional description under the title
}

export async function renderCard({ title, kicker, subtitle }: CardInput): Promise<Buffer> {
  const { bold, medium, mono } = getFonts();
  const maxWidth = W - PAD * 2;
  const parts: string[] = [];

  parts.push(textPath(mono, kicker, PAD, 112, 26, COLORS.accent));

  // biggest title size that fits in 3 lines (4 for the smaller sizes)
  let size = 40;
  let lines: string[] = [];
  for (const s of [76, 68, 60, 52, 46, 40]) {
    const l = wrap(bold, title, s, maxWidth);
    if (l.length <= (s >= 60 ? 3 : 4) || s === 40) {
      size = s;
      lines = l;
      break;
    }
  }
  const maxLines = size >= 60 ? 3 : 4;
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] = ellipsize(bold, lines[maxLines - 1], size, maxWidth);
  }
  const lead = size * 1.12;
  const top = 168;
  lines.forEach((line, i) => parts.push(textPath(bold, line, PAD, top + size * 0.88 + i * lead, size, COLORS.text)));
  const titleEnd = top + size * 0.88 + (lines.length - 1) * lead;

  if (subtitle) {
    const sub = wrap(medium, subtitle, 30, maxWidth);
    const room = Math.floor((H - PAD - 100 - (titleEnd + 36)) / 42);
    const shown = sub.slice(0, Math.max(0, Math.min(2, room)));
    if (shown.length && sub.length > shown.length) shown[shown.length - 1] = ellipsize(medium, shown[shown.length - 1], 30, maxWidth);
    shown.forEach((line, i) => parts.push(textPath(medium, line, PAD, titleEnd + 52 + i * 42, 30, COLORS.muted)));
  }

  // footer: logo, name, domain
  const footerTop = H - PAD - 60;
  parts.push(`<rect x="${PAD}" y="${footerTop - 28}" width="${maxWidth}" height="1" fill="${COLORS.line}"/>`);
  parts.push(textPath(bold, "João Guedes", PAD + 60 + 20, footerTop + 41, 30, COLORS.text));
  const domain = "joaoguedes.net";
  const dw = mono.getAdvanceWidth(domain, 26);
  parts.push(textPath(mono, domain, W - PAD - dw, footerTop + 40, 26, COLORS.accent));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><radialGradient id="glow" cx="0.88" cy="0.05" r="0.75"><stop offset="0" stop-color="${COLORS.accent}" stop-opacity="0.22"/><stop offset="1" stop-color="${COLORS.accent}" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="${COLORS.bg}"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
${parts.join("\n")}
</svg>`;

  const logo = await sharp(path.join(process.cwd(), "public/logo.svg")).resize(60, 60).png().toBuffer();
  return sharp(Buffer.from(svg))
    .composite([{ input: logo, left: PAD, top: footerTop }])
    .png({ palette: true, quality: 90, compressionLevel: 9 })
    .toBuffer();
}
