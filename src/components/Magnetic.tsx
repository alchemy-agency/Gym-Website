"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Magnetic wrapper. The element leans toward the cursor and springs back.
 *
 * MOTION IS MOTIVATED: it is tactile feedback on the primary action, which
 * makes the most important button on the page feel physical rather than flat.
 *
 * Implemented with motion values, never `useState`. A pointer-driven value in
 * React state re-renders the tree on every mouse move and collapses on mobile.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset the element travels. Keep under 0.5. */
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  function handleMove(event: MouseEvent<HTMLSpanElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
