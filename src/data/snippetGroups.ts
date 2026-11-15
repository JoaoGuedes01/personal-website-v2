// Optional display metadata (label/icon/blurb) for snippet groups and subgroups. Which group a
// snippet is in comes from its folder (see snippetPath in ./taxonomy), not frontmatter.
// A category missing here renders as a flat list, and groups missing here get a title-cased label
// and a generic blurb.
import type { Taxon } from "./taxonomy";
import { titleizeSlug } from "./taxonomy";

export interface SnippetGroup extends Taxon {
  subgroups?: Taxon[];
}

export const SNIPPET_GROUPS: Record<string, SnippetGroup[]> = {
  cybersecurity: [
    {
      label: "Enumeration and Recon",
      slug: "enumeration-recon",
      icon: "search",
      blurb:
        "Active scanning, passive intelligence gathering, and target enumeration.",
    },
    {
      label: "Exploitation",
      slug: "exploitation",
      icon: "bug",
      blurb: "Using known CVEs and vulnerabilities for footholding, escalating and persistence.",
      subgroups: [
        {
          label: "Remote Service Exploitation",
          slug: "remote-service-exploitation",
          icon: "server",
          blurb: "Service specific exploits like SMB, RDP, web, mail that hand over a shell.",
        },
        {
          label: "Privilege Escalation",
          slug: "privilege-escalation",
          icon: "chevrons-up",
          blurb: "Going from a low privilege shell and foothold to root or SYSTEM accounts.",
        },
        {
          label: "Post-Exploitation and Persistence",
          slug: "post-exploitation-persistence",
          icon: "anchor",
          blurb: "Post exploitation steps like session persistence, credential dumps and pivoting.",
        },
      ],
    },
    {
      label: "Tools",
      slug: "tools",
      icon: "wrench",
      blurb: "Cheat sheets for the various tools across the pentesting lifecycle.",
      subgroups: [
        {
          label: "Scanning and Enumeration Tools",
          slug: "scanning-enumeration-tools",
          icon: "scan",
          blurb: "Port scanners, fuzzers, and enumeration utilities for mapping services and content.",
        },
        {
          label: "Exploitation and Post-Exploitation Frameworks",
          slug: "exploitation-frameworks",
          icon: "bug",
          blurb: "Metasploit-like tools for running exploits, generating payloads, and working a session.",
        },
        {
          label: "Credential Attack Tools",
          slug: "credential-attack-tools",
          icon: "key-round",
          blurb: "Dumping and cracking passwords and hashes.",
        },
        {
          label: "Remote Access and Networking Utilities",
          slug: "remote-access-networking-utilities",
          icon: "ethernet-port",
          blurb: "Getting a shell, a share, or a session on LAN.",
        },
      ],
    },
    {
      label: "Extras",
      slug: "extras",
      icon: "gift",
      blurb: "Some extra goodies from my studying.",
    },
  ],
};

const bySlug = (list: Taxon[], slug: string) => list.find((t) => t.slug === slug);

// empty if the category renders flat
export function snippetGroupsForCategory(categorySlug: string): SnippetGroup[] {
  return SNIPPET_GROUPS[categorySlug] ?? [];
}

// falls back to a generated entry if the group isn't curated above
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

// same fallback as snippetGroupInfo
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

// Sort helpers: curated entries keep their declared order, anything else sorts after, alphabetically.
export function curatedGroupIndex(categorySlug: string, groupSlug: string): number {
  const i = snippetGroupsForCategory(categorySlug).findIndex((g) => g.slug === groupSlug);
  return i === -1 ? Infinity : i;
}

export function curatedSubgroupIndex(categorySlug: string, groupSlug: string, subgroupSlug: string): number {
  const i = (snippetGroupInfo(categorySlug, groupSlug).subgroups ?? []).findIndex((t) => t.slug === subgroupSlug);
  return i === -1 ? Infinity : i;
}
