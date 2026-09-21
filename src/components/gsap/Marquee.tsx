"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * Kinetic text band. The single marquee on the site.
 *
 * MOTION IS MOTIVATED: the band carries Sam's actual four training goals, and
 * it is the connective tissue between the facility section and the coaching
 * section. It runs continuously and scroll velocity accelerates it, so the
 * reader feels the page respond to them rather than playing a loop at them.
 *
 * Exactly one marquee per page. A second would make both feel like filler.
 */
export function Marquee({
  items,
  className,
  speed = 55,
}: {
  items: readonly string[];
  className?: string;
  /** Pixels per second at rest. */
  speed?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* The track holds two identical halves. Translating by exactly one
         half-width and looping gives a seamless join. */
      const half = trackEl.scrollWidth / 2;
      if (half <= 0) return;

      const loop = gsap.to(trackEl, {
        x: -half,
        duration: half / speed,
        ease: "none",
        repeat: -1,
      });

      /* Scroll velocity drives playback rate.
         `loop.timeScale` is a METHOD on the Tween, not an animatable property,
         so the value is tweened on a plain proxy and pushed across on update.
         Tweening the Tween directly is a silent no-op. */
      const rate = { value: 1 };

      ScrollTrigger.create({
        trigger: wrapEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            5,
            1 + Math.abs(self.getVelocity()) / 1200,
          );
          gsap.to(rate, {
            value: boost,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => loop.timeScale(rate.value),
          });
        },
      });
    }, wrapEl);

    return () => ctx.revert();
  }, [speed]);

  const half = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex shrink-0 items-center">
          <span className="display-3 whitespace-nowrap px-7 text-bone sm:px-9">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ember"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={wrap}
      className={cn(
        "relative overflow-hidden border-y border-line bg-void py-7 sm:py-9",
        className,
      )}
    >
      {/* Assistive technology gets the list once, in order, instead of a
          repeated decorative band. */}
      <span className="sr-only">{items.join(". ")}</span>

      <div ref={track} data-marquee="" aria-hidden="true" className="flex w-max">
        {half}
        {half}
      </div>

      {/* Soft edges so the band dissolves rather than being cut off. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-void to-transparent sm:w-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-void to-transparent sm:w-40"
      />
    </div>
  );
}
