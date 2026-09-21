"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts up when the number scrolls into view.
 *
 * MOTION IS MOTIVATED: the size of the panel is the whole point of the offer,
 * and watching 0 climb to 160 makes the magnitude land in a way a static
 * numeral does not.
 *
 * The server renders the final value, so search engines and no-JS visitors
 * read the real number. The counter only ever rewinds to zero on the client,
 * inside a layout effect, which happens before paint.
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

    const state = { value: 0 };
    el.textContent = `0${suffix}`;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(state, {
            value: to,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(state.value)}${suffix}`;
            },
          });
        },
      });

      return () => st.kill();
    }, el);

    return () => ctx.revert();
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
