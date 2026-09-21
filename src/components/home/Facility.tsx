import { ParallaxPlate } from "@/components/ParallaxPlate";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { gymFeatures } from "@/content/offers";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";

const TONES: Record<string, string> = {
  "ink-2": "bg-ink-2",
  "ink-3": "bg-ink-3",
  pine: "bg-pine",
};

/**
 * THE FACILITY
 * A full-bleed parallax band gives the reader a breath with no copy on it at
 * all, then the detail lands as a gapless bento: five items, five cells, one
 * photographic and two tonally tinted so the grid has rhythm.
 */
export function Facility() {
  return (
    <>
      <div className="border-t border-line">
        <ParallaxPlate
          photo={photos.conditioning}
          sizes="100vw"
          travel={10}
          className="h-[46vh] min-h-[300px] w-full lg:h-[56vh]"
        />
      </div>

      <Section rule density="default" aria-labelledby="facility-heading">
        <Reveal>
          <h2 id="facility-heading" className="display-2 max-w-[22ch]">
            The floor is the argument.
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-bone-2">
            Racks, barbells, dumbbells, turf and conditioning equipment, with a
            membership small enough that you never wait for any of it.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px bg-line lg:mt-14 lg:grid-cols-12">
          {gymFeatures.map((feature, i) => (
            <Reveal
              key={feature.id}
              delay={i * 0.05}
              className={cn(
                "relative flex min-h-[240px] flex-col justify-end p-6 sm:p-8 lg:min-h-[280px]",
                TONES[feature.tone],
                feature.photo ? "lg:col-span-8" : "lg:col-span-4",
              )}
            >
              {feature.photo ? (
                <>
                  <Plate
                    photo={photos.detail}
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="absolute inset-0 h-full w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"
                  />
                </>
              ) : null}

              <div className="relative">
                <h3 className="display-3 max-w-[18ch] text-bone">{feature.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-bone-2">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
