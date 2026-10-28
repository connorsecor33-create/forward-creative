"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type Project, statusLabel } from "@/lib/content";
import { ProjectArt } from "./ProjectArt";
import { EASE_IN_OUT, inViewOnce } from "@/lib/motion";

type ProjectCardProps = {
  project: Project;
  aspect?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Image-led project card: clip-path reveal on scroll, inner parallax drift,
 * and a slow zoom on hover.
 */
export function ProjectCard({ project, aspect = "aspect-[4/5]", className = "", priority }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 1 }}
    >
      <Link
        ref={ref}
        href={`/work/${project.slug}`}
        className="group block"
        aria-label={`View project: ${project.title} (${statusLabel[project.status]})`}
      >
        <motion.div
          className={`relative overflow-hidden bg-ink ${aspect}`}
          initial={{ clipPath: "inset(12% 8% 12% 8%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={inViewOnce}
          transition={{ duration: 1.3, ease: EASE_IN_OUT }}
        >
          <motion.div
            style={reduce ? undefined : { y }}
            className="absolute -inset-y-[7%] inset-x-0"
          >
            <div className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt=""
                  fill
                  priority={priority}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <ProjectArt project={project} />
              )}
            </div>
          </motion.div>

          {/* Status tag */}
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1.5 text-ink md:left-5 md:top-5">
            {statusLabel[project.status]}
          </span>

        </motion.div>

        {/* Meta */}
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-t border-ink/15 pt-4">
          <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-black uppercase leading-none tracking-[-0.04em]">
            <span className="bg-[linear-gradient(var(--color-lime),var(--color-lime))] bg-[length:0%_0.35em] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_0.35em]">
              {project.title}
            </span>
          </h3>
          <span className="eyebrow self-center text-mute-dark">{project.year}</span>
          <p className="eyebrow text-mute-dark">{project.industry}</p>
          <span className="eyebrow justify-self-end border-b border-transparent transition-colors duration-300 group-hover:border-ink">
            View project
          </span>
          <p className="col-span-2 text-sm text-ink/70">{project.services.join(" · ")}</p>
        </div>
      </Link>
    </motion.article>
  );
}
