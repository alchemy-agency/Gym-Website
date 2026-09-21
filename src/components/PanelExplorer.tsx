"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";

import { panelGroups } from "@/content/panel";
import { cn } from "@/lib/cn";

/**
 * Interactive panel readout.
 *
 * Eight body systems is the largest number of items on the site, and a static
 * list of eight divided rows is the exact "spec dump" shape to avoid. Making it
 * a vertical tab set turns the same content into something the reader operates,
 * and the panel on the right only ever shows four or five lines.
 *
 * Built on the real tabs pattern: roving tabindex, arrow keys, Home and End,
 * and proper `role`/`aria-selected`/`aria-controls` wiring, so it is fully
 * keyboard operable rather than just looking interactive.
 */
export function PanelExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduce = useReducedMotion();
  const group = panelGroups[active]!;
  const last = panelGroups.length - 1;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-px bg-line lg:grid-cols-[1.02fr_0.98fr]">
      {/* Selector --------------------------------------------------------- */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Biomarker groups"
        onKeyDown={onKeyDown}
        className="bg-void"
      >
        {panelGroups.map((item, i) => {
          const selected = i === active;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`panel-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-body-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative flex w-full items-center gap-4 border-b border-line px-5 py-4 text-left last:border-b-0 sm:px-6"
            >
              {selected ? (
                <motion.span
                  aria-hidden="true"
                  layoutId="panel-explorer-active"
                  className="absolute inset-0 bg-ink-3"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 38 }
                  }
                />
              ) : null}

              {selected ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 bg-ember"
                />
              ) : null}

              <span className="numeral relative w-5 shrink-0 text-[0.6875rem] text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={cn(
                  "relative text-[0.9375rem] transition-colors duration-200",
                  selected
                    ? "text-bone"
                    : "text-bone-2 group-hover:text-bone",
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Readout ---------------------------------------------------------- */}
      <div
        role="tabpanel"
        id={`panel-body-${group.id}`}
        aria-labelledby={`panel-tab-${group.id}`}
        className="flex flex-col bg-ink-2 p-6 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={group.id}
            initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="display-3 text-bone">{group.name}</h3>

            <ul className="mt-6 border-t border-line-2">
              {group.markers.map((marker) => (
                <li
                  key={marker}
                  className="flex items-baseline gap-3.5 border-b border-line-2 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 translate-y-[-0.15em] bg-ember"
                  />
                  <span className="numeral text-[0.875rem] text-bone">
                    {marker}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <p className="label mt-auto pt-8 text-bone-3">
          {panelGroups.length} groups shown. The full panel runs past 160 markers.
        </p>
      </div>
    </div>
  );
}
