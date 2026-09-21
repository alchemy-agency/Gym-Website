"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts up when the number scrolls into view.
 *
 * MOTION IS MOTIVATED: the size of the panel is the whole point of the offer,
 * and watching 0 climb to 160 makes the magnitude land in a way a static
 * numeral does not.
 *
 * The server renders the final value, so search engines and no-JS visitors read
 * the real number, and the counter only rewinds on the client.
 *
 * Two guards, both of which were learned the hard way:
 *
 * 1. If the number is already inside or above the viewport on mount, it is left
 *    alone. Rewinding to zero and waiting for a trigger that has already passed
 *    is how you ship a section headed "0+ markers measured".
 * 2. The trigger is an IntersectionObserver, not a ScrollTrigger. ScrollTrigger
 *    samples on animation frames, so a fast scroll can carry an element from
 *    below the viewport to above it between samples and the callback never
 *    fires. IntersectionObserver reports the intersection itself and does not
 *    care how fast the page moved.
 */
export function Counter({
  to,
  suffix = "",
  className,
  duration = 1.5,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    /* Guard 1: never rewind something the reader can already see. */
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = `0${suffix}`;
    const state = { value: 0 };
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          observer.disconnect();

          gsap.to(state, {
            value: to,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(state.value)}${suffix}`;
            },
            onComplete: () => {
              el.textContent = `${to}${suffix}`;
            },
          });
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
