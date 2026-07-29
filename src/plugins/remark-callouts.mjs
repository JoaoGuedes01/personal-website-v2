/**
 * remark-callouts — turn `:::type[Title] … :::` container directives into
 * styled callout markup.
 * -------------------------------------------------------------------------
 * Runs after `remark-directive` (which parses the `:::` syntax into
 * `containerDirective` nodes). For every directive whose name is a known
 * callout type (see src/data/callouts.mjs), it:
 *   1. turns the container into  <aside class="callout callout-<type>" role="note">
 *   2. prepends a header with the type icon + a title
 *      (the `[Title]` label, or the type's default label)
 * The body keeps flowing through markdown, so links, code, lists, images and
 * even nested callouts inside a callout all render normally.
 *
 * Authoring:
 *   :::warning[Demo Offline]
 *   The live demo is currently down.
 *   :::
 *
 *   :::info            ← no [Title] → uses the default label ("Info")
 *   Heads up about something.
 *   :::
 *
 * Registered in astro.config.mjs → markdown.remarkPlugins.
 */
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { CALLOUTS, resolveType, resolveColor } from "../data/callouts.mjs";

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ESCAPES[c]);

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;

      const type = resolveType(node.name);
      if (!type) return; // leave unknown directives untouched
      const def = CALLOUTS[type];

      // Pull the optional title out of the directive label (`[Title]`), which
      // remark-directive parses as a leading child flagged `directiveLabel`.
      let title = def.label;
      const labelIndex = node.children.findIndex(
        (child) => child.data && child.data.directiveLabel,
      );
      if (labelIndex !== -1) {
        const text = toString(node.children[labelIndex]).trim();
        if (text) title = text;
        node.children.splice(labelIndex, 1); // consumed — don't render twice
      }

      // The container itself becomes the <aside> wrapper.
      node.data = node.data || {};
      node.data.hName = "aside";
      node.data.hProperties = {
        className: ["callout", `callout-${type}`],
        role: "note",
      };

      // Optional one-off recolour: `:::warning{color=accent}` or `{color=#e4b96b}`.
      const custom = resolveColor(node.attributes && node.attributes.color);
      if (custom) node.data.hProperties.style = `--cc: ${custom}`;

      // Icon + title header, injected as raw HTML (Astro renders HTML in md).
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
