import Image from "next/image";

import type { Photo } from "@/content/photos";
import { cn } from "@/lib/cn";

type PlateProps = {
  photo: Photo;
  /** Must include a height or aspect ratio, e.g. `aspect-4/5`. */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Dark gradient from the bottom so overlaid type stays legible. */
  scrim?: boolean;
  /** `deep` pushes the plate further back so type in front of it can lead. */
  tone?: "default" | "deep";
};

/**
 * Every photograph on the site goes through this component.
 *
 * PHOTO LOCK: the image is desaturated and a pine duotone is blended over it,
 * which is what makes a set of unrelated photographs read as one art-directed
 * shoot and keeps the ember accent as the only real colour on the page.
 */
export function Plate({
  photo,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  scrim = false,
  tone = "default",
}: PlateProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-ink-3", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "mono-photo object-cover",
          tone === "deep" && "brightness-[0.72]",
          imgClassName,
        )}
      />
      <div aria-hidden="true" className="mono-duotone pointer-events-none absolute inset-0" />
      {scrim ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
        />
      ) : null}
    </div>
  );
}
