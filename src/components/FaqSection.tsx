import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

/** FAQ block. Heading stacked over the list, never split left/right. */
export function FaqSection({
  items,
  heading,
  body,
  tone = "ink",
  id = "faq-heading",
}: {
  items: readonly { q: string; a: string }[];
  heading: string;
  body?: string;
  tone?: "ink" | "ink-2";
  id?: string;
}) {
  return (
    <Section tone={tone} rule density="default" aria-labelledby={id}>
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal>
          <h2 id={id} className="display-2 max-w-[16ch]">
            {heading}
          </h2>
          {body ? (
            <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-bone-2">
              {body}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.06}>
          <Accordion items={items} defaultOpen={0} />
        </Reveal>
      </div>
    </Section>
  );
}
