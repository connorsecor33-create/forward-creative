import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealLines } from "../Reveal";
import { Parallax } from "../Parallax";
import { founder } from "@/lib/content";

const pillars = ["Strategy", "Design", "Technology", "Storytelling"];

export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="section-y gutter relative bg-paper">
      <Reveal className="mb-10 flex items-center gap-4 md:mb-16">
        <span className="eyebrow text-mute-dark">01 / The Studio</span>
        <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <RevealLines
            id="studio-title"
            className="display-lg"
            lines={[
              "Good design",
              "is just the",
              <span key="b" className="inline-flex items-baseline gap-[0.15em]">
                beginning<span className="sr-only">.</span><span className="inline-block size-[0.2em] translate-y-[-0.05em] rounded-full bg-lime ring-[0.04em] ring-ink" aria-hidden="true" />
              </span>,
            ]}
          />
        </div>

        <div className="flex flex-col justify-end gap-10 lg:col-span-5 lg:pb-3">
          <Reveal delay={0.1}>
            <p className="lede text-ink">
              Forward Theory is an independent creative studio built for brands that refuse to
              stand still. We combine strategy, design, technology, and storytelling to create
              experiences that drive attention, build trust, and inspire action.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="grid grid-cols-2 border-t border-ink/15">
              {pillars.map((p, i) => (
                <li
                  key={p}
                  className={`flex items-baseline justify-between border-b border-ink/15 py-3 ${
                    i % 2 === 0 ? "pr-4" : "border-l pl-4"
                  }`}
                >
                  <span className="font-semibold">{p}</span>
                  <span className="eyebrow text-mute-dark">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Secondary statement */}
      <div className="mt-24 grid gap-8 md:mt-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow text-mute-dark">Our stance</p>
        </Reveal>
        <div className="relative lg:col-span-9">
          <Parallax offset={40}>
            <p className="display-md max-w-[20ch] text-balance md:!text-[clamp(2.2rem,4.6vw,4.75rem)]">
              We don&rsquo;t create for the sake of creating.{" "}
              <span className="text-mute">We create to move businesses</span>{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.42em] -z-0 bg-lime" aria-hidden="true" />
                <span className="relative">forward.</span>
              </span>
            </p>
          </Parallax>
        </div>
      </div>

      {/* Founder teaser */}
      <Reveal className="mt-24 md:mt-36">
        <Link
          href="/founder"
          className="group grid items-center gap-6 border-y border-ink/15 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8 md:py-8"
        >
          <span className="relative block size-24 overflow-hidden rounded-full bg-ink md:size-28">
            <Image
              src={founder.photo.src}
              alt=""
              fill
              sizes="112px"
              className="object-cover object-[50%_20%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
            />
          </span>
          <span>
            <span className="eyebrow block text-mute-dark">Founded by</span>
            <span className="mt-2 block font-display text-[clamp(1.75rem,3.4vw,3rem)] font-black uppercase leading-none tracking-[-0.045em]">
              {founder.name}
            </span>
            <span className="mt-3 block max-w-xl text-ink/75">
              Former Naval Special Warfare Boat Operator and founder of THUMOS.
            </span>
          </span>
          <span className="eyebrow w-fit border-b border-ink pb-1 transition-colors group-hover:border-transparent group-hover:bg-lime">
            Meet the founder
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
