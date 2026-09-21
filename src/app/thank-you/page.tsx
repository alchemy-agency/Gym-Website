import { Check, Phone } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/Button";
import { ThankYouTracker } from "@/components/forms/ThankYouTracker";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact } from "@/content/business";
import type { LeadKind } from "@/lib/lead";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message reached Sam.",
  robots: { index: false, follow: false },
};

const COPY: Record<
  LeadKind,
  { title: string; body: string; steps: { title: string; body: string }[] }
> = {
  free_session: {
    title: "Your session request is with Sam.",
    body: "He reads these himself and replies with times, usually the same day. Nothing else is needed from you right now.",
    steps: [
      {
        title: "Sam replies with times",
        body: "By phone or email, whichever you gave him. If you would rather not wait, call him directly.",
      },
      {
        title: "You pick a slot",
        body: "Sixty minutes, one to one, in the private gym. Wear something you can move in and bring water.",
      },
      {
        title: "You train",
        body: "He assesses how you move, asks what you are training for, and puts you through a real session.",
      },
    ],
  },
  membership: {
    title: "Your application is with Sam.",
    body: "He reviews every application personally. Expect to hear back with a time to walk the floor, usually the same day.",
    steps: [
      {
        title: "Sam reviews it",
        body: "He reads the goals and training history you wrote, not just your name.",
      },
      {
        title: "You walk the floor",
        body: "A short visit so you can see the space and ask about the access you need.",
      },
      {
        title: "You get a programme",
        body: "If you join, Sam writes your starting plan before you train on your own.",
      },
    ],
  },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const kind: LeadKind =
    params.type === "membership" ? "membership" : "free_session";
  const copy = COPY[kind];

  return (
    <>
      <ThankYouTracker kind={kind} />

      <Section density="loose" className="pt-16 lg:pt-20">
        <Reveal>
          <div className="max-w-[52rem]">
            <span className="label inline-flex items-center gap-2 border border-ember px-2.5 py-1.5 text-ember-2">
              <Check size={12} weight="bold" aria-hidden="true" />
              Received
            </span>

            <h1 className="display-1 mt-8 text-bone">{copy.title}</h1>

            <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-bone-2">
              {copy.body}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={contact.phoneHref} size="lg" arrow>
                Call Sam on {contact.phone}
              </ButtonLink>
              <ButtonLink href="/" variant="outline" size="lg">
                Back to the site
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px bg-line lg:mt-20 lg:grid-cols-3">
          {copy.steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.05}
              className="flex min-h-[200px] flex-col bg-ink-2 p-6 sm:p-8"
            >
              <span aria-hidden="true" className="label text-ember-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="display-3 mt-6 max-w-[18ch] text-bone">
                {step.title}
              </h2>
              <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-bone-2">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8">
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2.5 text-sm text-bone transition-colors hover:text-ember-2"
          >
            <Phone size={15} weight="bold" aria-hidden="true" className="text-bone-3" />
            <span className="tabular-nums">{contact.phone}</span>
          </a>

          <Link
            href="/function-health"
            className="text-sm text-bone-2 transition-colors hover:text-bone"
          >
            What the Function Health panel covers
          </Link>
        </div>
      </Section>
    </>
  );
}
