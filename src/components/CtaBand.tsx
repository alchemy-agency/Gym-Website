import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cta } from "@/content/business";

/**
 * Closing call to action. Centered on purpose: it is a manifesto, not a layout.
 * Both intents appear here with the same labels used everywhere else.
 */
export function CtaBand({
  quote,
  attribution,
  body,
  tone = "ink-2",
}: {
  quote: string;
  attribution: string;
  body: string;
  tone?: "ink" | "ink-2" | "pine";
}) {
  return (
    <Section tone={tone} rule density="loose" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-[56rem] text-center">
        <Reveal>
          <h2 id="cta-heading" className="display-1 mx-auto max-w-[19ch] text-bone">
            {quote}
          </h2>
          <p className="stamp mt-7 text-bone-3">{attribution}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-bone-2">
            {body}
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/training#book" size="lg" arrow>
              {cta.freeSession}
            </ButtonLink>
            <ButtonLink href="/gym#apply" variant="outline" size="lg">
              {cta.membership}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
