"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds. Keep under 0.4 or the page feels slow. */
  delay?: number;
  className?: string;
  /** Direction the element travels in from. */
  from?: "up" | "left" | "right" | "none";
  /**
   * Adds a defocus-to-sharp pass. Genuinely expensive on a compositor, so it
   * is reserved for headlines and image plates and switched off for small
   * repeated items like list rows.
   */
  blur?: boolean;
  as?: "div" | "li" | "section" | "article" | "header" | "figure";
};

const OFFSET: Record<NonNullable<RevealProps["from"]>, { x: number; y: number }> = {
  up: { x: 0, y: 26 },
  left: { x: -26, y: 0 },
  right: { x: 26, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll reveal. Communicates hierarchy: the reader's eye is pulled to each
 * block in the order it should be read. Collapses to a plain element when the
 * visitor prefers reduced motion.
 *
 * Motion only. GSAP components live in `components/gsap` and the two libraries
 * must never share a component tree.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  from = "up",
  blur = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const offset = OFFSET[from];

  return (
    <Tag
      data-reveal=""
      className={cn(className)}
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              ...offset,
              ...(blur ? { filter: "blur(7px)" } : {}),
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.68,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.42, delay: reduce ? 0 : delay, ease: "easeOut" },
      }}
    >
      {children}
    </Tag>
  );
}
