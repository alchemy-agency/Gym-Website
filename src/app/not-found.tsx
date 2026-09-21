import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { cta, nav } from "@/content/business";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section density="loose" className="pt-20 lg:pt-24">
      <p className="label text-bone-3">404</p>
      <h1 className="display-1 mt-6 max-w-[16ch] text-bone">
        That page is not here.
      </h1>
      <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-bone-2">
        The link may be old, or the page may have moved. These are the ones that
        matter.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink href="/" size="lg" arrow>
          Back to the home page
        </ButtonLink>
        <ButtonLink href="/training#book" variant="outline" size="lg">
          {cta.freeSession}
        </ButtonLink>
      </div>

      <nav
        aria-label="Site"
        className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-bone-2 transition-colors hover:text-bone"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </Section>
  );
}
