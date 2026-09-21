import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

/**
 * Inner page hero. Asymmetric by default: copy on the left, an optional
 * element on the right. Kept to four text elements, same rule as the home hero.
 */
export function PageHero({
  title,
  body,
  actions,
  aside,
  className,
}: {
  title: ReactNode;
  body: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20", className)}>
      <div className="glow-ember pointer-events-none absolute inset-x-0 top-0 h-[38rem]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div
          className={cn(
            "grid items-end gap-12",
            aside ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : "",
          )}
        >
          {/* Rendered statically, not wrapped in Reveal: on the pages Google
              Ads sends traffic to, the headline must paint immediately. */}
          <div>
            <h1 className="display-1 max-w-[16ch] text-bone">{title}</h1>
            <div className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-bone-2">
              {body}
            </div>
            {actions ? (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            ) : null}
          </div>

          {aside ? (
            <Reveal delay={0.1}>
              {aside}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
