import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, statusLabel } from "@/lib/content";
import { ProjectArt } from "@/components/ProjectArt";
import { Button } from "@/components/Button";
import { Reveal, RevealLines } from "@/components/Reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} (${statusLabel[p.status]})`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} — Forward Creative`, description: p.summary, url: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  const notes: Record<typeof p.status, string> = {
    concept:
      "This is a self-initiated concept, not commissioned client work. It exists to show how we approach a brief — the strategy, the system, and the craft.",
    founder:
      "THUMOS is an existing brand associated with Forward Creative's founder. It's included for context about the people behind the studio — not as agency client work or deliverables.",
    client: "",
  };

  return (
    <article className="bg-paper">
      <header className="gutter pb-12 pt-32 md:pb-16 md:pt-44">
        <Link href="/#work" className="eyebrow group mb-12 inline-flex items-center gap-2 text-mute-dark hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          All work
        </Link>
        <p className="eyebrow mb-6">
          <span className="rounded-full bg-ink px-3 py-1.5 text-paper">{statusLabel[p.status]}</span>
        </p>
        <RevealLines as="h1" className="display-xxl" lines={[p.title]} />
        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 md:grid-cols-4">
          {[
            ["Industry", p.industry],
            ["Services", p.services.join(", ")],
            ["Year", p.year],
            ["Type", statusLabel[p.status]],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow text-mute-dark">{k}</dt>
              <dd className="mt-2 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="gutter">
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/8]">
          {p.image ? (
            <Image src={p.image} alt={`${p.title} key visual`} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <ProjectArt project={p} />
          )}
        </div>
      </div>

      <section className="section-y gutter grid gap-10 lg:grid-cols-12" aria-label="About this project">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-mute-dark">Overview</p>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
          <p className="lede">{p.summary}</p>
          {notes[p.status] && (
            <p className="mt-8 border-l-2 border-ink pl-5 text-ink/75">{notes[p.status]}</p>
          )}
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/#contact" variant="ink">Start a project</Button>
          </div>
        </Reveal>
      </section>

      <Link
        href={`/work/${next.slug}`}
        className="on-dark group gutter flex items-end justify-between gap-6 bg-ink py-16 text-paper md:py-24"
      >
        <div>
          <p className="eyebrow mb-4 text-mute">Next project</p>
          <p className="display-xl transition-colors duration-500 group-hover:text-lime">{next.title}</p>
        </div>
        <span className="mb-2 grid size-16 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform duration-700 group-hover:rotate-45 md:size-24">
          <ArrowUpRight className="size-7 md:size-9" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
