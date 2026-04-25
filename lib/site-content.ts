export const siteConfig = {
  name: "Hikmatyar",
  title: "Hikmatyar - Brand Identity Designer",
  siteUrl: "https://yourdomain.com",
  description:
    "Brand identity designer based in Peshawar, PK. I build visual systems and strategies that help businesses grow.",
  email: "hello@yourdomain.com",
  instagram: "@hikmatyar"
} as const;

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  excerpt: string;
  client: string;
  industry: string;
  scope: string[];
  problem: string;
  approach: string[];
  results: string[];
};

export const projects: Project[] = [
  {
    slug: "atlas-house",
    title: "Atlas House",
    category: "Brand Identity",
    year: "2025",
    image: "/images/work/atlas-house.svg",
    excerpt: "A sharper hospitality identity designed to feel architectural, premium, and hard to forget.",
    client: "Atlas House",
    industry: "Hospitality",
    scope: ["Identity", "Strategy", "Launch Assets"],
    problem:
      "Atlas House looked established in service, but not in perception. The brand needed to signal confidence before the first conversation.",
    approach: [
      "Clarify the brand's premium positioning around restraint and permanence.",
      "Build a tighter mark and editorial system that carries across print and digital touchpoints.",
      "Translate the identity into launch assets that feel considered, not decorative."
    ],
    results: [
      "Clearer visual recall in a crowded category.",
      "A stronger first impression for prospects and partners.",
      "A reusable system that scales beyond the initial rollout."
    ]
  },
  {
    slug: "northline",
    title: "Northline",
    category: "Strategy",
    year: "2024",
    image: "/images/work/northline.svg",
    excerpt: "A positioning-led identity refresh for a business that needed its message and market fit to land faster.",
    client: "Northline",
    industry: "Consulting",
    scope: ["Positioning", "Messaging", "Identity"],
    problem:
      "Northline had expertise, but its communication felt generic. The gap was not capability. It was perception and clarity.",
    approach: [
      "Tighten the offer around one core market promise.",
      "Reduce visual noise and make the system feel directional.",
      "Link the new identity to sales-facing touchpoints so the strategy shows up in practice."
    ],
    results: [
      "Sharper category positioning.",
      "Improved message consistency across brand surfaces.",
      "A clearer visual hierarchy for presentations and proposals."
    ]
  },
  {
    slug: "cinder-labs",
    title: "Cinder Labs",
    category: "Visual System",
    year: "2024",
    image: "/images/work/cinder-labs.svg",
    excerpt: "A modular visual system for a product-facing brand that needed energy without chaos.",
    client: "Cinder Labs",
    industry: "Technology",
    scope: ["Visual System", "Art Direction", "Brand Assets"],
    problem:
      "Cinder Labs needed a system that could move fast across product and marketing without losing coherence.",
    approach: [
      "Define a system of repeatable visual building blocks rather than one-off hero moments.",
      "Use contrast and motion cues to keep the brand feeling active.",
      "Prioritize reuse so the brand stays sharp under production pressure."
    ],
    results: [
      "A faster asset-production workflow.",
      "More consistency across launch materials.",
      "A brand system that feels energetic without becoming noisy."
    ]
  }
];

export const socialLinks = [
  { href: "https://www.behance.net/", label: "Behance" },
  { href: "https://dribbble.com/", label: "Dribbble" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://www.instagram.com/", label: "Instagram" }
] as const;

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return undefined;
  }

  return projects[(index + 1) % projects.length];
}
