import { SectionHeading } from "../SectionHeading";
import { ProcessTimeline } from "../ProcessTimeline";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y gutter bg-paper-2">
      <SectionHeading
        eyebrow="04 / Our Approach"
        id="process-title"
        lines={["Think.", "Create.", <span key="m" className="inline-flex items-baseline gap-[0.12em]">Move<span className="sr-only">.</span><span className="inline-block size-[0.2em] rounded-full bg-lime ring-[0.04em] ring-ink" aria-hidden="true" /></span>]}
        aside={
          <p className="text-ink/75">
            A clear, four-phase process keeps ambitious work on schedule — with checkpoints where
            you see real progress, not just slides.
          </p>
        }
      />
      <div className="mt-20 md:mt-28">
        <ProcessTimeline />
      </div>
    </section>
  );
}
