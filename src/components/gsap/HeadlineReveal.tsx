"use client";

import { gsap } from "gsap";
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/cn";

/* useLayoutEffect warns during SSR. We want it on the client so GSAP sets the
   hidden start state before the browser paints, which is what prevents a
   visible flash of the finished headline. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hero headline reveal: each word rises out of its own clipping mask.
 *
 * Correctness notes, because this pattern is easy to get wrong:
 *
 * 1. Words stay real text nodes separated by real spaces. Assistive tech and
 *    search engines read a normal headline. Do not switch this to flex with
 *    margin-based word gaps, which silently deletes the spaces.
 * 2. The words are NOT hidden in CSS. They are hidden by GSAP inside a layout
 *    effect. So the server HTML contains a fully visible headline: no-JS
 *    visitors see it, and nothing blocks a pre-hydration paint.
 * 3. The mask relies on the display type being uppercase. Archivo uppercase has
 *    no descenders, so `overflow: hidden` cannot clip a glyph. The hairline of
 *    padding is belt and braces for the comma and period.
 */
export function HeadlineReveal({
  lines,
  className,
  delay = 0.08,
}: {
  lines: readonly string[];
  className?: string;
  delay?: number;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (words.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.052,
          delay,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <h1 ref={root} className={cn("display-1 text-bone", className)}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={line} className="block">
            {words.map((word, wi) => (
              <Fragment key={`${word}-${wi}`}>
                <span className="inline-block overflow-hidden pb-[0.03em] align-top">
                  <span data-word="" className="inline-block will-change-transform">
                    {word}
                  </span>
                </span>
                {wi < words.length - 1 ? " " : null}
              </Fragment>
            ))}
            {li < lines.length - 1 ? <br /> : null}
          </span>
        );
      })}
    </h1>
  );
}
