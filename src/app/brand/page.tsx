import type { Metadata } from "next";

import { Label } from "@/components/Bits";
import { Logo, LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "The mark",
  description: "Brand assets and usage rules.",
  robots: { index: false, follow: false },
};

/* 16 / 20 / 24 / 32 / 48 / 64 / 96 / 160 */
const LADDER = [
  { px: 16, cls: "h-4" },
  { px: 20, cls: "h-5" },
  { px: 24, cls: "h-6" },
  { px: 32, cls: "h-8" },
  { px: 48, cls: "h-12" },
  { px: 64, cls: "h-16" },
  { px: 96, cls: "h-24" },
  { px: 160, cls: "h-40" },
] as const;

const LOCKUP_LADDER = ["lg", "md", "sm"] as const;

export default function BrandPage() {
  return (
    <>
      <Section className="pt-12 lg:pt-16" density="tight">
        <Label>Internal reference</Label>
        <h1 className="display-1 mt-6 max-w-[16ch] text-bone">
          The mark
          <br />
          and the lockup.
        </h1>
        <p className="mt-7 max-w-[62ch] text-[1.0625rem] leading-relaxed text-bone-2">
          These are the supplied brand assets, imported rather than redrawn. The
          angular S mark and the oblique condensed letterforms are exactly as
          drawn. Use this page to check reproduction sizes and colourways before
          placing the logo anywhere.
        </p>
      </Section>

      {/* Mark -------------------------------------------------------------- */}
      <Section rule density="tight" tone="ink-2">
        <h2 className="display-2 max-w-[20ch]">The mark.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          The mark takes <code className="numeral text-ember-2">currentColor</code>,
          so one asset works on any background. It survives down to 16 pixels,
          which is where it spends most of its life.
        </p>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 bg-void p-8">
            <LogoMark className="h-32 w-auto text-ember" />
            <span className="numeral text-[0.6875rem] text-bone-3">
              ember on ink
            </span>
          </div>
          <div className="flex flex-col justify-between gap-10 bg-bone p-8">
            <LogoMark className="h-32 w-auto text-ink" />
            <span className="numeral text-[0.6875rem] text-bone-3">
              ink on bone
            </span>
          </div>
        </div>

        <h3 className="label mt-14 text-bone-3">Reproduction ladder</h3>
        <ul className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-8">
          {LADDER.map((step) => (
            <li key={step.px} className="flex flex-col items-center gap-3">
              <LogoMark
                className={`${step.cls} w-auto text-ember`}
                title={`Mark at ${step.px} pixels`}
              />
              <span className="numeral text-[0.625rem] text-bone-3">
                {step.px}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Lockup ------------------------------------------------------------ */}
      <Section rule density="tight">
        <h2 className="display-2 max-w-[20ch]">The lockup.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          Mark and lettering are one drawing. Do not separate, re-space or
          re-typeset them: the letterforms are custom and oblique, and no web
          font matches them.
        </p>

        <div className="mt-10 space-y-px bg-line">
          {LOCKUP_LADDER.map((size) => (
            <div
              key={size}
              className="flex flex-wrap items-center justify-between gap-6 bg-ink px-6 py-8"
            >
              <Logo size={size} />
              <span className="numeral text-[0.6875rem] text-bone-3">
                size=&quot;{size}&quot;
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 bg-bone p-8">
            <Logo variant="ink" size="lg" />
            <span className="numeral text-[0.6875rem] text-bone-3">
              ink lettering, for light surfaces
            </span>
          </div>
          <div className="flex flex-col justify-between gap-10 bg-void p-8">
            <Logo size="lg" showCity />
            <span className="numeral text-[0.6875rem] text-bone-3">
              with the HB qualifier
            </span>
          </div>
        </div>
      </Section>

      {/* Colour ------------------------------------------------------------ */}
      <Section rule density="tight" tone="ink-2">
        <h2 className="display-2 max-w-[20ch]">Colour.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          The mark is{" "}
          <code className="numeral text-ember-2">#ff610f</code>. That is the
          exact value from the supplied files, and it is the same orange the
          site uses for its accent. Do not tint, gradient or desaturate it, and
          do not put it on a mid tone where it stops reading.
        </p>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-3">
          {[
            { bg: "bg-void", fg: "text-ember", label: "Ember on ink", sub: "Default" },
            { bg: "bg-bone", fg: "text-ink", label: "Ink on bone", sub: "Print and light surfaces" },
            { bg: "bg-ember", fg: "text-ink", label: "Ink on ember", sub: "Campaign and signage" },
          ].map((swatch) => (
            <Reveal
              key={swatch.label}
              blur={false}
              className={`flex flex-col items-center justify-center gap-6 p-10 ${swatch.bg}`}
            >
              <LogoMark className={`h-14 w-auto ${swatch.fg}`} />
              <div className="text-center">
                <p
                  className={cnLocal(
                    "text-[0.875rem]",
                    swatch.bg === "bg-void" ? "text-bone" : "text-ink",
                  )}
                >
                  {swatch.label}
                </p>
                <p
                  className={cnLocal(
                    "label mt-1",
                    swatch.bg === "bg-void" ? "text-bone-3" : "text-ink/75",
                  )}
                >
                  {swatch.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Rules ------------------------------------------------------------- */}
      <Section rule density="tight">
        <h2 className="display-2 max-w-[20ch]">Four rules.</h2>

        <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          {[
            {
              n: "01",
              t: "Clear space",
              b: "Leave a margin of at least 25% of the mark's height on every side. Nothing enters it: not text, not a rule, not a photograph edge.",
            },
            {
              n: "02",
              t: "Minimum size",
              b: "16px for the mark, 22px tall for the lockup. Below that the counters in B, D and O close up and the lettering turns to mud.",
            },
            {
              n: "03",
              t: "Do not recolour the mark",
              b: "Ember, ink or bone. Never a second hue, never a gradient, never an outline version.",
            },
            {
              n: "04",
              t: "Do not rebuild the lockup",
              b: "The lettering is custom and oblique. Setting the trading name in Archivo or any other web font is a different logo, not this one.",
            },
          ].map((rule, i) => (
            <Reveal
              key={rule.n}
              delay={i * 0.04}
              blur={false}
              className="flex flex-col gap-6 bg-ink p-6 sm:p-8"
            >
              <span className="numeral text-[0.8125rem] text-ember">{rule.n}</span>
              <div>
                <h3 className="display-3 text-bone">{rule.t}</h3>
                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-bone-2">
                  {rule.b}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 max-w-[70ch] border-t border-line pt-8">
          <h3 className="label text-bone-3">Files</h3>
          <ul className="mt-4 space-y-2 text-[0.9375rem] text-bone-2">
            <li>
              <code className="numeral">/brand/wordmark.svg</code> and{" "}
              <code className="numeral">/brand/wordmark-ink.svg</code> - the lockup
            </li>
            <li>
              <code className="numeral">/brand/mark.svg</code> and{" "}
              <code className="numeral">/brand/mark-bone.svg</code> - the mark alone
            </li>
            <li>
              <code className="numeral">src/app/icon.svg</code> - favicon
            </li>
            <li>
              <code className="numeral">src/components/brand/markPath.ts</code> -
              generated path data for the React component
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-bone-3">
            The wordmark source painted its letter counters with a hard coded
            black shape, which only worked on the black it was drawn against.
            They are merged into the letterforms as real holes now, so the lockup
            is background independent. Re-run{" "}
            <code className="numeral">node scripts/import-brand.mjs</code> if the
            client supplies updated artwork.
          </p>
        </div>
      </Section>
    </>
  );
}

/* Local helper so the swatch ternaries stay readable inline. */
function cnLocal(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}
