import { Button } from "../Button";
import { MomentumMark } from "../MomentumMark";
import { Marquee } from "../Marquee";

const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

/**
 * Full-viewport hero. The headline is server-rendered and animated with CSS
 * so it appears instantly (good for LCP) and needs no JavaScript.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col bg-paper"
    >
      <div className="gutter flex flex-1 flex-col pb-8 pt-28 md:pb-10 md:pt-36">
        {/* Eyebrow row */}
        <div className="hero-anim fade-up flex items-start justify-between gap-6 border-b border-ink/15 pb-4" style={d(0)}>
          <p className="eyebrow">Independent Creative Studio / Est. 2026</p>
          <p className="eyebrow hidden text-mute-dark sm:block">Brand — Web — Content — Growth</p>
        </div>

        {/* Headline */}
        <h1 id="hero-title" className="display-xxl hero-title mt-[clamp(2rem,5svh,4.5rem)]">
          <span className="line-mask">
            <span className="line-rise hero-anim" style={d(0.05)}>We make</span>
          </span>
          <span className="line-mask">
            <span className="line-rise hero-anim" style={d(0.14)}>Brands move</span>
          </span>
          <span className="line-mask">
            <span className="line-rise hero-anim" style={d(0.23)}>
              <span className="flex items-center gap-[0.14em]">
                <span>Forward.</span>
                <MomentumMark className="hidden h-[0.6em] w-auto shrink-0 text-ink sm:block" />
              </span>
            </span>
          </span>
        </h1>

        <MomentumMark className="hero-anim fade-up mt-6 h-14 w-auto self-start text-ink sm:hidden" />

        {/* Bottom row */}
        <div className="mt-auto grid gap-8 pt-12 md:grid-cols-12 md:items-end md:gap-6 md:pt-16">
          <p
            className="hero-anim fade-up lede max-w-xl md:col-span-6 lg:col-span-5"
            style={d(0.45)}
          >
            We build brands, websites, and digital experiences that don&rsquo;t just look
            different. They move businesses forward.
          </p>
          <div
            className="hero-anim fade-up flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-5 lg:col-start-7"
            style={d(0.55)}
          >
            <Button href="/#work" variant="ink" size="lg">
              Explore our work
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              Let&rsquo;s talk
            </Button>
          </div>
          <a
            href="#studio"
            className="hero-anim fade-up group hidden flex-col items-center gap-3 justify-self-end lg:col-span-1 lg:flex"
            style={d(0.7)}
            aria-label="Scroll to the studio section"
          >
            <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
            <span className="relative block h-14 w-px overflow-hidden bg-ink/15">
              <span className="scroll-cue-line absolute inset-0 bg-ink" />
            </span>
          </a>
        </div>
      </div>

      {/* Service ticker */}
      <Marquee
        label="Services"
        className="on-dark bg-ink py-4 text-paper md:py-5"
        itemClassName="font-display text-[clamp(1.25rem,2.6vw,2.25rem)] font-black uppercase tracking-[-0.03em]"
        items={[
          "Brand identity",
          "Strategy",
          "Websites",
          "E-commerce",
          "Campaigns",
          "Content",
          "Growth",
          "Art direction",
        ]}
      />
    </section>
  );
}
