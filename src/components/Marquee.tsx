type MarqueeProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
  duration?: number;
  label?: string;
};

/** Infinite CSS marquee. Content is duplicated once for a seamless loop. */
export function Marquee({
  items,
  className = "",
  itemClassName = "",
  separator = "↗",
  duration = 38,
  label,
}: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className={`flex items-center ${itemClassName}`}>
          <span>{item}</span>
          <span aria-hidden="true" className="mx-[0.6em] text-lime">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee-paused overflow-hidden ${className}`} aria-label={label} role={label ? "region" : undefined}>
      <div className="marquee" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
