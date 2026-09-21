import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "ink" | "ink-2" | "void";

const TONES: Record<Tone, string> = {
  ink: "bg-ink",
  "ink-2": "bg-ink-2",
  void: "bg-void",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  /** Hairline across the top of the section. */
  rule?: boolean;
  /** Tightens vertical rhythm for sections that sit in a pair. */
  density?: "tight" | "default" | "loose";
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "footer" | "header";
  "aria-labelledby"?: string;
};

const DENSITY = {
  tight: "py-14 sm:py-16",
  default: "py-20 sm:py-24 lg:py-28",
  loose: "py-24 sm:py-32 lg:py-40",
} as const;

export function Section({
  children,
  id,
  tone = "ink",
  rule = false,
  density = "default",
  className,
  containerClassName,
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        TONES[tone],
        rule && "border-t border-line",
        DENSITY[density],
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12",
          containerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
