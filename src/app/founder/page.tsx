import type { Metadata } from "next";
import Image from "next/image";
import { founder, site } from "@/lib/content";
import { Reveal, RevealLines } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";

export const metadata: Metadata = {
  title: `${founder.name} — Founder`,
  description: `${founder.name} is the founder of ${site.name}: a former Naval Special Warfare Boat Operator and founder of THUMOS, now building brands, websites, and digital experiences.`,
  alternates: { canonical: "/founder" },
  openGraph: {
    type: "profile",
    url: "/founder",
    title: `${founder.name} — Founder of ${site.name}`,
    description: founder.intro,
    images: [{ url: founder.photo.src, width: founder.photo.width, height: founder.photo.height, alt: founder.photo.alt }],
  },
};

const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: founder.name,
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: site.name, url: site.url },
  image: `${site.url}${founder.photo.src}`,
  url: `${site.url}/founder`,
};

export default function FounderPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="founder-title" className="gutter relative bg-paper pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="hero-anim fade-up flex items-start justify-between gap-6 border-b border-ink/15 pb-4" style={d(0)}>
          <p className="eyebrow">The Founder</p>
          <p className="eyebrow hidden text-mute-dark sm:block">{founder.role}</p>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <h1 id="founder-title" className="display-xxl">
              <span className="line-mask">
                <span className="line-rise hero-anim" style={d(0.05)}>Connor</span>
              </span>
              <span className="line-mask">
                <span className="line-rise hero-anim" style={d(0.14)}>
                  Secor<span className="text-lime [-webkit-text-stroke:0.02em_var(--color-ink)]">.</span>
                </span>
              </span>
            </h1>
            <p className="hero-anim fade-up lede mt-10 max-w-xl" style={d(0.35)}>
              {founder.intro}
            </p>
            <div className="hero-anim fade-up mt-10 flex flex-wrap gap-3" style={d(0.45)}>
              <Button href="/#contact" variant="ink" size="lg">
                Work with Connor
              </Button>
              <Button href="#story" variant="outline" size="lg">
                Read the story
              </Button>
            </div>
          </div>

          <div className="hero-anim fade-up lg:col-span-5" style={d(0.2)}>
            <div className="relative aspect-[3/4] overflow-hidden bg-ink">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <span className="eyebrow absolute bottom-4 left-4 rounded-full bg-paper/95 px-3 py-1.5 text-ink">
                {founder.name}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section aria-label="At a glance" className="gutter bg-paper pb-20 md:pb-28">
        <dl className="grid border-t border-ink/15 sm:grid-cols-3">
          {founder.facts.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 0.08}
              className={`flex flex-col-reverse gap-3 border-b border-ink/15 py-8 sm:border-b-0 sm:py-10 ${i > 0 ? "sm:border-l sm:pl-8" : ""} ${i < 2 ? "sm:pr-8" : ""}`}
            >
              <dt className="eyebrow text-mute-dark">{f.label}</dt>
              <dd className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-none tracking-[-0.05em]">
                {f.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Marquee
        label="Connor's path"
        className="on-dark bg-ink py-4 text-paper md:py-5"
        itemClassName="font-display text-[clamp(1.25rem,2.6vw,2.25rem)] font-black uppercase tracking-[-0.03em]"
        items={["Naval Special Warfare", "Multiple deployments", "THUMOS", "Creative design", "Marketing", "Brand building", "Forward Theory"]}
        duration={42}
      />

      {/* Story */}
      <section id="story" aria-labelledby="story-title" className="on-dark section-y gutter bg-ink text-paper">
        <Reveal className="mb-10 flex items-center gap-4 md:mb-16">
          <span className="eyebrow text-mute">The Story</span>
          <span className="h-px flex-1 bg-paper/15" aria-hidden="true" />
        </Reveal>
        <RevealLines
          id="story-title"
          className="display-xl"
          lines={["Built under", <span key="p">pressure<span className="text-lime">.</span></span>]}
        />

        <ol className="mt-16 border-t border-paper/15 md:mt-24">
          {founder.chapters.map((c, i) => (
            <Reveal
              as="li"
              key={c.number}
              delay={i * 0.05}
              className="grid gap-4 border-b border-paper/15 py-10 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <span className="eyebrow text-lime md:col-span-2 md:pt-3">{c.number} /</span>
              <h3 className="display-md md:col-span-4">{c.title}</h3>
              <p className="lede text-paper/80 md:col-span-6">{c.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* What he brings */}
      <section aria-labelledby="brings-title" className="section-y gutter bg-paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="mb-8 flex items-center gap-4">
              <span className="eyebrow text-mute-dark">What he brings</span>
              <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
            </Reveal>
            <RevealLines
              id="brings-title"
              className="display-lg"
              lines={["Discipline", "meets", <span key="d">design<span className="text-mute">.</span></span>]}
            />
          </div>
          <ul className="flex flex-col lg:col-span-6 lg:col-start-7 lg:pt-4">
            {founder.brings.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.08} className="border-t border-ink/15 py-8 last:border-b">
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-black uppercase leading-none tracking-[-0.04em]">
                  <span className="bg-[linear-gradient(var(--color-lime),var(--color-lime))] bg-[length:100%_0.32em] bg-left-bottom bg-no-repeat">
                    {b.title}
                  </span>
                </h3>
                <p className="mt-4 max-w-lg text-ink/80">{b.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="founder-cta" className="section-y gutter bg-paper-2">
        <Parallax offset={16}>
          <h2 id="founder-cta" className="display-xl max-w-[14ch]">
            Bring your project to life<span className="text-lime [-webkit-text-stroke:0.02em_var(--color-ink)]">.</span>
          </h2>
        </Parallax>
        <Reveal delay={0.1} className="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <p className="lede max-w-xl text-ink/80">
            New brand, new website, or a launch that needs to land? Tell Connor what you&rsquo;re building.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/#contact" variant="ink" size="lg">
              Start a Project
            </Button>
            <Button href="/#work" variant="outline" size="lg">
              See the work
            </Button>
          </div>
        </Reveal>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </>
  );
}
