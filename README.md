# Forward Creative Inc. — Website

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion for React · Lucide icons

## Preview locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3000 (hot reload)
```

Production check:

```bash
npm run build && npm start
```

## Editing content

Almost everything you'll want to change lives in **`src/lib/content.ts`**:

| What | Where in `content.ts` |
| --- | --- |
| Email, domain, social links | `site` (marked `TODO`) |
| Nav links | `navLinks` |
| Services + deliverable tags | `services` |
| Portfolio projects | `projects` |
| Process phases | `processSteps` |
| Budget options in the form | `budgetOptions` |

### Adding real portfolio work

1. Put the image in `public/work/` (e.g. `public/work/acme.jpg`, ~2400px wide).
2. Add or edit an entry in `projects`:
   - `status: "client"` — the card will read "Client work".
   - `image: "/work/acme.jpg"` — replaces the generated art panel; Next.js optimises it (AVIF/WebP, lazy-loaded, responsive sizes).
   - `services` — only what was actually delivered.
3. Each project automatically gets a page at `/work/<slug>` and a sitemap entry.

Honesty rules baked in: concept projects are labelled **Concept**; THUMOS is labelled **Founder's brand · Not client work**. There are no testimonials or metrics — add them only when they're real.

Section copy (headlines, body text) lives in the section files in `src/components/sections/`.

## Contact form

The form validates on the client and again on the server (`src/app/api/contact/route.ts`).

Until delivery is configured, submitting shows a clear notice that the message **was not sent** and points visitors to your email. To connect it, set one environment variable (locally in `.env.local`, or in your host's dashboard):

```
CONTACT_WEBHOOK_URL=https://...
```

Any endpoint that accepts a JSON POST works — a Zapier or Make webhook (→ Gmail, Slack, Notion, CRM), Formspree, or your own API. The payload is `{ name, email, company, services[], budget, message, submittedAt, source }`.

Alternatively, set `NEXT_PUBLIC_CONTACT_ENDPOINT` to post straight from the browser to a service like Formspree and skip the API route.

Also set `NEXT_PUBLIC_SITE_URL` to your real domain so canonical URLs, Open Graph tags and the sitemap are correct. See `.env.example`.

## Typography

Verified on livethumos.com (computed styles and `@font-face` rules, October 2026):

| Role | THUMOS uses | This site |
| --- | --- | --- |
| Headlines | System UI stack (SF Pro / Segoe UI / Roboto), 800–900, uppercase, tight tracking | Same stack |
| Body | Maven Pro | Maven Pro (variable 400–900), self-hosted |
| Buttons / CTAs | Oswald 400/500 | Oswald 400/500, self-hosted |
| Nav & labels | Azeret Mono 400 | Azeret Mono 400, self-hosted |

Maven Pro, Oswald and Azeret Mono are licensed under the SIL Open Font License 1.1 (free for commercial use, including web embedding). The font files are in `src/app/fonts/` and are loaded with `next/font/local` (preloaded, no layout shift, no third-party requests). The headline stack uses each visitor's own system font, so it needs no license — note it will look slightly different on Apple, Windows and Android, exactly as THUMOS does.

Design tokens (colours, fonts, fluid type scale using `clamp()`) are in `src/app/globals.css`.

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata, header/footer shell
    page.tsx              homepage section order
    work/[slug]/page.tsx  project pages
    api/contact/route.ts  inquiry endpoint
    opengraph-image.tsx   generated social share image
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
    globals.css           design system
    fonts/                self-hosted OFL fonts
  components/
    Header, Footer, Button, SectionHeading, ServiceRow, ProjectCard,
    ProjectArt, ProcessTimeline, ContactForm, Reveal, Parallax,
    Marquee, MomentumMark, IntroCurtain, Wordmark
    sections/             Hero, Studio, Services, Work, Philosophy, Process, Contact
  lib/
    content.ts            all editable copy & data
    inquiry.ts            shared form validation
```

## Motion & accessibility

- Hero headline and intro curtain are CSS-only, so they paint before JavaScript loads.
- The intro curtain shows once per browser session.
- All motion respects `prefers-reduced-motion` (CSS and `MotionConfig reducedMotion="user"`).
- Skip link, visible focus rings, keyboard-operable service accordion, focus-trapped mobile menu (Esc closes), labelled form fields with inline errors and live status messages.

## Deploy

**Vercel (recommended):**
1. Push this folder to a GitHub repo.
2. In Vercel, choose **Add New → Project**, import the repo, and keep the defaults.
3. Add the environment variables `NEXT_PUBLIC_SITE_URL` and `CONTACT_WEBHOOK_URL`.
4. Connect your domain under **Settings → Domains**.

Netlify, Render, or any Node host running `npm run build && npm start` also works.
