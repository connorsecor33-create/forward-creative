"use client";

import { MotionConfig } from "motion/react";

/** Global motion settings: respects the OS "reduce motion" preference. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.9 }}>
      {children}
    </MotionConfig>
  );
}
