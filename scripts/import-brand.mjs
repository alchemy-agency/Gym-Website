/* Rebuild the supplied wordmark as background-independent SVG.
 *
 * The source file fakes the letter counters (the holes in B, D, O, P, A) by
 * painting them with a hard coded #080808 shape on top of the letterforms.
 * That only works on the exact black it was drawn against: put it on bone and
 * you get black blobs inside the letters. This merges the letter outlines and
 * the counters into a single path with fill-rule="evenodd" so the counters
 * become real holes that work on any background. */

import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("public/brand/source/wordmark-source.svg", "utf8");

/** Pull every path `d` inside a `<g fill="...">` block. */
function pathsInGroup(hex) {
  const group = src.match(
    new RegExp(`<g fill="${hex}">([\\s\\S]*?)</g>`),
  )?.[1];
  if (!group) throw new Error(`no group for ${hex}`);
  return [...group.matchAll(/d="([\s\S]*?)"/g)].map((m) =>
    m[1].replace(/\s+/g, " ").trim(),
  );
}

const letters = pathsInGroup("#eeece5");
const counters = pathsInGroup("#080808");

/* The standalone orange mark that sits to the left of the lettering. */
const markPath = [...src.matchAll(/<path fill="#f1571d" d="([\s\S]*?)"/g)]
  .map((m) => m[1].replace(/\s+/g, " ").trim())[0];

if (!letters.length || !counters.length || !markPath) {
  throw new Error("failed to extract paths");
}

console.log(`letters: ${letters.length}  counters: ${counters.length}`);

/* Content bounds, measured earlier from the live DOM via getBBox(). */
const VBOX = "214.07 379.11 1244.91 169.08";

const lettersMerged = [...letters, ...counters].join(" ");

/* LETTERS are themable; the mark keeps the brand orange in every variant.
 *
 * No <title> element here on purpose. SVG is XML, and XML only understands the
 * five predefined entities plus numeric character references: an HTML entity
 * like &#8217; makes the file fail to parse, and the browser then renders a
 * broken image with no console error at all. For an SVG loaded through <img>
 * the accessible name comes from the img alt attribute anyway, so a <title>
 * adds nothing. validate() below fails the build if that ever regresses. */
function build({ letterFill }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VBOX}" width="1245" height="169" role="img" aria-label="Sam's Body Shop">
  <path d="${lettersMerged}" fill="${letterFill}" fill-rule="evenodd" clip-rule="evenodd"/>
  <path d="${markPath}" fill="#ff610f"/>
</svg>
`;
}

/**
 * Reject anything that is not well-formed XML, and anything carrying a
 * non-numeric entity reference. Cheap, and it catches the exact failure that
 * shipped a broken logo once already.
 */
function validate(name, markup) {
  const badEntity = markup.match(/&(?!amp;|lt;|gt;|quot;|apos;|#)/);
  if (badEntity) {
    throw new Error(
      `${name}: contains an entity XML does not define (${badEntity[0]}...). Use a numeric reference or the literal character.`,
    );
  }
  const opens = (markup.match(/</g) ?? []).length;
  const closes = (markup.match(/>/g) ?? []).length;
  if (opens !== closes) {
    throw new Error(`${name}: unbalanced angle brackets (${opens} < vs ${closes} >)`);
  }
  if (!markup.includes('fill-rule="evenodd"') && name.startsWith("wordmark")) {
    throw new Error(`${name}: letter counters are not punched out`);
  }
  return markup;
}

writeFileSync(
  "public/brand/wordmark.svg",
  validate("wordmark.svg", build({ letterFill: "#eeece5" })),
);
writeFileSync(
  "public/brand/wordmark-ink.svg",
  validate("wordmark-ink.svg", build({ letterFill: "#080808" })),
);

/* The standalone mark, straight from the supplied favicon. */
const faviconSrc = readFileSync("public/brand/source/favicon-source.svg", "utf8");
const markOnly = [...faviconSrc.matchAll(/<path fill="#ff610f" d="([\s\S]*?)"/g)]
  .map((m) => m[1].replace(/\s+/g, " ").trim())[0];

if (!markOnly) throw new Error("failed to extract standalone mark");

const MARK_VBOX = "369.73 312.37 490.02 554.43";
writeFileSync(
  "public/brand/mark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VBOX}" width="490" height="554" role="img" aria-label="Sam's Body Shop">
  <title>Sam&#8217;s Body Shop</title>
  <path d="${markOnly}" fill="#ff610f"/>
</svg>
`,
);
writeFileSync(
  "public/brand/mark-bone.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VBOX}" width="490" height="554" role="img" aria-label="Sam's Body Shop">
  <title>Sam&#8217;s Body Shop</title>
  <path d="${markOnly}" fill="#eeece5"/>
</svg>
`,
);

/* Emitted for the React component so the mark can inherit currentColor. */
writeFileSync(
  "src/components/brand/markPath.ts",
  `/* GENERATED from the supplied favicon. Do not hand edit.
   * Source: public/brand/source/favicon-source.svg
   * viewBox and path are taken verbatim so the mark stays exactly as drawn. */
export const MARK_VIEWBOX = "${MARK_VBOX}" as const;
export const MARK_PATH =\n  "${markOnly}";\n`,
);

console.log("wrote wordmark.svg, wordmark-ink.svg, mark.svg, mark-bone.svg, markPath.ts");

/* Run with: node scripts/import-brand.mjs
   Regenerates the wordmark and mark assets from the source files in
   public/brand/source/. Only needed if the client supplies an updated logo. */

