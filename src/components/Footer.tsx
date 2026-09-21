import { ArrowUpRight, InstagramLogo, MapPin } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ContactLinks } from "@/components/ContactLinks";
import { Logo } from "@/components/Logo";
import { contact, cta, hours, isInstagramEnabled, nav, site } from "@/content/business";

const trainingLinks = [
  { label: "The private gym", href: "/gym" },
  { label: "Training with Sam", href: "/training" },
  { label: "The Function Health panel", href: "/function-health" },
  { label: "Visit the shop", href: "/visit" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Identity ------------------------------------------------------- */}
          <div>
            <Logo size="md" />

            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-bone-2">
              A private gym and one-on-one coaching business on Autopark Drive,
              Huntington Beach. Run by Sam Axelrode, ACE certified personal
              trainer.
            </p>

            <Link
              href="/training#book"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-ember-2"
            >
              {cta.freeSession}
              <ArrowUpRight
                size={14}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Site ----------------------------------------------------------- */}
          <nav aria-label="Footer">
            <h3 className="label text-bone-3">Train</h3>
            <ul className="mt-4 space-y-3">
              {trainingLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bone-2 transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours ---------------------------------------------------------- */}
          <div>
            <h3 className="label text-bone-3">When</h3>
            <dl className="mt-4 space-y-3">
              {hours.map((row) => (
                <div key={row.label}>
                  <dt className="text-sm text-bone-2">{row.label}</dt>
                  <dd className="text-sm text-bone">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact -------------------------------------------------------- */}
          <div>
            <h3 className="label text-bone-3">Find it</h3>

            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-4 flex items-start gap-2.5 text-sm text-bone-2 transition-colors hover:text-bone"
            >
              <MapPin
                size={15}
                weight="bold"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-bone-3 transition-colors group-hover:text-ember-2"
              />
              <span>
                {contact.address.street}
                <br />
                {contact.address.city}, {contact.address.state} {contact.address.zip}
              </span>
            </a>

            <ContactLinks layout="stack" className="mt-5" itemClassName="text-sm" />

            {isInstagramEnabled ? (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-2.5 text-sm text-bone-2 transition-colors hover:text-bone"
              >
                <InstagramLogo size={15} weight="bold" aria-hidden="true" className="text-bone-3" />
                Instagram
              </a>
            ) : null}
          </div>
        </div>

        {/* Bottom bar ------------------------------------------------------ */}
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-bone-3">
            &copy; {year} {site.gymName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs text-bone-3 transition-colors hover:text-bone-2"
            >
              Privacy
            </Link>
            <p className="text-xs text-bone-3">
              Not medical advice. See{" "}
              <Link href="/function-health" className="underline decoration-line-2 underline-offset-4 transition-colors hover:text-bone-2">
                the panel
              </Link>{" "}
              page for details.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
