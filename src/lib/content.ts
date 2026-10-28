/**
 * All site copy and data lives here so it can be edited without touching
 * layout code. Swap placeholder values (marked TODO) as real details arrive.
 */

export const site = {
  name: "Forward Creative Inc.",
  shortName: "FORWARD.",
  tagline: "Creative that moves you forward.",
  description:
    "Forward Creative is an independent creative studio building brands, websites, and digital experiences that turn ambitious ideas into meaningful growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://forwardcreative.co", // TODO: real domain
  email: "hello@forwardcreative.co", // TODO: real inbox
  social: {
    instagram: "https://www.instagram.com/", // TODO: real profile
    linkedin: "https://www.linkedin.com/", // TODO: real profile
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
] as const;

export type Service = {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "Brand Identity & Strategy",
    summary:
      "Brand positioning, visual identity, art direction, messaging, and complete brand systems.",
    deliverables: [
      "Positioning",
      "Naming & messaging",
      "Logo & identity",
      "Art direction",
      "Brand guidelines",
    ],
  },
  {
    number: "02",
    title: "Websites & Digital Experiences",
    summary:
      "Custom websites, landing pages, e-commerce experiences, UI/UX, and conversion-focused development.",
    deliverables: [
      "Marketing sites",
      "Landing pages",
      "E-commerce",
      "UI / UX design",
      "Development",
    ],
  },
  {
    number: "03",
    title: "Creative & Content",
    summary:
      "Campaign creative, social media assets, product visuals, digital storytelling, and advertising content.",
    deliverables: [
      "Campaigns",
      "Social content",
      "Product visuals",
      "Storytelling",
      "Ad creative",
    ],
  },
  {
    number: "04",
    title: "Growth & Performance",
    summary:
      "Conversion optimization, paid advertising creative, funnel development, and digital growth strategy.",
    deliverables: [
      "CRO",
      "Paid creative",
      "Funnels",
      "Growth strategy",
      "Testing roadmaps",
    ],
  },
];

/**
 * Portfolio entries.
 *
 * `status` controls the label shown on each card:
 *   - "concept"  → self-initiated concept work, clearly labelled as such
 *   - "founder"  → a brand associated with the founder (not client work)
 *   - "client"   → real, completed client work (add when available)
 *
 * To add real work: set status "client", add an `image` (put the file in
 * /public/work/), and fill in the services actually delivered.
 */
export type ProjectStatus = "concept" | "founder" | "client";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  services: string[];
  year: string;
  status: ProjectStatus;
  /** Optional photo/render in /public. Falls back to a generated art panel. */
  image?: string;
  /** Visual theme for the generated art panel. */
  art: { bg: string; fg: string; accent: string; motif: "arrow" | "grid" | "stack" | "orbit" | "type" };
  summary: string;
  /** Layout hint for the asymmetric grid. */
  size: "lg" | "md" | "sm";
};

export const projects: Project[] = [
  {
    slug: "thumos",
    title: "THUMOS",
    industry: "Consumer brand", // TODO: confirm category
    services: ["Founder's own brand"],
    year: "Existing brand",
    status: "founder",
    art: { bg: "#111111", fg: "#F2F0EB", accent: "#D9FF43", motif: "type" },
    summary:
      "THUMOS is an existing brand associated with Forward Creative's founder. It is shown here for context only — it is not presented as Forward Creative client work.",
    size: "lg",
  },
  {
    slug: "northline",
    title: "Northline",
    industry: "Outdoor / E-commerce",
    services: ["Identity", "E-commerce", "Art direction"],
    year: "2026",
    status: "concept",
    art: { bg: "#D9FF43", fg: "#111111", accent: "#111111", motif: "arrow" },
    summary:
      "A self-initiated concept exploring how a direct-to-consumer outdoor label could use a single directional mark across product, packaging, and storefront.",
    size: "md",
  },
  {
    slug: "atlas-health",
    title: "Atlas Health",
    industry: "Health / Startup",
    services: ["Strategy", "Website", "UI / UX"],
    year: "2026",
    status: "concept",
    art: { bg: "#F2F0EB", fg: "#111111", accent: "#858585", motif: "grid" },
    summary:
      "A concept identity and product site for a preventative-health startup — calm, clinical clarity with a modular grid that scales from app to campaign.",
    size: "md",
  },
  {
    slug: "kinetic-studio",
    title: "Kinetic",
    industry: "Fitness / Hospitality",
    services: ["Campaign", "Social", "Motion"],
    year: "2026",
    status: "concept",
    art: { bg: "#1C1C1C", fg: "#D9FF43", accent: "#F2F0EB", motif: "stack" },
    summary:
      "A launch campaign concept for a boutique training studio, built around stacked, accelerating type that turns momentum into a visual language.",
    size: "lg",
  },
  {
    slug: "halo-coffee",
    title: "Halo Coffee",
    industry: "Food & Beverage",
    services: ["Packaging", "Identity", "Content"],
    year: "2026",
    status: "concept",
    art: { bg: "#E6E3DC", fg: "#111111", accent: "#D9FF43", motif: "orbit" },
    summary:
      "A packaging and identity concept for a specialty roaster, pairing a circular mark with editorial typography for shelf and social.",
    size: "sm",
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  concept: "Concept",
  founder: "Founder's brand · Not client work",
  client: "Client work",
};

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "Understand the brand, audience, opportunity, and objectives.",
  },
  {
    number: "02",
    title: "Define",
    body: "Develop a clear creative direction and strategic foundation.",
  },
  {
    number: "03",
    title: "Create",
    body: "Design and build experiences that communicate with purpose.",
  },
  {
    number: "04",
    title: "Launch",
    body: "Deploy, measure, refine, and improve.",
  },
] as const;

export const budgetOptions = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;
