"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { SectionHeading } from "../SectionHeading";
import { ServiceRow } from "../ServiceRow";
import { Reveal } from "../Reveal";

export function Services() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="on-dark section-y gutter bg-ink text-paper"
    >
      <SectionHeading
        eyebrow="02 / What We Do"
        id="services-title"
        tone="light"
        size="xl"
        lines={["Ideas into", <span key="i">impact<span className="text-lime">.</span></span>]}
        aside={
          <p className="text-paper/70">
            Four disciplines, one team. Engage us for a single piece or the whole system — every
            engagement starts with strategy, so the work has a reason to exist.
          </p>
        }
      />
      <Reveal className="mt-16 md:mt-24">
        <ul className="border-t border-paper/15">
          {services.map((s, i) => (
            <ServiceRow
              key={s.number}
              service={s}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
