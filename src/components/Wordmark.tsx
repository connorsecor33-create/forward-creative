type WordmarkProps = { className?: string; dotClassName?: string };

/** The FORWARD. wordmark — the full stop is the brand's lime accent. */
export function Wordmark({ className = "", dotClassName = "text-lime" }: WordmarkProps) {
  return (
    <span className={`font-display font-black uppercase tracking-[-0.06em] ${className}`}>
      Forward<span className={dotClassName}>.</span>
    </span>
  );
}
