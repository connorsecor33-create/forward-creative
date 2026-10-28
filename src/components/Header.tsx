"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, site } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import { Button } from "./Button";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Sticky navigation. Transparent and roomy at the top of the page; once you
 * scroll it condenses into a solid ink bar. Hides on fast downward scroll and
 * returns as soon as you scroll up.
 */
export function Header() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(y > 40);
    setHidden(y > 600 && y > prev + 4 && !open);
    if (y < prev - 2) setHidden(false);
  });

  // Lock scroll, close on Escape, and keep focus inside the mobile menu.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const items = [
          menuButton.current,
          ...panel.current.querySelectorAll<HTMLElement>("a,button"),
        ].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = compact || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      >
        <div
          className={`gutter transition-[padding] duration-500 ease-[var(--ease-out-expo)] ${
            compact ? "pt-2 md:pt-3" : "pt-4 md:pt-6"
          }`}
        >
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
              dark
                ? "on-dark bg-ink/95 py-2 pl-5 pr-2 text-paper shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md md:pl-7"
                : "bg-transparent py-2 pl-0 pr-0 text-ink"
            }`}
          >
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="relative z-10 shrink-0"
              onClick={() => setOpen(false)}
            >
              <Wordmark
                className={`block whitespace-nowrap transition-[font-size] duration-500 ${
                  compact ? "text-[1.15rem] md:text-[1.4rem]" : "text-[1.25rem] md:text-[1.75rem]"
                }`}
                dotClassName={dark ? "text-lime" : "text-ink"}
              />
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <ul className="mr-3 flex items-center">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group eyebrow relative block px-3 py-2 lg:px-4"
                    >
                      <span className="relative block overflow-hidden">
                        <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
                          {l.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 ${
                            dark ? "text-lime" : "text-mute-dark"
                          }`}
                        >
                          {l.label}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Button href="/#contact" size="sm" variant={dark ? "lime" : "ink"}>
                Start a Project
              </Button>
            </div>

            <button
              ref={menuButton}
              type="button"
              className="relative z-10 flex h-11 items-center gap-3 rounded-full px-3 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="eyebrow">{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "w-full -translate-y-[5px] -rotate-45" : "w-2/3"
                  }`}
                />
              </span>
              <span className="sr-only">navigation</span>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="on-dark fixed inset-0 z-40 flex flex-col bg-ink text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          >
            <div className="gutter flex flex-1 flex-col justify-between pb-8 pt-28">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-paper/10">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: EASE_OUT_EXPO }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-4 active:text-lime"
                      >
                        <span className="font-display text-[clamp(2.75rem,14vw,4.5rem)] font-black uppercase leading-[0.95] tracking-[-0.05em]">
                          {l.label}
                        </span>
                        <span className="eyebrow text-mute">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <Button href="/#contact" size="lg" onClick={() => setOpen(false)} className="w-full">
                  Start a Project
                </Button>
                <div className="flex items-center justify-between">
                  <a href={`mailto:${site.email}`} className="text-sm text-paper/80">
                    {site.email}
                  </a>
                  <div className="flex gap-4">
                    <a href={site.social.instagram} className="eyebrow text-paper/80" target="_blank" rel="noreferrer">
                      Instagram
                    </a>
                    <a href={site.social.linkedin} className="eyebrow text-paper/80" target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
