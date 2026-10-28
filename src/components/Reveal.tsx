"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO, inViewOnce } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span";
};

/** Fades and lifts content into place when it scrolls into view. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Comp>
  );
}

type RevealLinesProps = {
  lines: React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * Staggered, masked line-by-line reveal for oversized headlines.
 * Lines are explicit so line breaks stay intentional at every size.
 */
export function RevealLines({
  lines,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.09,
  id,
}: RevealLinesProps) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1.05, ease: EASE_OUT_EXPO } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
