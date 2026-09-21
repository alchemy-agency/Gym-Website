import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { ButtonLink } from "@/components/Button";
import { Plate } from "@/components/Plate";
import { Stamp } from "@/components/Bits";
import { cta } from "@/content/business";
import { photos } from "@/content/photos";

/**
 * HERO - asymmetric split.
 * Exactly four text elements: brand strip, headline, subtext, two CTAs.
 * No trust micro-strip, no tagline under the buttons, no scroll cue.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-12 lg:pt-14 lg:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(120%_70%_at_78%_-6%,rgba(27,71,51,0.5),transparent_62%)]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* Copy ---------------------------------------------------------- */}
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Stamp className="text-bone-3">ACE certified personal trainer</Stamp>
              <span aria-hidden="true" className="hidden h-3 w-px bg-line-2 sm:block" />
              <Stamp className="text-bone-3">Owner-operated gym</Stamp>
            </div>

            <h1 className="display-1 mt-7 text-bone">
              Coaching,
              <br />
              without the crowd.
            </h1>

            <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-bone-2 sm:text-lg">
              Sam Axelrode trains you one to one, in the private Huntington
              Beach gym he owns. The first session is free.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/training#book" size="lg" arrow>
                {cta.freeSession}
              </ButtonLink>
              <ButtonLink href="/gym#apply" variant="outline" size="lg">
                {cta.membership}
              </ButtonLink>
            </div>
          </div>

          {/* Plate --------------------------------------------------------- */}
          <div className="relative">
            <Plate
              photo={photos.hero}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-[clamp(300px,44vh,560px)] w-full"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 hidden h-24 w-px bg-line-2 lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 hidden h-px w-24 bg-line-2 lg:block"
            />

            <a
              href="#the-two-ways-in"
              className="group absolute bottom-0 left-0 hidden items-center gap-2 bg-ink px-4 py-3 text-[0.8125rem] text-bone-2 transition-colors hover:text-bone lg:inline-flex"
            >
              Two ways to train here
              <ArrowUpRight
                size={13}
                weight="bold"
                aria-hidden="true"
                className="text-ember transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
