"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import type { Photo } from "@/content/photos";
import { cn } from "@/lib/cn";

type ParallaxPlateProps = {
  photo: Photo;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** How far the image travels, as a percentage of its own height. */
  travel?: number;
};

/**
 * Deep parallax plate. Communicates depth: the photograph is a window, the
 * content in front of it is what you are reading. Only used once on the home
 * page, on the facility shot, where the extra depth is worth the layer.
 */
export function ParallaxPlate({
  photo,
  className,
  sizes = "100vw",
  priority = false,
  travel = 9,
}: ParallaxPlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${travel}%`, `${travel}%`],
  );

  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden bg-ink-3", className)}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-[-12%]"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="mono-photo object-cover"
        />
      </motion.div>
      <div aria-hidden="true" className="mono-duotone pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
      />
    </div>
  );
}
