// Turns `:::type[Title]` container directives (parsed by remark-directive) into
// <aside class="callout callout-<type>">. Types live in src/data/callouts.mjs.
// No [Title] falls back to the type's default label.
import { visit, SKIP } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { CALLOUTS, resolveType, resolveColor } from "../data/callouts.mjs";

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ESCAPES[c]);

// remark-directive also reads stray `:word` as a text directive (the ":00" in 08:00 or "10:30"
// vanishes) and `::word` as a leaf directive. Only `:::` containers are callouts, so write
// anything else back as the text it was.
function directiveSource(node) {
  const marker = node.type === "textDirective" ? ":" : "::";
  const label = node.children && node.children.length ? `[${toString(node)}]` : "";
  const attrs = Object.entries(node.attributes || {}).map(([k, v]) => (v === "" ? k : `${k}=${v}`));
  return marker + node.name + label + (attrs.length ? `{${attrs.join(" ")}}` : "");
}

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if ((node.type === "textDirective" || node.type === "leafDirective") && parent && index != null) {
        const text = { type: "text", value: directiveSource(node) };
        parent.children[index] = node.type === "leafDirective" ? { type: "paragraph", children: [text] } : text;
        return [SKIP, index + 1];
      }
      if (node.type !== "containerDirective") return;

      const type = resolveType(node.name);
      if (!type) return; // unknown directive, leave it alone
      const def = CALLOUTS[type];

      // remark-directive parses [Title] as a leading child flagged directiveLabel
      let title = def.label;
      const labelIndex = node.children.findIndex(
        (child) => child.data && child.data.directiveLabel,
      );
      if (labelIndex !== -1) {
        const text = toString(node.children[labelIndex]).trim();
        if (text) title = text;
        node.children.splice(labelIndex, 1); // consumed, don't render it twice
      }

      node.data = node.data || {};
      node.data.hName = "aside";
      node.data.hProperties = {
        className: ["callout", `callout-${type}`],
        role: "note",
      };

      // one-off recolour: `:::warning{color=accent}` or `{color=#e4b96b}`
      const custom = resolveColor(node.attributes && node.attributes.color);
      if (custom) node.data.hProperties.style = `--cc: ${custom}`;

      const header = {
        type: "html",
        value:
          '<div class="callout__header">' +
          '<svg class="callout__icon" viewBox="0 0 24 24" fill="none" ' +
          'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
          `stroke-linejoin="round" aria-hidden="true">${def.icon}</svg>` +
          `<span class="callout__title">${escapeHtml(title)}</span>` +
          "</div>",
      };
      node.children.unshift(header);
    });
  };
}
