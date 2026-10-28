"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/content";

/**
 * Connected four-phase timeline. A lime track fills as the section scrolls
 * through the viewport and each phase activates as the track reaches it.
 * Horizontal on large screens, vertical on mobile and tablet.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v <= 0.02 ? -1 : Math.min(processSteps.length - 1, Math.floor(v * processSteps.length + 0.15)));
  });

  return (
    <ol ref={ref} className="relative grid gap-0 lg:grid-cols-4">
      {/* Track: vertical (mobile) */}
      <span className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-ink/15 lg:hidden" aria-hidden="true">
        <motion.span className="absolute inset-0 origin-top bg-ink" style={{ scaleY: progress }} />
      </span>
      {/* Track: horizontal (desktop) */}
      <span className="absolute left-0 right-0 top-[0.6875rem] hidden h-px bg-ink/15 lg:block" aria-hidden="true">
        <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: progress }} />
      </span>

      {processSteps.map((step, i) => {
        const on = i <= active;
        return (
          <li key={step.number} className="relative pb-14 pl-12 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 grid size-[1.375rem] place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] ${
                on ? "border-ink bg-lime" : "border-ink/30 bg-paper"
              }`}
            >
              <span className={`size-1.5 rounded-full transition-colors duration-500 ${on ? "bg-ink" : "bg-ink/30"}`} />
            </span>
            <div className="lg:pt-14">
              <p className={`eyebrow transition-colors duration-500 ${on ? "text-ink" : "text-mute-dark"}`}>
                {step.number} /
              </p>
              <h3
                className={`mt-3 font-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] transition-colors duration-700 ${
                  on ? "text-ink" : "text-ink/25"
                }`}
              >
                {step.title}
              </h3>
              <p className={`mt-4 max-w-[26ch] transition-opacity duration-700 ${on ? "opacity-100" : "opacity-50"}`}>
                {step.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
