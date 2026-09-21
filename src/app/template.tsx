"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/* Module scope, so it survives client-side navigation between routes but
   resets on a hard load. */
let hasNavigated = false;

/**
 * Route transition.
 *
 * Three deliberate constraints, each for a concrete reason:
 *
 * 1. NO transform on this wrapper. A transformed ancestor becomes the
 *    containing block for `position: fixed` descendants, and GSAP
 *    ScrollTrigger pins exactly that way. A `translateY(0px)` left behind by
 *    the fade would silently break the pinned horizontal pan on the home page,
 *    so this animates opacity only. The lift on navigation comes from the
 *    in-page reveals instead.
 * 2. NO blur across the whole document. Blurring a long page composites its
 *    entire scroll height and drops frames on mid-range phones.
 * 3. NO exit animation. Exits fight App Router's scroll restoration.
 *
 * The first load is skipped so a landing page from Google Ads paints
 * immediately.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const isFirstLoad = useRef(!hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (isFirstLoad.current || reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-px origin-left bg-ember"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.35, delay: 0.5, ease: "easeOut" },
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
