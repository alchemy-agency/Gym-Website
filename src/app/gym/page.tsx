import { Check } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqSection } from "@/components/FaqSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact, cta } from "@/content/business";
import {
  gymFaq,
  gymPath,
  gymReality,
  gymSteps,
  membershipTerms,
} from "@/content/offers";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Private Gym Membership",
  description:
    "Apply for membership at Sam's Body Shop HB, a capped private gym on Autopark Drive in Huntington Beach. No enrolment fee, no annual contract, no crowds.",
  alternates: { canonical: "/gym" },
};

export default function GymPage() {
  return (
    <>
      <PageHero
        title="The private gym."
        body={
          <p>
            A capped membership on Autopark Drive, Huntington Beach. It is never
            busy, because Sam adds members slowly on purpose.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#apply" size="lg" arrow>
              {cta.membership}
            </ButtonLink>
            <ButtonLink href="/training#book" variant="outline" size="lg">
              {cta.freeSession}
            </ButtonLink>
          </>
        }
        aside={
          <Plate
            photo={photos.exterior}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-[clamp(280px,42vh,520px)] w-full"
          />
        }
      />

      <Section rule density="default" aria-labelledby="reality-heading">
        <Reveal>
          <h2 id="reality-heading" className="display-2 max-w-[20ch]">
            What membership actually gets you.
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
            No equipment list here on purpose: lists go stale, and a list is a
            poor substitute for seeing the room. Come and look at it before you
            apply.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2">
          {gymReality.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              blur={false}
              className="flex min-h-[180px] flex-col bg-ink-2 p-6 sm:p-8"
            >
              <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-bone">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Terms ------------------------------------------------------------- */}

      <Section tone="ink-2" rule density="default" aria-labelledby="terms-heading">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 id="terms-heading" className="display-2 max-w-[20ch]">
              No contract maze. No enrolment fee.
            </h2>
            <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-bone-2">
              Most gyms make their money on people who stop coming. This one is
              capped, so it cannot afford to. The terms are short because there
              is not much to say.
            </p>

            <ul className="mt-10 border-t border-line">
              {[
                "Membership is reviewed by Sam, not an auto-approved checkout.",
                "No enrolment fee and no annual commitment to sign.",
                "A programme is written for you when you join, at no extra cost.",
                "Form checks on the floor whenever Sam is in the building.",
                "Cancel by telling Sam. No retention call, no notice period games.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-b border-line py-4"
                >
                  <Check
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ember"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-bone-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="border border-line bg-ink p-6 sm:p-8">
              <h3 className="label text-bone-3">The terms at a glance</h3>
              <dl className="mt-5 divide-y divide-line border-t border-line">
                {membershipTerms.map((term) => (
                  <div
                    key={term.label}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <dt className="text-[0.8125rem] text-bone-3">{term.label}</dt>
                    <dd className="text-right text-[0.875rem] text-bone">
                      {term.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-bone-3">
                Rates depend on the access you need, so they are quoted on
                application rather than published here.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Process
        steps={gymSteps}
        heading="Applying takes four fields."
        body="Sam reads every application himself and replies with times to walk the floor. There is no automated approval and no sales call queue."
        tone="ink"
        id="gym-process"
      />

      {/* Application ------------------------------------------------------- */}
      <Section rule density="default" aria-labelledby="apply">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <h2 id="apply" className="display-2 max-w-[18ch]">
              Apply for membership.
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-bone-2">
              Four required fields. Sam will come back to you, usually the same
              day, with times to see the gym.
            </p>

            <div className="mt-10">
              <LeadForm
                kind="membership"
                submitLabel={cta.membership}
                note="Your details are only used to reply to this application. Nothing is added to a mailing list."
              />
            </div>
          </Reveal>

          <Reveal from="right" delay={0.06}>
            <div className="border border-line bg-ink-2 p-6 sm:p-8">
              <span className="label text-bone-3">Before you apply</span>
              <dl className="mt-5 divide-y divide-line border-t border-line">
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">Location</dt>
                  <dd className="text-right text-[0.875rem] text-bone">
                    {contact.addressLine}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">Access</dt>
                  <dd className="text-right text-[0.875rem] text-bone">
                    Members only, no day passes
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.8125rem] text-bone-3">Capacity</dt>
                  <dd className="text-right text-[0.875rem] text-bone">
                    Capped by design
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

              <p className="mt-6 text-[0.9375rem] leading-relaxed text-bone-2">
                {gymPath.summary}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <FaqSection
        items={gymFaq}
        heading="Questions people ask before applying."
        tone="ink-2"
        id="gym-faq"
      />

      <CtaBand
        quote="No crowds, no queues, no contract."
        attribution="How this gym is run"
        body="Apply for a membership, or come and try a free session first and see the place for yourself."
        tone="ink"
      />
    </>
  );
}
