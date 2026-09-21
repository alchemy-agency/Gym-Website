import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Small engraved label. Sans, sentence case, never wide-tracked uppercase:
 * see the note on the `label` utility in globals.css.
 */
export function Label({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return <Tag className={cn("label text-bone-3", className)}>{children}</Tag>;
}

/** Semantic status dot. The only circle in the layout system. */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ember", className)}
    />
  );
}
