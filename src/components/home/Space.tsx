import { ParallaxPlate } from "@/components/ParallaxPlate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { gymReality } from "@/content/offers";
import { photos } from "@/content/photos";

/**
 * THE SPACE
 *
 * A wide band of Sam's own photograph of the mural, then four plain statements
 * about how the room works.
 *
 * This replaced a pinned horizontal pan of equipment categories. That section
 * was built on an invented equipment list, and inventing a list is worse than
 * omitting one: somebody could join on the strength of it. The pan is gone
 * rather than repopulated with guesses. If Sam wants an equipment list, get it
 * from him and it can come back.
 */
export function Space() {
  return (
    <>
      <div className="border-t border-line">
        <ParallaxPlate
          photo={photos.mural}
          sizes="100vw"
          travel={8}
          className="h-[40vh] min-h-[260px] w-full lg:h-[58vh]"
        />
      </div>

      <Section
        rule
        density="default"
        className="overflow-hidden"
        aria-labelledby="space-heading"
      >
        {/* Second and last placement. The grid below is plain by design, so a
            faint mahiole in the dead space above it stops the section reading
            as an empty list of statements. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] opacity-[0.04]"
        >
          <div className="mahiole h-full w-full" />
        </div>

        <Reveal className="relative">
          <h2 id="space-heading" className="display-2 max-w-[22ch]">
            A members-only room, run by the person who coaches in it.
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
            There is no equipment list on this page, on purpose. Lists go stale
            and a list is a poor substitute for standing in the room. Come and
            look at it before you decide anything.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:mt-14">
          {gymReality.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              blur={false}
              className="flex min-h-[180px] flex-col bg-ink-2 p-6 sm:p-8"
            >
              <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-bone">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
