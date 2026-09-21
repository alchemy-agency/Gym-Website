import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import { ButtonLink } from "@/components/Button";
import { MarkerGroups } from "@/components/MarkerGroups";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cta } from "@/content/business";
import {
  panel,
  panelDisclaimer,
  panelReasons,
} from "@/content/panel";

/**
 * THE PANEL - the colour block.
 * The page has been monochrome and near-black for five sections. This is the
 * one moment it goes full-bleed deep pine, because this is the section that
 * carries the actual offer. The right hand column is a readout, not a card.
 */
export function PanelBlock() {
  return (
    <Section tone="pine" rule density="loose" aria-labelledby="panel-heading">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.94fr] lg:gap-20">
        {/* Argument ------------------------------------------------------- */}
        <div>
          <h2 id="panel-heading" className="display-2 max-w-[24ch] text-bone">
            Buy a block of sessions and find out whether any of this is working.
          </h2>

          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-bone-2">
            {panel.summary}
          </p>

          <ul className="mt-10 border-t border-pine-3/45">
            {panelReasons.map((reason) => (
              <Reveal
                as="li"
                key={reason.title}
                className="border-b border-pine-3/45 py-6"
              >
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-bone">
                  {reason.title}
                </h3>
                <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-bone-2">
                  {reason.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/training#book" size="lg" arrow>
              {cta.freeSession}
            </ButtonLink>
            <ButtonLink href="/function-health" variant="outline" size="lg">
              What the panel covers
            </ButtonLink>
          </div>
        </div>

        {/* Readout -------------------------------------------------------- */}
        <Reveal from="right">
          <div className="border border-pine-3/45">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-pine-3/45 px-6 py-5">
              <span className="stamp text-bone">{panel.name}</span>
              <span className="stamp text-bone-2">
                Included with packages
              </span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6 border-b border-pine-3/45 px-6 py-7">
              <div>
                <p className="font-display text-[3.25rem] font-bold leading-none tracking-[-0.045em] text-bone">
                  {panel.testCount}+
                </p>
                <p className="mt-2.5 text-sm text-bone-2">markers measured</p>
              </div>
              <div className="sm:text-right">
                <p className="font-display text-2xl font-bold leading-none tracking-[-0.03em] text-bone">
                  {panel.valueLabel}
                </p>
                <p className="mt-2.5 text-sm text-bone-2">
                  value, at no extra cost
                </p>
              </div>
            </div>

            <MarkerGroups />
          </div>

          <p className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-bone-2">
            <ShieldCheck
              size={14}
              weight="bold"
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-ember-2"
            />
            <span>
              Sam programmes around your results. He does not diagnose
              anything. Clinical questions go to your doctor.
            </span>
          </p>
        </Reveal>
      </div>

      <p className="mt-14 max-w-[86ch] border-t border-pine-3/45 pt-6 text-xs leading-relaxed text-bone-2">
        {panelDisclaimer}
      </p>
    </Section>
  );
}
