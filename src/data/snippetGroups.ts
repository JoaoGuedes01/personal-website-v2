// ---------------------------------------------------------------------------
// SNIPPET GROUPS
//
// A topical layer BELOW category: group, and optionally subgroup within a
// group. Unlike category, group/subgroup are never read from frontmatter —
// they're derived from where a snippet's file lives on disk (see
// snippetPath() in ./taxonomy). This map only supplies DISPLAY metadata
// (label/icon/blurb) for group/subgroup slugs that are worth curating.
//
// A category absent from this map renders as a flat list (no group cards) —
// same for a group with no `subgroups` entry. A group/subgroup slug that
// exists on disk but isn't listed here still works fine: snippetGroupInfo()/
// snippetSubgroupInfo() fall back to a title-cased label and a generic blurb.
// ---------------------------------------------------------------------------
import type { Taxon } from "./taxonomy";
import { titleizeSlug } from "./taxonomy";

export interface SnippetGroup extends Taxon {
  subgroups?: Taxon[];
}

export const SNIPPET_GROUPS: Record<string, SnippetGroup[]> = {
  cybersecurity: [
    {
      label: "Enumeration & Recon",
      slug: "enumeration-recon",
      icon: "search",
      blurb:
        "Finding out what's actually running before you touch it — service enumeration, OSINT, and mapping the attack surface.",
    },
    {
      label: "Exploitation",
      slug: "exploitation",
      icon: "target",
      blurb: "Turning a known weakness into access — CVEs, privilege escalation, and what to do once you're in.",
      subgroups: [
        {
          label: "Remote Service Exploitation",
          slug: "remote-service-exploitation",
          icon: "server",
          blurb: "CVE-driven and service-specific exploits — SMB, RDP, web, mail — that hand over a shell.",
        },
        {
          label: "Privilege Escalation",
          slug: "privilege-escalation",
          icon: "arrow-up-right",
          blurb: "Going from a low-priv shell to root or SYSTEM on Linux and Windows.",
        },
        {
          label: "Post-Exploitation & Persistence",
          slug: "post-exploitation-persistence",
          icon: "workflow",
          blurb: "What comes after the shell — dumping creds, pivoting, and staying in.",
        },
      ],
    },
    {
      label: "Tools",
      slug: "tools",
      icon: "wrench",
      blurb: "Cheat sheets for the scanners, frameworks, and crackers that do the heavy lifting.",
      subgroups: [
        {
          label: "Scanning & Enumeration Tools",
          slug: "scanning-enumeration-tools",
          icon: "search",
          blurb: "Port scanners, fuzzers, and enumeration utilities for mapping services and content.",
        },
        {
          label: "Exploitation & Post-Exploitation Frameworks",
          slug: "exploitation-frameworks",
          icon: "terminal",
          blurb: "Metasploit and friends — running exploits, generating payloads, and working a session.",
        },
        {
          label: "Credential Attack Tools",
          slug: "credential-attack-tools",
          icon: "key",
          blurb: "Cracking and dumping passwords and hashes, offline and on.",
        },
        {
          label: "Remote Access & Networking Utilities",
          slug: "remote-access-networking-utilities",
          icon: "link",
          blurb: "Getting a shell, a share, or a session onto the wire.",
        },
      ],
    },
  ],
};

const bySlug = (list: Taxon[], slug: string) => list.find((t) => t.slug === slug);

/** Groups defined for a category slug (empty if the category renders flat). */
export function snippetGroupsForCategory(categorySlug: string): SnippetGroup[] {
  return SNIPPET_GROUPS[categorySlug] ?? [];
}

/** A group's metadata, falling back to a synthesized one if not curated above. */
export function snippetGroupInfo(categorySlug: string, groupSlug: string): SnippetGroup {
  return (
    bySlug(snippetGroupsForCategory(categorySlug), groupSlug) ?? {
      label: titleizeSlug(groupSlug),
      slug: groupSlug,
      icon: "folder",
      blurb: `Snippets filed under ${titleizeSlug(groupSlug)}.`,
    }
  );
}

/** A subgroup's metadata within a group, with the same fallback behaviour. */
export function snippetSubgroupInfo(categorySlug: string, groupSlug: string, subgroupSlug: string): Taxon {
  const group = snippetGroupInfo(categorySlug, groupSlug);
  return (
    bySlug(group.subgroups ?? [], subgroupSlug) ?? {
      label: titleizeSlug(subgroupSlug),
      slug: subgroupSlug,
      icon: "folder",
      blurb: `Snippets filed under ${titleizeSlug(subgroupSlug)}.`,
    }
  );
}

/**
 * Sort helpers: curated groups/subgroups keep their declared order (curated
 * order expresses intentional priority — e.g. lead with the most-used one);
 * anything found on disk without curated metadata sorts after, alphabetically.
 */
export function curatedGroupIndex(categorySlug: string, groupSlug: string): number {
  const i = snippetGroupsForCategory(categorySlug).findIndex((g) => g.slug === groupSlug);
  return i === -1 ? Infinity : i;
}

export function curatedSubgroupIndex(categorySlug: string, groupSlug: string, subgroupSlug: string): number {
  const i = (snippetGroupInfo(categorySlug, groupSlug).subgroups ?? []).findIndex((t) => t.slug === subgroupSlug);
  return i === -1 ? Infinity : i;
}
