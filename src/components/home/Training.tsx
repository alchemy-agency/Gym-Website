import { calendlyUrl } from "@/content/business";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { trainingFocus } from "@/content/offers";

/**
 * TRAINING WITH SAM
 *
 * Text forward on purpose. An earlier version had a sticky stock photograph of
 * a stranger in this column, captioned as Sam. That is the worst possible thing
 * to put on a personal trainer's website: it is a lie about a named real
 * person, and it is trivially checkable by anyone who has met him.
 *
 * The column now carries his actual words instead. When there is a real
 * photograph of Sam to use, put it here: it is the highest value image slot on
 * the site.
 */
export function Training() {
  return (
    <Section tone="ink-2" rule density="default" aria-labelledby="training-heading">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* His words, not a picture of somebody else. --------------------- */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="border-l-2 border-ember pl-6 lg:pl-8">
              <Quotes
                size={20}
                weight="fill"
                aria-hidden="true"
                className="mb-4 text-ember"
              />
              <blockquote className="font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.025em] text-bone sm:text-2xl">
                My mission is to train my clients until they can work out on
                their own.
              </blockquote>
              <p className="label mt-5 text-bone-3">Sam Axelrode</p>
            </div>
          </Reveal>
        </div>

        {/* Copy ----------------------------------------------------------- */}
        <div>
          <Reveal>
            <h2 id="training-heading" className="display-2 max-w-[20ch]">
              He is training you until you do not need him.
            </h2>

            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
              Plenty of people stay with a trainer for years and never learn to
              programme their own week. Sam says out loud that he wants the
              opposite, and it changes what a session with him looks like.
            </p>
          </Reveal>

          <ul className="mt-12 divide-y divide-line border-t border-line">
            {trainingFocus.map((focus, i) => (
              <Reveal
                as="li"
                key={focus.id}
                delay={i * 0.05}
                className="py-6"
              >
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-bone">
                  {focus.title}
                </h3>
                <p className="mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed text-bone-2">
                  {focus.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[56ch] text-[0.9375rem] leading-relaxed text-bone-2">
              Training happens in the gym he owns, which is why there is no
              membership fee on top of the sessions. You pay for the coaching
              and the room comes with it.
            </p>

            <p className="mt-6 text-sm text-bone-3">
              The way in is simple:{" "}
              <a
                href={calendlyUrl}
                className="text-bone underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember-2"
              >
                book a free session
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
