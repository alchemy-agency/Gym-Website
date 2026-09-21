import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { gymFeatures } from "@/content/offers";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";

const TONES: Record<string, string> = {
  "ink-2": "bg-ink-2",
  "ink-3": "bg-ink-3",
  void: "bg-void",
};

/**
 * Five items, five cells: 8+4 across the first row, then 4+4+4. One cell
 * carries a photograph and two carry tonal tints, so the grid has rhythm
 * instead of being five identical text boxes. No empty cells, no filler.
 */
export function Bento({
  heading,
  body,
  tone = "ink",
}: {
  heading: string;
  body: string;
  tone?: "ink" | "ink-2";
}) {
  return (
    <Section tone={tone} rule density="default" aria-labelledby="bento-heading">
      <Reveal>
        <h2 id="bento-heading" className="display-2 max-w-[22ch]">
          {heading}
        </h2>
        <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-bone-2">
          {body}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px bg-line lg:mt-14 lg:grid-cols-12">
        {gymFeatures.map((feature, i) => (
          <Reveal
            key={feature.id}
            delay={i * 0.05}
            blur={false}
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
  );
}
