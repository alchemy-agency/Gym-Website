import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "quiet" | "ghost";
type Size = "sm" | "md" | "lg";

/* Radius is 0 across the whole site. Do not add rounded utilities here. */
const BASE =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-medium tracking-[-0.01em] transition-colors duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-45";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-bone text-ink hover:bg-white",
  /* Interactive outlines use bone-3, not the structural hairline colour: a
     --color-line border only reaches ~1.8:1 against the page and fails the
     WCAG 3:1 requirement for non-text UI boundaries. */
  outline: "border border-bone-3 text-bone hover:border-bone-2 hover:bg-ink-3",
  quiet: "border border-bone-3/70 bg-ink-3 text-bone hover:bg-ink-4",
  ghost: "px-0 text-bone-2 hover:text-bone",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-5 text-[0.875rem]",
  lg: "h-14 px-7 text-[0.9375rem]",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cn(
    BASE,
    VARIANTS[variant],
    variant === "ghost" ? "" : SIZES[size],
    className,
  );
}

type SharedProps = {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow that lifts on hover. Use on primary actions only. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Inner({ children, arrow }: Pick<SharedProps, "children" | "arrow">) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          size={15}
          weight="bold"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 ease-out group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  children,
  className,
  ...rest
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

type LinkProps = SharedProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "children" | "className"
  >;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  children,
  className,
  ...rest
}: LinkProps) {
  const isInternalRoute = href.startsWith("/");

  if (isInternalRoute) {
    return (
      <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
      {...rest}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}
