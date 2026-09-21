/* ===========================================================================
   THE FUNCTION HEALTH PANEL
   ---------------------------------------------------------------------------
   Included with a session pack or ongoing coaching. This is the strongest
   reason to buy a block rather than a single session, so it gets its own page.

   VERIFY before launch:
   - The "$365 a year" figure is Function Health's published annual membership
     rate. Confirm it is still current, or remove the value anchor.
   - Confirm the 160+ test count is still what Function Health advertises.
   - The marker list below is representative of what a panel of this kind
     covers. It is presented as examples, not as an exhaustive test list.
   - Confirm the exact inclusion terms with Function Health's partner team,
     including who pays and how a client redeems it.
   =========================================================================== */

export const panel = {
  name: "Function Health",
  founder: "Dr. Mark Hyman",
  testCount: 160,
  valueLabel: "$365 a year",
  summary:
    "A diagnostic blood panel that measures over 160 markers, rather than the handful you get at a routine physical. It gives you a set of numbers to train against, and a way to see which of them have moved six months later.",
} as const;

/** Representative groups. Not an exhaustive test list. */
export const panelGroups = [
  {
    id: "heart",
    name: "Heart and lipids",
    markers: ["ApoB", "Lp(a)", "LDL particle count", "hs-CRP", "Homocysteine"],
  },
  {
    id: "metabolic",
    name: "Metabolic",
    markers: ["Fasting insulin", "HbA1c", "Glucose", "HOMA-IR"],
  },
  {
    id: "hormones",
    name: "Hormones",
    markers: ["Total and free testosterone", "Estradiol", "DHEA-S", "Cortisol"],
  },
  {
    id: "thyroid",
    name: "Thyroid",
    markers: ["TSH", "Free T3", "Free T4", "TPO antibodies"],
  },
  {
    id: "liver",
    name: "Liver",
    markers: ["ALT", "AST", "GGT", "Albumin", "Bilirubin"],
  },
  {
    id: "kidney",
    name: "Kidney and electrolytes",
    markers: ["Creatinine", "eGFR", "BUN", "Uric acid", "Sodium", "Potassium"],
  },
  {
    id: "nutrients",
    name: "Nutrients",
    markers: ["Vitamin D", "B12", "Folate", "Ferritin", "Iron", "Magnesium"],
  },
  {
    id: "blood",
    name: "Blood and immune",
    markers: ["Complete blood count", "White cells", "Red cells", "Platelets"],
  },
] as const;

export const panelSteps = [
  {
    n: "01",
    title: "You buy a session pack",
    body: "The panel is added when you buy a block of sessions. It is not an upsell and there is no extra charge.",
  },
  {
    n: "02",
    title: "Book your draw",
    body: "Function Health sends you an order and you book a blood draw at a lab near you, on your own schedule.",
  },
  {
    n: "03",
    title: "Read it together",
    body: "Results land in the Function Health app. You bring them to the gym and Sam programmes around what they show.",
  },
] as const;

/** Why it belongs in a gym, stated plainly and without medical overreach. */
export const panelReasons = [
  {
    title: "Know your starting numbers",
    body: "Most people start training without knowing their starting numbers, so six months later they have nothing to compare against and end up judging the whole thing on how they look.",
  },
  {
    title: "It covers things training affects",
    body: "Lipids, insulin sensitivity, hormones, inflammation, liver and kidney markers. Regular training is one of the few things that tends to move several of these, which makes it worth measuring.",
  },
  {
    title: "It gives the programme a target",
    body: "If ApoB is high or ferritin is low, that changes what Sam prioritises and what he sends you to your doctor about.",
  },
] as const;

export const panelFaq = [
  {
    q: "Do I pay extra for the panel?",
    a: "No. It is included when you buy a session pack or ongoing coaching. Sam absorbs it as part of the package.",
  },
  {
    q: "Who actually runs the test?",
    a: `Function Health, the platform co-founded by ${panel.founder}. They order the panel, you attend a blood draw near you, and the results are delivered to their app. Sam is not involved in the testing side at all.`,
  },
  {
    q: "Is Sam reading my bloodwork as a clinician?",
    a: "No. Sam is an ACE certified personal trainer, not a doctor. He uses your results to decide how to train you and what to refer you to a physician for. Clinical questions go to your doctor.",
  },
  {
    q: "Do I have to take the panel to train here?",
    a: "No. The free first session and single sessions are unaffected. The panel comes with packages because that is where it is most useful, over a longer training block.",
  },
  {
    q: "What if I already have recent bloodwork?",
    a: "Tell Sam when you book. He will work with what you already have rather than send you for a duplicate test.",
  },
] as const;

export const panelDisclaimer =
  "Function Health is a third party laboratory testing service. Sam Axelrode is an ACE certified personal trainer and is not a licensed physician. Nothing on this site is medical advice, diagnosis or treatment. Always discuss your results with your own doctor.";
