/* ===========================================================================
   THE TWO WAYS IN - /gym  and  /training
   ---------------------------------------------------------------------------
   Deliberately no dollar figures. This is a private, application-only gym and
   a one-on-one coaching business; both are positioned as "rates on request",
   which is the norm at this level and keeps the site honest until Sam supplies
   real numbers. When he does, add a `rate` field and render it.

   VERIFY: the inclusions below are structured from what Sam states publicly
   (first session free, package buyers receive a complimentary Function Health
   panel). Confirm the exact package sizes and inclusions before launch.
   =========================================================================== */

export const gymPath = {
  href: "/gym",
  kicker: "Membership",
  title: "The private gym",
  summary:
    "A fully equipped training floor on Autopark Drive, capped at a small number of members. No crowds, no queue for the rack, no monthly contract you forget to cancel.",
  facts: [
    { label: "Access", value: "Members only" },
    { label: "Capacity", value: "Deliberately capped" },
    { label: "Commitment", value: "Applications reviewed by Sam" },
  ],
} as const;

export const trainingPath = {
  href: "/training",
  kicker: "One on one",
  title: "Training with Sam",
  summary:
    "Sam coaches you himself, in his own gym. The first session is free, and his stated goal is to get you to the point where you do not need him.",
  facts: [
    { label: "First session", value: "Free, no card required" },
    { label: "Coaching", value: "One on one with Sam" },
    { label: "Packages", value: "Include a Function Health panel" },
  ],
} as const;

/* ---------------------------------------------------------------------------
   TRAINING PACKAGES
   --------------------------------------------------------------------------- */
export type Package = {
  id: string;
  name: string;
  positioning: string;
  detail: string;
  includes: string[];
  /** Highlighted in the UI with the ember accent. Exactly one should be true. */
  featured?: boolean;
  /** Renders the Function Health panel callout inside the card. */
  includesPanel?: boolean;
};

export const packages: Package[] = [
  {
    id: "first-session",
    name: "The first session",
    positioning: "Free",
    detail:
      "Sixty minutes with Sam in the gym. He watches how you move, asks what you are actually training for, and puts you through a real workout.",
    includes: [
      "Movement and injury history review",
      "A full training session, not a sales tour",
      "Straight answer on whether he can help",
    ],
  },
  {
    id: "session-pack",
    name: "Session pack",
    positioning: "A fixed block of sessions",
    detail:
      "The way most people train here. You buy a block, you get a written programme built around your goals, and Sam adjusts it as you go.",
    includes: [
      "One on one sessions with Sam in the private gym",
      "A written programme you keep",
      "Complimentary Function Health panel",
      "Progress review each block",
    ],
    featured: true,
    includesPanel: true,
  },
  {
    id: "ongoing",
    name: "Ongoing coaching",
    positioning: "Month to month",
    detail:
      "For clients working toward something with a date on it, or who simply want the accountability of a standing appointment.",
    includes: [
      "Two to three sessions a week",
      "Continuous programming and load management",
      "Complimentary Function Health panel",
      "Direct line to Sam between sessions",
    ],
    includesPanel: true,
  },
];

/* ---------------------------------------------------------------------------
   SAM'S TRAINING FOCUS
   Taken from his own description of what he trains for.
   --------------------------------------------------------------------------- */
export const trainingFocus = [
  {
    id: "bone",
    title: "Bone density",
    body: "Loaded, progressive strength work. The kind that gives the skeleton a reason to stay dense as you age.",
  },
  {
    id: "muscle",
    title: "Muscle mass",
    body: "Built with compound lifts and enough volume to actually hold onto, not a pump you lose by Thursday.",
  },
  {
    id: "fat",
    title: "Fat loss",
    body: "Treated as a by-product of getting stronger and moving more, because that is the version that lasts.",
  },
  {
    id: "cardio",
    title: "Cardiovascular health",
    body: "Conditioning that varies in intensity and modality, so your heart is trained, not just your legs.",
  },
] as const;

/* ---------------------------------------------------------------------------
   WHAT A MEMBER GETS
   `photo: true` marks the one cell that carries an image. The rest are tonal
   variations so the grid still has visual rhythm without becoming a wall of
   identical text boxes.
   --------------------------------------------------------------------------- */
export const gymFeatures = [
  {
    id: "floor",
    title: "A floor you have to yourself",
    body: "Barbells, racks, dumbbells, turf and conditioning equipment, shared with a small membership rather than a rush hour crowd.",
    photo: true,
    tone: "ink-2",
  },
  {
    id: "programme",
    title: "A programme, not a key fob",
    body: "Every membership starts with Sam writing you a plan. You are not paying for equipment you could find anywhere.",
    photo: false,
    tone: "ink-3",
  },
  {
    id: "coaching",
    title: "Coaching on the floor",
    body: "Sam is in the building. Form checks are free and unscheduled.",
    photo: false,
    tone: "ink-2",
  },
  {
    id: "nofriction",
    title: "No contract maze",
    body: "No enrolment fee, no annual commitment, no cancellation phone call. Applications are reviewed so the room stays usable.",
    photo: false,
    tone: "pine",
  },
  {
    id: "hb",
    title: "Two minutes from the 405",
    body: "Autopark Drive, Huntington Beach. Easy parking, which sounds trivial until you have trained somewhere that isn't.",
    photo: false,
    tone: "ink-2",
  },
] as const;

/* ---------------------------------------------------------------------------
   HOW IT WORKS
   --------------------------------------------------------------------------- */
export const gymSteps = [
  {
    n: "01",
    title: "Send the application",
    body: "Four fields. Sam reads every one himself, usually the same day.",
  },
  {
    n: "02",
    title: "Walk the floor with Sam",
    body: "A short visit so you can see the space and he can hear how you train.",
  },
  {
    n: "03",
    title: "Get your programme",
    body: "Sam writes your starting plan around your goals and any injuries.",
  },
  {
    n: "04",
    title: "Train",
    body: "Come and go as a member. Ask for a form check whenever you want one.",
  },
] as const;

export const trainingSteps = [
  {
    n: "01",
    title: "Book the free session",
    body: "Pick a time. No card, no deposit, no obligation past the hour.",
  },
  {
    n: "02",
    title: "Train, and be assessed",
    body: "Sam tests where you actually are, not where a questionnaire says you are.",
  },
  {
    n: "03",
    title: "Get the plan",
    body: "You leave knowing what you are doing next and why, whether or not you buy anything.",
  },
  {
    n: "04",
    title: "Go deeper if you want to",
    body: "Buy a block and the Function Health panel comes with it.",
  },
] as const;

/* ---------------------------------------------------------------------------
   WHAT IS ACTUALLY ON THE FLOOR
   VERIFY: confirm this list against the real equipment before launch. Nothing
   here should be a guess.
   --------------------------------------------------------------------------- */
export const facilityList = [
  { group: "Strength", items: "Power racks, platforms, barbells, bumper plates" },
  { group: "Free weights", items: "Dumbbells, kettlebells, benches, EZ bars" },
  { group: "Machines", items: "Cable station, pulldown, leg press, hamstring curl" },
  { group: "Conditioning", items: "Rower, assault bike, treadmill, sled, turf lane" },
  { group: "Accessories", items: "Bands, chains, chalk, belts, foam rollers" },
  { group: "Facilities", items: "Changing area, filtered water, parking at the door" },
] as const;

/* ---------------------------------------------------------------------------
   MEMBERSHIP TERMS
   Deliberately no pricing. VERIFY terms with Sam.
   --------------------------------------------------------------------------- */
export const membershipTerms = [
  { label: "Rate", value: "On application" },
  { label: "Enrolment fee", value: "None" },
  { label: "Minimum term", value: "None" },
  { label: "Guest policy", value: "Ask Sam" },
  { label: "Access", value: "Members only" },
] as const;

export const gymFaq = [
  {
    q: "Why is there an application?",
    a: "Because the whole point of this gym is that it is not busy. Members are added slowly so the floor stays usable at the times people actually train. Sam reviews every application himself.",
  },
  {
    q: "Do I need to train with Sam to be a member?",
    a: "No. Membership and personal training are separate. A lot of members train on their own and ask for a form check when they want one, which costs nothing extra.",
  },
  {
    q: "What does membership cost?",
    a: "Rates are given on application, because it depends on the access you need. There is no enrolment fee and no annual contract, so the number you are quoted is the number you pay.",
  },
  {
    q: "Can I bring a guest?",
    a: "Ask Sam. The default answer is no, for the same reason the membership is capped.",
  },
  {
    q: "Is there somewhere to park?",
    a: "Yes, directly outside on Autopark Drive. It is one of the quieter advantages of the location.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. No cancellation phone call, no retention offer, no notice period beyond telling Sam.",
  },
] as const;

export const trainingFaq = [
  {
    q: "Is the first session really free?",
    a: "Yes. Sixty minutes, Sam coaching, no card taken and nothing to sign. If it is not for you, you say so and that is the end of it.",
  },
  {
    q: "What happens in the first session?",
    a: "Sam asks about your history, watches how you move, and trains you. You will work. You will also leave with a clear idea of what he would do next and why.",
  },
  {
    q: "Do I need to be fit already?",
    a: "No. Sam has trained people starting from nothing and people returning from injury. The programme is written for where you are, not where someone else is.",
  },
  {
    q: "How often should I train?",
    a: "Two to three sessions a week is the usual answer for a training block. Sam will tell you honestly if he thinks you need fewer.",
  },
  {
    q: "Do I have to buy a package?",
    a: "No. You can buy single sessions indefinitely. The package exists because it is cheaper per session and it includes the Function Health panel.",
  },
  {
    q: "What does the Function Health panel cost me?",
    a: "Nothing on top of the package. It is included when you buy a block of sessions. Full details are on the panel page.",
  },
] as const;
