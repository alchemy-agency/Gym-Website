"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
  defaultOpen = -1,
}: {
  items: readonly AccordionItem[];
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span
                  className={cn(
                    "font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] transition-colors sm:text-lg",
                    isOpen ? "text-bone" : "text-bone-2 group-hover:text-bone",
                  )}
                >
                  {item.q}
                </span>
                <CaretDown
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className={cn(
                    "mt-1 shrink-0 transition-transform duration-300 ease-out",
                    isOpen ? "-rotate-180 text-ember-2" : "text-bone-3",
                  )}
                />
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{
                duration: reduce ? 0 : 0.34,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden"
            >
              <p className="max-w-[62ch] pb-6 pr-8 text-[0.9375rem] leading-relaxed text-bone-2">
                {item.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
