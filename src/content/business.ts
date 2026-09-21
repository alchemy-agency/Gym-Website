/* ===========================================================================
   BUSINESS FACTS
   ---------------------------------------------------------------------------
   Everything Sam might want to change lives in this folder. Nothing here should
   be hard-coded inside a component.

   ############################################################################
   #  REVIEW BEFORE LAUNCH                                                      #
   #  Items marked `VERIFY` were inferred or are unconfirmed. Check each one,   #
   #  then delete the VERIFY comment so the next reader knows it was checked.   #
   ############################################################################
   =========================================================================== */

export const site = {
  /** VERIFY: set to the production domain, and set the same value for
   *  NEXT_PUBLIC_SITE_URL in Vercel. Affects canonical tags + sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.samsbodyshophb.com",

  /** Short wordmark. */
  wordmark: "Sam's Body Shop",
  city: "Huntington Beach",
  region: "CA",
  state: "California",

  /** The two trading names. The gym and the training business are separate
   *  brands under one roof, and the site routes them separately. */
  gymName: "Sam's Body Shop HB",
  trainingName: "Sam at da Body Shop",
} as const;

export const contact = {
  phone: "925-200-0979",
  phoneHref: "tel:+19252000979",
  email: "sam@samsbodyshop.com",
  emailHref: "mailto:sam@samsbodyshop.com",
  address: {
    street: "7351 Autopark Drive",
    city: "Huntington Beach",
    state: "CA",
    zip: "92648",
  },
  /** Full one-line address for display + map links. */
  addressLine: "7351 Autopark Drive, Huntington Beach, CA 92648",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=7351+Autopark+Drive+Huntington+Beach+CA+92648",
  /** VERIFY: paste the exact Instagram profile URL, or leave empty and the
   *  link is hidden everywhere automatically. */
  instagram: "",
} as const;

/** VERIFY: Sam's real hours. `null` hides the row. The private gym is
 *  application-only, so "by appointment" is the safe default. */
export const hours: { label: string; value: string }[] = [
  { label: "Training sessions", value: "By appointment" },
  { label: "Gym access", value: "Members only" },
  { label: "Walk-ins", value: "Not available" },
];

export const nav = [
  { label: "The Gym", href: "/gym" },
  { label: "Training", href: "/training" },
  /* Spelled out rather than "The Panel". A cold visitor arriving from a Google
     Ad has no idea what "The Panel" refers to, and this is the page that
     carries the strongest reason to buy a block. */
  { label: "Function Health", href: "/function-health" },
  { label: "Visit", href: "/visit" },
] as const;

/* ---------------------------------------------------------------------------
   CTA LABELS - LOCKED
   Two intents, one label each. If you change a label here it changes sitewide.
   Do not add a third way of saying the same thing.
   --------------------------------------------------------------------------- */
export const cta = {
  /** Intent A: book the free personal training session. */
  freeSession: "Book a free session",
  /** Intent B: apply for private gym membership. */
  membership: "Apply for membership",
} as const;

/* ---------------------------------------------------------------------------
   WHERE THE TWO ACTIONS GO
   ---------------------------------------------------------------------------
   Training bookings are handled entirely by Calendly. Sam's calendar is the
   source of truth for availability, so the site does not try to collect times
   itself. Nothing about a booking is stored here, and the confirmation email
   comes from Calendly.

   Membership is the opposite: it is an application, reviewed by hand, so it
   stays on site at /gym#apply.
   --------------------------------------------------------------------------- */
export const calendlyUrl = "https://calendly.com/saxelrode/30min";

/* ---------------------------------------------------------------------------
   CREDENTIALS
   Only claims that are verifiable from Sam's own material or certification
   bodies. Nothing invented.
   --------------------------------------------------------------------------- */
export const credentials = [
  {
    label: "Certification",
    value: "ACE Certified Personal Trainer",
  },
  {
    label: "Facility",
    value: "Owns and operates the gym",
  },
  {
    label: "Location",
    value: "Autopark Drive, Huntington Beach",
  },
] as const;

export const isInstagramEnabled = contact.instagram.length > 0;
