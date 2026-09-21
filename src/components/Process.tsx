import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

export type Step = { n: string; title: string; body: string };

/**
 * HOW IT WORKS
 * Offset columns rather than equal boxes: the vertical stagger is what stops
 * this from reading as a default feature row.
 */
export function Process({
  steps,
  heading,
  body,
  tone = "ink",
  id = "process-heading",
}: {
  steps: readonly Step[];
  heading: string;
  body?: string;
  tone?: "ink" | "ink-2";
  id?: string;
}) {
  return (
    <Section tone={tone} rule density="default" aria-labelledby={id}>
      <Reveal>
        <h2 id={id} className="display-2 max-w-[20ch]">
          {heading}
        </h2>
        {body ? (
          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-bone-2">
            {body}
          </p>
        ) : null}
      </Reveal>

      <ol className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:pb-8">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 0.06}
            className={cn(
              "flex min-h-[200px] flex-col bg-ink-2 p-6 sm:p-7 lg:min-h-[240px]",
              i % 2 === 1 && "lg:translate-y-8",
            )}
          >
            <span
              aria-hidden="true"
              className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.05em] text-bone-3"
            >
              {step.n}
            </span>

            <div className="mt-auto pt-8">
              <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-bone">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
