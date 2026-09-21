/* ===========================================================================
   PHOTOGRAPHY
   ---------------------------------------------------------------------------
   THREE OF THESE ARE REAL PHOTOGRAPHS OF SAM'S OWN GYM, pulled from
   samsbodyshop.com and resized. They replaced a set of free stock photos,
   which was wrong in two ways: several of them showed equipment the gym may
   not have, and one was a stock portrait of a stranger presented as Sam.

   `runner`, `exterior` and `mural` are Sam's. If the gym is ever re-shot,
   replace the files in public/images/ and keep the filenames.

   CHECK BEFORE LAUNCH:
   `gym-floor.jpg` is downloaded and sitting in public/images/ but is NOT
   referenced anywhere, on purpose. It is a real photo of a Sam's Ultimate
   Body Shop floor, but it is dense with machines and it has not been confirmed
   whether it is the Autopark Drive room or a different location. Confirm with
   Sam before using it.

   PHOTO TREATMENT: every image is rendered as warm toned black and white by
   <Plate>, so real photos shot on a phone sit in the design alongside anything
   else. See the PHOTO LOCK note in globals.css.
   =========================================================================== */

export type Photo = {
  src: string;
  alt: string;
  /** Shown on /privacy. */
  credit: string;
};

export const photos = {
  /** Sam's own photograph. Landscape, 1.33 aspect.
   *
   *  The hero image. A wide shot of the actual training floor. Shot on an
   *  iPhone as HEIC and converted, so it is a real photo of the room rather
   *  than a stock stand-in. */
  gymFloor: {
    src: "/images/gym-floor.jpg",
    alt: "The training floor, with machines and free weights either side of a turf lane.",
    credit: "Sam's Body Shop",
  },

  /** Sam's own photograph. Portrait, 0.80 aspect.
   *
   *  RETOUCHED: the file Sam uploaded to his own site is a screenshot of a Wix
   *  gallery and has a "2/3" counter badge baked into the top right corner,
   *  directly above his head. Cropping it off would have jammed his head
   *  against the top edge, so it was cloned out with a feathered patch from
   *  the foliage to its left. Re-downloading this file from source will bring
   *  the badge back. */
  runner: {
    src: "/images/runner-track.jpg",
    alt: "A runner mid-stride on an outdoor athletics track.",
    credit: "Sam's Body Shop",
  },

  /** Sam's own photograph. Landscape, 1.61 aspect. */
  exterior: {
    src: "/images/gym-exterior.jpg",
    alt: "The gym building, a roller door and mirrored windows facing the street.",
    credit: "Sam's Body Shop",
  },

  /** Sam's own photograph. Panoramic, 2.33 aspect. Best used as a wide band. */
  mural: {
    src: "/images/gym-mural.jpg",
    alt: "A painted mural on the gym wall: a breaking wave, palm trees and a setting sun.",
    credit: "Sam's Body Shop",
  },

  /* --- Free stock, kept only where nothing about the gym is being claimed
         and no equipment is visible. ------------------------------------------ */

  /** For the Function Health panel. Clinical, not medical-gory. */
  lab: {
    src: "https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=1067&q=80",
    alt: "A rack of capped blood collection tubes in a laboratory.",
    credit: "Testalize.me, Unsplash",
  },

  /** Huntington Beach itself, for the visit page. */
  coastal: {
    src: "https://images.unsplash.com/photo-1633742610772-b17334e3cbdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "The Huntington Beach pier in fog, photographed on a long exposure.",
    credit: "Arvind Vallabh, Unsplash",
  },
} satisfies Record<string, Photo>;

export const photoCredits = Object.values(photos).map((p) => p.credit);
