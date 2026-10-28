/**
 * The hero's motion graphic: a geometric progression of chevrons, each a
 * little larger than the last, with a lime pulse travelling through them and
 * landing on an arrow disc. Pure SVG + CSS so it costs nothing to hydrate.
 */
export function MomentumMark({ className = "" }: { className?: string }) {
  // Geometric progression: each chevron grows ~1.32× and sits further right.
  const chevrons = Array.from({ length: 5 }, (_, i) => {
    const s = Math.pow(1.32, i); // scale
    return { s, x: 6 + [0, 22, 50, 87, 135][i], i };
  });

  return (
    <svg
      viewBox="0 0 300 120"
      className={`momentum ${className}`}
      role="img"
      aria-label="Animated chevrons accelerating forward into an arrow"
    >
      {chevrons.map(({ s, x, i }) => {
        const h = 15 * s;
        const w = 9 * s;
        return (
          <polyline
            key={i}
            points={`${x},${60 - h} ${x + w},60 ${x},${60 + h}`}
            fill="none"
            strokeWidth={4 + i * 1.6}
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="momentum-chevron"
            style={{ animationDelay: `${i * 0.14}s` }}
          />
        );
      })}
      <g className="momentum-disc">
        <circle cx="252" cy="60" r="44" />
        <path
          d="M232 80 L272 40 M244 40 H272 V68"
          fill="none"
          strokeWidth="7"
          strokeLinecap="square"
          className="momentum-arrow"
        />
      </g>
    </svg>
  );
}
