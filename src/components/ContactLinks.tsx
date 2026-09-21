"use client";

import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";

import { contact } from "@/content/business";
import { cn } from "@/lib/cn";
import { trackCall, trackEmail } from "@/lib/tracking";

/**
 * Phone and email links. These fire the click_to_call / click_to_email
 * conversion events, which is where a phone-first local business actually
 * earns its leads.
 */
export function ContactLinks({
  className,
  itemClassName,
  layout = "row",
  showIcons = true,
}: {
  className?: string;
  itemClassName?: string;
  layout?: "row" | "stack";
  showIcons?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex",
        layout === "row"
          ? "flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"
          : "flex-col gap-3",
        className,
      )}
    >
      <a
        href={contact.phoneHref}
        onClick={() => trackCall("contact-links")}
        className={cn(
          "group inline-flex items-center gap-2.5 text-bone transition-colors hover:text-ember-2",
          itemClassName,
        )}
      >
        {showIcons ? (
          <Phone size={15} weight="bold" aria-hidden="true" className="text-bone-3 transition-colors group-hover:text-ember-2" />
        ) : null}
        <span className="tabular-nums tracking-[-0.01em]">{contact.phone}</span>
      </a>

      <a
        href={contact.emailHref}
        onClick={() => trackEmail("contact-links")}
        className={cn(
          "group inline-flex items-center gap-2.5 text-bone transition-colors hover:text-ember-2",
          itemClassName,
        )}
      >
        {showIcons ? (
          <EnvelopeSimple size={15} weight="bold" aria-hidden="true" className="text-bone-3 transition-colors group-hover:text-ember-2" />
        ) : null}
        <span className="tracking-[-0.01em]">{contact.email}</span>
      </a>
    </div>
  );
}
