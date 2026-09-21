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
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const viewportEl = viewport.current;
    const trackEl = track.current;
    if (!wrapEl || !viewportEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        /* Measured from the real clipping viewport rather than approximated
           from window.innerWidth, so the last panel lands flush regardless of
           how wide the intro column ends up. */
        const distance = () =>
          Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

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
        {/* Static intro column. Stays put while the panels travel past it.
            `data-floor-intro` is a test hook: the verification script probes
            points inside this box with elementFromPoint to prove that clipped
            panels never paint over the heading. */}
        <div
          data-floor-intro=""
          className="shrink-0 px-5 py-14 sm:px-8 lg:flex lg:w-[30rem] lg:flex-col lg:justify-center lg:px-12 lg:py-0"
        >
          <p className="label text-bone-3">{eyebrow}</p>
          <h2 className="display-2 mt-5 max-w-[14ch]">{heading}</h2>
          <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-bone-2">
            {body}
          </p>
          <p className="label mt-8 hidden text-bone-3 lg:block">
            Scroll to move through it
          </p>
        </div>

        {/* Panned track.
            The viewport MUST clip. Without `overflow-hidden` the track is
            only clipped by the outer section, which spans the intro column
            too, so translated panels slide over the heading instead of
            disappearing behind it. */}
        <div
          ref={viewport}
          className="relative lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:overflow-hidden"
        >
          <ol
            ref={track}
            className="flex flex-col gap-px bg-line lg:w-max lg:shrink-0 lg:flex-row lg:flex-nowrap lg:items-stretch lg:gap-0 lg:bg-transparent lg:pl-12"
          >
            {groups.map((group, i) => (
              <li
                key={group.group}
                data-floor-panel=""
                className="flex min-h-[200px] flex-col justify-between bg-void p-6 sm:p-8 lg:min-h-[24rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-line lg:bg-transparent lg:px-9 lg:py-14"
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
                  {/* Fixed two-line box. Without it the content block is
                      bottom-aligned and panels with a one-line body push their
                      title lower than their neighbours, so the headings across
                      the row visibly fail to line up. */}
                  <p className="mt-4 max-w-[30ch] text-[0.9375rem] leading-relaxed text-bone-2 lg:min-h-[3.1rem]">
                    {group.items}
                  </p>
                </div>
              </li>
            ))}

            {/* Tail spacer so the last panel can clear the intro column. */}
            <li
              aria-hidden="true"
              className="hidden lg:block lg:w-[30rem] lg:shrink-0"
            />
          </ol>

          {/* Soft edge at the clip boundary so panels dissolve in rather than
              being sliced. Sits above the track, below nothing interactive. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-28 bg-gradient-to-r from-void via-void/80 to-transparent lg:block"
          />
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
