"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Service } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

type ServiceRowProps = {
  service: Service;
  open: boolean;
  onToggle: () => void;
};

/**
 * One full-width service row. Hover sweeps lime in from the left and nudges
 * the title forward; clicking expands the deliverables (works on touch too).
 */
export function ServiceRow({ service, open, onToggle }: ServiceRowProps) {
  const panelId = useId();
  return (
    <li className="group/row relative border-b border-paper/15">
      {/* Hover sweep */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 origin-left bg-lime transition-transform duration-700 ease-[var(--ease-out-expo)] ${
          open ? "scale-x-100" : "scale-x-0 group-hover/row:scale-x-100"
        }`}
      />
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={`relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 py-7 text-left transition-colors duration-300 md:grid-cols-[6rem_1fr_minmax(0,22rem)_auto] md:gap-x-8 md:py-10 ${
            open ? "text-ink" : "text-paper group-hover/row:text-ink"
          }`}
        >
          <span className="eyebrow self-start pt-[0.4em] md:pt-[0.6em] md:pl-1">{service.number}</span>
          <span className="display-md block transition-transform duration-700 ease-[var(--ease-out-expo)] md:group-hover/row:translate-x-4">
            {service.title}
          </span>
          <span
            className={`hidden text-[0.9375rem] leading-snug transition-colors duration-300 md:block ${
              open ? "text-ink/80" : "text-paper/60 group-hover/row:text-ink/80"
            }`}
          >
            {service.summary}
          </span>
          <span
            className={`relative grid size-11 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] md:size-14 ${
              open
                ? "rotate-45 border-ink bg-ink text-lime"
                : "border-paper/30 group-hover/row:border-ink group-hover/row:bg-ink group-hover/row:text-lime"
            }`}
            aria-hidden="true"
          >
            {open ? <Plus className="size-5" /> : <ArrowUpRight className="size-5 transition-transform duration-500 group-hover/row:rotate-45" />}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${service.title} deliverables`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden text-ink"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[6rem_1fr_minmax(0,22rem)_auto] md:gap-x-8 md:pb-10">
              <span className="hidden md:block" />
              <div className="flex flex-col gap-6 md:col-span-2">
                <p className="max-w-xl text-[0.9375rem] leading-snug md:hidden">{service.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="eyebrow rounded-full border border-ink/40 px-3 py-2">
                      {d}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="eyebrow inline-flex w-fit items-center gap-2 border-b border-ink pb-1"
                >
                  Discuss this service <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
