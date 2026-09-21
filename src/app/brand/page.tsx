import type { Metadata } from "next";

import { Label } from "@/components/Bits";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "The brand",
  description: "Brand assets and usage.",
  robots: { index: false, follow: false },
};

const HEIGHTS = [32, 40, 56, 80, 120] as const;

export default function BrandPage() {
  return (
    <>
      <Section className="pt-12 lg:pt-16" density="tight">
        <Label>Internal reference</Label>
        <h1 className="display-1 mt-6 max-w-[16ch] text-bone">
          The lockup
          <br />
          and the mahiole.
        </h1>
        <p className="mt-7 max-w-[62ch] text-[1.0625rem] leading-relaxed text-bone-2">
          The lockup is the client&rsquo;s own artwork, imported rather than
          redrawn. It reads SAM&rsquo;S / ULTIMATE BODY SHOP, with barbell end
          plates either side. Use this page to check it at the sizes it is
          actually placed at.
        </p>
      </Section>

      <Section rule density="tight" tone="ink-2">
        <h2 className="display-2 max-w-[20ch]">The lockup.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          Content aspect is 3.76 to 1. Below about 40px tall the
          &ldquo;ULTIMATE BODY SHOP&rdquo; line stops reading, and below 32px
          the distress texture in the plates turns to noise. Do not set it
          smaller than 24px, which is the mobile nav size.
        </p>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 bg-void p-8">
            <Logo size="lg" />
            <span className="numeral text-[0.6875rem] text-bone-3">
              bone on ink, size=&quot;lg&quot;
            </span>
          </div>
          <div className="flex flex-col justify-between gap-10 bg-bone p-8">
            <Logo size="lg" variant="ink" />
            <span className="numeral text-[0.6875rem] text-bone-3">
              ink on bone, variant=&quot;ink&quot;
            </span>
          </div>
        </div>

        <h3 className="label mt-14 text-bone-3">Reproduction ladder</h3>
        <ul className="mt-6 space-y-6">
          {HEIGHTS.map((h) => (
            <li key={h} className="flex items-center gap-6">
              <div style={{ width: Math.round(h * 3.756) }}>
                <img
                  src="/brand/wordmark.svg"
                  alt={`Lockup at ${h} pixels tall`}
                  width={Math.round(h * 3.756)}
                  height={h}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <span className="numeral text-[0.625rem] text-bone-3">{h}px</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section rule density="tight">
        <h2 className="display-2 max-w-[20ch]">The mahiole.</h2>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
          Not a logo. A background element, used at very low opacity behind
          otherwise plain areas so the brand is felt rather than read. It is a
          Hawaiian feather helmet, which is where the Huntington Beach roots
          are allowed to show. It never carries information, so it never rises
          above about 6% opacity and never sits under body copy.
        </p>

        <div className="mt-10 grid gap-px bg-line sm:grid-cols-3">
          {[0.04, 0.06, 0.1].map((o) => (
            <div key={o} className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-ink">
              <div
                aria-hidden="true"
                className="mahiole absolute inset-0"
                style={{ opacity: o }}
              />
              <span className="numeral relative text-[0.6875rem] text-bone-3">
                opacity {o}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section rule density="tight" tone="ink-2">
        <h2 className="display-2 max-w-[20ch]">Files.</h2>
        <ul className="mt-6 space-y-2 text-[0.9375rem] text-bone-2">
          <li>
            <code className="numeral">/brand/wordmark.svg</code> and{" "}
            <code className="numeral">/brand/wordmark-ink.svg</code>
          </li>
          <li>
            <code className="numeral">src/app/icon.svg</code> (favicon, from the
            end plates)
          </li>
          <li>
            <code className="numeral">/brand/mahiole.png</code>, used as a CSS
            mask so it can be tinted
          </li>
        </ul>
        <p className="mt-6 max-w-[70ch] text-xs leading-relaxed text-bone-3">
          Re-run <code className="numeral">npm run brand</code> if the client
          supplies updated artwork. The import script crops the canvas tight,
          emits bone and ink variants, and validates that the output is
          well-formed XML.
        </p>
      </Section>
    </>
  );
}
