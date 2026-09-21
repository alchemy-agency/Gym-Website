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
 * block in the order it should be read.
 *
 * IMPORTANT: horizontal variants do NOT translate. An un-revealed block sitting
 * at `x: 26` sticks 26px past the viewport on every narrow screen and produces
 * real horizontal overflow, which is only hidden by the `overflow-x: hidden`
 * safety net on body. Horizontal reveals therefore use a clip-path wipe, which
 * changes no layout and cannot overflow. Verified by `npm run verify`.
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
  const wipe = from === "left" || from === "right";

  /* Under reduced motion the reveal still happens, because content that is
     only hidden until it scrolls into view is not "motion" in the sense that
     matters. What must not happen is the travel: no offset, no defocus, no
     easing, zero duration. */
  const hidden = reduce
    ? { opacity: 0 }
    : wipe
      ? {
          opacity: 0,
          y: 14,
          clipPath:
            from === "right" ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
        }
      : { opacity: 0, ...offset, ...(blur ? { filter: "blur(7px)" } : {}) };

  /* The revealed state must reset every property the hidden state can set,
     in both modes. Omitting one leaves elements stranded at their initial
     offset or blur forever. */
  const shown = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(wipe ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
    ...(blur && !wipe ? { filter: "blur(0px)" } : {}),
  };

  return (
    <Tag
      data-reveal=""
      className={cn(className)}
      initial={hidden}
      /* Under reduced motion, `animate` snaps to the revealed state the moment
         the preference resolves, regardless of scroll position, so a
         reduced-motion visitor never has to scroll to un-hide content.
         Duration 0 makes it a state change rather than an animation. */
      animate={reduce ? shown : undefined}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: reduce ? 0 : 0.68,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
        filter: reduce ? { duration: 0 } : { duration: 0.42, delay, ease: "easeOut" },
      }}
    >
      {children}
    </Tag>
  );
}
