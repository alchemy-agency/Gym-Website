import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("public/brand/source/ultimate-wordmark-source.svg", "utf8");
const VBOX = "65.9 43.2 596.9 158.9";

if (!/#fff/.test(src)) throw new Error("expected #fff fills in source");
if (/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(src)) throw new Error("undefined XML entity in source");

const withViewBox = src.replace(/viewBox="[^"]*"/, `viewBox="${VBOX}"`).replace(/\swidth="[^"]*"/, "").replace(/\sheight="[^"]*"/, "").replace("<svg ", '<svg width="1245" height="331" ');

writeFileSync("public/brand/wordmark.svg", withViewBox.split("#fff").join("#ecebe5") + "\n");
writeFileSync("public/brand/wordmark-ink.svg", withViewBox.split("#fff").join("#0c0c0b") + "\n");

// Favicon: the barbell end plates from the left of the lockup. Plates span
// x 65.9-163.2, y 43.4-202.1. Centred in a square with padding so they do not
// touch the edges of the tab icon.
const PLATES = "19.5 27.7 190 190";
const platePaths = [...src.matchAll(/<path class="st0" d="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((d) => /^M\s*(6[5-9]|7\d|8\d|9\d|1[0-6]\d)\./.test(d.trim()));
const plateRect = [...src.matchAll(/<rect class="st0"[^>]*\/>/g)].map((m) => m[0]);
writeFileSync(
  "src/app/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${PLATES}" width="32" height="32" role="img" aria-label="Sam's Ultimate Body Shop">
  <rect x="19.5" y="27.7" width="190" height="190" fill="#0c0c0b"/>
  ${platePaths.map((d) => `<path fill="#ff610f" d="${d}"/>`).join("\n  ")}
</svg>
`,
);
console.log(`wordmark.svg / wordmark-ink.svg written, viewBox ${VBOX}`);
console.log(`icon.svg from ${platePaths.length} plate paths (${plateRect.length} rects found)`);
