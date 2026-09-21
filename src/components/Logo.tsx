import { cn } from "@/lib/cn";

/* ===========================================================================
   BRAND LOCKUP
   ---------------------------------------------------------------------------
   The client's own artwork, imported rather than redrawn:

     public/brand/source/ultimate-wordmark-source.svg

   It reads SAM'S / ULTIMATE BODY SHOP with barbell end plates either side. Two
   changes on import, both deliberate:

   1. The canvas was 741x207 with the artwork floating inside it. It is now
      cropped tight to the artwork (viewBox 65.9 43.2 596.9 158.9) so it can be
      sized by height without guessing at padding. The content aspect is 3.76.

   2. Every element was filled #fff. The files are emitted in bone and ink so
      the same lockup works on dark and light surfaces without the caller
      having to tint anything. `currentColor` does NOT work here: for an SVG
      loaded through <img> it resolves against the SVG document, not the page.

   Regenerate with `npm run brand` if the client supplies updated artwork.
   =========================================================================== */

const LOCKUP = {
  /** Content is 596.9 x 158.9, so an aspect of 3.756. */
  sm: { h: 24, w: 90, class: "h-[24px] w-[90px]" },
  md: { h: 40, w: 150, class: "h-[32px] w-[120px] sm:h-[40px] sm:w-[150px]" },
  lg: { h: 64, w: 240, class: "h-[48px] w-[180px] sm:h-[64px] sm:w-[240px]" },
} as const;

/**
 * Horizontal lockup, plus an optional HB qualifier.
 *
 * The qualifier sits OUTSIDE the logo on purpose, so the file stays exactly as
 * drawn. It earns its place: the business operates as Sam's Ultimate Body Shop
 * but this site is the Huntington Beach gym, and the domain is samsbodyshophb.
 *
 * Below `sm` the qualifier is hidden, and the lockup steps down to 32px, where
 * "SAM'S" still reads clearly even though the "ULTIMATE BODY SHOP" line is at
 * the edge of legibility. The full lockup needs about 40px of height to be
 * comfortably legible; do not set it smaller than the `sm` size.
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
        alt={title ?? "Sam's Ultimate Body Shop"}
        width={s.w}
        height={s.h}
        className={cn(s.class, "block")}
      />

      {showCity ? (
        <span className="hidden items-center gap-3 sm:inline-flex">
          <span
            aria-hidden="true"
            className={cn(
              "ml-3.5 w-px shrink-0 bg-line-2",
              size === "lg" ? "h-7" : "h-5",
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
