import { RevealLines, Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  lines: React.ReactNode[];
  id?: string;
  size?: "xl" | "lg";
  tone?: "dark" | "light";
  aside?: React.ReactNode;
  className?: string;
};

/** Numbered eyebrow + oversized uppercase headline, used by every section. */
export function SectionHeading({
  eyebrow,
  lines,
  id,
  size = "lg",
  tone = "dark",
  aside,
  className = "",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-mute-dark" : "text-mute";
  const rule = tone === "dark" ? "bg-ink/15" : "bg-paper/15";
  return (
    <div className={className}>
      <Reveal className="mb-8 flex items-center gap-4 md:mb-12">
        <span className={`eyebrow ${muted}`}>{eyebrow}</span>
        <span className={`h-px flex-1 ${rule}`} aria-hidden="true" />
      </Reveal>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <RevealLines
          id={id}
          lines={lines}
          className={size === "xl" ? "display-xl" : "display-lg"}
        />
        {aside && <Reveal delay={0.2} className="lg:max-w-sm lg:pb-3">{aside}</Reveal>}
      </div>
    </div>
  );
}
