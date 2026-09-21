import { Plus, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import { ButtonLink } from "@/components/Button";
import { Counter } from "@/components/gsap/Counter";
import { PanelExplorer } from "@/components/PanelExplorer";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cta } from "@/content/business";
import { panel, panelDisclaimer, panelReasons } from "@/content/panel";

/**
 * THE PANEL - the deepest block on the page.
 *
 * The moment is created with light and scale rather than a second hue: the
 * darkest surface on the site, an ember ambient wash, a scrubbed counter and an
 * explorer the reader operates. Everything here is warm neutral plus ember.
 */
export function PanelBlock() {
  return (
    <Section
      tone="void"
      rule
      density="loose"
      className="glow-ember"
      aria-labelledby="panel-heading"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
        <Reveal>
          <h2 id="panel-heading" className="display-2 max-w-[24ch] text-bone">
            Buy a block of sessions and find out whether any of this is working.
          </h2>
          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-bone-2">
            {panel.summary}
          </p>
        </Reveal>

        {/* Stat row. The counter is the one thing on this page that measures
            something real, so it is allowed to be the largest number here. */}
        <Reveal from="right" className="lg:pb-2">
          <div className="flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-line-2 pt-6">
            <div>
              <p className="font-display text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.05em] text-bone">
                <Counter to={panel.testCount} suffix="+" />
              </p>
              <p className="label mt-3 text-bone-2">markers measured</p>
            </div>
            <div className="flex items-center gap-4">
              <Plus
                size={14}
                weight="bold"
                aria-hidden="true"
                className="hidden text-ember sm:block"
              />
              <div>
                <p className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-bone">
                  {panel.valueLabel}
                </p>
                <p className="label mt-3 text-bone-2">value, at no extra cost</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Explorer --------------------------------------------------------- */}
      <Reveal className="mt-12 lg:mt-16" blur={false}>
        <PanelExplorer />
      </Reveal>

      {/* Why it matters --------------------------------------------------- */}
      <div className="mt-14 grid gap-px border-t border-line-2 bg-line-2 pt-px lg:grid-cols-3">
        {panelReasons.map((reason, i) => (
          <Reveal
            key={reason.title}
            delay={i * 0.05}
            blur={false}
            className="bg-void px-0 pt-7 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-bone">
              {reason.title}
            </h3>
            <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-bone-2">
              {reason.body}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/training#book" size="lg" arrow>
            {cta.freeSession}
          </ButtonLink>
          <ButtonLink href="/function-health" variant="outline" size="lg">
            What the panel covers
          </ButtonLink>
        </div>

        <p className="flex max-w-[34ch] items-start gap-2.5 text-xs leading-relaxed text-bone-2">
          <ShieldCheck
            size={14}
            weight="bold"
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-ember-2"
          />
          <span>
            Sam programmes around your results. He does not diagnose anything.
          </span>
        </p>
      </div>

      <p className="mt-12 max-w-[86ch] border-t border-line-2 pt-6 text-xs leading-relaxed text-bone-2">
        {panelDisclaimer}
      </p>
    </Section>
  );
}
