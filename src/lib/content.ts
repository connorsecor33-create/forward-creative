/**
 * All site copy and data lives here so it can be edited without touching
 * layout code. Swap placeholder values (marked TODO) as real details arrive.
 */

export const site = {
  name: "Forward Theory",
  shortName: "Forward Theory",
  tagline: "Creative that moves you forward.",
  description:
    "Forward Theory is an independent creative studio building brands, websites, and digital experiences that turn ambitious ideas into meaningful growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://forwardtheory.co", // TODO: real domain
  email: "connor@forwardtheory.co",
  social: {
    instagram: "https://www.instagram.com/", // TODO: real profile
    linkedin: "https://www.linkedin.com/", // TODO: real profile
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/#studio" },
  { label: "Founder", href: "/founder" },
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
  art: { bg: string; fg: string; accent: string; motif: "bars" | "grid" | "stack" | "orbit" | "type" };
  summary: string;
  /** Layout hint for the asymmetric grid. */
  size: "lg" | "md" | "sm";
};

export const projects: Project[] = [
  {
    slug: "thumos",
    title: "THUMOS",
    industry: "Wellness / Supplements",
    services: ["Founder's own brand"],
    year: "Existing brand",
    status: "founder",
    art: { bg: "#111111", fg: "#F2F0EB", accent: "#D9FF43", motif: "type" },
    summary:
      "THUMOS is a daily brain + gut support brand founded by Connor Secor, Forward Theory's founder. Building and launching it is where his work in creative design, marketing, and brand building began. It's shown here as his own venture — not as Forward Theory client work.",
    size: "lg",
  },
  {
    slug: "northline",
    title: "Northline",
    industry: "Outdoor / E-commerce",
    services: ["Identity", "E-commerce", "Art direction"],
    year: "2026",
    status: "concept",
    art: { bg: "#D9FF43", fg: "#111111", accent: "#111111", motif: "bars" },
    summary:
      "A self-initiated concept exploring how a direct-to-consumer outdoor label could use a single bold mark across product, packaging, and storefront.",
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

/**
 * Founder page content. Every fact here comes from Connor — keep it that way.
 */
export const founder = {
  name: "Connor Secor",
  role: "Founder, Forward Theory",
  photo: {
    src: "/founder/connor-secor.jpg",
    alt: "Black-and-white portrait of Connor Secor, arms crossed, smiling in front of a textured white wall",
    width: 1400,
    height: 1867,
  },
  intro:
    "A former Naval Special Warfare Boat Operator who turned a hard-won comeback into a brand — and a brand into a creative studio.",
  facts: [
    { value: "7 years", label: "Naval Special Warfare Boat Operator" },
    { value: "Martial Artist", label: "& High Speed Boat Throttleman" },
    { value: "THUMOS", label: "Brand founded & launched" },
  ],
  chapters: [
    {
      number: "01",
      title: "Service",
      body: "Connor spent seven years as a Naval Special Warfare Boat Operator, with multiple deployments overseas.",
    },
    {
      number: "02",
      title: "The comeback",
      body: "A career in special operations came with traumatic brain injuries. Connor answered by going to market with THUMOS, a daily brain + gut support.",
    },
    {
      number: "03",
      title: "The creative shift",
      body: "Launching a brand gave him the chance to unleash his full creative potential. Since then he has relentlessly learned creative design, marketing, and brand building.",
    },
    {
      number: "04",
      title: "Forward Theory",
      body: "Now he brings that forward-looking vision to other founders and businesses — helping bring any project to life.",
    },
  ],
  // TODO(Connor): approve these — they're drawn from your story, not invented credentials.
  brings: [
    {
      title: "Mission focus",
      body: "Seven years in Naval Special Warfare means clear objectives, disciplined execution, and following through.",
    },
    {
      title: "A founder's perspective",
      body: "He has taken his own brand to market, so he knows what's at stake when it's your name on the product.",
    },
    {
      title: "Relentless learning",
      body: "Every skill in his creative toolkit was earned by doing the work. He keeps learning so your project benefits.",
    },
  ],
} as const;
