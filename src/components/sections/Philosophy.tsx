"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal, RevealLines } from "../Reveal";

/** Dramatic dark manifesto with speed-lines and scroll-driven outline type. */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "-38%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="philosophy-title"
      className="on-dark relative overflow-hidden bg-ink text-paper"
    >
      {/* Speed lines */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 flex-col justify-center gap-5 opacity-80 md:flex" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="speed-line block h-px bg-paper/30"
            style={{
              width: `${30 + ((i * 37) % 70)}%`,
              marginLeft: `${(i * 23) % 40}%`,
              animationDelay: `${(i * 0.37) % 2.2}s`,
              animationDuration: `${2.2 + (i % 3) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="section-y gutter relative">
        <Reveal className="mb-10 flex items-center gap-4 md:mb-16">
          <span className="eyebrow text-mute">Manifesto</span>
          <span className="h-px w-24 bg-paper/20" aria-hidden="true" />
        </Reveal>

        <RevealLines
          id="philosophy-title"
          className="display-xxl"
          lines={["The future", <span key="w">doesn&rsquo;t wait<span className="text-lime">.</span></span>]}
          stagger={0.12}
        />

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="display-md text-lime">Neither should your brand.</p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.2}>
            <p className="lede text-paper/80">
              Attention is earned. Relevance is built. Growth is intentional. We work with ambitious
              people who understand that standing still is the fastest way to fall behind.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll-linked outline type */}
      <div className="relative overflow-hidden border-t border-paper/10 py-6 md:py-10" aria-hidden="true">
        <motion.p
          style={reduce ? undefined : { x }}
          className="display-xl whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(242,240,235,0.32)]"
        >
          Forward — Forward — Forward — Forward — Forward —
        </motion.p>
      </div>
    </section>
  );
}
