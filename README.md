# Sam's Body Shop HB

Marketing site for Sam Axelrode's private gym (Sam's Body Shop HB) and his
one-on-one personal training business (Sam at da Body Shop), both run out of
7351 Autopark Drive, Huntington Beach, CA 92648.

Two funnels, one site:

| Funnel | Route | Primary conversion |
| --- | --- | --- |
| Private gym membership | `/gym` | Membership application submitted |
| Personal training with Sam | `/training` | Free first session requested |

Both funnels are supported by `/function-health`, which explains the
complimentary Function Health biomarker panel that comes with a session pack.

---

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **Tailwind CSS v4** (CSS-first config, tokens in `src/app/globals.css`)
- **Motion** (`motion/react`) for scroll reveals and parallax
- **Phosphor Icons** (`@phosphor-icons/react/dist/ssr`)
- No database. Form submissions POST to `/api/lead` and are forwarded out.

---

## Running it

```bash
npm install
cp .env.example .env.local     # then fill in what you have
npm run dev                    # http://localhost:3000
```

```bash
npm run typecheck              # tsc --noEmit
npm run build                  # production build
npm run verify                 # drives real Chromium; 77 render assertions
npm run check                  # all three, in order
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → import the repo**. The framework is pinned
   to Next.js by `vercel.json`, so there are no build settings to change.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables** (Production + Preview).
   At minimum set `NEXT_PUBLIC_SITE_URL` to the real domain.
4. Deploy, then add the custom domain under **Settings → Domains**.

### If you see "No Output Directory named public found"

That means Vercel treated the project as a static site instead of a Next.js
app. It normally happens when the Vercel project was created while the repo was
still empty, so the framework preset defaulted to **Other** and got cached.

Two fixes, and it is worth doing both:

1. **In the repo** - `vercel.json` already pins `"framework": "nextjs"`.
   Commit and redeploy.
2. **In the dashboard** - go to **Settings → Build and Deployment → Framework
   Preset**, set it to **Next.js**, and confirm **Output Directory** is empty
   (not `public`). Then redeploy.

Do not "fix" this by adding a `public/` directory. That silences the error but
deploys an empty static site with none of the actual pages.

The site has no database, no server state and no cron jobs, so it runs on the
Vercel Hobby plan as-is. Every page except `/api/lead` and `/thank-you` is
statically prerendered.

---

## Google Ads handoff

Everything Google needs is already wired. Two env vars switch it on, and
nothing fires until they are set, so preview deployments stay out of the data.

### 1. Set the IDs

| Variable | Where to find it | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads → Admin → Account settings → Conversion ID | `AW-123456789` |
| `NEXT_PUBLIC_GA4_ID` | Analytics → Admin → Data streams → Measurement ID | `G-XXXXXXXXXX` |

### 2. Create two conversion actions and paste their labels

In **Google Ads → Goals → Conversions → New conversion action → Website**, create:

1. `Free training session request`
2. `Gym membership application`

For each, open **Tag setup → Use Google Tag Manager / Install the tag
yourself** and copy the label (the part after the slash in `send_to`).

| Variable | Conversion action |
| --- | --- |
| `NEXT_PUBLIC_GADS_LABEL_FREE_SESSION` | Free training session request |
| `NEXT_PUBLIC_GADS_LABEL_MEMBERSHIP` | Gym membership application |

### 3. What fires, and where

All of it lives in `src/lib/tracking.ts`. Each event goes to `window.dataLayer`
(so GTM triggers work too) and to `gtag` when the IDs above are present.

| Event | Fired when | Feeds |
| --- | --- | --- |
| `generate_lead` | A form is successfully submitted | GTM custom-event trigger |
| `book_free_session` | Free session request lands on `/thank-you?type=free_session` | GA4 |
| `submit_membership` | Application lands on `/thank-you?type=membership` | GA4 |
| Google Ads `conversion` | Same two moments, using the labels above | Google Ads |
| `click_to_call` | Any `tel:` link is tapped | GA4 + Ads (`/call`) |
| `click_to_email` | Any `mailto:` link is tapped | GA4 |

**Backup for URL-based goals.** The conversion fires on `/thank-you`, so you can
also create the two conversion actions using the "URL contains
`/thank-you?type=free_session`" rule instead of the event. Both routes work;
pick one so conversions do not double count.

### 4. Recommended landing pages

| Ad group theme | Final URL |
| --- | --- |
| private gym Huntington Beach | `/gym` |
| personal trainer Huntington Beach | `/training` |
| personal trainer + blood work / longevity angle | `/function-health` |

### 5. Where leads actually go

Form submissions POST to `/api/lead` (`src/app/api/lead/route.ts`), which
validates, rate limits, and forwards them. Set **one** of these:

- `LEAD_WEBHOOK_URL` - a Zapier / Make / n8n catch hook, a Slack incoming
  webhook, or Formspree. The body is JSON and includes a pre-formatted
  `subject` and `text` field, so a Slack webhook works with zero mapping.
- `RESEND_API_KEY` + `LEAD_EMAIL_TO` + `LEAD_EMAIL_FROM` - emails each lead
  directly, with `reply_to` set to the enquirer.

If neither is set, the submission is written to the Vercel function logs with
`console.warn`, so nothing is silently lost while testing.

---

## What still needs real content

Nothing here is invented, but a few things are placeholders that must be
replaced before the site goes live. They are all flagged with `VERIFY` comments
in the source.

**In `src/content/business.ts`**

- [ ] **Instagram URL.** Empty right now, so the link is hidden everywhere.
      Paste the profile URL and it appears in the footer automatically.
- [ ] **Hours.** Currently "By appointment / Members only / Not available".
      Confirm these are how Sam wants to describe it.
- [ ] **Contact details.** Taken from the existing sites and assumed correct.
- [ ] **`site.url`** must match the production domain.

**In `src/content/offers.ts`**

- [ ] **`facilityList`** - the equipment list. Confirm it against the real floor.
- [ ] **`membershipTerms`** - confirm the terms with Sam.
- [ ] **Package structure.** No dollar amounts appear anywhere on the site on
      purpose: everything says "rates on request". When Sam gives you numbers,
      add a `rate` field to each entry in `packages` and render it.

**In `src/content/panel.ts`**

- [ ] Confirm the inclusion terms with Function Health's partner team.
- [ ] Confirm `$365` is still the current annual rate, and that `160+` is still
      the advertised test count.
- [ ] The marker list is a representative sample of what a panel of this kind
      covers. It is presented as examples, not as the full test list.

**Photography - `src/content/photos.ts`**

Three of the images are **real photographs of Sam's own gym**, pulled from
samsbodyshop.com and resized into `public/images/`:

| File | What it shows |
| --- | --- |
| `runner-track.jpg` | A runner on an outdoor track. Portrait, used in the heroes. |
| `gym-exterior.jpg` | The building, roller door and mirrored windows. |
| `gym-mural.jpg` | The wave and palm tree mural. Panoramic, used as a wide band. |

Two remain free stock, kept only where nothing about the gym is being claimed
and no equipment is visible: blood collection tubes for the Function Health
page, and the Huntington Beach pier for the visit page.

**One photo is downloaded but deliberately unused.** `gym-floor.jpg` sits in
`public/images/` and is not referenced anywhere. It is a real photo of a Sam's
Ultimate Body Shop floor, but it is dense with machines and it has not been
confirmed whether it is the Autopark Drive room or a different location. Confirm
with Sam, then wire it in.

**The highest value shot is now a portrait of Sam.** It is the one image the
site is missing, and the training section is laid out to take it: the sticky
column currently holds his quote and is sized for a photo. Drop the file into
`public/images/` and swap the quote block back to a `<Plate>`.

Every image is rendered as warm toned black and white by `<Plate>`, so real
photos shot on a phone sit in the design alongside anything else.

#### The position-utility trap

`<Plate>` sets `relative` because a Next.js `fill` image needs a positioned
parent. If a caller also passes `absolute`, **both are Tailwind `position`
utilities and whichever is emitted later in the stylesheet wins**, regardless of
the order you write them. That silently collapsed a full-bleed background photo
into a 50px strip: the image decoded fine, nothing overflowed, and no console
error was logged. If you need an absolutely positioned plate, wrap it:

```tsx
<div className="absolute inset-0 -z-10">
  <Plate photo={photo} className="h-full w-full" />
</div>
```

`npm run verify` now asserts that every `[data-plate]` covers at least 80% of
its parent, so this cannot come back quietly.

**Not built on purpose**

- **Testimonials.** There are none in the design because inventing them would be
  dishonest. Send real ones (with permission) and a section can be added.
- **Published rates.** See above.

---

## Design system

All tokens live in `src/app/globals.css`. Four decisions are locked in, and
breaking them is what makes the site look generic again:

1. **Theme lock** - the whole site is dark. Variety comes from tonal steps
   inside the dark range (`ink` → `ink-4` → `void`) plus ember ambient light,
   never from a section inverting to light.
2. **Hue lock** - the palette is warm neutral. There is no green, no blue and no
   second accent. Ember (`#ff610f`, the exact orange from the supplied brand mark) is the only colour, reserved for things that
   need to be found: the free session, live state, focus rings, meaningful
   numbers. It is never a large fill.
3. **Shape lock** - corner radius is `0` everywhere. The only circle in the
   layout is the semantic status dot.
4. **Photo lock** - every image goes through `<Plate>`, which renders it as warm
   toned black and white (`grayscale` + a whisper of `sepia`). That is what
   makes eight unrelated photographs read as one art-directed shoot, and it
   leaves ember as the only real colour on the page.

`@theme` starts with `--color-*: initial`, which deletes Tailwind's default
palette. That keeps roughly 10 KB of unused colour variables out of the build
and, more importantly, means a stray `bg-slate-100` fails loudly instead of
silently breaking the hue lock.

Type: **Archivo** (display, expanded width axis) + **Geist** (body) +
**Geist Mono** (tabular figures only). `display-1/2/3`, `label` and `numeral`
are custom utilities in `globals.css`.

One deliberate reversal worth recording: an earlier version used a deep pine
green as the identity colour with a green duotone over every photograph. Against
a near-black base with monospace labels, that read as a terminal. Do not
reintroduce a green cast.

---

## Animation

Two engines, kept apart on purpose. The rule is that **GSAP and Motion must
never share a component tree** - they fight over the same frames.

**Motion** (`motion/react`) handles state and scroll reveals:
`Reveal`, `ParallaxPlate`, `Magnetic`, `Accordion`, `PanelExplorer`, `Template`.

**GSAP** (`gsap/ScrollTrigger`) handles scrolltelling. Each one is an isolated
client leaf under `src/components/gsap/`:

| Component | What it does | Why it is motivated |
| --- | --- | --- |
| `HeadlineReveal` | Hero words rise out of per-word clipping masks | Hierarchy: the value prop assembles itself |
| `Marquee` | One kinetic band, accelerated by scroll velocity | Storytelling: Sam's four training goals as connective tissue |
| `Counter` | Scrubbed count to 160+ | Makes the size of the panel offer land |

There is exactly **one marquee** on the site. A second would make both feel like
filler.

A fourth GSAP component, `FloorPan`, was deleted. It was a pinned horizontal pan
of equipment categories and every item in it was invented. Inventing a list is
worse than omitting one, because somebody could join on the strength of it. It
is recoverable from git history if Sam ever supplies a real equipment list.

### Constraints these components respect

- `start: "top top"` + `pin: true` + `end: () => "+=" + distance` on the pan,
  per the canonical pinned-pan skeleton.
- `gsap.matchMedia()` gates the pan to `min-width: 1024px` **and**
  `prefers-reduced-motion: no-preference`. Below that, no ScrollTrigger is
  created at all and the same markup reads as a stacked list, so the mobile
  fallback needs no separate component.
- No `window.addEventListener("scroll")` anywhere.
- `template.tsx` animates **opacity only**. A `transform` on that wrapper would
  make it the containing block for `position: fixed`, which silently breaks
  ScrollTrigger pinning. Do not add a `y` or `scale` to it.
- Hero copy and CTAs are static server markup. The headline is real text with
  real spaces, split into spans, and it is **not** hidden in CSS - GSAP hides it
  inside a layout effect so no-JS visitors still see a full headline and nothing
  delays a pre-hydration paint.
- Blur reveals are opt-out (`blur={false}`) on long lists, because animating
  `filter` on 20 rows at once is a real cost.

---

## Brand assets

These are the client's own files, imported rather than redrawn. Source copies
live in `public/brand/source/`.

| File | What it is |
| --- | --- |
| `public/brand/wordmark.svg` | Lockup: mark + SAM'S BODY SHOP, bone lettering |
| `public/brand/wordmark-ink.svg` | Same, ink lettering, for light surfaces |
| `public/brand/mark.svg` / `mark-bone.svg` | The "S" mark alone |
| `src/app/icon.svg` | Favicon, used as supplied |
| `src/components/brand/markPath.ts` | Generated path data for `<LogoMark>` |

**Preview at `/brand`** (noindex, not in the nav or sitemap). It renders the mark
at 16/20/24/32/48/64/96/160px, both lockup variants at every size, all three
colourways, and the usage rules. Look at it before placing the logo anywhere.

### Two changes made on import, both deliberate

**1. The letter counters are now real holes.** The supplied wordmark faked the
counters in B, D, O, P and A by painting them with a hard-coded `#080808` shape
on top of the letterforms. That only works on the exact black it was drawn
against: put it on bone and you get black blobs inside the letters. The counters
are merged into the same path with `fill-rule="evenodd"` so they are genuine
holes and the lockup is background independent.

**2. The canvas was cropped.** The original viewBox was 1672x941 with the lockup
floating in the middle of it. It is now tight to the artwork, so the lockup can
be sized by height without guessing at padding.

Everything else, including all path data, is untouched.

### Regenerating

```bash
npm run brand      # re-imports from public/brand/source/
```

The script validates its own output: it rejects any entity XML does not define,
unbalanced tags, and a missing counter punch-out. That guard exists because an
`&rsquo;` in an SVG `<title>` shipped a broken logo once already: SVG is XML, so
HTML entities like `&rsquo;` make the file unparseable, and the browser then
renders a broken image **with no console error and no failed request**. Do not
reintroduce a `<title>` element here; for an SVG loaded through `<img>` the
accessible name comes from the `alt` attribute anyway.

### The HB qualifier

Rendered as a separate element beside the lockup, not baked into the SVG, so the
logo file stays exactly as drawn. It earns its place: the trading name collides
with a number of auto body shops called Sam's Body Shop. It is hidden below the
`sm` breakpoint, where there is no room for it.

### Typography note

The wordmark is a custom oblique condensed face, so the site's display type is
set to `font-stretch: 94%` in Archivo to echo its proportions rather than fight
it. The headings stay upright, because a fully oblique site competes with the
logo. Do not set the trading name in a web font: that is a different logo.

---
## File map

```
src/
  app/
    layout.tsx              fonts, metadata, JSON-LD, nav, footer, grain
    template.tsx            route transition (opacity only, see Animation)
    globals.css             all design tokens + custom utilities
    page.tsx                home
    gym/page.tsx            private gym + application form
    training/page.tsx       personal training + free session form
    function-health/page.tsx
    visit/page.tsx
    brand/page.tsx          brand reference (noindex, internal only)
    privacy/page.tsx
    thank-you/page.tsx      conversion landing, fires the tracking event
    brand/page.tsx          logo preview (noindex, internal only)
    not-found.tsx
    api/lead/route.ts       validate + forward form submissions
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
  components/
    Nav, Footer, Button, Section, Plate, ParallaxPlate, Reveal,
    Accordion, Process, FaqSection, CtaBand, PageHero, Bits, Logo,
    ContactLinks, GoogleTag, Grain, MarkerGroups, PanelExplorer, Magnetic, Bento
    forms/LeadForm.tsx      both forms, field config in src/lib/lead.ts
    gsap/                   HeadlineReveal, Marquee, Counter
    brand/markPath.ts       generated brand path data
    home/                   the home page sections
  content/                  ALL copy and business facts live here
    business.ts offers.ts panel.ts photos.ts
  lib/
    lead.ts                 field definitions + validation (shared client/server)
    tracking.ts             every conversion event
    cn.ts
```
