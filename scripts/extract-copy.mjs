/* Exhaustive copy extraction.
 *
 * Renders every route and pulls out every string a human could see: visible
 * text, image alt text, aria labels, placeholders, form validation messages,
 * page titles and meta descriptions. Keyword greps only find the problems you
 * already thought of; this is the only way to read what is actually on the
 * page.
 *
 * Output: copy-audit.txt, grouped by route, in document order. */

import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const PORT = 3170;
const BASE = `http://localhost:${PORT}`;
const OUT = join(
  process.env.LOCALAPPDATA ?? "C:/Temp",
  "Temp",
  "opencode",
);

const ROUTES = [
  "/",
  "/gym",
  "/training",
  "/function-health",
  "/visit",
  "/privacy",
  "/brand",
  "/thank-you?type=membership",
  "/thank-you?type=free_session",
  "/nope",
];

async function waitForServer(url, timeoutMs = 90_000) {
  const t = Date.now();
  while (Date.now() - t < timeoutMs) {
    try {
      if ((await fetch(url)).ok) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

const server = spawn(
  "node",
  ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
  { cwd: process.cwd(), stdio: "ignore" },
);
if (!(await waitForServer(BASE))) {
  server.kill();
  throw new Error("server did not start");
}

const browser = await chromium.launch();
const sections = [];

for (const route of ROUTES) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Walk the page so lazily revealed content and count-up text is final.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r()));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const data = await page.evaluate(() => {
    const seen = new Set();
    const push = (kind, value) => {
      const v = (value ?? "").replace(/\s+/g, " ").trim();
      if (!v || v.length < 2) return;
      const key = kind + "|" + v;
      if (seen.has(key)) return;
      seen.add(key);
      collected.push({ kind, v });
    };
    const collected = [];

    push("title", document.title);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) push("meta", meta.getAttribute("content"));

    // Visible text, in document order, per block-level element.
    for (const el of document.querySelectorAll(
      "h1,h2,h3,h4,p,li,blockquote,figcaption,dt,dd,label,button,a,summary,option,span",
    )) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      if (Number(cs.opacity) < 0.05) continue;
      // Only leaf-ish nodes, to avoid printing whole containers repeatedly.
      const hasElementChild = [...el.children].some((c) =>
        ["P", "H1", "H2", "H3", "H4", "LI", "DIV", "BLOCKQUOTE", "FIGURE"].includes(c.tagName),
      );
      if (hasElementChild) continue;
      push(el.tagName.toLowerCase(), el.textContent);
    }

    for (const el of document.querySelectorAll("[alt]")) push("alt", el.getAttribute("alt"));
    for (const el of document.querySelectorAll("[aria-label]"))
      push("aria-label", el.getAttribute("aria-label"));
    for (const el of document.querySelectorAll("[placeholder]"))
      push("placeholder", el.getAttribute("placeholder"));
    for (const el of document.querySelectorAll("[title]"))
      push("title-attr", el.getAttribute("title"));

    return collected;
  });

  sections.push({ route, data });
  await context.close();
}

await browser.close();
server.kill();

let out = "EXHAUSTIVE COPY EXTRACTION\n";
out += "Every user-visible string, by route, in document order.\n";
out += "=".repeat(78) + "\n";

for (const { route, data } of sections) {
  out += `\n\n### ${route}  (${data.length} strings)\n${"-".repeat(78)}\n`;
  for (const { kind, v } of data) out += `[${kind}] ${v}\n`;
}

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
const file = join(OUT, "copy-audit.txt");
writeFileSync(file, out);

let total = 0;
for (const s of sections) total += s.data.length;
console.log(`${total} strings across ${sections.length} routes -> ${file}`);
