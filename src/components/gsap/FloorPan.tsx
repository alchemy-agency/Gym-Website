"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type Group = { group: string; items: string };

/**
 * THE FLOOR - horizontal pan.
 *
 * Scroll hijack, used exactly once on the site and only where it earns its
 * keep: the equipment list is genuinely a set of parallel things, and panning
 * them sideways lets each one be read at full size instead of crushed into a
 * six row table.
 *
 * Setup follows the canonical pinned-pan skeleton: `start: "top top"`,
 * `pin: true`, `end: \`+=${distance}\`` where distance is track width minus
 * viewport, `scrub: 1`, and `invalidateOnRefresh` so a resize recalculates.
 *
 * `gsap.matchMedia` means the pin only exists above 1024px and never under
 * reduced motion. Below that breakpoint no ScrollTrigger is created at all and
 * the same markup reads as a plain stacked list, which is why the mobile
 * fallback needs no separate component.
 */
export function FloorPan({
  groups,
  eyebrow,
  heading,
  body,
}: {
  groups: readonly Group[];
  eyebrow: string;
  heading: string;
  body: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () =>
          Math.max(0, trackEl.scrollWidth - window.innerWidth * 0.62);

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(trackEl, { x: 0 });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className="relative overflow-hidden border-y border-line bg-void">
      <div className="lg:flex lg:h-[100dvh] lg:items-stretch">
        {/* Static intro column. Stays put while the panels travel past it. */}
        <div className="shrink-0 px-5 py-14 sm:px-8 lg:flex lg:w-[30rem] lg:flex-col lg:justify-center lg:px-12 lg:py-0">
          <p className="label text-bone-3">{eyebrow}</p>
          <h2 className="display-2 mt-5 max-w-[14ch]">{heading}</h2>
          <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-bone-2">
            {body}
          </p>
          <p className="label mt-8 hidden text-bone-3 lg:block">
            Scroll to move through it
          </p>
        </div>

        {/* Panned track */}
        <div className="lg:flex lg:min-w-0 lg:flex-1 lg:items-center">
          <ol
            ref={track}
            className="flex flex-col gap-px bg-line lg:flex-row lg:flex-nowrap lg:items-stretch lg:bg-transparent lg:pl-10"
          >
            {groups.map((group, i) => (
              <li
                key={group.group}
                className="flex min-h-[200px] flex-col justify-between bg-void p-6 sm:p-8 lg:min-h-0 lg:w-[26rem] lg:shrink-0 lg:border-l lg:border-line lg:bg-transparent lg:px-10 lg:py-16"
              >
                <span
                  aria-hidden="true"
                  className="numeral text-[0.8125rem] text-ember"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mt-10 lg:mt-0">
                  <h3 className="display-3 max-w-[14ch] text-bone">
                    {group.group}
                  </h3>
                  <p className="mt-4 max-w-[30ch] text-[0.9375rem] leading-relaxed text-bone-2">
                    {group.items}
                  </p>
                </div>
              </li>
            ))}

            {/* Tail spacer so the last panel can clear the intro column. */}
            <li aria-hidden="true" className="hidden lg:block lg:w-[28rem] lg:shrink-0" />
          </ol>
        </div>
      </div>

      {/* Progress hairline, only meaningful while the pan is active. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 hidden h-px lg:block",
          "bg-gradient-to-r from-ember via-ember/30 to-transparent",
        )}
      />
    </div>
  );
}
