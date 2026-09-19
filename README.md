# Jubilee Prosthetics & Orthotics — Website Build

A premium, multi-page, static front-end for Jubilee Prosthetics & Orthotics,
built to the brief's "Clinical Luxury + Human Inspiration + Subtle Medical
Technology" direction. This is a real, working front-end (open `index.html`
in a browser, or serve the folder with any static server) — not a mockup.

## How to preview

```
cd jubilee
python3 -m http.server 8080
# open http://localhost:8080
```

Any static host (Netlify, Vercel static, GitHub Pages, S3, or a CMS's static
export) will work as-is — there is no build step.

## What's built

- **15 pages**: Home, About, Services (directory + filter/search), Service
  Detail (dynamic template via `?service=slug`), Patient Stories, Resources
  (filterable article index), Resource Article (dynamic template via
  `?article=slug`), FAQ, Contact, Book Appointment — plus Privacy, Terms,
  Accessibility and a branded 404 page.
- **Centralized config** (`assets/js/config.js` — `SITE_CONFIG`): phone,
  WhatsApp, email, address, hours, social links, nav, CTA labels, service
  categories, values, mission/vision, practitioner info. Change a value once
  here and it updates everywhere (header, footer, forms, WhatsApp links,
  Jubilee Guide).
- **Design system** (`assets/css/tokens.css`, `base.css`, `components.css`):
  navy/gold/green/gray palette expanded into a full accessible scale, no
  red, Rethink Sans for display/body type, a monospace face for small
  labels/eyebrows only (never body copy).
- **Jubilee Guide**: an elegant, integrated assistant widget (floating
  launcher + panel) with a small keyword-matched knowledge base, safety
  fallback language for medical questions, and an explicit redirect for
  urgent/emergency phrasing. This is a front-end simulation — see
  "Connecting a real AI backend" below to wire it to Claude or another LLM.
- **Reusable components**: Navbar (sticky, mobile slide-down), Footer,
  WhatsApp FAB, PrimaryButton/SecondaryButton/WhatsAppButton/PhoneButton
  styles, ServiceCard/ServiceGrid/ServiceFilter, FAQAccordion (searchable,
  categorized), BeforeAfterSlider (drag + keyboard accessible), Testimonial/
  PatientStoryCard, AppointmentForm/ContactForm/NewsletterForm (loading/
  success/error states), ImagePlaceholder, EmptyState.
- **Accessibility**: skip-link, semantic headings, visible focus states,
  keyboard-operable nav/accordion/slider, `prefers-reduced-motion` support,
  44px+ touch targets, labelled form fields.
- **SEO**: unique titles/descriptions per page, canonical tags, Open Graph
  tags, one H1 per page, breadcrumbs, `MedicalBusiness` structured data on
  the homepage (using only supplied, approved contact details).

## Content status — what's approved vs. required

Everything sourced from the client brief (contact details, colors,
tagline, mission/vision, values, practitioner credentials, service
category names) is marked **APPROVED** in `config.js` comments and used
as-is. Everything else is a clearly labelled placeholder:

- `[IMAGE SLOT: ...]` dashed placeholders throughout — see `assets/images/`
  for the full folder structure. Replace an image by dropping a file at the
  listed path and swapping the `.img-slot` block for an `<img>` tag; no
  layout restructuring required.
- `[BUSINESS HOURS TO BE CONFIRMED]` — source only gave "08:00" with no
  closing time.
- `[FAQ CONTENT REQUIRED]` / `[CLIENT CONTENT REQUIRED]` — placeholder FAQ
  and legal-page copy awaiting Jubilee's approved answers.
- `[PATIENT TESTIMONIAL REQUIRED]` / `[PATIENT PHOTO — WITH CONSENT]` —
  Patient Stories and Before/After sections ship as elegant empty states,
  not fabricated testimonials.
- Facebook is the only social link wired up (client-supplied); Instagram,
  LinkedIn, TikTok, X and YouTube are omitted until real URLs are supplied.
- The brand value "TW" from the source list was ambiguous and is
  intentionally left out of `SITE_CONFIG.values` pending client
  clarification, rather than guessed at.
- No statistics, awards, certifications, insurance partners, or patient
  outcomes are claimed anywhere on the site.

## CMS architecture (for future headless CMS integration)

The site is structured so a CMS (e.g. a headless CMS, or a custom admin)
can replace hard-coded arrays without touching markup:

- `SITE_CONFIG` in `config.js` → **Site Settings** collection.
- `SITE_CONFIG.serviceCategories` + `SERVICE_CONTENT` (`service-content.js`)
  → **Services** collection (name, category, description, image, FAQs).
- FAQ arrays inline in `faq.html` / `service-detail.html` → **FAQ**
  collection (question, answer, category, published).
- Patient Stories / Testimonials empty states → **Patient Stories** and
  **Testimonials** collections (name, story, image, service, date,
  featured, consent — consent is a required field before any story
  renders).
- Resources page → **Blog/Resources** collection (title, slug, category,
  image, excerpt, content, author, date, SEO fields, published/draft).
- Practitioner block on About → **Team** collection.

To connect a real CMS: replace the relevant JS object/array with a `fetch()`
call to the CMS API at page load, keep the same rendering functions.

## Connecting a real backend

- **Forms** (`assets/js/widgets.js`, `initForms()`): currently simulate a
  network request and show the success message from the brief. Replace the
  `setTimeout` block with a `fetch()` POST to your endpoint (appointment
  requests, contact messages, newsletter signups). No API keys are present
  in any front-end file.
- **Jubilee Guide** (`assets/js/components.js`, `guideRespond()`): currently
  a small local keyword-matched knowledge base. To connect a real AI
  backend, replace `guideRespond()` with a `fetch()` call to your LLM
  endpoint, keeping the same safety system prompt constraints described in
  the brief (no diagnosis, no treatment recommendations, no invented
  policies/prices, redirect medical/emergency questions).
- **Google Maps**: already embedded on `contact.html` using the client-supplied
  link. To refine the pin, edit `SITE_CONFIG.mapsEmbedSrc` in `config.js`.

## Photos — rename and drop, no stock photos anymore

Earlier drafts of this build used free stock photography as filler. That's
gone now — every image slot on the site points at a plain local file path
instead, so there is nothing left to "swap out." Just rename your photo to
the exact filename expected and drop it into the exact folder expected, and
it appears with no further changes. Full details, and the complete list of
every filename and folder, are under **"How to change the images"** further
down this document.


## Latest updates in this build

- **Map** — wired to Jubilee's supplied Google Maps link, embedded on the Contact page with a "Get Directions" button. Note: the link resolves to Abakaliki, Ebonyi State at town level, not a precise street pin — swap the coordinates in `SITE_CONFIG.mapsEmbedSrc` once a more exact pin is available.
- **Scroll animations** — a thin gold→green scroll-progress bar, a subtle parallax drift on the homepage hero image, a clip-path "wipe" reveal with a gentle image zoom-out for secondary editorial photos (human story, about page, service detail hero), and staggered card entrances on every grid. All of it is disabled automatically for visitors with `prefers-reduced-motion` set.
- **All stock photography removed** — every image slot now points at a plain local file (see "How to change the images" below), so there's nothing left to attribute or swap out. Rename your photo to the expected filename, drop it in the matching folder, done.
- **FAQ** — every previously-placeholder answer now has reasonable general guidance (no invented prices, policies, or clinical claims); the search bar and category pills are properly styled.
- **Floating buttons** — WhatsApp is now a wider pill (icon + label) positioned above the Jubilee Guide launcher, matching its visual weight.

## Final review pass — what was added and fixed

This build was audited end-to-end against the original brief. Fixed:

- **Broken navigation** — homepage service cards pointed at `services.html#slug`
  (an anchor that did nothing) instead of the actual service detail pages.
- **Non-functional Resources filters** — the category pills on `resources.html`
  were decorative markup with no data attributes and no JavaScript behind them.
  They now filter a real article grid, and work in combination with a search box.
- **Missing blog/article template** (brief §16) — `resource-article.html` now
  exists as a dynamic template (`?article=slug`) with hero, body, author, date,
  reading time, related articles, Article structured data, and per-article SEO
  tags. Six CMS-shaped starter articles ship in `assets/js/resources-content.js`.
- **Before/after slider was never actually used** — the component existed in CSS
  and JS but no page rendered one, so it couldn't be demonstrated or tested. Working
  sliders now appear on the homepage and Patient Stories page, drag- and
  keyboard-operable, with clearly-labelled before/after image slots.
- **SEO gaps** — 9 pages had no Open Graph tags and 4 had no canonical URL. Every
  page now carries canonical, Open Graph and Twitter Card metadata.
- **FAQPage structured data** (brief §17/§31) was missing. It is now generated at
  runtime from the same array that renders the accordion, so the schema and the
  visible markup cannot drift apart.
- **Added** `sitemap.xml` (generated across all pages, services and articles),
  `robots.txt`, and a branded 404 page.
- **Image folders** now contain `.gitkeep` notes so the directory structure
  survives zipping and tells you what belongs where.

### Testing

The site was tested headlessly with jsdom rather than eyeballed:

- `test_pages.js` — loads all 15 pages, asserts zero JS runtime errors, confirms
  header/footer/mobile-nav/Jubilee Guide all render, and checks each page has
  exactly one `<h1>` and the expected number of rendered cards.
- `test_interactions.js` — 32 behavioural checks: FAQ accordion open/close, FAQ
  and service and resource search + category filters (including combined use and
  empty states), before/after slider keyboard operation and ARIA attributes,
  appointment form validation and loading/success states, config-driven
  tel/WhatsApp/email links, and Jubilee Guide safety behaviour (refusing to
  diagnose, redirecting urgent symptoms to professional care).

All 15 pages load clean; all 32 interaction checks pass. The test scripts are not
included in the site zip — they are development tooling, and the site has no build
step or runtime dependencies.

### Still genuinely outstanding (needs Jubilee, not code)

- Real logo file (a placeholder "J" mark is in use — see "Logo" below).
- Real photography for every image slot listed under "How to change the images" below.
- Real, consented patient stories and before/after media (sample layouts in place).
- Confirmed business hours (source only gave "08:00").
- Clinical sign-off on all FAQ and Resources copy before publication.
- The real production domain — placeholder URLs in canonical/OG tags, `sitemap.xml`
  and `robots.txt` currently read
  `https://www.jubileeprostheticsandorthotics.com` and must be updated.

## Image slots — what renders now

Every image area now renders something designed. Nothing is a blank box:

- **Hero, human story, and service photos** each point at a plain local file
  (see "How to change the images" below for exact filenames). Until that file
  exists, the image fails to load and automatically falls back to a labelled
  placeholder — so a missing photo never leaves empty space, and once you add
  the correctly-named file it just appears, with nothing else to change.
- **Practitioner portrait** (About) works the same way — rename to
  `practitioner-primary.jpg` and drop it in `assets/images/team/`. Until that
  file exists, it falls back to a branded monogram panel with the
  practitioner's name and title, badged *PHOTO TO BE SUPPLIED*, rather than a
  stock stranger's face under a real, named person's title.
- **Brand mark panel** (About, "Our Story") renders the interim Jubilee mark,
  badged *INTERIM MARK — AWAITING OFFICIAL LOGO*.
- **Patient story cards and before/after slider** keep clearly-badged sample
  layouts, since real media requires patient consent.

A reveal-animation bug was also fixed here: `.media-wipe` images started fully
clipped and only appeared once JavaScript added `.is-visible`. If JS was blocked
or slow, those images stayed permanently invisible. Reduced-motion and no-JS
fallbacks now guarantee they always render.

## How to change the logo

No logo file was supplied with this build, so the header, mobile menu, and
favicon all currently use a placeholder navy/white/gold "J" mark — an inline
SVG, not an image file. It appears in exactly two places in the code:

**1. Header + mobile menu logo** — one file, one edit:

Open `assets/js/components.js` and find the `jMark` constant near the top
(around line 15):

```js
const jMark = `
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="38" height="38" rx="10" fill="#0C3E6B"/>
    ...
  </svg>`;
```

Replace the whole template string with an `<img>` tag pointing at your real
logo file, e.g.:

```js
const jMark = `<img src="assets/images/brand/logo-mark.svg" alt="" style="height:34px; width:auto;" />`;
```

This one constant is used everywhere the logo appears in the header and
mobile nav — so this single edit updates the whole site. Add your actual
logo file at `assets/images/brand/logo-mark.svg` (SVG is ideal since it stays
sharp at any size; PNG works too).

**2. Browser tab icon (favicon)** — replace the file directly, same name:

Overwrite `assets/images/brand/favicon.svg` with your real icon (keep it
square, roughly 40×40 or larger). Because every page's `<link rel="icon">`
already points at that exact filename, no HTML edit is needed — just replace
the file. If your icon is a `.png` instead of `.svg`, rename the file to
match or update the one `href="assets/images/brand/favicon.svg"` line on
each page (a single find-and-replace across all `.html` files handles it).

**3. Two more spots use the placeholder mark and are worth checking after
you swap it in:**
- `about.html` — the "Our Story" section shows the mark on a dark panel,
  badged *"INTERIM MARK — AWAITING OFFICIAL LOGO."* Once you've replaced
  `jMark`, you can also remove that badge span in `about.html`
  (`<span class="brand-panel__badge">`) since it will no longer be interim.
- The `<img>` inside that same panel currently points at
  `assets/images/brand/favicon.svg` directly — it will automatically pick up
  your new favicon once you overwrite that file in step 2.

## How to change the images

**Every image on the site now works the same simple way: rename your file
to the exact name below, drop it into the exact folder below, and it
appears automatically. No code, no config file, no HTML to touch.**

Every folder under `assets/images/` that expects a file already contains a
`.gitkeep` note telling you the exact filename it's waiting for, so you can
also just browse the folders if you don't want to check the table below.

**What actually happens under the hood** (useful to know, not required
reading): each image slot points at a fixed local file path. Until a file
exists there, the browser's image fails to load and the site automatically
shows a labelled placeholder instead — so a missing photo never shows a
broken image icon, just a clear note saying what's still needed. The moment
you drop in a correctly-named file, the placeholder is replaced by your
photo with zero other changes.

**Quick reference — rename to this, drop in this folder:**

| Section | Rename your photo to | Drop it in this folder |
|---|---|---|
| Homepage hero | `hero-primary.jpg` | `assets/images/hero/` |
| Homepage "Mobility, Reimagined" | `human-story.jpg` | `assets/images/patients/` |
| Practitioner (About page) | `practitioner-primary.jpg` | `assets/images/team/` |
| Prosthetic Services | `hero.jpg` | `assets/images/services/prosthetics/` |
| Orthotic Services | `hero.jpg` | `assets/images/services/orthotics/` |
| Pediatric Prosthetics & Orthotics | `hero.jpg` | `assets/images/services/pediatric/` |
| Gait Assessment & Rehabilitation | `hero.jpg` | `assets/images/services/rehabilitation/` |
| Prosthetic & Orthotic Repairs | `hero.jpg` | `assets/images/services/repairs/` |
| Custom & Innovative Mobility Solutions | `hero.jpg` | `assets/images/services/mobility/` |
| Each of the 6 Resources articles | `hero.jpg` | `assets/images/blog/<article-slug>/` (the slug matches the article's URL, e.g. `assets/images/blog/caring-for-your-prosthetic-device/`) |

Service and article photos each get their own folder — the filename is the
same (`hero.jpg`) in every one, so what matters is which folder you drop it
into, not the filename itself.

**One deliberate exception — the practitioner photo works slightly
differently in spirit, not in the steps you take.** It's still a simple
rename-and-drop like everything else above. But because that section names
a real person (Okoro Chibuzor Ogonnaya), the placeholder you'll see until
you add his photo is a designed panel with his name and title — never a
generic stock photo standing in for him. Once you drop in
`practitioner-primary.jpg`, his real photo replaces that panel automatically,
same as any other image on the site.

**Updating the description a screen reader hears for a photo (optional):**
each image also has a short text description (called `alt` text) used by
screen readers and search engines — not something you need to touch to get
your photo showing, but worth updating for accuracy once your real photos
are in. These live in `assets/js/config.js` (for the hero, human-story, and
6 service photos) and `assets/js/resources-content.js` (for article photos)
— search either file for the photo's section name and edit the `alt:` line
next to it.

**Patient stories and before/after images:** these stay as clearly-labelled
sample layouts until Jubilee has real, consented patient photos — that's a
consent decision first, not just a technical one, so there's no simple
file-drop for those yet. When you're ready, ask and I'll wire them in
properly.

