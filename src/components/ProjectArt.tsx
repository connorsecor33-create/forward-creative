import type { Project } from "@/lib/content";

/**
 * Generated, art-directed panels used until real project imagery exists.
 * Each motif is a simple SVG composition in the project's palette — no stock
 * photography, nothing that pretends to be finished client work.
 */
export function ProjectArt({ project, className = "" }: { project: Project; className?: string }) {
  const { bg, fg, accent, motif } = project.art;
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: bg, color: fg }}
      aria-hidden="true"
    >
      {motif === "type" && <TypeMotif title={project.title} accent={accent} />}
      {motif === "arrow" && <ArrowMotif accent={accent} />}
      {motif === "grid" && <GridMotif accent={accent} fg={fg} />}
      {motif === "stack" && <StackMotif title={project.title} accent={accent} />}
      {motif === "orbit" && <OrbitMotif accent={accent} />}
    </div>
  );
}

function TypeMotif({ title, accent }: { title: string; accent: string }) {
  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="0" x2="800" y1={110 * i + 60} y2={110 * i + 60} stroke="currentColor" strokeOpacity="0.1" />
      ))}
      <text
        x="-20"
        y="600"
        fill="currentColor"
        style={{ font: "900 330px var(--font-display)", letterSpacing: "-0.07em" }}
      >
        {title.slice(0, 3)}
      </text>
      <text
        x="-20"
        y="900"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        style={{ font: "900 330px var(--font-display)", letterSpacing: "-0.07em" }}
      >
        {title.slice(3)}
      </text>
      <circle cx="680" cy="300" r="64" fill={accent} />
      <path d="M652 328 L708 272 M666 272 H708 V314" stroke="#111" strokeWidth="10" fill="none" />
    </svg>
  );
}

function ArrowMotif({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <path d="M120 680 L560 240" stroke={accent} strokeWidth="96" strokeLinecap="square" />
      <path d="M300 180 H620 V500" stroke={accent} strokeWidth="96" fill="none" strokeLinecap="square" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${40 + i * 40} 760 L${40 + i * 40 + 60} 700`} stroke={accent} strokeOpacity={0.15 + i * 0.12} strokeWidth="10" />
      ))}
    </svg>
  );
}

function GridMotif({ accent, fg }: { accent: string; fg: string }) {
  const cells = Array.from({ length: 36 }, (_, i) => i);
  const filled = new Set([7, 8, 14, 20, 21, 27]);
  return (
    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {cells.map((i) => {
        const x = (i % 6) * 100;
        const y = Math.floor(i / 6) * 100;
        return (
          <rect
            key={i}
            x={x + 4}
            y={y + 4}
            width="92"
            height="92"
            fill={filled.has(i) ? fg : "none"}
            stroke={accent}
            strokeOpacity="0.45"
          />
        );
      })}
      <circle cx="400" cy="400" r="96" fill="#D9FF43" />
      <circle cx="400" cy="400" r="96" fill="none" stroke={fg} strokeWidth="2" />
    </svg>
  );
}

function StackMotif({ title, accent }: { title: string; accent: string }) {
  const word = title.toUpperCase();
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {Array.from({ length: 7 }, (_, i) => {
        const size = 52 * Math.pow(1.28, i);
        const y = 60 + Array.from({ length: i + 1 }, (_, k) => 52 * Math.pow(1.28, k) * 0.86).reduce((a, b) => a + b, 0);
        const solid = i === 6;
        return (
          <text
            key={i}
            x="-10"
            y={y}
            fill={solid ? "currentColor" : "none"}
            stroke={solid ? "none" : accent}
            strokeOpacity={0.2 + i * 0.1}
            strokeWidth="1.5"
            style={{ font: `900 ${size}px var(--font-display)`, letterSpacing: "-0.06em" }}
          >
            {word}
          </text>
        );
      })}
    </svg>
  );
}

function OrbitMotif({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {[260, 200, 140, 80].map((r, i) => (
        <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeOpacity={0.15 + i * 0.15} strokeWidth="2" />
      ))}
      <circle cx="300" cy="300" r="34" fill="currentColor" />
      <circle cx="484" cy="116" r="26" fill={accent} stroke="#111" strokeWidth="2" />
    </svg>
  );
}
