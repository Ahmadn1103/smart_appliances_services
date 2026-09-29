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
- **Service radius**: **40 miles from Washington, DC** (hard limit), enforced by ZIP code (see section 7).
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

## 5. The 7 Appliance Specializations

Defined once in `lib/appliances.ts` (name, slug, booking label, symptoms, turnaround). It feeds the homepage appliance tiles and panel, all booking forms and the footer links. **Microwaves** was added as a 7th appliance from the client mockup (no HVAC).

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

> **Single-page site.** Everything lives on `/`. Header links are `#anchors` (`#home`, `#services`, `#about`, `#service-area`, `#reviews`, `#contact`) with a scroll-spy highlight. The old `/services`, `/services/<slug>`, `/about`, `/service-area`, `/reviews` and `/contact` URLs 308-redirect to the matching section (`next.config.ts`). `app/page.tsx` is a server component; interactive pieces are small client components. Never add `"use client"` to a `page.tsx`, or it can no longer export metadata.

```
smart_appliance_services/
├── app/
│   ├── page.tsx            # `/`: metadata + FAQPage JSON-LD, composes the sections inside <SiteShell>
│   ├── layout.tsx          # next/font, metadataBase, title template, LocalBusiness JSON-LD
│   ├── globals.css         # Tailwind v4, brand tokens, motion helpers, reviews marquee
│   ├── actions/booking.ts  # "use server" submitBooking(): validate -> honeypot -> reference -> Resend batch
│   └── sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
├── components/
│   ├── SiteShell.tsx       # Navbar + Footer + booking/social modals; `useSite()` gives openBooking/openSocial
│   ├── Navbar.tsx          # Floating pill, anchor links + scroll-spy, animated mobile dropdown
│   ├── BookButton.tsx      # Client button that opens the booking popup (keeps sections server-rendered)
│   ├── ZipChecker.tsx      # 40-mile ZIP check (in / out / invalid)
│   ├── BookingSection.tsx  # Compact inline booking form (optionally locked to one appliance)
│   ├── BookingModal.tsx    # Booking popup opened from any CTA
│   ├── Reviews.tsx         # Auto-scrolling CSS marquee of testimonials
│   ├── home/               # HomeHero, ServicesSection (tiles + panel + form), WhyChoose, AboutSection,
│   │                       # ServiceAreaSection, ContactSection, CtaBar
│   └── ...                 # Brands, AboutAdSection, FAQSection, Footer, modals, QR components
├── lib/
│   ├── appliances.ts       # The 7 appliances (single source of truth)
│   ├── service-area.ts     # checkZip(), extractZip(), haversineMiles()
│   ├── service-area-zips.ts# GENERATED: ZIPs within 40 miles of DC (do not edit by hand)
│   ├── reviews.ts, faqs.ts, jsonld.ts, site.ts
│   └── booking/            # validate (incl. 40-mile ZIP rule), reference, emails, tests
├── scripts/generate-service-area.mjs   # Rebuilds service-area-zips.ts from the Census ZCTA gazetteer
└── next.config.ts          # Redirects from the old multi-page URLs
```

---

## 7. Key Interactive Features

1. **Header & Fast Booking**:
   - Floating white pill (`max-w-6xl`). Desktop (lg+): logo | Home / Services / About Us / Service Area / Reviews / Contact | phone + Book Service + QR (opens `SocialModal`). Links scroll to sections and the current section is highlighted.
   - Below lg: phone icon, Book and a hamburger. The menu is always mounted and animates with a `grid-template-rows` height transition (no layout jump), a staggered link fade and an icon cross-fade. It is `inert` when closed and closes on link click, backdrop tap or Escape.
   - The hero runs to the very top of the page behind the floating header (no white gap).
2. **Dynamic Estimator (not currently shown; `components/Estimator.tsx` is kept but unused)**:
   - Six appliance categories only (including Garbage Disposals). No HVAC or duct cleaning. Shows the transparent $89 diagnostic breakdown (100% credited with repair).
3. **Embedded Footer QR Code Scanner**:
   - Real-time client-side QR generator in the footer allowing customers to switch between **Facebook**, **Instagram**, and **Direct Call Desk** to scan via phone camera.
4. **Fast Dispatch Booking Engine**:
   - Two form components (the inline `BookingSection`, used in each appliance panel and in the Contact section, and the `BookingModal` popup opened from every CTA) submit through one server action, `submitBooking` in `app/actions/booking.ts`.
   - Flow: validate and normalise input -> honeypot check -> derive the `SMART-XXXXXX` reference from the form's attempt id -> `resend.batch.send` of **one confirmation email to the customer and one dispatch notification to the business**, with an idempotency key so retries never double-send.
   - The same reference is shown on the success screen and in both emails. Email is required on every form. There is no database; bookings live in the emails. Full design: `docs/superpowers/specs/2026-09-28-resend-booking-emails-design.md`.
5. **Interactive FAQ & Local Schema**:
   - Accordion starts **fully collapsed**. Each question has its own icon (diagnostic fee, warranty, home-warranty partners, service area, licensing, hours, social/QR). `lib/faqs.ts` feeds both the accordion and FAQPage JSON-LD; LocalBusiness JSON-LD is emitted from the root layout.
6. **Hover / click motion**:
   - Primary CTAs use a sheen + press (`.btn-cta`). Nav chips, icon buttons, and service cards lift and compress on hover/click. Menu dropdown animates from the header. Motion is disabled when `prefers-reduced-motion` is set.

7. **Appliance selector + inline booking**:
   - On `#services`, tapping an appliance tile opens that appliance's panel: problems we fix, turnaround, a ZIP check and a compact booking form. The tile choice is the `service` sent with the booking.
8. **40-mile service area**:
   - `ZipChecker` tells the customer whether their ZIP is in area. The same rule is enforced **server-side** in `validateBooking` (the address must contain a 5-digit ZIP inside the radius), so the widget cannot be bypassed.
   - Radius and center are `SERVICE_RADIUS_MILES` / `SERVICE_CENTER` in `lib/site.ts`. After changing them, run `node scripts/generate-service-area.mjs <2023_Gaz_zcta_national.txt>` (US Census ZCTA gazetteer) to regenerate `lib/service-area-zips.ts`; a unit test fails if the two drift. ZIP centers are approximate, so results near the 40-mile edge can be off by a mile or two.
9. **Reviews marquee**:
   - `Reviews.tsx` renders the testimonials twice and slides the track by exactly half its width in pure CSS (`.marquee-track`): seamless loop, no JS scrolling, pauses on hover/touch, static and swipeable under `prefers-reduced-motion`.

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
| `BOOKING_NOTIFY_EMAIL` | Inbox that receives dispatch notifications (currently the Gmail, `smart.applianceservices.va@gmail.com`) |
| `BOOKING_FROM_EMAIL` | Sender address; must be on a domain verified in Resend (currently `Smart Appliance Services <booking@smart-applianceservices.com>`) |
| `NEXT_PUBLIC_SITE_URL` | **Production origin**, e.g. `https://www.example.com`. Drives `metadataBase`, canonicals, sitemap, robots and JSON-LD URLs. Defaults to `http://localhost:3000`, so **set it before deploying**. |

### Deployment (Vercel)

- **Project:** `smart-appliances-services` in the `elegacys-projects` Vercel team, connected to GitHub repo `Ahmadn1103/smart_appliances_services` (branch `main`). Live at **https://smart-appliances-services.vercel.app**.
- **No `vercel.json` is needed.** Vercel auto-detects Next.js 16 (build `next build`, install `npm install`, Node 24.x). Add one only if you need redirects, headers, or custom build settings.
- **`.env` is gitignored, so it never reaches Vercel.** Environment variables must be set in the Vercel project (Settings > Environment Variables, or `vercel env add <NAME> production`). Production currently has `RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL` and `BOOKING_FROM_EMAIL`. **`NEXT_PUBLIC_SITE_URL` is not set yet.** It is inlined at build time, so after changing any variable, redeploy (`vercel deploy --prod`) for it to take effect.
- **Preview deployments** have no env vars on purpose, so branch previews cannot send real booking emails; they show the "please call us" error on submit.
- **Verified 2026-09-28:** a booking submitted on the live `/contact` form returned a `SMART-` reference and both emails (customer confirmation and dispatch notification) were delivered.
- **Email addressing (checked 2026-09-29):** Resend shows `smart-applianceservices.com` as **verified**, so both emails are sent from `booking@smart-applianceservices.com`. The customer confirmation goes to the address the customer entered, with replies routed to the business Gmail. The dispatch notification goes to the business Gmail, with replies routed to the customer. The domain has **no MX records**, so it can send but cannot receive mail; `booking@` is a sender only, not an inbox. To receive at the domain later, add forwarding or a mailbox (GoDaddy DNS), then point `BOOKING_NOTIFY_EMAIL` at it locally and on Vercel, and redeploy.
- **Install note:** `vitest` was installed with `--legacy-peer-deps` because npm's resolver crashed on its peer set with `@types/node@^20`. `npm ci` from the committed lockfile works, which is what Vercel runs.
- The `.vercel/` folder (local project link) is gitignored.

---

## 10. SEO Implementation

Baseline audit and prioritized plan: `localhost-audit/FULL-AUDIT-REPORT.md` and `ACTION-PLAN.md`. In place:

- Unique title, description and canonical per page; global title template `%s | Smart Appliance Services`.
- Open Graph + Twitter tags and a generated share image; `robots.txt`, `sitemap.xml`, web manifest, full favicon set (cropped from the logo).
- JSON-LD: LocalBusiness (`HomeAndConstructionBusiness`) in the layout, FAQPage on the homepage. **No Review/AggregateRating markup on purpose**, because the on-page testimonials are hardcoded and not verifiable.
- One H1 per page, form labels tied to inputs, self-hosted fonts.

The site is a single page, so there is one canonical URL (`/`) and one sitemap entry. If a real page is added later, export `metadata` with `alternates.canonical` and its own `openGraph` (Open Graph is **not** deep-merged from the layout) and add the URL to `app/sitemap.ts`. The mockup wording "free estimate" was deliberately not used: the business charges an $89 diagnostic (credited toward repair).

---

## 11. Open Items

- **Reviews:** `lib/reviews.ts` holds hardcoded testimonials (the "Verified" and "Trusted by Hundreds" wording was removed). Replace with real Google reviews before adding any Review schema.
- **Google review URL:** Instagram is unified as `@ssmartappliance`. `SocialBarcodeHub` still uses a placeholder Google link (`https://g.page/r/smartapplianceservices`). Confirm the live GBP URL and put Facebook, Instagram, and Google in `lib/site.ts`.
- **Deploy (in progress):** the site is live on Vercel but `NEXT_PUBLIC_SITE_URL` is unset, so canonicals, sitemap, robots and JSON-LD still point at `http://localhost:3000`. Set it to the real domain in Vercel and redeploy, attach the custom domain, then verify in Google Search Console and Bing Webmaster Tools and re-run the SEO audit against production.
- **Content to build:** real Google reviews (the mockup shows "5-Star Reviews on Google"; ours are unverified), license and insurance details in the About section, a Google Business Profile. **Confirm the phone number:** the client mockup shows 571-462-1814 but the site uses (571) 459-8155.
- **Cleanup:** `public/` still holds duplicate logos; `package.json` name is still `eco_appliance_services`; `README.md` is the create-next-app default. `.gitignore` now excludes `.playwright-mcp/` and `localhost-audit/`.
