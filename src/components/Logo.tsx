import { MARK_PATH, MARK_VIEWBOX } from "@/components/brand/markPath";
import { cn } from "@/lib/cn";

/* ===========================================================================
   BRAND MARK + LOCKUP
   ---------------------------------------------------------------------------
   These are the client's own supplied assets, not redrawn:

     public/brand/source/favicon-source.svg   -> the angular "S" mark
     public/brand/source/wordmark-source.svg  -> mark + SAM'S BODY SHOP

   Two things were changed when importing, and both matter:

   1. The wordmark faked its letter counters (the holes in B, D, O, P, A) by
      painting them with a hard coded #080808 shape on top of the letterforms.
      That only works on the exact black it was drawn against. The counters are
      now merged into the same path with fill-rule="evenodd", so they are real
      holes and the lockup works on any background. See
      `scripts/import-brand.mjs` to regenerate.
   2. The canvas viewBox was 1672x941 with the lockup floating in the middle of
      it. It is now cropped tight to the artwork, so the lockup can be sized by
      height without guessing at padding.

   The mark itself is untouched, and takes `currentColor` so one asset works on
   any background.
   =========================================================================== */

export function LogoMark({
  className,
  title,
}: {
  className?: string;
  /** Omit where a wordmark or link label already names the brand, so screen
   *  readers do not announce it twice. */
  title?: string;
}) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", className)}
    >
      <path d={MARK_PATH} fill="currentColor" />
    </svg>
  );
}

/* Lockup is 1245 x 169, so an aspect of 7.367.
   `md` and `lg` are responsive: at 320px a 206px lockup plus the menu button
   does not fit the nav gutter, so it steps down below the `sm` breakpoint.
   The width/height attributes carry the LARGER values so the box is reserved
   at full size and the nav never shifts; the class then overrides at narrow
   widths. */
const LOCKUP = {
  sm: { h: 22, w: 162, class: "h-[22px] w-[162px]" },
  md: { h: 28, w: 206, class: "h-[24px] w-[176px] sm:h-[28px] sm:w-[206px]" },
  lg: { h: 40, w: 295, class: "h-[30px] w-[221px] sm:h-[40px] sm:w-[295px]" },
} as const;

/**
 * Horizontal lockup: the supplied wordmark, plus an optional HB qualifier.
 *
 * The HB qualifier is a site-level device, deliberately OUTSIDE the logo. The
 * trading name collides with a number of auto body shops called Sam's Body
 * Shop, so the location qualifier earns its place. It is kept out of the SVG so
 * the logo file itself stays exactly as the brand drew it, and it is hidden
 * below `sm` where there is no room for it.
 */
export function Logo({
  href,
  className,
  size = "md",
  variant = "bone",
  showCity = false,
  title,
}: {
  href?: string;
  className?: string;
  size?: keyof typeof LOCKUP;
  /** `bone` for dark surfaces, `ink` for light ones. */
  variant?: "bone" | "ink";
  showCity?: boolean;
  title?: string;
}) {
  const s = LOCKUP[size];

  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={variant === "ink" ? "/brand/wordmark-ink.svg" : "/brand/wordmark.svg"}
        alt={title ?? "Sam's Body Shop"}
        width={s.w}
        height={s.h}
        className={cn(s.class, "block")}
      />

      {showCity ? (
        <span className="hidden items-center gap-3 sm:inline-flex">
          <span
            aria-hidden="true"
            className={cn(
              "ml-3 w-px shrink-0 bg-line-2",
              size === "lg" ? "h-6" : "h-4",
            )}
          />
          <span className="label shrink-0 text-bone-3">HB</span>
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      className="inline-flex transition-opacity duration-200 hover:opacity-85"
    >
      {content}
    </a>
  );
}
