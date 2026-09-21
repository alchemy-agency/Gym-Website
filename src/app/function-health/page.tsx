import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqSection } from "@/components/FaqSection";
import { MarkerGroups } from "@/components/MarkerGroups";
import { PageHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cta } from "@/content/business";
import {
  panel,
  panelDisclaimer,
  panelFaq,
  panelReasons,
  panelSteps,
} from "@/content/panel";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "The Function Health Panel",
  description: `Session packs at Sam's Body Shop HB include a complimentary ${panel.name} membership: ${panel.testCount}+ advanced lab tests covering heart, metabolic, hormone, thyroid, liver, kidney, nutrient and immune markers.`,
  alternates: { canonical: "/function-health" },
};

export default function FunctionHealthPage() {
  return (
    <>
      <PageHero
        title={
          <>
            {panel.testCount}+ markers.
            <br />
            Included.
          </>
        }
        body={
          <p>
            Buy a block of sessions with Sam and the {panel.name} panel comes
            with it. A {panel.valueLabel} annual membership, at no extra cost to
            you.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/training#book" size="lg" arrow>
              {cta.freeSession}
            </ButtonLink>
            <ButtonLink href="#measures" variant="outline" size="lg">
              See what it measures
            </ButtonLink>
          </>
        }
        aside={
          <Plate
            photo={photos.lab}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-[clamp(280px,42vh,520px)] w-full"
          />
        }
      />

      {/* Why it is here ---------------------------------------------------- */}
      <Section rule density="default" aria-labelledby="why-heading">
        <Reveal>
          <h2 id="why-heading" className="display-2 max-w-[22ch]">
            A baseline beats a guess.
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
            Most people start training without knowing their starting numbers.
            Six months later they cannot tell what actually changed, so they
            judge it on how they look and give up. This fixes that.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-line lg:grid-cols-3">
          {panelReasons.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={i * 0.05}
              className="flex min-h-[220px] flex-col bg-ink-2 p-6 sm:p-8"
            >
              <h3 className="display-3 max-w-[18ch] text-bone">
                {reason.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {reason.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What it measures -------------------------------------------------- */}
      <Section tone="pine" rule density="default" aria-labelledby="measures">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <h2 id="measures" className="display-2 max-w-[18ch] text-bone">
              What the panel covers.
            </h2>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-bone-2">
              A wide clinical screen, grouped below by body system. This is a
              representative sample rather than the full test list, which runs
              past {panel.testCount} individual markers.
            </p>

            <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-8">
              <div>
                <p className="font-display text-[3.25rem] font-bold leading-none tracking-[-0.045em] text-bone">
                  {panel.testCount}+
                </p>
                <p className="mt-2.5 text-sm text-bone-2">markers measured</p>
              </div>
              <div>
                <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-bone">
                  {panel.valueLabel}
                </p>
                <p className="mt-2.5 text-sm text-bone-2">value, included free</p>
              </div>
            </div>

            <p className="mt-10 flex max-w-[46ch] items-start gap-2.5 border-t border-pine-3/45 pt-6 text-sm leading-relaxed text-bone-2">
              <ShieldCheck
                size={15}
                weight="bold"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-ember-2"
              />
              <span>
                Ordered and processed by {panel.name}. Sam uses the results to
                programme. He does not diagnose anything.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <MarkerGroups size="full" className="border-b border-pine-3/45" />
          </Reveal>
        </div>
      </Section>

      <Process
        steps={panelSteps}
        heading="How it works once you buy a block."
        body="There is nothing to arrange in advance. It is added when you buy the sessions."
        tone="ink"
        id="panel-process"
      />

      <FaqSection
        items={panelFaq}
        heading="Questions about the panel."
        body="If something here is unclear, ask Sam directly rather than guessing. He would rather answer it before you buy anything."
        tone="ink-2"
        id="panel-faq"
      />

      <Section rule density="tight" aria-label="Disclaimer">
        <p className="max-w-[86ch] text-xs leading-relaxed text-bone-3">
          {panelDisclaimer}
        </p>
      </Section>

      <CtaBand
        quote="“Half of the battle is just showing up.”"
        attribution="Sam Axelrode, ACE certified personal trainer"
        body="Start with a free session, then decide whether you want the block and the panel."
        tone="ink"
      />
    </>
  );
}
