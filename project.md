# Smart Appliance Services - Project Documentation

## 1. Project Overview
**Smart Appliance Services LLC** is a family-owned, **Virginia-based** residential appliance repair business (this is its high-conversion web app) serving homeowners, property managers, and warranty holders within **40 miles of its Virginia bases**: Virginia, Washington DC, and parts of Maryland.

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

- **Primary Line**: `(571) 899-2995`
- **Secondary Line**: `(571) 992-4222`
- The old `(571) 459-8155` was retired from the site on 2026-10-03.
- **Official Email**: `Smart.applianceservices.va@gmail.com`
- **Operating Hours**:
  - **Monday – Friday**: 8:00 AM – 5:00 PM
  - **Saturday**: 9:00 AM – 4:00 PM
  - **Sunday**: Closed
- **Service radius**: **40 miles from any of four Virginia bases** (hard limit): Fredericksburg, Stafford, Manassas and Warrenton, VA. Enforced by ZIP code (see section 7).
- **Geographic coverage** (533 ZIPs): 45 Virginia cities, Washington DC, and 14 Maryland cities (Silver Spring, Bethesda, Chevy Chase, Takoma Park, Hyattsville, College Park, Suitland, Oxon Hill, Greenbelt, Bowie, Rockville, Gaithersburg, Upper Marlboro, Clinton). Many fringe Virginia places and West Virginia were deliberately excluded. The exclusion list lives in `scripts/generate-service-area.mjs`. Service-area business: no public street address.
- **Public wording**: "Serving Virginia, DC & Maryland, Within 40 Miles".

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

## 5. Services (17 tiles)

Defined once in `lib/appliances.ts` (name, slug, booking label, icon, symptoms, turnaround). It feeds the homepage tiles and panel, all booking forms and the footer links. Order shown on the site:

1. Refrigerator, 2. Freezer, 3. Ice Maker, 4. Wine Cooler, 5. Washer, 6. Dryer, 7. Washer & Dryer Combo, 8. Microwave, 9. Double Oven, 10. Wall Oven, 11. Cooktop, 12. Range, 13. Range Hood, 14. Dishwasher, 15. Garbage Disposal, 16. Trash Compactor, 17. Dryer Vent Cleaning.

- "Oven & Range" was split into Double Oven / Wall Oven / Cooktop / Range, and the stand-alone "Oven" tile was removed again on request. The old slug `oven-range-repair` no longer exists.
- "Refrigerators & Freezers" is now two entries (Refrigerators, Freezers); booking tests were updated.
- Scope Policy: major residential appliances only, plus **Dryer Vent Cleaning** (vent cleaning only; no HVAC or duct cleaning).
- Icons are lucide icons mapped in `components/ApplianceIcon.tsx` via `IconKey`.

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
│   ├── appliances.ts       # The 17 services (single source of truth)
│   ├── service-area.ts     # checkZip(), extractZip(), haversineMiles()
│   ├── service-area-zips.ts# GENERATED: ZIPs within 40 miles of the 4 Virginia bases (do not edit by hand)
│   ├── service-area-cities.ts # GENERATED: the same ZIPs grouped by state and city (feeds the Service Area dropdowns)
│   ├── reviews.ts, faqs.ts, jsonld.ts, site.ts
│   └── booking/            # validate (incl. 40-mile ZIP rule), reference, emails, tests
├── scripts/generate-service-area.mjs   # Rebuilds both service-area files from the GeoNames US.txt postal list (centers, radius, excluded cities, Maryland allow-list)
└── next.config.ts          # Redirects from the old multi-page URLs
```

---

## 7. Key Interactive Features

1. **Header & Fast Booking**:
   - Floating white pill (`max-w-7xl`). Transparent-background logo (`public/smart-logo.png`, 128x80 on desktop). Desktop (lg+): logo | Home / Services / About Us / Service Area / Reviews / Contact | two call buttons + Book Service + QR (opens `SocialModal`). Two labeled call buttons: Primary (571) 899-2995 (solid) and Secondary (571) 992-4222 (outline); full-number pills from 2xl, icon buttons with PRIMARY / SECONDARY labels from sm. Links scroll to sections and the current section is highlighted.
   - Phones (below sm): a single blue **Contact** button opens a centered dropdown with both numbers (Primary / Secondary), plus Book and a hamburger. The hamburger menu also opens with two large labeled call buttons.
   - Below lg: Book and a hamburger. The menu is always mounted and animates with a `grid-template-rows` height transition (no layout jump), a staggered link fade and an icon cross-fade. It is `inert` when closed and closes on link click, backdrop tap or Escape.
   - The hero runs to the very top of the page behind the floating header (no white gap).
2. **Dynamic Estimator (not currently shown; `components/Estimator.tsx` is kept but unused)**:
   - Six appliance categories only (including Garbage Disposals). No HVAC or duct cleaning. Shows the transparent $89 diagnostic breakdown (100% credited with repair).
3. **Embedded Footer QR Code Scanner**:
   - Real-time client-side QR generator in the footer allowing customers to switch between **Facebook** and **Instagram** (the Call tab was removed on 2026-10-03). The footer services list links to the Services section and pre-selects the clicked appliance; the contact box shows the two new numbers.
4. **Fast Dispatch Booking Engine**:
   - Two form components (the inline `BookingSection`, used in each appliance panel and in the Contact section, and the `BookingModal` popup opened from every CTA) submit through one server action, `submitBooking` in `app/actions/booking.ts`.
   - Flow: validate and normalise input -> honeypot check -> derive the `SMART-XXXXXX` reference from the form's attempt id -> `resend.batch.send` of **one confirmation email to the customer and one dispatch notification to the business**, with an idempotency key so retries never double-send.
   - The same reference is shown on the success screen and in both emails. Email is required on every form. There is no database; bookings live in the emails. Full design: `docs/superpowers/specs/2026-09-28-resend-booking-emails-design.md`.
5. **Interactive FAQ & Local Schema**:
   - Accordion starts **fully collapsed**. Each question has its own icon (diagnostic fee, warranty, home-warranty partners, service area, licensing, hours, social/QR). `lib/faqs.ts` feeds both the accordion and FAQPage JSON-LD; LocalBusiness JSON-LD is emitted from the root layout.
6. **Hover / click motion**:
   - Primary CTAs use a sheen + press (`.btn-cta`). Nav chips, icon buttons, and service cards lift and compress on hover/click. Menu dropdown animates from the header. Motion is disabled when `prefers-reduced-motion` is set.

7. **Appliance selector + inline booking**:
   - The booking dropdowns start on a disabled "Choose your service" placeholder (the field is required). On `#services`, tapping an appliance tile opens that appliance's panel: problems we fix, turnaround, a ZIP check and a compact booking form. The tile choice is the `service` sent with the booking.
8. **40-mile service area (Virginia-based)**:
   - `ZipChecker` tells the customer whether their ZIP is in area. The same rule is enforced **server-side** in `validateBooking` (the address must contain a 5-digit ZIP inside the area), so the widget cannot be bypassed.
   - Area = ZIPs within `SERVICE_RADIUS_MILES` (40) of any entry in `SERVICE_CENTERS` (`lib/site.ts`; copy in `SERVICE_BASES`), minus excluded cities. To change it: edit `scripts/generate-service-area.mjs` (and `lib/site.ts`), download `US.txt` from https://download.geonames.org/export/zip/US.zip and run `node scripts/generate-service-area.mjs <path/to/US.txt>`. It rewrites `lib/service-area-zips.ts` and `lib/service-area-cities.ts`; unit tests fail if they drift. ZIP centers are approximate, so results near the edge can be off by a mile or two.
   - The Service Area section shows three dropdowns (Virginia / Maryland / Washington, DC) listing every city in the area.
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

- **Brand logos:** `public/brands/*.svg` are third-party trademarks (Wikimedia Commons / Simple Icons). Confirm the client is comfortable showing them next to the "Factory-Trained" claim.
- **Armani:** removed from the About copy; one testimonial in `lib/reviews.ts` still names Armani.
- **Leftover "DMV" wording** appears in several headings and copy blocks; sweep if the business wants Virginia-first language everywhere.
- **Hydration warning:** the dev console showed one hydration mismatch mentioning the booking form placeholder; not yet investigated.
- **Unused assets:** `public/hero-technician.jpg`, `public/mj-technician.jpeg` and the `assest/` source images.

- **Reviews:** `lib/reviews.ts` holds hardcoded testimonials (the "Verified" and "Trusted by Hundreds" wording was removed). Replace with real Google reviews before adding any Review schema.
- **Google review URL:** Instagram is unified as `@ssmartappliance`. `SocialBarcodeHub` still uses a placeholder Google link (`https://g.page/r/smartapplianceservices`). Confirm the live GBP URL and put Facebook, Instagram, and Google in `lib/site.ts`.
- **Deploy (in progress):** the site is live on Vercel but `NEXT_PUBLIC_SITE_URL` is unset, so canonicals, sitemap, robots and JSON-LD still point at `http://localhost:3000`. Set it to the real domain in Vercel and redeploy, attach the custom domain, then verify in Google Search Console and Bing Webmaster Tools and re-run the SEO audit against production.
- **Content to build:** real Google reviews (the mockup shows "5-Star Reviews on Google"; ours are unverified), license and insurance details in the About section, a Google Business Profile. **Confirm the phone numbers:** the client mockup shows 571-462-1814; the site now uses (571) 899-2995 (primary) and (571) 992-4222 (secondary).
- **Cleanup:** `public/` still holds duplicate logos; `package.json` name is still `eco_appliance_services`; `README.md` is the create-next-app default. `.gitignore` now excludes `.playwright-mcp/` and `localhost-audit/`.

---

## 12. Changelog: 2026-10-03

**Services**
- Added Trash Compactors, Dryer Vent Cleaning, Range Hoods, Wall Ovens, Ice Makers, then Freezers, Wine Coolers, Washer & Dryer Combos, Double Ovens, Cooktops, Ranges. Final order and the removed "Oven" tile are listed in section 5. Added icons for every new service.
- Booking dropdown now starts on "Choose your service" (required) instead of a pre-selected appliance.
- Homepage tile grid reflowed (3 columns on phones, 6 on desktop) so the labels are readable.
- Footer service list: bolder, tidier, "All Services" button; each link scrolls to Services and opens that appliance (works on repeated clicks and from other pages via `/?service=<slug>#services`).

**Service area**
- Moved from "40 miles of Washington, DC" to 40 miles of Fredericksburg, Stafford, Manassas and Warrenton, VA (so 22401 is in). Removed outer Virginia places, West Virginia, and limited Maryland to 14 cities. New generator script, generated city list, tests updated.
- Wording changed to "Serving Virginia, DC & Maryland, Within 40 Miles" in the Service Area section, ZIP card and Why Choose card; FAQ rewritten; Service Area section now has state dropdowns of cities.

**Phones**
- New numbers: Primary (571) 899-2995, Secondary (571) 992-4222. Replaced (571) 459-8155 across the header, hero, CTA bar, contact section, footer, ZIP card, booking confirmation, error messages, emails, QR popup, share image and JSON-LD. Header and hero have labeled Primary / Secondary buttons; phones get a single Contact dropdown.
- Removed the footer "Call" QR tab.

**Visual / copy**
- New transparent logo (gray line removed, no box), bigger header logo, smaller header, nav links on one line, header overflow fixed.
- Hero: new technician photo (`public/hero-technician-2.jpg`), smaller headline, smaller/clearer buttons, brush-stroke "All Brands / All Appliances / One Team" image (`public/hero-tagline.png`, cut out of `assest/word.jpg`), ZIP card removed from the hero, mobile-optimized layout and type sizes.
- Brands strip: removed Thermador and Sub-Zero & Wolf, added current full-color logos, no descriptions, smaller section, 5 per row.
- About: "Armani & Master Team" badge now "Certified Technician", "family-owned" copy, new technician photo (`public/mj-technician.jpeg`), button text "Online Repair Schedule", now placed below the four stat boxes (full width on phones, centered on larger screens), $89 stat now blue.
- FAQ hours answer now ends "We are closed Sundays."
- Service Area ("Why Choose") card now reads "Serving Virginia, DC & Maryland / Within 40 Miles"; booking confirmation and ZIP checker show both new numbers.
