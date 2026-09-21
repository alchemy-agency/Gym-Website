import type { Metadata } from "next";

import { CtaBand } from "@/components/CtaBand";
import { Facility } from "@/components/home/Facility";
import { Hero } from "@/components/home/Hero";
import { PanelBlock } from "@/components/home/PanelBlock";
import { Training } from "@/components/home/Training";
import { TwoWays } from "@/components/home/TwoWays";
import { VisitBand } from "@/components/home/VisitBand";
import { Process } from "@/components/Process";
import { trainingSteps } from "@/content/offers";

export const metadata: Metadata = {
  title: "Sam's Body Shop HB | Private Gym & Personal Training",
  description:
    "A private, application-only gym on Autopark Drive in Huntington Beach, and one-on-one personal training with Sam Axelrode. The first session is free. Packages include a complimentary Function Health panel.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwoWays />
      <Facility />
      <Training />
      <PanelBlock />
      <Process
        steps={trainingSteps}
        heading="Four steps, and the first one is free."
        tone="ink"
        id="how-it-works"
      />
      <VisitBand />
      <CtaBand
        quote="“Half of the battle is just showing up.”"
        attribution="Sam Axelrode, ACE certified personal trainer"
        body="The first session is free and there is nothing to sign. Train for an hour, then decide."
      />
    </>
  );
}
