import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal, RevealLines } from "../Reveal";
import { ContactForm } from "../ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-dark section-y gutter relative bg-ink text-paper"
    >
      <Reveal className="mb-10 flex items-center gap-4 md:mb-16">
        <span className="eyebrow text-mute">Have something in mind?</span>
        <span className="h-px flex-1 bg-paper/15" aria-hidden="true" />
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <RevealLines
              id="contact-title"
              className="display-xl lg:!text-[clamp(3rem,6.2vw,7.5rem)]"
              lines={["Let’s make", "something", <span key="m">matter<span className="text-lime">.</span></span>]}
            />
            <Reveal delay={0.15}>
              <p className="lede mt-10 max-w-md text-paper/80">
                Big idea, new business, or a brand ready for what&rsquo;s next? Let&rsquo;s move it
                forward.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-10 inline-flex items-center gap-3 border-b border-paper/30 pb-2 text-lg transition-colors hover:border-lime hover:text-lime md:text-xl"
              >
                {site.email}
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-6 lg:pt-4" delay={0.1}>
          <h3 className="sr-only">Project inquiry form</h3>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
