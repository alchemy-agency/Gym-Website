import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contact, site } from "@/content/business";
import { photoCredits } from "@/content/photos";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Sam's Body Shop HB handles the information you send through this website, and how advertising measurement works.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "What this page covers",
    body: [
      `This is the website for ${site.gymName}, a private gym and personal training business at ${contact.addressLine}. It explains what happens to any information you send us through this site.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "Only what you type into a form. That is your name, phone number, email address, and whatever you tell us about your training history, schedule and goals.",
      "We do not ask for payment details, government identifiers, or health records through this website. If you take a Function Health panel, that testing is handled by Function Health under their own privacy terms, and we never receive your payment information.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "To reply to you. A membership application or a free session request is sent to Sam so he can answer it, usually the same day.",
      "We do not add you to a mailing list, and we do not sell or rent your details to anyone.",
    ],
  },
  {
    heading: "Who sees it",
    body: [
      "Sam, and the service providers that carry the message: our website host, the form delivery service that forwards the submission, and email delivery if configured. Each of those providers only processes the data on our instruction.",
    ],
  },
  {
    heading: "Cookies and advertising measurement",
    body: [
      "This site uses Google Analytics and Google Ads measurement. Those tools set cookies so we can see which pages lead to enquiries and whether an advertising campaign is working. They record things like which page you arrived on and which button you pressed. They do not give us your name.",
      "You can block or clear these cookies in your browser settings, or use Google's Ads Settings to opt out of personalised advertising. The site works normally either way.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries are kept for as long as they are useful for following up, and then deleted. If you become a client, your training records are kept for the length of your membership plus a reasonable period afterward.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "If you are a California resident, you can ask us what personal information we hold about you, ask us to delete it, and ask us not to sell it. We do not sell personal information in any case.",
      `To make any of those requests, email ${contact.email} or call ${contact.phone}. We will respond within the timeframe the law requires.`,
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is not directed at children under 13 and we do not knowingly collect their information.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy."
        body={
          <p>
            The short version: we collect what you type into a form so Sam can
            reply, and nothing else. The longer version is below.
          </p>
        }
      />

      <Section rule density="default" aria-labelledby="privacy-body">
        <Reveal>
          <h2 id="privacy-body" className="sr-only">
            Privacy policy
          </h2>

          <div className="max-w-[68ch]">
            {SECTIONS.map((section) => (
              <div
                key={section.heading}
                className="border-b border-line py-8 first:border-t first:pt-8"
              >
                <h3 className="display-3 text-bone">{section.heading}</h3>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[0.9375rem] leading-relaxed text-bone-2"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-10">
              <h3 className="label text-bone-3">Photography</h3>
              <p className="mt-4 max-w-[68ch] text-[0.9375rem] leading-relaxed text-bone-2">
                The photographs on this site are placeholders, licensed for
                commercial use under the Unsplash License. They are being
                replaced with photographs of the gym and of Sam. Credits:{" "}
                {photoCredits.join("; ")}.
              </p>
            </div>

            <p className="mt-10 text-xs text-bone-3">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
