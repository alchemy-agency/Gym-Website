import type { Metadata } from "next";

import { Label } from "@/components/Bits";
import { Logo, LogoMark, MARKS, type MarkName } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "The mark",
  description: "Logo construction and options.",
  robots: { index: false, follow: false },
};

const ORDER: MarkName[] = ["billet", "plate", "key"];

/* 16 / 20 / 24 / 32 / 48 / 64 / 96 */
const LADDER = [
  "h-4 w-4",
  "h-5 w-5",
  "h-6 w-6",
  "h-8 w-8",
  "h-12 w-12",
  "h-16 w-16",
  "h-24 w-24",
] as const;

const LADDER_PX = [16, 20, 24, 32, 48, 64, 96] as const;

export default function BrandPage() {
  return (
    <>
      <Section className="pt-12 lg:pt-16" density="tight">
        <Label>Internal reference</Label>
        <h1 className="display-1 mt-6 max-w-[16ch] text-bone">
          One family,
          <br />
          three levels of detail.
        </h1>
        <p className="mt-7 max-w-[62ch] text-[1.0625rem] leading-relaxed text-bone-2">
          All three marks share the same construction, so they are
          interchangeable and unmistakably related: a 32 unit grid, a 22 unit
          square, and an 8 unit chamfer at exactly 45 degrees taken off the top
          right corner. The chamfer uses the same vocabulary as the radius-0
          layout system, which is what makes the mark read as a machined part
          instead of a rounded app icon.
        </p>
        <p className="mt-5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-bone-2">
          The chamfered square on its own is a shape, not an idea. Each variant
          adds exactly one idea and nothing more. Change{" "}
          <code className="numeral text-ember-2">DEFAULT_MARK</code> in{" "}
          <code className="numeral text-ember-2">src/components/Logo.tsx</code>{" "}
          to switch, or pass{" "}
          <code className="numeral text-ember-2">mark</code> to use a specific
          one in a specific place.
        </p>
      </Section>

      {/* The three options ------------------------------------------------- */}
      {ORDER.map((name) => (
        <Section key={name} rule density="tight" tone="ink-2">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Reveal blur={false} className="flex flex-col gap-6">
              <div className="flex h-[13.5rem] w-[13.5rem] items-center justify-center bg-void">
                <LogoMark
                  mark={name}
                  inset
                  title={`${MARKS[name].label} mark`}
                  className="h-24 w-24 text-ember"
                />
              </div>

              <div className="flex h-[13.5rem] w-[13.5rem] items-center justify-center bg-bone">
                <LogoMark
                  mark={name}
                  title={`${MARKS[name].label} mark in ink on bone`}
                  className="h-24 w-24 text-ink"
                />
              </div>
            </Reveal>

            <Reveal delay={0.06} blur={false}>
              <div className="flex items-baseline gap-4">
                <h2 className="display-2 text-bone">{MARKS[name].label}</h2>
                <span className="numeral text-[0.8125rem] text-ember">
                  {String(ORDER.indexOf(name) + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {MARKS[name].idea}
              </p>

              <h3 className="label mt-10 text-bone-3">Reproduction ladder</h3>
              <ul className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-6">
                {LADDER.map((cls, i) => (
                  <li key={cls} className="flex flex-col items-center gap-3">
                    <LogoMark
                      mark={name}
                      title={`${MARKS[name].label} at ${LADDER_PX[i]} pixels`}
                      className={`${cls} text-ember`}
                    />
                    <span className="numeral text-[0.625rem] text-bone-3">
                      {LADDER_PX[i]}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      ))}

      {/* Colourways -------------------------------------------------------- */}
      <Section rule density="tight">
        <h2 className="display-2 max-w-[20ch]">Colourways.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          Ember on ink is the primary. Bone on ink is the quiet one, for use
          beside photography. Ink on bone is the print and light-surface
          version. The mark takes{" "}
          <code className="numeral text-ember-2">currentColor</code>, so it
          inherits whatever it is placed in without a second asset.
        </p>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-3">
          {[
            { bg: "bg-void", fg: "text-ember", label: "Ember on ink", sub: "Primary" },
            { bg: "bg-void", fg: "text-bone", label: "Bone on ink", sub: "Beside photography" },
            { bg: "bg-bone", fg: "text-ink", label: "Ink on bone", sub: "Print and light surfaces" },
          ].map((swatch, i) => (
            <Reveal
              key={swatch.label}
              delay={i * 0.05}
              blur={false}
              className={`flex flex-col items-center justify-center gap-5 p-10 ${swatch.bg}`}
            >
              <LogoMark className={`h-14 w-14 ${swatch.fg}`} />
              <div className="text-center">
                <p
                  className={`text-[0.875rem] ${swatch.bg === "bg-bone" ? "text-ink" : "text-bone"}`}
                >
                  {swatch.label}
                </p>
                <p
                  className={`label mt-1 ${swatch.bg === "bg-bone" ? "text-bone-3" : "text-bone-3"}`}
                >
                  {swatch.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Lockup ------------------------------------------------------------ */}
      <Section rule density="tight" tone="ink-2">
        <h2 className="display-2 max-w-[20ch]">The lockup.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          Mark, wordmark, hairline, location qualifier. The hairline is doing
          real work: without it, HB reads as part of the trading name. The
          wordmark is live text in Archivo Expanded Bold at -2% tracking, not
          outlined paths, so it stays crisp at any density and remains readable
          to assistive technology.
        </p>

        <div className="mt-10 space-y-px bg-line">
          {(["lg", "md", "sm"] as const).map((size) => (
            <div
              key={size}
              className="flex flex-wrap items-center justify-between gap-6 bg-ink-2 px-6 py-8"
            >
              <Logo size={size} />
              <span className="numeral text-[0.6875rem] text-bone-3">
                size=&quot;{size}&quot;
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 bg-bone px-5 py-4">
            <LogoMark className="h-5 w-5 text-ink" />
            <span className="wordmark text-[0.9375rem] text-ink">
              Sam&rsquo;s Body Shop
            </span>
          </div>
          <span className="label text-bone-3">Ink lockup, for light surfaces</span>
        </div>
      </Section>

      {/* Favicon ----------------------------------------------------------- */}
      <Section rule density="tight">
        <h2 className="display-2 max-w-[20ch]">What matters most.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          The mark spends nearly all of its life at 16 pixels. If it does not
          resolve there, nothing else about it counts.
        </p>

        <div className="mt-10 flex flex-wrap items-end gap-10">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 bg-bone px-3 py-2">
              <LogoMark className="h-4 w-4 text-ember" />
              <span className="text-[0.6875rem] text-ink">Body Shop</span>
            </div>
            <span className="numeral text-[0.625rem] text-bone-3">
              16px, light browser chrome
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 bg-ink-4 px-3 py-2">
              <LogoMark className="h-4 w-4 text-ember" />
              <span className="text-[0.6875rem] text-bone">Body Shop</span>
            </div>
            <span className="numeral text-[0.625rem] text-bone-3">
              16px, dark browser chrome
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <LogoMark className="h-8 w-8 text-ember" />
            <span className="numeral text-[0.625rem] text-bone-3">
              32px, touch icon
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
