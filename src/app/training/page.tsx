import { Check, Quotes } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqSection } from "@/components/FaqSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact, cta } from "@/content/business";
import { packages, trainingFaq, trainingFocus } from "@/content/offers";
import { panel } from "@/content/panel";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Personal Training with Sam",
  description:
    "One-on-one personal training in a private Huntington Beach gym with Sam Axelrode, ACE certified. The first session is free. Session packs include a complimentary Function Health biomarker panel.",
  alternates: { canonical: "/training" },
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        title="Train with Sam."
        body={
          <>
            <p>
              One on one, in the gym he owns, which is why there is no
              membership fee on top of the sessions. ACE certified. The first
              session costs nothing.
            </p>
          </>
        }
        actions={
          <>
            <ButtonLink href="#book" size="lg" arrow>
              {cta.freeSession}
            </ButtonLink>
            <ButtonLink href="#packages" variant="outline" size="lg">
              See what a block includes
            </ButtonLink>
          </>
        }
        aside={
          <Plate
            photo={photos.coaching}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-[clamp(280px,42vh,520px)] w-full"
          />
        }
      />

      {/* What he trains for ------------------------------------------------ */}
      <Section tone="ink-2" rule density="default" aria-labelledby="focus-heading">
        <Reveal>
          <h2 id="focus-heading" className="display-2 max-w-[22ch]">
            Four things he is actually training for.
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-bone-2">
            Different methods, different muscle fibres, different intensities.
            Every block of sessions is built to move all four of these, not just
            the one you asked about.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2">
          {trainingFocus.map((focus, i) => (
            <Reveal
              key={focus.id}
              delay={i * 0.05}
              className="flex min-h-[200px] flex-col bg-ink-2 p-6 sm:p-8"
            >
              <h3 className="display-3 max-w-[18ch] text-bone">{focus.title}</h3>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {focus.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Packages ---------------------------------------------------------- */}
      <Section rule density="default" aria-labelledby="packages">
        <Reveal>
          <h2 id="packages" className="display-2 max-w-[20ch]">
            Three ways to work with him.
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-bone-2">
            Rates are given when you enquire, because they depend on how often
            you train and how long the block is. Nothing here obliges you to
            buy anything.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-line lg:grid-cols-3">
          {packages.map((pack, i) => (
            <Reveal
              key={pack.id}
              delay={i * 0.05}
              className={cn(
                "flex flex-col p-6 sm:p-8",
                pack.featured ? "bg-pine" : "bg-ink-2",
                pack.featured && "lg:-my-px lg:py-10",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "stamp",
                    pack.featured ? "text-ember-2" : "text-bone-3",
                  )}
                >
                  {pack.positioning}
                </span>
                {pack.featured ? (
                  <span className="stamp border border-ember px-2 py-1 text-ember-2">
                    Includes the panel
                  </span>
                ) : null}
              </div>

              <h3 className="display-3 mt-6 text-bone">{pack.name}</h3>

              <p
                className={cn(
                  "mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed",
                  pack.featured ? "text-bone-dim" : "text-bone-2",
                )}
              >
                {pack.detail}
              </p>

              <ul
                className={cn(
                  "mt-8 divide-y border-t",
                  pack.featured
                    ? "divide-pine-3/45 border-pine-3/45"
                    : "divide-line border-line",
                )}
              >
                {pack.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5">
                    <Check
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className={cn(
                        "mt-1 shrink-0",
                        pack.includesPanel && item.includes("Function Health")
                          ? "text-ember-2"
                          : "text-bone-3",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[0.875rem] leading-relaxed",
                        pack.includesPanel && item.includes("Function Health")
                          ? "text-bone"
                          : pack.featured
                            ? "text-bone-dim"
                            : "text-bone-2",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {/* One label per intent: every package card books the same
                    free session, so every card says the same thing. */}
                <ButtonLink
                  href="#book"
                  variant={pack.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  {cta.freeSession}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-xs leading-relaxed text-bone-3">
          Single sessions are available indefinitely, so you are never forced
          into a block. The block exists because it costs less per session and
          it carries the {panel.name} panel.
        </p>
      </Section>

      {/* Panel teaser ------------------------------------------------------ */}
      <Section tone="ink-2" rule density="tight" aria-labelledby="panel-teaser">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <h2 id="panel-teaser" className="display-2 max-w-[22ch]">
              Buy a block and get a {panel.testCount}+ marker blood panel.
            </h2>
            <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-bone-2">
              {panel.summary}
            </p>
            <Link
              href="/function-health"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-ember-2"
            >
              See exactly what the panel measures
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <Plate
              photo={photos.lab}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-[clamp(220px,30vh,340px)] w-full"
            />
          </Reveal>
        </div>
      </Section>

      {/* Booking ----------------------------------------------------------- */}
      <Section rule density="default" aria-labelledby="book-heading">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <h2 id="book-heading" className="display-2 max-w-[18ch]">
                Book the free session.
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-bone-2">
                Tell Sam what you are working toward. He will come back to you
                with times, usually the same day.
              </p>

              <div className="mt-10">
                <LeadForm
                  kind="free_session"
                  submitLabel={cta.freeSession}
                  note="No card, no deposit, no obligation past the hour. Sam replies personally."
                />
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal from="right">
              <div className="border border-line bg-ink-2 p-6 sm:p-8">
                <Quotes
                  size={20}
                  weight="fill"
                  aria-hidden="true"
                  className="text-ember"
                />
                <blockquote className="mt-4 font-display text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-bone">
                  I train out of the gym I own. No need to pay for a monthly
                  membership, just the training.
                </blockquote>
                <p className="stamp mt-4 text-bone-3">Sam Axelrode</p>
              </div>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">Where</dt>
                  <dd className="text-right text-[0.875rem] text-bone">
                    {contact.addressLine}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">Session length</dt>
                  <dd className="text-right text-[0.875rem] text-bone">60 minutes</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">First session</dt>
                  <dd className="text-right text-[0.875rem] text-bone">
                    Free, no card taken
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">Rather call?</dt>
                  <dd className="text-right text-[0.875rem]">
                    <a
                      href={contact.phoneHref}
                      className="text-bone underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember-2"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      <FaqSection
        items={trainingFaq}
        heading="Questions people ask before the first session."
        tone="ink"
        id="training-faq"
      />

      <CtaBand
        quote="“Half of the battle is just showing up.”"
        attribution="Sam Axelrode, ACE certified personal trainer"
        body="The first session is free and there is nothing to sign. Train for an hour, then decide."
        tone="ink-2"
      />
    </>
  );
}
