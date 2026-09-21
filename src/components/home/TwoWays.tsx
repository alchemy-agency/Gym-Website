import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Dot } from "@/components/Bits";
import { Plate } from "@/components/Plate";
import { gymPath, trainingPath } from "@/content/offers";
import { photos, type Photo } from "@/content/photos";

type Path = typeof gymPath | typeof trainingPath;

const PANELS: { path: Path; photo: Photo; cta: string; href: string }[] = [
  {
    path: gymPath,
    photo: photos.gymFloor,
    cta: "How membership works",
    href: "/gym#apply",
  },
  {
    path: trainingPath,
    photo: photos.coaching,
    cta: "How training works",
    href: "/training#book",
  },
];

/**
 * THE TWO WAYS IN - full-bleed split panel.
 * This section carries the whole dual-business model, so it is the only place
 * on the site where two equal columns are the right answer.
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
            className="group relative isolate flex min-h-[540px] flex-col justify-end px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[660px] lg:px-12 lg:py-14"
          >
            <Plate
              photo={photo}
              tone="deep"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 -z-10 h-full w-full"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/72 to-ink/25"
            />

            <div className="flex items-center gap-2.5">
              <Dot />
              <span className="stamp text-bone">{path.kicker}</span>
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
