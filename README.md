# Daiva Jankus — Website

Next.js 15 + TypeScript port of the Claude Design prototype for **Daiva Jankus** (sworn Lithuanian–German interpreter and registered professional legal guardian, Mönchengladbach).

All five routes from the design bundle are implemented:

- `/` — homepage (`Daiva Jankus.html`)
- `/dolmetschen` — Mandate I (interpreting & translation): hero, 3-up services, certified translations, locations, differentiation, FAQ ×8, cross-link, closing CTA
- `/rechtliche-betreuung` — Mandate II (legal guardianship): hero, Aufgabenkreise, "Was ist Betreuung", §1816 Vorschlag, Litauisch-Schwerpunkt, differentiation, FAQ ×8, cross-link, closing CTA
- `/ueber` — bio, timeline, credentials grid
- `/kontakt` — three-channel block + Resend-backed form with `?topic=` prefill from cross-page CTAs

Translations for all subpages exist in DE/EN/LT — the EN and LT versions for the subpages were produced during the port and should be reviewed by a native speaker before publishing.

## Stack

- **Next.js 15** (App Router) + **TypeScript** strict
- **next-intl 4** for `/de`, `/en`, `/lt` locale routing — German is the default
- **Barlow** via `next/font/google` (no external font request at runtime)
- **Resend** for the contact form (Server Action: `src/actions/inquiry.ts`)
- **Zod** for shared client/server form validation
- Plain CSS (`src/app/globals.css`) — the design's tokens and section styles ported 1:1

## Editing content

All copy lives in `messages/{de,en,lt}.json`. The keys mirror the section names in the homepage (`hero.title`, `mandates.i.desc`, `homeFaq.items`, etc.). Edit those files and the page re-renders with no other code changes.

For arrays (trust bar, FAQs, intersection cases, hinweise) the order in JSON is the order on the page.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY etc.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/de`.

### Environment variables

| Variable          | Purpose                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`  | Resend API key. **Required for the form to actually send mail.** Without it the action logs the message and returns success (useful for previews). |
| `RESEND_FROM`     | `From:` header for the notification mail. Must use a domain you've verified in Resend, or `onboarding@resend.dev` until then. |
| `RESEND_TO`       | Where submissions are delivered. Defaults to `daivajankus@t-online.de`.                            |

## Project layout

```
messages/                 # de.json, en.json, lt.json — edit text here
src/
  i18n/                   # next-intl routing + request config
  middleware.ts           # locale detection / redirect
  app/
    layout.tsx            # passthrough
    [locale]/
      layout.tsx          # html shell, fonts, header/footer, JSON-LD
      page.tsx            # homepage (Daiva Jankus.html)
      kontakt/page.tsx    # contact page with Resend form
      dolmetschen/        # Mandate I: interpreting & translation
      rechtliche-betreuung/  # Mandate II: legal guardianship
      ueber/              # bio + timeline + credentials
      not-found.tsx
      icon.svg            # favicon — DJ monogram in amber
    globals.css           # ported design CSS
  components/
    chrome/               # Header, Footer, MobileSheet, LangToggle, FloatingCall, BrandMark
    home/                 # Hero, TrustBar, Mandates, Intersection, Differentiation, AboutTeaser, HomeFaq, ClosingCta
    subpages/             # Subhero, Services3Up, Twocol, DifferentiationBand, SubpageFaq, Crosslink, SubpageClosingCta, Bio, Timeline, CredentialsGrid, LitauischeBetreuung, icons
    kontakt/              # ContactChannels, ContactForm, Hinweise
    ui/                   # ImageSlot, Faq (accordion)
    seo/                  # JsonLd
  actions/inquiry.ts      # Server Action — Resend integration
  lib/contact.ts          # CONTACT info + Zod schema (used both sides of action)
```

## Adding photography

`ImageSlot` ships with a muted placeholder identical to the design's prototype. To drop in real images, place files under `public/images/` and pass `src`:

```tsx
<ImageSlot
  src="/images/portrait.jpg"
  alt="Daiva Jankus, Mönchengladbach"
  shape="rect"
  filter="low"
  priority
/>
```

`Hero.tsx` (portrait) and `AboutTeaser.tsx` (square photo) are the two slots on the homepage.

## SEO / AIO / GEO

Everything search engines, social platforms and LLMs need is generated automatically:

| Artefact | Where | Notes |
| --- | --- | --- |
| `robots.txt` | `/robots.txt` (from `app/robots.ts`) | `Allow: /` for all UAs, points at the sitemap. |
| `sitemap.xml` | `/sitemap.xml` (from `app/sitemap.ts`) | All 5 routes × 3 locales = 15 URLs, each with `<xhtml:link rel="alternate" hreflang="…">` for the other locales. |
| `llms.txt` | `/llms.txt` (`public/llms.txt`) | [llmstxt.org](https://llmstxt.org) format — site summary + curated link list, the format LLM agents read first. |
| Open Graph image | `/opengraph-image` (from `app/opengraph-image.tsx`, edge runtime) | Dynamic 1200×630 PNG with the DJ mark, name, tagline. |
| `<meta>` OG/Twitter | per-page in each `generateMetadata` | Title, description, `og:locale`, `alternateLocale` for the other two locales. |
| Canonical + `hreflang` | per-page via `alternatesFor()` in `lib/seo.ts` | Plus `x-default` pointing to `/de/…`. |
| `application/ld+json` | per-page via `<JsonLd data={…} />` | See below. |

**Structured data emitted (per page):**

- **All pages**: `Person` + `LocalBusiness` (in `app/[locale]/layout.tsx`)
- **`/`**: `FAQPage` (the homepage's top-4 questions)
- **`/dolmetschen`**: `BreadcrumbList`, `LegalService`, `FAQPage` (8 questions)
- **`/rechtliche-betreuung`**: `BreadcrumbList`, `ProfessionalService`, `FAQPage` (8 questions)
- **`/ueber`**: `BreadcrumbList`, `ProfilePage`
- **`/kontakt`**: `BreadcrumbList`, `ContactPage`

JSON-LD builders live in [`src/lib/seo.ts`](src/lib/seo.ts). To add new schemas (e.g. `Article` for blog posts), add a builder there and render it via `<JsonLd data={builder(...)} />`.

**Configure for production**:

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain (e.g. `https://daivajankus.de`). Without this, robots/sitemap/OG tags use the default `https://daivajankus.de` which may be wrong for staging.
2. After first deploy, submit the sitemap once in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster](https://www.bing.com/webmasters) (`https://YOUR-DOMAIN/sitemap.xml`).

## Deployment

Built for Vercel (zero config). Set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO` as project env vars and ship.

## Scripts

```bash
npm run dev        # next dev
npm run build      # production build
npm run start      # next start
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
