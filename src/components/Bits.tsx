import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Small mono label. See the eyebrow discipline note in globals.css. */
export function Stamp({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "div";
}) {
  return <Tag className={cn("stamp text-bone-3", className)}>{children}</Tag>;
}

/** Semantic status dot. The only circle allowed on the site. */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ember", className)}
    />
  );
}
