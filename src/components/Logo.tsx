import { cn } from "@/lib/cn";

/* ===========================================================================
   THE MARK
   ---------------------------------------------------------------------------
   One family, three levels of detail. All three are built on the same
   construction so they are interchangeable and unmistakably related:

     grid        32 x 32, with a 4 unit safe margin on every side
     silhouette  a 22 x 22 square from (5,5) to (27,27)
     chamfer     8 units at exactly 45 degrees, taken off the top right corner

   The chamfer is not decoration. It is the same vocabulary as the radius-0
   layout system, and it makes the mark read as a machined part rather than as
   a rounded app icon.

   Why these three: the chamfered square alone is a shape, not an idea. Each
   variant adds exactly one idea, and nothing more. Pick the level of detail
   you want; the lockup, favicon and brand page all follow whichever is set as
   DEFAULT_MARK.
   =========================================================================== */

export type MarkName = "billet" | "plate" | "key";

export const DEFAULT_MARK: MarkName = "billet";

export const MARKS: Record<
  MarkName,
  { label: string; idea: string; path: string }
> = {
  billet: {
    label: "Billet",
    idea: "A block of stock, worked. The pocket is the outer silhouette scaled to 40% and rotated 180 degrees, so the whole composition is point-symmetric and the eye settles on the diagonal running from the top-right cut to the bottom-left pocket.",
    /* outer   M5 5 H19 L27 13 V27 H5 Z                (22 sq, 8 chamfer)
       pocket M11.6 11.6 H20.4 V20.4 H14.8 L11.6 17.2 Z
              (8.8 sq, 3.2 chamfer = the same 36.4% ratio, rotated 180deg)
       evenodd punches the pocket out. */
    path: "M5 5H19L27 13V27H5V5ZM11.6 11.6H20.4V20.4H14.8L11.6 17.2Z",
  },
  plate: {
    label: "Plate",
    idea: "A loaded plate, square on. The strongest and most immediately legible of the three: anyone who trains will read the bore before they read the wordmark.",
    /* Bore is 4.7 radius. Its centre sits at (15.8, 16.3), not (16, 16):
       the chamfer removes mass from the top right, so the hole is nudged
       0.2 units down and left to keep the mark optically balanced. Getting
       this wrong is what makes a geometric logo look subtly broken. */
    path: "M5 5H19L27 13V27H5V5ZM11.1 16.3a4.7 4.7 0 1 0 9.4 0a4.7 4.7 0 1 0-9.4 0Z",
  },
  key: {
    label: "Key",
    idea: "A machined key blank: two opposite corners taken off, no interior detail at all. The boldest silhouette and the one that survives the smallest reproduction.",
    /* Both chamfers are 8 units at 45 degrees, so the shape is point-symmetric
       about (16,16) and reads as one deliberate cut rather than two. */
    path: "M5 5H19L27 13V27H13L5 19Z",
  },
};

/** Concentric hairline, inset 2.5 units. For large reproduction only: on a
 *  door, a wall, a mat. Below roughly 48px it turns to mud, so it is opt-in. */
const INSET_PATH = "M7.5 7.5H17.96L24.5 14.04V24.5H7.5Z";

export function LogoMark({
  mark = DEFAULT_MARK,
  className,
  /** Adds the machined concentric hairline. Large sizes only. */
  inset = false,
  /** Pass to expose the mark to assistive tech. Omit where a wordmark or link
   *  label already names the brand, to avoid announcing it twice. */
  title,
}: {
  mark?: MarkName;
  className?: string;
  inset?: boolean;
  title?: string;
}) {
  const { path } = MARKS[mark];

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
      <path d={path} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      {inset ? (
        <path
          d={INSET_PATH}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      ) : null}
    </svg>
  );
}

const SIZES = {
  sm: { mark: "h-3.5 w-3.5", text: "text-[0.8125rem]", city: "text-[0.625rem]" },
  md: {
    mark: "h-[1.125rem] w-[1.125rem]",
    text: "text-[0.9375rem]",
    city: "text-[0.6875rem]",
  },
  lg: { mark: "h-6 w-6", text: "text-xl", city: "text-xs" },
} as const;

/**
 * Horizontal lockup: mark, wordmark, hairline, HB qualifier.
 *
 * The wordmark is live text, not outlined paths. That is the correct choice for
 * the web: crisp at any density, selectable, translatable, and readable to
 * assistive technology. For print or merchandise, export a lockup with the
 * letterforms outlined from Archivo Expanded Bold at -2% tracking.
 *
 * The hairline before HB is doing real work: it separates the trading name from
 * the location qualifier so "HB" does not read as part of the name.
 */
export function Logo({
  href,
  className,
  mark = DEFAULT_MARK,
  markClassName,
  size = "md",
  showCity = true,
  title,
}: {
  href?: string;
  className?: string;
  mark?: MarkName;
  markClassName?: string;
  size?: "sm" | "md" | "lg";
  showCity?: boolean;
  title?: string;
}) {
  const s = SIZES[size];

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark mark={mark} className={cn(s.mark, "text-ember", markClassName)} />

      <span className={cn("wordmark text-bone", s.text)}>
        Sam&rsquo;s Body Shop
      </span>

      {showCity ? (
        <>
          <span
            aria-hidden="true"
            className={cn("w-px shrink-0 bg-line-2", size === "lg" ? "h-4" : "h-3")}
          />
          <span className={cn("label shrink-0 text-bone-3", s.city)}>HB</span>
        </>
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
