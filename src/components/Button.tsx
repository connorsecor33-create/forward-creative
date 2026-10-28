"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type Variant = "lime" | "ink" | "paper" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  lime: "bg-lime text-ink",
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  outline: "border border-ink/80 text-ink",
  "outline-light": "border border-paper/40 text-paper",
};

// The fill that wipes up from the bottom on hover.
const fills: Record<Variant, string> = {
  lime: "bg-ink",
  ink: "bg-lime",
  paper: "bg-lime",
  outline: "bg-ink",
  "outline-light": "bg-lime",
};

const hoverText: Record<Variant, string> = {
  lime: "group-hover:text-lime",
  ink: "group-hover:text-ink",
  paper: "group-hover:text-ink",
  outline: "group-hover:text-paper",
  "outline-light": "group-hover:text-ink",
};

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  className?: string;
};

type LinkProps = BaseProps & { href: string; onClick?: () => void; type?: never; disabled?: never };
type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const sizes = {
  sm: "h-10 px-4 text-[0.8125rem] gap-2",
  md: "h-12 px-6 text-[0.9375rem] gap-3",
  lg: "h-14 md:h-16 px-7 md:px-9 text-base md:text-lg gap-3",
};

/**
 * Animated CTA: a colour wipe on hover
 * and an optional magnetic pull on fine-pointer devices.
 */
export function Button(props: LinkProps | ButtonProps) {
  const { children, variant = "lime", size = "md", magnetic = true, className = "" } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.36);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-[101%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 ${fills[variant]}`}
      />
      <span
        className={`relative z-10 flex items-center ${sizes[size].split(" ").find((c) => c.startsWith("gap"))} transition-colors duration-300 ${hoverText[variant]}`}
      >
        <span>{children}</span>
      </span>
    </>
  );

  const classes = `group relative inline-flex items-center justify-center overflow-hidden rounded-full font-button font-medium uppercase tracking-[0.06em] whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 ${sizes[size]} ${variants[variant]} ${className}`;

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex ${className.includes("w-full") ? "w-full" : ""}`}
    >
      {"href" in props && props.href ? (
        <Link href={props.href} onClick={props.onClick} className={classes}>
          {inner}
        </Link>
      ) : (
        <button
          type={(props as ButtonProps).type ?? "button"}
          onClick={props.onClick}
          disabled={(props as ButtonProps).disabled}
          className={classes}
        >
          {inner}
        </button>
      )}
    </motion.span>
  );
}
