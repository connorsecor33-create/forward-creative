type WordmarkProps = {
  className?: string;
  dotClassName?: string;
  /** Put "Theory." on its own line (used for the giant footer mark). */
  stacked?: boolean;
};

/** The FORWARD THEORY. wordmark — the full stop is the brand's lime accent. */
export function Wordmark({ className = "", dotClassName = "text-lime", stacked = false }: WordmarkProps) {
  return (
    <span className={`font-display font-black uppercase tracking-[-0.06em] ${className}`}>
      Forward{stacked ? <br /> : " "}Theory<span className={dotClassName}>.</span>
    </span>
  );
}
