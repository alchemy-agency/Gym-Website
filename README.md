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

1. **In the repo** — `vercel.json` already pins `"framework": "nextjs"`.
   Commit and redeploy.
2. **In the dashboard** — go to **Settings → Build and Deployment → Framework
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

- `LEAD_WEBHOOK_URL` — a Zapier / Make / n8n catch hook, a Slack incoming
  webhook, or Formspree. The body is JSON and includes a pre-formatted
  `subject` and `text` field, so a Slack webhook works with zero mapping.
- `RESEND_API_KEY` + `LEAD_EMAIL_TO` + `LEAD_EMAIL_FROM` — emails each lead
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

- [ ] **`facilityList`** — the equipment list. Confirm it against the real floor.
- [ ] **`membershipTerms`** — confirm the terms with Sam.
- [ ] **Package structure.** No dollar amounts appear anywhere on the site on
      purpose: everything says "rates on request". When Sam gives you numbers,
      add a `rate` field to each entry in `packages` and render it.

**In `src/content/panel.ts`**

- [ ] Confirm the inclusion terms with Function Health's partner team.
- [ ] Confirm `$365` is still the current annual rate, and that `160+` is still
      the advertised test count.
- [ ] The marker list is a representative sample of what a panel of this kind
      covers. It is presented as examples, not as the full test list.

**Photography — `src/content/photos.ts`**

Every image is a free-to-use Unsplash placeholder chosen to match the shot that
belongs in that slot. The site applies a monochrome + pine duotone treatment to
all photography, so replacement photos will sit in the design even if they were
shot on a phone, as long as they are reasonably well lit.

Shoot list in priority order:

1. `hero` — the training floor, wide, lights on
2. `portraitSam` — Sam, waist up, eyes to camera, low key
3. `gymFloor` — free weights and racks, empty
4. `coaching` — Sam coaching one client, mid-rep
5. `detail` — a hand on a knurled bar, or chalk, or a loaded plate
6. `conditioning` — rower, bike or sled
7. `coastal` — Huntington Beach, overcast or dusk, not a postcard
8. `lab` — a clean clinical shot (tubes, not needles)

Replace the `src` values in `src/content/photos.ts`. Nothing else needs to
change. If you host them locally instead of on Unsplash, drop them in
`public/` and use `/filename.jpg`.

**Not built on purpose**

- **Testimonials.** There are none in the design because inventing them would be
  dishonest. Send real ones (with permission) and a section can be added.
- **Published rates.** See above.

---

## Design system

All tokens live in `src/app/globals.css`. Four decisions are locked in, and
breaking them is what makes the site look generic again:

1. **Theme lock** — the whole site is dark. Variety comes from tonal shifts
   inside the dark range plus the one deep-pine colour block, never from a
   section inverting to light.
2. **Colour lock** — ember (`#e04a17`) is the only accent, and it is never used
   as a large fill. Primary buttons are bone on ink.
3. **Shape lock** — corner radius is `0` everywhere. The only circle on the site
   is the semantic status dot.
4. **Photo lock** — every image goes through `<Plate>`, which desaturates it and
   blends a pine duotone over the top. That is what makes eight unrelated
   photographs read as one art-directed shoot, and it is why ember is the only
   real colour on the page.

Type: **Archivo** (display, expanded width axis) + **Geist** (body) +
**Geist Mono** (small labels). `display-1/2/3` and `stamp` are custom utilities
in `globals.css`.

---

## File map

```
src/
  app/
    layout.tsx              fonts, metadata, JSON-LD, nav, footer, grain
    globals.css             all design tokens + custom utilities
    page.tsx                home
    gym/page.tsx            private gym + application form
    training/page.tsx       personal training + free session form
    function-health/page.tsx
    visit/page.tsx
    privacy/page.tsx
    thank-you/page.tsx      conversion landing, fires the tracking event
    not-found.tsx
    api/lead/route.ts       validate + forward form submissions
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
  components/
    Nav, Footer, Button, Section, Plate, ParallaxPlate, Reveal,
    Accordion, Process, FaqSection, CtaBand, PageHero, Bits,
    ContactLinks, GoogleTag, Grain
    forms/LeadForm.tsx      both forms, field config in src/lib/lead.ts
    home/                   the eight home page sections
  content/                  ALL copy and business facts live here
    business.ts offers.ts panel.ts photos.ts
  lib/
    lead.ts                 field definitions + validation (shared client/server)
    tracking.ts             every conversion event
    cn.ts
```
