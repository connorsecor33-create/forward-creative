import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="gutter border-t border-paper/15 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="display-md max-w-[16ch] md:col-span-5">
            Independent thinking. <span className="text-lime">Forward momentum.</span>
          </p>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5 text-mute">Sitemap</p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-lg hover:text-lime">
                    {l.label}
                    <ArrowUpRight className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-mute">Follow</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg hover:text-lime">
                  Instagram <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg hover:text-lime">
                  LinkedIn <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li className="mt-4">
                <a href={`mailto:${site.email}`} className="text-paper/70 hover:text-lime">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex items-end justify-between gap-6 md:mt-28">
          <p className="eyebrow text-mute">© 2026 Forward Creative Inc.</p>
          <BackToTop />
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="gutter mt-6 select-none" aria-hidden="true">
        <Wordmark className="block translate-y-[0.16em] text-center text-[clamp(4rem,18.6vw,21rem)] leading-[0.8]" />
      </div>
    </footer>
  );
}
