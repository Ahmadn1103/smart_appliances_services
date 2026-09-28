# Smart Appliance Services - Project Documentation

## 1. Project Overview
**Smart Appliance Services LLC** (represented by Armani) is a professional, high-conversion residential appliance repair web application serving homeowners, property managers, and warranty holders across **Washington DC, Maryland, and Northern Virginia (DMV)**.

- **Tagline**: *"Appliance repairs? Leave it to us."*
- **Company Heritage**: Founded in **2021** with **15+ years of hands-on technician expertise**.
- **Partnerships**: Trusted warranty service vendor partnered with **10+ leading home warranty networks**.
- **Reputation**: Verified 5-star customer ratings across the DMV region.

---

## 2. Business Policy, Pricing & Guarantees

| Policy | Details |
| :--- | :--- |
| **Diagnostic Fee** | **$89 Diagnostic Fee** (100% credited toward completed repair upon approval) |
| **Warranty** | **30-Day Labor & Parts Warranty** on all completed repairs |
| **Coverage Guarantee** | Itemized diagnostic reports, part numbers, and invoices accepted by 10+ home warranty companies |
| **Licensing & Safety** | Fully licensed and insured; certified and background-checked technicians |

---

## 3. Contact & Service Area

- **Primary Dispatch Line**: `(571) 459-8155`
- **Secondary Support Line**: `(571) 899-2995`
- **Official Email**: `Smart.applianceservices.va@gmail.com`
- **Operating Hours**:
  - **Monday – Friday**: 8:00 AM – 5:00 PM
  - **Saturday**: 9:00 AM – 4:00 PM
  - **Sunday**: Closed
- **Geographic Coverage**: Washington DC, Maryland (Montgomery & Prince George's counties, Bethesda, Rockville, Silver Spring, Gaithersburg), and Northern Virginia (Fairfax, Arlington, Alexandria, Loudoun, Prince William, McLean, Reston, Vienna). Service-area business: no public street address.

### Official Social Channels
- **Facebook**: [Smart Appliance Services](https://www.facebook.com/smartapplianceservicess/)
- **Instagram**: [@ssmartappliance](https://instagram.com/ssmartappliance)

---

## 4. Brand Identity & Visual Design System

The application uses a **unified, modern clean white light theme** designed for maximum clarity, trust, and fast conversion:

| Element | Specification | Purpose / Usage |
| :--- | :--- | :--- |
| **Primary Brand Blue** | `#2563EB` (Blue 600) / `#1D4ED8` (Blue 700) | Primary CTAs, active highlights, badges, links |
| **Accent Cyan** | `#06B6D4` / `#0284C7` | Subtle gradients, trust icons, secondary badges |
| **Clean White Surface** | `#FFFFFF` | Core page backgrounds, cards, form containers, modals |
| **Subtle Slate Surface** | `#F8FAFC` (Slate 50) / `#F1F5F9` (Slate 100) | Alternating sections, table headers, hover states |
| **Borders & Dividers** | `#E2E8F0` (Slate 200) | Crisp, lightweight boundaries without visual clutter |
| **Typography Dark** | `#0F172A` (Slate 900) / `#334155` (Slate 700) | High-contrast, easily readable body text and headings |

- **Fonts**: `next/font/google` in `app/layout.tsx`: Plus Jakarta Sans (variable, `--font-jakarta`) and Caveat (`--font-caveat`, used by `.font-script`).
- **Favicons**: cropped from `public/smart-logo.jpeg` into `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, plus `public/icon-192.png` / `icon-512.png` for the web manifest.
- **Motion**: shared hover/press/open classes live in `app/globals.css` (`.pressable`, `.btn-cta`, `.icon-btn`, `.nav-chip`, `.card-lift`, `.header-dropdown`). Respect `prefers-reduced-motion`.

> **Scope Policy**: The business focuses strictly on **major residential appliances**. HVAC and duct cleaning services are excluded.

---

## 5. The 6 Core Appliance Specializations

Defined in `components/ServicesSection.tsx` (homepage tabs) and `components/ServicesClient.tsx` (`/services` cards). Keep the two in sync.

### 1. Refrigerators & Freezers
- **Coverage**: French door, side-by-side, built-in columns, bottom freezer units, and automatic ice makers.
- **Common Issues Solved**: Warm refrigerator compartment, freezer frosting over, ice maker not dispensing, noisy compressors, blocked drain tubes.

### 2. Washers (Front-Load & Top-Load)
- **Coverage**: High-efficiency front-loaders, traditional agitator top-loaders, direct-drive motor systems.
- **Common Issues Solved**: Washer won't drain or spin, excessive vibration/banging, door lock failures, water inlet valve leaks, OE/LE error codes.

### 3. Dryers (Gas & Electric)
- **Coverage**: Vented gas dryers, electric heating coil units, compact dryers, and commercial-grade laundry.
- **Common Issues Solved**: No heat or taking multiple cycles to dry, drum not turning, squeaking rollers or broken belt, thermal fuse trip, burning odor.

### 4. Dishwashers
- **Coverage**: Built-in, panel-ready, and stainless steel tall-tub dishwashers.
- **Common Issues Solved**: Water pooling at the bottom, spray arms not spinning, cloudy/gritty glassware, door gasket leaks, cycle failure codes.

### 5. Ranges, Ovens & Cooktops
- **Coverage**: Gas ranges, smooth ceramic glass cooktops, electric wall ovens, convection units.
- **Common Issues Solved**: Gas burners clicking without lighting, bake/broil elements not heating, uneven baking temperatures, locked oven doors.

### 6. Garbage Disposals
- **Coverage**: Continuous feed, batch feed, and high-horsepower under-sink waste disposers.
- **Common Issues Solved**: Jammed flywheels, motor humming without spinning, under-sink water leaks, electrical reset trips.

---

## 6. Architecture & Component Structure

> **Page pattern:** every `page.tsx` is a **server component** that exports `metadata`; the interactive UI lives in a `*Client.tsx` component marked `"use client"`. Never add `"use client"` to a `page.tsx`, or it can no longer export metadata.

```
smart_appliance_services/
├── app/
│   ├── globals.css         # Tailwind CSS v4, brand tokens, hover/press/dropdown motion
│   ├── layout.tsx          # next/font, metadataBase, title template, default OG/Twitter, LocalBusiness JSON-LD
│   ├── opengraph-image.tsx # Dynamic 1200x630 OpenGraph social card
│   ├── favicon.ico, icon.png, apple-icon.png   # Favicon set cropped from the logo
│   ├── manifest.ts         # Web manifest (home-screen icons)
│   ├── page.tsx            # `/` server page: metadata + FAQPage JSON-LD -> HomeClient
│   ├── robots.ts           # Search engine crawling directives
│   ├── sitemap.ts          # XML sitemap (add new routes here)
│   ├── actions/
│   │   ├── booking.ts      # "use server" submitBooking(): validate -> honeypot -> reference -> Resend batch
│   │   └── booking.test.ts
│   ├── contact/
│   │   └── page.tsx        # `/contact` server page + metadata -> ContactClient
│   └── services/
│       └── page.tsx        # `/services` server page + metadata -> ServicesClient
├── components/
│   ├── HomeClient.tsx      # Home page body + booking/social modal state ("use client")
│   ├── ServicesClient.tsx  # 6-appliance service catalog ("use client")
│   ├── ContactClient.tsx   # Contact details + dispatch form ("use client")
│   ├── Navbar.tsx          # Floating white pill: logo, center Home/Services/Contact, phone, Book, QR
│   ├── CustomSidebar.tsx   # Unused leftover right-drawer (Navbar no longer imports it)
│   ├── Hero.tsx            # High-conversion hero with diagnostic badge & appliance selector
│   ├── Brands.tsx          # Factory-trained brand grid (Samsung, LG, Whirlpool, Bosch, etc.)
│   ├── AboutAdSection.tsx  # Company history (est. 2021, 15+ yrs exp) with technician visual
│   ├── ServicesSection.tsx # Interactive 6-appliance service showcase
│   ├── Estimator.tsx       # $89 diagnostic estimator for the 6 appliance categories (no HVAC)
│   ├── WhyUs.tsx           # 6 core trust pillars (15+ yrs exp, 10+ warranty partners, 30-day warranty)
│   ├── HowItWorks.tsx      # 4-step dispatch workflow (Schedule → Diagnose → Approve → Guarantee)
│   ├── Reviews.tsx         # Customer testimonials (currently hardcoded, see Open Items)
│   ├── BookingSection.tsx  # Full in-page appointment scheduling form
│   ├── BookingModal.tsx    # Fast dispatch popup modal accessible from all CTA buttons
│   ├── useBookingSubmit.ts # Client hook: attempt id, pending/error/reference state, double-submit guard
│   ├── HoneypotField.tsx   # Off-screen spam trap shared by the three booking forms
│   ├── SocialModal.tsx     # Dedicated modal for connecting on Facebook and Instagram
│   ├── SocialBarcodeHub.tsx# Facebook / Instagram / Google-review QR hub
│   ├── QrCodeCard.tsx      # Standalone scannable QR card generator component
│   ├── FAQSection.tsx      # Accordion (starts collapsed) with per-question icons
│   ├── JsonLd.tsx          # Renders a JSON-LD <script> (escapes "<")
│   └── Footer.tsx          # Complete company footer with embedded interactive scannable QR codes
├── lib/
│   ├── faqs.ts             # FAQ Q&A: single source for the accordion and FAQPage schema
│   ├── jsonld.ts           # localBusinessJsonLd, faqJsonLd
│   ├── site.ts             # SITE_URL (from NEXT_PUBLIC_SITE_URL), name, phone, email, socials
│   └── booking/
│       ├── validate.ts     # Raw input -> typed BookingRequest
│       ├── reference.ts    # Deterministic SMART-XXXXXX reference + idempotency key
│       ├── emails.ts       # Customer + dispatch email templates (HTML-escaped)
│       └── *.test.ts       # Vitest unit tests
├── public/
│   ├── smart-logo.jpeg     # Official Smart Appliance Services logo (source for favicons)
│   ├── icon-192.png, icon-512.png   # Web-manifest icons
│   ├── smart-technician.png# Professional certified technician illustration
│   └── ad.jpeg             # Promotional flyer and advertisement asset
├── docs/superpowers/specs/ # Design docs (Resend booking emails)
├── localhost-audit/        # SEO audit output; gitignored (.gitignore)
├── package.json            # Next.js 16, React 19, Tailwind CSS v4, Lucide React, QRCode, Resend, Vitest
└── project.md              # Project documentation and specifications
```

---

## 7. Key Interactive Features

1. **Header & Fast Booking**:
   - Floating white glass pill, centered (`max-w-5xl`). Desktop: logo | Home / Services / Contact | phone + Book Service + QR (opens `SocialModal`). Hamburger is **hidden on PC**.
   - Mobile: phone icon, compact Book, and hamburger. The menu **drops down inside the header** (Home / Services / Contact in a 3-column row). It is not a right-side drawer and not a centered popup. Clicking the hamburger again (or the dim backdrop / Escape) closes it.
   - Inner pages (`/services`, `/contact`) use the same top offset as home (`pt-14 sm:pt-20`) so content sits tight under the bar.
2. **Dynamic Estimator**:
   - Six appliance categories only (including Garbage Disposals). No HVAC or duct cleaning. Shows the transparent $89 diagnostic breakdown (100% credited with repair).
3. **Embedded Footer QR Code Scanner**:
   - Real-time client-side QR generator in the footer allowing customers to switch between **Facebook**, **Instagram**, and **Direct Call Desk** to scan via phone camera.
4. **Fast Dispatch Booking Engine**:
   - Three forms (in-page `BookingSection`, `BookingModal` popup on every page, and the `/contact` form) all submit through one server action, `submitBooking` in `app/actions/booking.ts`.
   - Flow: validate and normalise input -> honeypot check -> derive the `SMART-XXXXXX` reference from the form's attempt id -> `resend.batch.send` of **one confirmation email to the customer and one dispatch notification to the business**, with an idempotency key so retries never double-send.
   - The same reference is shown on the success screen and in both emails. Email is required on every form. There is no database; bookings live in the emails. Full design: `docs/superpowers/specs/2026-09-28-resend-booking-emails-design.md`.
5. **Interactive FAQ & Local Schema**:
   - Accordion starts **fully collapsed**. Each question has its own icon (diagnostic fee, warranty, home-warranty partners, service area, licensing, hours, social/QR). `lib/faqs.ts` feeds both the accordion and FAQPage JSON-LD; LocalBusiness JSON-LD is emitted from the root layout.
6. **Hover / click motion**:
   - Primary CTAs use a sheen + press (`.btn-cta`). Nav chips, icon buttons, and service cards lift and compress on hover/click. Menu dropdown animates from the header. Motion is disabled when `prefers-reduced-motion` is set.

---

## 8. Technology Stack

- **Framework**: Next.js 16.3.6 (App Router, Turbopack). This version has breaking changes; read `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Fonts**: `next/font/google` (Plus Jakarta Sans variable, Caveat)
- **Icons**: `lucide-react`
- **QR Generation**: `qrcode`
- **Email**: Resend
- **Testing**: Vitest
- **Language**: TypeScript 5 (Strict typing)

---

## 9. Development & Build Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Run production build & verify TypeScript
npm run build

# Start production server
npm run start

# Lint and unit tests (lib/booking/*, app/actions/*)
npm run lint
npm test
```

### Environment variables

Set in `.env` (gitignored; never commit values):

| Variable | Purpose |
| :--- | :--- |
| `RESEND_API_KEY` | Resend API key |
| `BOOKING_NOTIFY_EMAIL` | Inbox that receives dispatch notifications |
| `BOOKING_FROM_EMAIL` | Sender address; must be on a domain verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | **Production origin**, e.g. `https://www.example.com`. Drives `metadataBase`, canonicals, sitemap, robots and JSON-LD URLs. Defaults to `http://localhost:3000`, so **set it before deploying**. |

---

## 10. SEO Implementation

Baseline audit and prioritized plan: `localhost-audit/FULL-AUDIT-REPORT.md` and `ACTION-PLAN.md`. In place:

- Unique title, description and canonical per page; global title template `%s | Smart Appliance Services`.
- Open Graph + Twitter tags and a generated share image; `robots.txt`, `sitemap.xml`, web manifest, full favicon set (cropped from the logo).
- JSON-LD: LocalBusiness (`HomeAndConstructionBusiness`) in the layout, FAQPage on the homepage. **No Review/AggregateRating markup on purpose**, because the on-page testimonials are hardcoded and not verifiable.
- One H1 per page, form labels tied to inputs, self-hosted fonts.

When adding a page: export `metadata` with `alternates.canonical` and its own `openGraph` (Open Graph is **not** deep-merged from the layout), and add the URL to `app/sitemap.ts`.

---

## 11. Open Items

- **Reviews:** `components/Reviews.tsx` uses hardcoded testimonials with relative dates, and the copy claims "Verified 5-star ratings" / "Trusted by Hundreds". Replace with real Google reviews or remove or soften the claims.
- **Google review URL:** Instagram is unified as `@ssmartappliance`. `SocialBarcodeHub` still uses a placeholder Google link (`https://g.page/r/smartapplianceservices`). Confirm the live GBP URL and put Facebook, Instagram, and Google in `lib/site.ts`.
- **Unused drawer:** `components/CustomSidebar.tsx` is no longer wired to the Navbar. Delete it once confirmed unused, or keep it only if a full drawer is needed again.
- **Deploy:** set `NEXT_PUBLIC_SITE_URL`, verify in Google Search Console and Bing Webmaster Tools, then re-run the SEO audit against production.
- **Content to build:** per-appliance pages (`/services/<appliance>-repair`), service-area pages, an About page with license and insurance details, a Google Business Profile.
- **Cleanup:** `public/` still holds duplicate logos; `package.json` name is still `eco_appliance_services`; `README.md` is the create-next-app default. `.gitignore` now excludes `.playwright-mcp/` and `localhost-audit/`.
