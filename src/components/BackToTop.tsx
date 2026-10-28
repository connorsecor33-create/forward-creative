"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="eyebrow group inline-flex items-center gap-2 text-paper/70 hover:text-lime"
    >
      Back to top
      <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true" />
    </button>
  );
}
