import { Quotes } from "@phosphor-icons/react/dist/ssr";

import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { trainingFocus } from "@/content/offers";
import { photos } from "@/content/photos";

/**
 * TRAINING WITH SAM
 * Sticky portrait on the left, the four things he actually trains for on the
 * right. This section also carries his mission, which is the most
 * differentiating sentence he has: he trains people until they do not need him.
 */
export function Training() {
  return (
    <Section
      tone="ink-2"
      rule
      density="default"
      aria-labelledby="training-heading"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Sticky plate --------------------------------------------------- */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Plate
            photo={photos.portraitSam}
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="h-[clamp(340px,48vh,600px)] w-full"
          />
          <p className="mt-4 text-xs leading-relaxed text-bone-3">
            Sam Axelrode. ACE certified, and the person who owns the building
            you are training in.
          </p>
        </div>

        {/* Copy ----------------------------------------------------------- */}
        <div>
          <h2 id="training-heading" className="display-2 max-w-[20ch]">
            He is training you to not need him.
          </h2>

          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bone-2">
            Most trainers sell you a dependency. Sam&rsquo;s stated mission is
            the opposite, and it changes what a session with him looks like.
          </p>

          <figure className="mt-10 border-l-2 border-ember pl-6">
            <Quotes
              size={18}
              weight="fill"
              aria-hidden="true"
              className="mb-3 text-ember"
            />
            <blockquote className="font-display text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-bone sm:text-2xl">
              My mission is to train my clients until they can work out on
              their own.
            </blockquote>
            <figcaption className="label mt-4 text-bone-3">Sam Axelrode</figcaption>
          </figure>

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

          <p className="mt-8 max-w-[56ch] text-[0.9375rem] leading-relaxed text-bone-2">
            Training happens in the gym he owns, which is why there is no
            membership fee on top of the sessions. You pay for coaching and you
            get the room for free.
          </p>

          <p className="mt-6 text-sm text-bone-3">
            The way in is simple:{" "}
            <a
              href="/training#book"
              className="text-bone underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember-2"
            >
              book a free session
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
