/* ===========================================================================
   CONVERSION TRACKING
   ---------------------------------------------------------------------------
   One place for every conversion event on the site, so Sofia only has to wire
   up Google Ads in a single file plus two env vars.

   Every event is pushed to `window.dataLayer` (so Google Tag Manager can pick
   it up as a Custom Event trigger) AND sent to gtag directly when the Google
   Ads / GA4 IDs are configured. Nothing breaks if the IDs are empty: the
   dataLayer push still happens, so GTM-only setups work too.

   Events fired:
     generate_lead        - on a successful form submission (both forms)
     book_free_session    - GA4 event, free personal training session request
     submit_membership    - GA4 event, private gym application
     click_to_call        - when a phone number link is tapped
     click_to_email       - when an email link is tapped

   Google Ads conversion actions to create in the Ads UI:
     1. "Free training session request" -> set its label in
        NEXT_PUBLIC_GADS_LABEL_FREE_SESSION
     2. "Gym membership application"    -> set its label in
        NEXT_PUBLIC_GADS_LABEL_MEMBERSHIP
   Both fire on the /thank-you page too, so URL-based goals also work as a
   fallback if the label setup is delayed.
   =========================================================================== */

export const GADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

const GADS_LABELS = {
  free_session: process.env.NEXT_PUBLIC_GADS_LABEL_FREE_SESSION ?? "",
  membership: process.env.NEXT_PUBLIC_GADS_LABEL_MEMBERSHIP ?? "",
} as const;

export type LeadKind = keyof typeof GADS_LABELS;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args as unknown as Record<string, unknown>);
}

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

const GA4_EVENT: Record<LeadKind, string> = {
  free_session: "book_free_session",
  membership: "submit_membership",
};

/**
 * Fire the full conversion stack for a submitted lead.
 * Safe to call on the client only.
 */
export function trackLead(
  kind: LeadKind,
  meta: Record<string, unknown> = {},
): void {
  push({ event: "generate_lead", lead_type: kind, ...meta });

  if (GA4_ID) {
    gtag("event", GA4_EVENT[kind], {
      lead_type: kind,
      ...meta,
    });
  }

  const label = GADS_LABELS[kind];
  if (GADS_ID && label) {
    gtag("event", "conversion", {
      send_to: `${GADS_ID}/${label}`,
      ...meta,
    });
  }
}

/**
 * A click through to the booking calendar.
 *
 * This is the closest the site can get to the booking itself: the appointment
 * is confirmed on Calendly, not here, so this fires on the click and Calendly
 * sends its own conversion for the completed booking. Both are worth having.
 */
export function trackScheduleClick(location: string): void {
  push({ event: "schedule_session", location });

  if (GA4_ID) {
    gtag("event", "schedule_session", { location });
  }
  if (GADS_ID) {
    gtag("event", "conversion", { send_to: `${GADS_ID}/schedule` });
  }
}

/** Phone taps are a real conversion for a local business. */
export function trackCall(location: string): void {
  push({ event: "click_to_call", location });

  if (GA4_ID) {
    gtag("event", "click_to_call", { location });
  }
  if (GADS_ID) {
    gtag("event", "conversion", { send_to: `${GADS_ID}/call` });
  }
}

export function trackEmail(location: string): void {
  push({ event: "click_to_email", location });

  if (GA4_ID) {
    gtag("event", "click_to_email", { location });
  }
}
