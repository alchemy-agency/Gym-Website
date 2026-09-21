import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { ContactLinks } from "@/components/ContactLinks";
import { PageHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact, hours } from "@/content/business";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Visit the Gym",
  description:
    "Find Sam's Body Shop HB at 7351 Autopark Drive, Huntington Beach, CA 92648. Training is by appointment and the gym floor is members only.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <PageHero
        title="Come and see it."
        body={
          <p>
            You are welcome to look at the place before committing to anything.
            Message Sam, or book a free session and see it while you train.
          </p>
        }
        aside={
          <Plate
            photo={photos.coastal}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-[clamp(260px,38vh,460px)] w-full"
          />
        }
      />

      <Section rule density="default" aria-labelledby="find-heading">
        <Reveal>
          <h2 id="find-heading" className="display-2 max-w-[20ch]">
            {contact.address.street}, {contact.address.city}.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="stamp text-bone-3">Address</h3>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-4 flex items-start gap-2.5 text-bone transition-colors hover:text-ember-2"
            >
              <MapPin
                size={16}
                weight="bold"
                aria-hidden="true"
                className="mt-1 shrink-0 text-bone-3 transition-colors group-hover:text-ember-2"
              />
              <span className="text-[0.9375rem] leading-relaxed">
                {contact.address.street}
                <br />
                {contact.address.city}, {contact.address.state}{" "}
                {contact.address.zip}
              </span>
            </a>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-4 inline-flex items-center gap-2 text-sm text-bone-2 transition-colors hover:text-bone"
            >
              Get directions
              <ArrowUpRight
                size={13}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div>
            <h3 className="stamp text-bone-3">When</h3>
            <dl className="mt-4 divide-y divide-line border-t border-line">
              {hours.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="text-[0.8125rem] text-bone-3">{row.label}</dt>
                  <dd className="text-right text-[0.9375rem] text-bone">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="stamp text-bone-3">Reach Sam</h3>
            <ContactLinks
              layout="stack"
              className="mt-4"
              itemClassName="text-[0.9375rem]"
            />
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-bone-3">
              Calling is the fastest route. Sam trains most of the day and picks
              up between clients.
            </p>
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="border border-line bg-ink-2 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-bone">
              Finding the unit
            </h3>
            <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-bone-2">
              Autopark Drive runs through an industrial pocket just off the 405,
              south of the freeway. Parking is directly outside the door. If you
              cannot spot the unit on your first visit, call Sam and he will
              walk you in.
            </p>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        quote="“Half of the battle is just showing up.”"
        attribution="Sam Axelrode, ACE certified personal trainer"
        body="Book a free session and see the gym while you train, or apply for a membership and come and look first."
        tone="ink-2"
      />
    </>
  );
}
