import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Dot } from "@/components/Bits";
import { Plate } from "@/components/Plate";
import { calendlyUrl } from "@/content/business";
import { gymPath, trainingPath } from "@/content/offers";
import type { Photo } from "@/content/photos";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";

type Path = typeof gymPath | typeof trainingPath;

const PANELS: {
  path: Path;
  photo?: Photo;
  cta: string;
  href: string;
}[] = [
  {
    path: gymPath,
    photo: photos.exterior,
    cta: "How membership works",
    href: "/gym#apply",
  },
  {
    path: trainingPath,
    /* No photograph here on purpose. One photo panel against one solid one
       gives the pair an asymmetry it did not have when both were images, and
       it stops the section from burning two of the site's handful of real
       photographs to say the same thing twice. */
    cta: "How training works",
    href: calendlyUrl,
  },
];

/**
 * THE TWO WAYS IN - full-bleed split panel.
 * This section carries the whole dual-business model, so it is the only place
 * on the site where two equal columns are the right answer.
 *
 * The scrim is deliberately shallow. An earlier version ran `via-ink/72` down
 * the middle of each panel, which swallowed the photograph and made it read as
 * a thin strip that had been cropped off rather than as a background.
 */
export function TwoWays() {
  return (
    <section
      id="the-two-ways-in"
      aria-labelledby="two-ways-heading"
      className="border-t border-line"
    >
      <h2 id="two-ways-heading" className="sr-only">
        Two ways to train here
      </h2>

      <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {PANELS.map(({ path, photo, cta, href }) => (
          <div
            key={path.href}
            className={cn(
              "group relative isolate flex min-h-[460px] flex-col justify-end px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[560px] lg:px-12 lg:py-14",
              !photo && "glow-ember bg-void",
            )}
          >
            {photo ? (
              <>
                {/* Wrapper carries the absolute positioning. Do NOT pass
                    `absolute inset-0` to <Plate> itself: Plate sets `relative`
                    for the fill image, and both are Tailwind `position`
                    utilities, so which one wins depends on their order in the
                    generated stylesheet rather than the order you write them.
                    That silently collapsed this photo into a 50px strip. */}
                <div className="absolute inset-0 -z-10">
                  <Plate
                    photo={photo}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/62 to-ink/10"
                />
              </>
            ) : null}

            <div className="flex items-center gap-2.5">
              <Dot />
              <span className="label text-bone">{path.kicker}</span>
            </div>

            <h3 className="display-2 mt-5 text-bone">{path.title}</h3>

            <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-relaxed text-bone-2 sm:text-base">
              {path.summary}
            </p>

            <dl className="mt-8 max-w-[30rem] divide-y divide-line/80 border-t border-line/80">
              {path.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-3"
                >
                  <dt className="text-[0.8125rem] text-bone-3">{fact.label}</dt>
                  <dd className="text-right text-[0.875rem] text-bone">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-ember-2"
            >
              {cta}
              <ArrowUpRight
                size={14}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
