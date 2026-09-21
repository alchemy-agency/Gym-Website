import { cn } from "@/lib/cn";

/**
 * THE MARK - "Billet"
 *
 * A solid square with the top right corner chamfered at 45 degrees. It encodes
 * the brand's two ideas in one shape: a billet of stock material (Sam's Body
 * Shop is literally a shop) and a loaded plate seen square on. The chamfer is
 * the same vocabulary as the radius-0 layout system, so the mark and the
 * interface are speaking the same language.
 *
 * Deliberately a single shape with no detail that disappears when it is small.
 * It reads at 16px as a favicon and at 200px on a wall.
 *
 * Drawn on a 32x32 grid:
 *   square  5,5 -> 27,27
 *   chamfer 8 units  (19,5) -> (27,13)
 */
export function LogoMark({
  className,
  /** Inner hairline frame. Adds craft at large sizes, omit it below ~48px. */
  inset = false,
  title,
}: {
  className?: string;
  inset?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", className)}
    >
      <path d="M5 5H19L27 13V27H5V5Z" fill="currentColor" />
      {inset ? (
        <path
          d="M9 9H17.5L23 14.5V23H9V9Z"
          stroke="var(--color-ink)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      ) : null}
    </svg>
  );
}

/**
 * Horizontal lockup: mark, wordmark, and the HB qualifier.
 *
 * The wordmark is set in live text rather than outlined paths. That is the
 * correct choice for the web: it stays crisp at any density, it is selectable
 * and it is readable to assistive technology. A print or merchandise lockup
 * with the letterforms outlined should be produced in a design tool from
 * Archivo Expanded Bold, tracking -1.5%.
 */
export function Logo({
  href,
  className,
  markClassName,
  size = "md",
  showCity = true,
  title,
}: {
  href?: string;
  className?: string;
  markClassName?: string;
  size?: "sm" | "md" | "lg";
  showCity?: boolean;
  title?: string;
}) {
  const sizes = {
    sm: { mark: "h-3.5 w-3.5", text: "text-[0.8125rem]", city: "text-[0.625rem]" },
    md: {
      mark: "h-[1.125rem] w-[1.125rem]",
      text: "text-[0.9375rem]",
      city: "text-[0.6875rem]",
    },
    lg: { mark: "h-6 w-6", text: "text-xl", city: "text-xs" },
  }[size];

  const content = (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={cn(sizes.mark, "text-ember", markClassName)} />
      <span
        className={cn(
          "font-display font-bold uppercase leading-none tracking-[-0.02em] text-bone",
          sizes.text,
        )}
      >
        Sam&rsquo;s Body Shop
      </span>
      {showCity ? (
        <span
          className={cn(
            "label hidden leading-none text-bone-3 sm:inline",
            sizes.city,
          )}
        >
          HB
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return title ? (
      <span role="img" aria-label={title}>
        {content}
      </span>
    ) : (
      content
    );
  }

  return (
    <a
      href={href}
      aria-label={title}
      className="inline-flex transition-opacity duration-200 hover:opacity-80"
    >
      {content}
    </a>
  );
}
