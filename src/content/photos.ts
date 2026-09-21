/* ===========================================================================
   PHOTOGRAPHY
   ---------------------------------------------------------------------------
   PLACEHOLDERS. Every URL below is a verified, free-to-use Unsplash photo
   (Unsplash License: commercial use, no attribution required) chosen to match
   the shot that belongs in that slot.

   REPLACE THESE before launch with real photographs of Sam's gym and Sam
   himself. The site renders every image as warm toned black and white (see
   the PHOTO LOCK note in globals.css), so replacement photos will sit in the
   design even if they were shot on a phone, as long as they are reasonably
   well lit.

   Shoot list, in priority order:
     1. hero            - the training floor, wide, lights on, no people or one
     2. portraitSam     - Sam, waist up, eyes to camera, low key
     3. gymFloor        - free weights and racks, empty
     4. coaching        - Sam coaching one client, mid-rep
     5. detail          - a hand on a knurled bar, or chalk, or a loaded plate
     6. conditioning    - rower, bike or sled
     7. coastal         - Huntington Beach, overcast or dusk, not a postcard
     8. lab             - a clean, abstract clinical shot (tubes, not needles)
   =========================================================================== */

export type Photo = {
  src: string;
  alt: string;
  /** Destination link, for photographer credit. Rendered in /privacy only. */
  credit: string;
};

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const photos = {
  hero: {
    src: u("1709315957145-a4bad1feef28", 1200, 1500),
    alt: "A lifter mid-set with a loaded barbell in a dark gym.",
    credit: "Redd Francisco, Unsplash",
  },
  gymFloor: {
    src: u("1784798228092-659924b1a15b", 1600, 1000),
    alt: "An empty private gym with a power rack, loaded barbells and a dumbbell rack.",
    credit: "Mirko Meister, Unsplash",
  },
  coaching: {
    src: u("1738523686534-7055df5858d6", 1600, 1067),
    alt: "A trainer coaching a client one to one on a machine.",
    credit: "Sergio Kian, Unsplash",
  },
  portraitSam: {
    src: u("1567877383455-b2e3cb3cc8e1", 1200, 1500),
    alt: "Low key portrait of a seasoned trainer holding a bar.",
    credit: "Sayo Garcia, Unsplash",
  },
  detail: {
    src: u("1570440828843-ccc432c6fad7", 1200, 1200),
    alt: "Close up of hands wrapped around a knurled barbell.",
    credit: "Ivan Pergasi, Unsplash",
  },
  conditioning: {
    src: u("1519505907962-0a6cb0167c73", 1600, 1067),
    alt: "An athlete mid-stroke on a rowing machine in low light.",
    credit: "Victor Freitas, Unsplash",
  },
  coastal: {
    src: u("1633742610772-b17334e3cbdf", 1600, 900),
    alt: "The Huntington Beach pier in fog on a long exposure.",
    credit: "Arvind Vallabh, Unsplash",
  },
  lab: {
    src: u("1606206591513-adbfbdd7a177", 1600, 1067),
    alt: "Rack of capped blood collection tubes in a laboratory.",
    credit: "Testalize.me, Unsplash",
  },
} satisfies Record<string, Photo>;

export const photoCredits = Object.values(photos).map((p) => p.credit);
