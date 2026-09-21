"use client";

import { useEffect, useRef } from "react";

import { trackLead, type LeadKind } from "@/lib/tracking";

/**
 * Fires the conversion exactly once when the thank-you page mounts.
 *
 * The thank-you page owns the conversion rather than the form, so a Google Ads
 * conversion never double-counts and a URL-based goal in the Ads UI works as a
 * backup if the event-based setup is not finished yet.
 */
export function ThankYouTracker({ kind }: { kind: LeadKind }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackLead(kind, { location: "thank-you" });
  }, [kind]);

  return null;
}
