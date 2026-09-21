"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds. Keep under 0.4 or the page feels slow. */
  delay?: number;
  className?: string;
  /** Direction the element travels in from. Vertical only, see note below. */
  from?: "up" | "down" | "none";
  /**
   * Adds a defocus-to-sharp pass. Genuinely expensive on a compositor, so it
   * is reserved for headlines and image plates and switched off for small
   * repeated items like list rows.
   */
  blur?: boolean;
  as?: "div" | "li" | "section" | "article" | "header" | "figure";
};

const OFFSET: Record<NonNullable<RevealProps["from"]>, number> = {
  up: 26,
  down: -26,
  none: 0,
};

/**
 * Scroll reveal. Communicates hierarchy: the reader's eye is pulled to each
 * block in the order it should be read.
 *
 * ---------------------------------------------------------------------------
 * FOUR THINGS THIS COMPONENT MUST NEVER DO AGAIN
 *
 * 1. It must not animate `x`. An un-revealed block sitting at `x: 26` sticks
 *    26px past the viewport on every narrow screen and produces real horizontal
 *    overflow, which is only hidden by the `overflow-x: hidden` net on body.
 *    Vertical offsets cannot do that.
 *
 * 2. It must not hide itself with `clip-path`. Hiding at
 *    `inset(0% 0% 0% 100%)` makes the element zero-area, so
 *    IntersectionObserver reports "never intersecting" and the reveal never
 *    fires. That is a deadlock, and it silently hid the hero photo on every
 *    inner page.
 *
 * 3. It must not use `whileInView`. That is a "while" gesture: the element
 *    returns to its base state when it leaves the viewport, so scrolling back
 *    up re-hid blocks that had already been revealed. `once` on the viewport
 *    options did not prevent it. Driving `animate` from `useInView` is
 *    explicit and latches.
 *
 * 4. It must not leave content stranded above the reader. See the rootMargin
 *    note below: anything the reader has already passed counts as revealed, so
 *    a fast flick or a restored scroll position cannot leave a blank block.
 * ---------------------------------------------------------------------------
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
  const ref = useRef<HTMLElement>(null);
  /* The observation root is the viewport extended 100,000px UPWARD and shrunk
     80px at the bottom.

     The bottom margin is the reveal trigger: a block animates in when it comes
     within 80px of the fold.

     The huge top margin is the safety net. Without it, anything the reader
     flicks past faster than IntersectionObserver delivers callbacks is left
     above the viewport, unobserved and permanently invisible until they scroll
     back. Widening the root upward means "already behind you" counts as
     intersecting, so a block can never be stranded hidden above the reader. It
     also covers a restored scroll position on refresh, which is the same
     problem on first paint. */
  const inView = useInView(ref, {
    once: true,
    margin: "100000px 0px -80px 0px",
  });
  const Tag = motion[as];

  const show = inView || Boolean(reduce);

  /* The hidden and revealed states must always describe the same set of
     properties. If the revealed state omits one the hidden state set, the
     element is stranded with it forever. */
  const hidden = { opacity: 0, y: OFFSET[from], filter: blur ? "blur(7px)" : "none" };
  const shown = { opacity: 1, y: 0, filter: blur ? "blur(0px)" : "none" };

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      className={cn(className)}
      initial={hidden}
      animate={show ? shown : hidden}
      transition={{
        duration: show && !reduce ? 0.68 : 0,
        delay: show && !reduce ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
        filter: {
          duration: show && !reduce ? 0.42 : 0,
          delay: show && !reduce ? delay : 0,
          ease: "easeOut",
        },
      }}
    >
      {children}
    </Tag>
  );
}
