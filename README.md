# Daiva Jankus — Website

Next.js 15 + TypeScript port of the Claude Design prototype for **Daiva Jankus** (sworn Lithuanian–German interpreter and registered professional legal guardian, Mönchengladbach).

The homepage in `src/app/[locale]/page.tsx` reproduces `Daiva Jankus.html` from the design bundle. Other routes (`/dolmetschen`, `/rechtliche-betreuung`, `/ueber`) are stubbed with a "work-in-progress" placeholder so internal links don't 404 — port the design's full content into them when ready.

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
      page.tsx            # homepage (the implemented design)
      kontakt/page.tsx    # contact page with Resend form
      dolmetschen/        # WIP stub
      rechtliche-betreuung/
      ueber/
      not-found.tsx
    globals.css           # ported design CSS
  components/
    chrome/               # Header, Footer, MobileSheet, LangToggle, FloatingCall
    home/                 # Hero, TrustBar, Mandates, Intersection, Differentiation, AboutTeaser, HomeFaq, ClosingCta
    kontakt/              # ContactChannels, ContactForm, Hinweise
    ui/                   # ImageSlot, Faq (accordion)
    seo/                  # JsonLd
    subpages/             # Wip placeholder used by stubs
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

## Deployment

Built for Vercel (zero config). Set `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO` as project env vars and ship.

## Scripts

```bash
npm run dev        # next dev
npm run build      # production build
npm run start      # next start
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
