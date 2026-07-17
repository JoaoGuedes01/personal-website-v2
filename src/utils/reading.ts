// Estimate reading time from a raw markdown string.
// ~200 words/minute; strips code fences and markdown punctuation for a fairer count.
export function readingTime(body: string | undefined | null): { minutes: number; label: string } {
  const text = (body ?? "")
    .replace(/```[\s\S]*?```/g, " ") // drop fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/[#>*_~\-\[\]\(\)!]/g, " "); // markdown punctuation
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { minutes, label: `${minutes} min read` };
}
