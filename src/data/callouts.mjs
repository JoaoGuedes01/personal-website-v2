// Callout types, shared by src/plugins/remark-callouts.mjs and src/components/Callout.astro.
// label: default heading when the author leaves out [Title].
// icon: inner markup of a 24x24 lucide stroke icon.
// Colours live in global.css as `.callout-<type> { --cc: ... }`.
// To add a type: add an entry here and a matching colour rule there. For an alias, add it to ALIASES.
export const CALLOUTS = {
  note: {
    label: "Note",
    icon: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  },
  info: {
    label: "Info",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  },
  tip: {
    label: "Tip",
    icon: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  },
  success: {
    label: "Success",
    icon: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  },
  warning: {
    label: "Warning",
    icon: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  },
  danger: {
    label: "Caution",
    icon: '<path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/>',
  },
  important: {
    label: "Important",
    icon: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  },
  security: {
    label: "Security",
    icon: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  },
  quote: {
    label: "Quote",
    icon: '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M4 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>',
  },
};

// alternate spellings of the types above
export const ALIASES = {
  caution: "danger",
  error: "danger",
  attention: "warning",
  warn: "warning",
  hint: "tip",
  information: "info",
  quotation: "quote",
};

export function resolveType(name) {
  if (!name) return null;
  const key = String(name).toLowerCase();
  if (key in CALLOUTS) return key;
  if (key in ALIASES) return ALIASES[key];
  return null;
}

// daisyUI colour tokens allowed in a callout's `color` override
const TOKENS = new Set([
  "primary", "secondary", "accent", "neutral",
  "info", "success", "warning", "error", "base-content",
]);

// `color` override for the --cc variable. Takes a daisyUI token name ("accent") or any raw CSS colour.
// Returns null if nothing was given.
export function resolveColor(value) {
  if (!value) return null;
  const v = String(value).trim();
  return TOKENS.has(v) ? `var(--color-${v})` : v;
}
