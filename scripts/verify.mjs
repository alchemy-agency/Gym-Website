/* ===========================================================================
   RENDER VERIFICATION
   ---------------------------------------------------------------------------
   Structural checks are not enough for this site: the interesting failure
   modes are visual. A panel that slides over a heading, a headline clipped by
   its own mask, a marquee that overflows the document, a pinned section that
   never unpins. This drives a real Chromium and asserts on what is actually
   painted.

   Usage:
     npm run build && node scripts/verify.mjs
     node scripts/verify.mjs --keep      (leave screenshots, no cleanup)

   Notes on two tests that are easy to write wrongly:
   - Overlap must be probed with elementFromPoint, not by comparing bounding
     boxes. A clipped element keeps its full layout box, so bbox intersection
     reports a false positive for correctly clipped content.
   - Headline clipping is checked against the mask's client rect, not the
     element's scrollHeight, because the mask is the thing that clips.
   =========================================================================== */

import { spawn } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const PORT = 3155;
const BASE = `http://localhost:${PORT}`;
const SHOTS = join(
  process.env.LOCALAPPDATA ?? "C:/Temp",
  "Temp",
  "opencode",
  "shots",
);

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const results = [];
function record(scope, name, ok, detail = "") {
  results.push({ scope, name, ok, detail });
}

async function waitForServer(url, timeoutMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

function attachDiagnostics(page, scope) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("requestfailed", (req) => {
    const failure = req.failure()?.errorText ?? "";
    /* Aborted navigations are a normal part of client-side routing. */
    if (!failure.includes("ERR_ABORTED")) {
      failedRequests.push(`${req.url()} :: ${failure}`);
    }
  });

  return { consoleErrors, pageErrors, failedRequests, scope };
}

const ROUTES = [
  "/",
  "/gym",
  "/training",
  "/function-health",
  "/visit",
  "/privacy",
  "/brand",
  "/thank-you?type=membership",
];

async function run() {
  if (!existsSync(SHOTS)) mkdirSync(SHOTS, { recursive: true });

  const server = spawn(
    "node",
    ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
    { cwd: process.cwd(), stdio: "ignore", shell: false },
  );

  const up = await waitForServer(BASE);
  if (!up) {
    console.error("Server never came up. Run `npm run build` first.");
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch();

  /* ---------------------------------------------------------------------
     1. Every route: console clean, no overflow, no failed requests
     --------------------------------------------------------------------- */
  for (const route of ROUTES) {
    const context = await browser.newContext({
      viewport: DESKTOP,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const diag = attachDiagnostics(page, route);

    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;

      /* Elements whose layout box escapes the viewport AND which are not
         clipped by any ancestor. Without the clip check this reports the
         marquee track and the pan track as false positives, which is exactly
         how you end up "fixing" correct code. */
      const isClipped = (el) => {
        let p = el.parentElement;
        while (p && p !== doc) {
          const cs = getComputedStyle(p);
          if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
          p = p.parentElement;
        }
        return false;
      };

      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.display === "none") continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        if (r.right <= vw + 1 && r.left >= -1) continue;
        if (isClipped(el)) continue;
        const cls =
          typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
            : "";
        offenders.push({
          sel: el.tagName.toLowerCase() + cls,
          left: Math.round(r.left),
          right: Math.round(r.right),
          text: (el.textContent ?? "").trim().slice(0, 40),
        });
      }

      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: vw,
        height: doc.scrollHeight,
        h1: document.querySelectorAll("h1").length,
        offenders: offenders.slice(0, 8),
      };
    });

    record(
      route,
      "no console errors",
      diag.consoleErrors.length === 0,
      diag.consoleErrors.slice(0, 3).join(" | "),
    );
    record(
      route,
      "no uncaught page errors",
      diag.pageErrors.length === 0,
      diag.pageErrors.slice(0, 2).join(" | "),
    );
    record(
      route,
      "no failed requests",
      diag.failedRequests.length === 0,
      diag.failedRequests.slice(0, 2).join(" | "),
    );
    record(
      route,
      "no horizontal overflow",
      metrics.scrollWidth <= metrics.clientWidth + 1,
      `scrollWidth ${metrics.scrollWidth} vs clientWidth ${metrics.clientWidth}`,
    );
    if (metrics.offenders.length) {
      record(
        route,
        "no unclipped element escapes the viewport",
        false,
        metrics.offenders
          .map((o) => `${o.sel} [${o.left}..${o.right}] "${o.text}"`)
          .join("  ||  "),
      );
    }
    record(route, "exactly one h1", metrics.h1 === 1, `found ${metrics.h1}`);

    /* Images that 404 or fail to parse still fire no `requestfailed` event and
       log no console error: the browser just renders a broken glyph. A logo
       shipped broken exactly this way. `naturalWidth === 0` on a completed
       image is the only reliable signal. */
    const brokenImages = await page.evaluate(() =>
      [...document.querySelectorAll("img")]
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.getAttribute("src")),
    );
    record(
      route,
      "every image decoded",
      brokenImages.length === 0,
      brokenImages.join(" | "),
    );

    await context.close();
  }

  /* ---------------------------------------------------------------------
     2. Home page: overflow at depth.
        The FloorPan clipped-panel probe used to live here. That section was
        removed because its content was invented, so what replaces it is the
        more generally useful test: walk the whole document and assert that
        nothing escapes the viewport at any scroll depth. Pinned sections,
        parallax plates and the marquee all only misbehave mid-scroll.
     --------------------------------------------------------------------- */
  {
    const context = await browser.newContext({ viewport: DESKTOP });
    const page = await context.newPage();
    attachDiagnostics(page, "scroll");
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    const height = await page.evaluate(() => document.body.scrollHeight);
    const steps = 9;

    for (let i = 0; i <= steps; i++) {
      const y = Math.round((height / steps) * i);
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(320);

      const result = await page.evaluate(() => {
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        /* Only count elements with no clipping ancestor: a clipped element
           keeps its full layout box, so it reads as overflowing when it is
           actually being correctly clipped. */
        const isClipped = (el) => {
          let p = el.parentElement;
          while (p && p !== doc && p !== document.body) {
            const cs = getComputedStyle(p);
            if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
            p = p.parentElement;
          }
          return false;
        };
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed" || cs.display === "none") continue;
          const r = el.getBoundingClientRect();
          if (r.width < 1 || r.height < 1) continue;
          if (r.right <= vw + 1 && r.left >= -1) continue;
          if (isClipped(el)) continue;
          offenders.push(
            el.tagName.toLowerCase() +
              (typeof el.className === "string" && el.className
                ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
                : "") +
              ` [${Math.round(r.left)}..${Math.round(r.right)}]`,
          );
        }
        return { overflow: doc.scrollWidth - vw, offenders: offenders.slice(0, 3) };
      });

      record(
        "scroll",
        `no overflow at ${Math.round((i / steps) * 100)}% depth`,
        result.overflow <= 1 && result.offenders.length === 0,
        result.offenders.length ? result.offenders.join(", ") : `${result.overflow}px`,
      );
    }

    await context.close();
  }

  /* ---------------------------------------------------------------------
     2b. Background plates must actually cover their container.
         A Tailwind position-utility collision once collapsed a full-bleed
         background photo into a 50px strip. Nothing else noticed: the image
         decoded fine, nothing overflowed, no console error. The only reliable
         signal is comparing the plate's box to its parent's.
     --------------------------------------------------------------------- */
  for (const route of ["/", "/gym"]) {
    const context = await browser.newContext({ viewport: DESKTOP });
    const page = await context.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const undersized = await page.evaluate(() => {
      const out = [];
      for (const plate of document.querySelectorAll("[data-plate]")) {
        const parent = plate.parentElement;
        if (!parent) continue;
        const p = parent.getBoundingClientRect();
        const c = plate.getBoundingClientRect();
        if (p.height < 40) continue;
        const ratio = c.height / p.height;
        if (ratio < 0.8 || c.width < p.width * 0.8) {
          out.push(
            `${Math.round(c.width)}x${Math.round(c.height)} inside ${Math.round(p.width)}x${Math.round(p.height)} (${Math.round(ratio * 100)}%)`,
          );
        }
      }
      return out;
    });

    record(
      route,
      "background plates cover their container",
      undersized.length === 0,
      undersized.slice(0, 3).join(" | "),
    );
    await context.close();
  }

  /* ---------------------------------------------------------------------
     3. Hero headline: is anything clipped by the word masks?
     --------------------------------------------------------------------- */
  {
    const context = await browser.newContext({ viewport: DESKTOP });
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);

    const hero = await page.evaluate(() => {
      const words = [...document.querySelectorAll("h1 [data-word]")];
      const clipped = words.filter((w) => {
        const mask = w.parentElement;
        const wr = w.getBoundingClientRect();
        const mr = mask.getBoundingClientRect();
        /* Allow 1px of subpixel slop. A fully hidden word reports a large
           overflow; a clipped descender reports a few pixels. */
        return wr.top < mr.top - 1 || wr.bottom > mr.bottom + 1;
      });
      return {
        count: words.length,
        clipped: clipped.map((w) => w.textContent),
        opacity: words.map((w) => getComputedStyle(w).opacity),
        text: words.map((w) => w.textContent).join(" "),
      };
    });

    record("hero", "headline split into words", hero.count === 4, `found ${hero.count}`);
    record("hero", "no word clipped by its mask", hero.clipped.length === 0, hero.clipped.join(", "));
    record(
      "hero",
      "all words are fully visible",
      hero.opacity.every((o) => Number(o) === 1),
      `opacities ${hero.opacity.join(",")}`,
    );
    record("hero", "headline reads correctly", hero.text === "Coaching, without the crowd.", hero.text);

    await page.screenshot({ path: join(SHOTS, "home-hero.png") });
    await context.close();
  }

  /* ---------------------------------------------------------------------
     3b. Headline line count. A hero that wraps to four lines is a font-size
         error, not a copy problem, and it is invisible to a DOM assertion
         that only checks the text content.
     --------------------------------------------------------------------- */
  for (const width of [1024, 1280, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    const counts = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      if (!h1) return null;
      /* Count distinct vertical positions of the word spans. Using
         Range.getClientRects() here is wrong: the words are nested
         inline-block masks, so a range produces several rects per visual line
         and reports a 2-line headline as 6 lines. */
      const words = [...h1.querySelectorAll("[data-word]")];
      const tops = new Set(
        words.map((w) => Math.round(w.getBoundingClientRect().top)),
      );
      const h1Width = Math.round(h1.getBoundingClientRect().width);
      return { lines: tops.size, words: words.length, h1Width };
    });

    record(
      `hero@${width}`,
      "headline is 2 lines",
      counts && counts.lines === 2,
      counts
        ? `${counts.lines} lines from ${counts.words} words in a ${counts.h1Width}px column`
        : "no h1",
    );
    await context.close();
  }

  /* ---------------------------------------------------------------------
     4. Full page captures for visual review
     --------------------------------------------------------------------- */
  for (const [name, route] of [["home", "/"], ["training", "/training"], ["brand", "/brand"]]) {
    const context = await browser.newContext({ viewport: DESKTOP });
    const page = await context.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(SHOTS, `${name}-full.png`), fullPage: true });
    await context.close();
  }

  /* ---------------------------------------------------------------------
     5. Mobile: the pan must degrade to a stacked list
     --------------------------------------------------------------------- */
  {
    const context = await browser.newContext({
      viewport: MOBILE,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    const mobile = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;

      const isClipped = (el) => {
        let p = el.parentElement;
        while (p && p !== doc) {
          const cs = getComputedStyle(p);
          if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
          p = p.parentElement;
        }
        return false;
      };
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.display === "none") continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        if (r.right <= vw + 1 && r.left >= -1) continue;
        if (isClipped(el)) continue;
        const cls =
          typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
            : "";
        offenders.push({
          sel: el.tagName.toLowerCase() + cls,
          left: Math.round(r.left),
          right: Math.round(r.right),
          text: (el.textContent ?? "").trim().slice(0, 40),
        });
      }

      return {
        overflow: doc.scrollWidth - vw,
        offenders: offenders.slice(0, 8),
      };
    });

    record("mobile", "no horizontal overflow", mobile.overflow <= 1, `${mobile.overflow}px`);
    if (mobile.offenders.length) {
      record(
        "mobile",
        "no unclipped element escapes the viewport",
        false,
        mobile.offenders
          .map((o) => `${o.sel} [${o.left}..${o.right}] "${o.text}"`)
          .join("  ||  "),
      );
    }
    /* The full-bleed split panel must actually stack, not sit side by side
       squeezed, on a phone. */
    const twoUp = await page.evaluate(() => {
      const section = document.querySelector("#the-two-ways-in");
      /* :scope > div skips the sr-only h2, which is the first child. */
      const grid = section?.querySelector(":scope > div");
      const panels = grid ? [...grid.children] : [];
      if (panels.length < 2) return null;
      const a = panels[0].getBoundingClientRect();
      const b = panels[1].getBoundingClientRect();
      return { stacked: b.top > a.bottom - 4, aWidth: Math.round(a.width) };
    });
    record(
      "mobile",
      "two ways panel stacks",
      twoUp?.stacked === true,
      twoUp ? `first panel ${twoUp.aWidth}px wide` : "not found",
    );
    await page.screenshot({ path: join(SHOTS, "mobile-home.png"), fullPage: true });
    await context.close();
  }

  /* ---------------------------------------------------------------------
     6. Reduced motion: nothing may stay hidden after scrolling past it,
        and nothing may have travelled or blurred.
     --------------------------------------------------------------------- */
  {
    const context = await browser.newContext({
      viewport: DESKTOP,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const diag = attachDiagnostics(page, "reduced-motion");
    await page.goto(BASE + "/", { waitUntil: "networkidle" });

    /* Walk the whole page: a reveal that has not entered the viewport yet is
       legitimately still hidden, so checking without scrolling tests nothing. */
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => requestAnimationFrame(() => r()));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1200);

    const hidden = await page.evaluate(() => {
      const revealed = [...document.querySelectorAll("[data-reveal]")];
      const invisible = revealed.filter(
        (el) => Number(getComputedStyle(el).opacity) < 0.9,
      );
      /* Nothing should still be carrying a travel offset or a defocus. */
      const displaced = revealed.filter((el) => {
        const t = getComputedStyle(el).transform;
        return t !== "none" && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(t);
      });
      const blurred = revealed.filter((el) => {
        const f = getComputedStyle(el).filter;
        return f !== "none" && f.includes("blur") && !f.includes("blur(0px)");
      });
      const words = [...document.querySelectorAll("h1 [data-word]")];
      return {
        total: revealed.length,
        invisible: invisible.length,
        displaced: displaced.length,
        blurred: blurred.length,
        wordsHidden: words.filter(
          (w) => Number(getComputedStyle(w).opacity) < 0.9,
        ).length,
      };
    });

    record(
      "reduced-motion",
      "revealed blocks are not left invisible",
      hidden.invisible === 0,
      `${hidden.invisible} of ${hidden.total} below 0.9 opacity`,
    );
    record(
      "reduced-motion",
      "no block is left translated",
      hidden.displaced === 0,
      `${hidden.displaced} still transformed`,
    );
    record(
      "reduced-motion",
      "no block is left defocused",
      hidden.blurred === 0,
      `${hidden.blurred} still blurred`,
    );
    record("reduced-motion", "headline words visible", hidden.wordsHidden === 0, "");
    record(
      "reduced-motion",
      "no console errors",
      diag.consoleErrors.length === 0,
      diag.consoleErrors.slice(0, 3).join(" | "),
    );
    record(
      "reduced-motion",
      "no hydration errors",
      !diag.consoleErrors.some((m) => /hydrat/i.test(m)),
      diag.consoleErrors.filter((m) => /hydrat/i.test(m)).slice(0, 2).join(" | "),
    );

    await context.close();
  }

  /* ---------------------------------------------------------------------
     7. Narrow viewport sweep: the headline is the usual overflow source
     --------------------------------------------------------------------- */
  for (const width of [320, 360, 390, 414, 768, 1024]) {
    const context = await browser.newContext({
      viewport: { width, height: 800 },
    });
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    /* globals.css sets `overflow-x: hidden` on body as a safety net for
       exactly this class of bug. It also masks the culprit: with it in place
       every element reads as "clipped by an ancestor" and the audit reports
       nothing. Neutralise it for the measurement, then restore it as a
       guarantee rather than a cover-up. */
    await page.addStyleTag({ content: "body{overflow-x:visible !important}" });
    await page.waitForTimeout(200);

    const sweep = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;
      const isClipped = (el) => {
        let p = el.parentElement;
        while (p && p !== doc && p !== document.body) {
          const cs = getComputedStyle(p);
          if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
          p = p.parentElement;
        }
        return false;
      };
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.display === "none") continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        if (r.right <= vw + 1 && r.left >= -1) continue;
        if (isClipped(el)) continue;
        const cls =
          typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
            : "";
        offenders.push(
          `${el.tagName.toLowerCase()}${cls} [${Math.round(r.left)}..${Math.round(r.right)}] w=${Math.round(r.width)} "${(el.textContent ?? "").trim().slice(0, 26)}"`,
        );
      }
      return { overflow: doc.scrollWidth - vw, offenders: offenders.slice(0, 4) };
    });

    record(
      `w${width}`,
      "no overflow",
      sweep.overflow <= 1 && sweep.offenders.length === 0,
      sweep.offenders.length
        ? sweep.offenders.join("  ||  ")
        : `${sweep.overflow}px`,
    );
    await context.close();
  }

  await browser.close();
  server.kill();

  /* ---------------------------------------------------------------- report */
  const failed = results.filter((r) => !r.ok);
  const width = Math.max(...results.map((r) => r.name.length));

  console.log("\n=== RENDER VERIFICATION ===\n");
  let scope = null;
  for (const r of results) {
    if (r.scope !== scope) {
      scope = r.scope;
      console.log(`  ${scope}`);
    }
    console.log(
      `    ${r.ok ? "PASS" : "FAIL"}  ${r.name.padEnd(width)}${
        r.detail ? `  ${r.detail}` : ""
      }`,
    );
  }

  console.log(
    `\n  ${results.length - failed.length}/${results.length} passed. Screenshots in ${SHOTS}\n`,
  );

  if (failed.length) process.exitCode = 1;
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
