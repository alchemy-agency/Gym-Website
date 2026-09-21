import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";

import { ContactLinks } from "@/components/ContactLinks";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact, hours } from "@/content/business";
import { photos } from "@/content/photos";

/**
 * VISIT
 * Wide establishing shot, then the practicalities in three columns. The labels
 * here sit under the headline and above real content, so they are column
 * headings rather than decorative eyebrows.
 */
export function VisitBand() {
  return (
    <Section rule density="default" aria-labelledby="visit-heading">
      <Reveal>
        <h2 id="visit-heading" className="display-2 max-w-[20ch]">
          On Autopark Drive, two minutes off the 405.
        </h2>
      </Reveal>

      <Reveal className="mt-10">
        <Plate
          photo={photos.coastal}
          sizes="100vw"
          className="h-[34vh] min-h-[220px] w-full"
        />
      </Reveal>

      <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="stamp text-bone-3">The address</h3>
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
            Open in Google Maps
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
          <ContactLinks layout="stack" className="mt-4" itemClassName="text-[0.9375rem]" />
          <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-bone-3">
            Calling is the fastest route. Sam trains most of the day and picks
            up between clients.
          </p>
        </div>
      </div>
    </Section>
  );
}
