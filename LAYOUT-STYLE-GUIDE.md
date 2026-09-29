# One-Page Service Site: Layout & Style Guide (color-free)

A reusable spec for rebuilding this site's **structure, spacing, typography, shapes, motion and interaction patterns** for a different client. It contains **no brand colors, no logos, no copy and no business facts**. Everything color-related is expressed as a *role token* (e.g. `primary`, `surface-tint`, `ink`) that the new client's palette fills in.

Source: Smart Appliance Services (Next.js App Router + Tailwind CSS v4 + `lucide-react`).

---

## 0. How to use this document

1. Give this whole file to Claude along with the new client's brand (palette, logo, fonts, copy, contact info, services list).
2. Claude must reproduce the **layout, class patterns, spacing, radii, shadows, motion and section order** exactly, and fill every `token` from the client's palette.
3. Do not invent extra pages. This is a **single page** with **slug (anchor) navigation**.

A ready-to-paste prompt is in [Section 15](#15-prompt-to-give-claude).

---

## 1. Core architecture

| Decision | Value |
| :--- | :--- |
| Pages | **One page** (`/`). No `/services`, `/contact`, `/about` routes. |
| Navigation | **Slug / anchor links** (`#services`, `#about`, ...) that smooth-scroll to sections on the same page. |
| Section identity | Each major section has a slug `id` (kebab-case). Nav links, footer links, CTAs and in-page buttons all point at these `#slug`s. |
| Active nav state | An `IntersectionObserver` marks the nav link of the section currently in view. |
| Rendering | `app/page.tsx` is a **server component** that exports `metadata`; interactive pieces are `"use client"` components. Never put `"use client"` in `page.tsx`. |
| Global UI | A `SiteShell` client wrapper holds Navbar, `<main>`, Footer and the modals, plus a context (`useSite`) exposing `openBooking()` and `openSocial()` so any button anywhere can open the booking popup. |
| Stack | Next.js (App Router), React, Tailwind CSS v4, `lucide-react` icons, `next/font/google`, `next/image`. |

### Anchor-target rule
Sections that are nav targets carry an `id`. Keep them clear of the fixed header:

```css
main [id] { scroll-margin-top: 5.5rem; }
html { scroll-behavior: smooth; }
```

### Page composition (order matters)

```tsx
<SiteShell>
  <HomeHero />          {/* id="home" */}
  <ServicesSection />   {/* id="services" */}
  <WhyChoose />         {/* no id (not in nav) */}
  <AboutSection />      {/* wrapper id="about": About block + Brands strip */}
  <ServiceAreaSection />{/* id="service-area" */}
  <Reviews />           {/* id="reviews" */}
  <FAQSection />        {/* id="faq" */}
  <ContactSection />    {/* id="contact" */}
  <CtaBar />            {/* closing strip, no id */}
</SiteShell>
```

`SiteShell` renders: `Navbar` → `<main className="flex-1 pt-14 sm:pt-20">` → `Footer` → `BookingModal` → `SocialModal`.

### Slug nav list (header + mobile menu share one array)

```ts
const navLinks = [
  { id: "home",         label: "Home" },
  { id: "services",     label: "Services" },
  { id: "about",        label: "About Us" },
  { id: "service-area", label: "Service Area" },
  { id: "reviews",      label: "Reviews" },
  { id: "contact",      label: "Contact" },
];
```

Rename/reduce per client, but keep the pattern: **label + matching section `id`**. Observer config: `rootMargin: "-30% 0px -60% 0px"`.

---

## 2. Design tokens (roles only, no values)

Define the client's palette as CSS variables and expose them to Tailwind via `@theme inline`. Use these **role names** in every class; never hard-code a color.

| Token | Role |
| :--- | :--- |
| `primary` | Main brand color: CTAs, active nav chip, icon bubbles, links, focus ring |
| `primary-strong` | Darker primary: hover state, headings that need emphasis, icon bubbles at rest |
| `accent` | Secondary brand color, used as the **end stop of gradients** and on highlights |
| `ink` | Darkest text and dark section backgrounds (hero, closing bar) |
| `ink-soft` | Body text on light backgrounds |
| `muted` | Captions, meta text, placeholders, inactive icons |
| `surface` | Page and card background (white-equivalent) |
| `surface-alt` | Alternating section background and input fill (very light) |
| `surface-tint` | Tinted section/panel background derived from `primary` (very light) |
| `border` | Hairline borders and dividers |
| `border-tint` | Borders on tinted panels (derived from `primary`) |
| `success` / `warning` / `danger` | Status feedback (form results, "Closed", errors) |
| `star` | Review-star fill |
| `on-primary` | Text/icons on top of primary/gradient/dark surfaces |

Opacity variants are used heavily (`/95`, `/90`, `/70`, `/25`, `/15`), so tokens must work with Tailwind's opacity modifier.

```css
@import "tailwindcss";

:root {
  --primary: /* client */;
  --primary-strong: /* client */;
  --accent: /* client */;
  --ink: /* client */;
  --ink-soft: /* client */;
  --muted: /* client */;
  --surface: /* client */;
  --surface-alt: /* client */;
  --surface-tint: /* client */;
  --border: /* client */;
  --border-tint: /* client */;
  --success: /* client */;
  --warning: /* client */;
  --danger: /* client */;
  --star: /* client */;
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-strong: var(--primary-strong);
  --color-accent: var(--accent);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-muted: var(--muted);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-surface-tint: var(--surface-tint);
  --color-line: var(--border);
  --color-line-tint: var(--border-tint);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-danger: var(--danger);
  --color-star: var(--star);
}
```

Below, classes are written with these tokens (`bg-primary`, `text-ink`, `border-line`, ...).

> **The signature gradient** used on every primary CTA, active chips and highlighted headline words is `bg-gradient-to-r from-primary via-primary to-accent` (2 or 3 stops, left→right). It is the one recurring decorative device.

---

## 3. Typography

| Role | Family | Notes |
| :--- | :--- | :--- |
| Body / UI / headings | One clean **geometric sans, variable font** (site used Plus Jakarta Sans) | Loaded with `next/font/google`, exposed as `--font-sans`, applied on `<body>` with `font-sans antialiased` |
| Script accent (optional) | One **handwritten script** font, weights 600/700 (site used Caveat) | Exposed as `--font-script`; utility `.font-script`. Used **once**, for the tagline under the About heading. |

Client picks the fonts; keep the roles (one sans for everything, one optional script accent used sparingly).

### Type scale (Tailwind, mobile → desktop)

| Element | Classes |
| :--- | :--- |
| Hero H1 | `text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]` |
| Section H2 (large) | `text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight` (About, Reviews, FAQ) |
| Section H2 (medium) | `text-2xl sm:text-3xl font-black` (Services, Why Choose) / `text-2xl sm:text-4xl font-black tracking-tight` (Service Area, Contact) |
| Card / panel H3 | `text-xl sm:text-2xl font-black tracking-tight leading-tight` (panel header) · `text-lg sm:text-xl font-black tracking-tight` (form card) · `text-sm font-bold` (small card) |
| Eyebrow / tracked label | `text-xs font-bold uppercase tracking-wider` (or `tracking-widest`, `tracking-[0.18em]` in the hero) |
| Body (lead) | `text-sm sm:text-lg leading-relaxed` (hero) · `text-sm sm:text-base` (sections) |
| Body (small) | `text-xs sm:text-sm leading-relaxed` |
| Micro / meta | `text-[11px]`, `text-[10px]` |
| Big stat number | `text-xl sm:text-2xl font-black` |
| Brand wordmark (header) | `text-xs sm:text-sm font-black tracking-tight` + sub-line `text-[8px] sm:text-[9px] font-black tracking-[0.2em] uppercase` |

Rules:
- Headings are **`font-black`** (900). Buttons are `font-bold`/`font-black`. Body is regular. Labels are bold + uppercase + tracked.
- Section intro paragraph sits under the heading: `mt-3 text-sm sm:text-base text-ink-soft`, centered inside `max-w-2xl mx-auto`.
- **Gradient headline word:** wrap one key phrase in `bg-gradient-to-r from-primary via-primary-strong to-accent bg-clip-text text-transparent` (hero second line uses `block`, About and Service Area headings use inline).

---

## 4. Global layout system

### Containers
| Use | Classes |
| :--- | :--- |
| Standard section | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Narrow section (Service Area) | `max-w-5xl mx-auto px-4 sm:px-6 lg:px-8` |
| Reading column (FAQ) | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` |
| Centered intro block | `text-center max-w-2xl mx-auto mb-6 sm:mb-8` (or `max-w-3xl mb-12` on Reviews/FAQ) |
| Header bar | `max-w-6xl mx-auto` |

### Vertical rhythm (section padding)
- Compact: `py-8 sm:py-12` (Contact)
- Standard: `py-10 sm:py-14` (Services, Why Choose)
- Roomy: `py-10 sm:py-16` (Service Area)
- Feature: `py-14 sm:py-20 lg:py-24` (About) · `py-16 lg:py-24` (Reviews, FAQ)

### Grid conventions
- **12-column desktop grid**, split by `lg:col-span-*`: `grid lg:grid-cols-12 gap-8` (hero 7/5, Why Choose 7/5, Contact 5/7, About 7/5, Services panel 5/7, Footer 4/2/3/3).
- Mobile is always **single column**; the grid engages at `lg:`.
- Card grids: `grid-cols-2 sm:grid-cols-4 lg:grid-cols-7` (appliance tiles), `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6` (brands), `md:grid-cols-3` (regions), `md:grid-cols-2 lg:grid-cols-3` (reviews), `sm:grid-cols-2` (pillars), `grid-cols-2 md:grid-cols-4` (stats).
- Gaps: `gap-3 sm:gap-4` (tiles), `gap-5` (region cards), `gap-6` (reviews), `gap-8`/`gap-10` (major columns).

### Section background alternation (top to bottom)
Sections alternate between plain and tinted backgrounds, separated by hairlines, so the single page has visible rhythm:

| Section | Background | Edge |
| :--- | :--- | :--- |
| Hero | `bg-ink` + full-bleed photo + dark gradient veil | none |
| Services | `bg-surface-tint` | `border-y border-line-tint` |
| Why Choose | `surface` | none |
| About | `surface` | `border-b border-line` |
| Brands strip | `bg-surface-alt` | `border-y border-line` |
| Service Area | `surface` | `border-b border-line` |
| Reviews | `surface` | `border-b border-line` |
| FAQ | `surface` | `border-b border-line` |
| Contact | `bg-surface-alt` | none |
| CTA bar | `bg-ink text-on-primary` | none |
| Footer | `bg-surface-alt` | `border-t border-line` (+ legal strip on `surface`) |

### Radius scale (important to the look: very rounded)
- `rounded-full`: all buttons, nav container, chips, pills, ZIP input, filter pills
- `rounded-3xl`: big panels (hero form card, appliance panel, modals, FAQ items, review cards, image frame)
- `rounded-2xl`: cards, tiles, inputs' containers, info boxes, stat boxes
- `rounded-xl`: form inputs, small icon bubbles, secondary buttons, social buttons

### Shadow scale
- `shadow-xs` / `shadow-sm` on resting cards and chips
- `shadow-md` on primary buttons (often tinted: `shadow-md shadow-primary/25`)
- `shadow-lg` on selected/hovered tiles and panels
- `shadow-xl` on the About image frame
- `shadow-2xl` on the hero form card and modals
- Header shadow: `shadow-[0_10px_35px_rgba(0,0,0,0.08),0_2px_10px_rgba(37,99,235,0.06)]` (soft neutral drop + faint primary-tinted glow; retint the second layer to the new primary)

### Border convention
Everything is defined by **1px hairline borders** (`border border-line`), not heavy shadows. Tinted panels use `border-line-tint`. Selected states add `ring-2 ring-primary/30`.

---

## 5. Section-by-section layout

### 5.1 Header / Navbar (`fixed`, floating pill)
- Wrapper: `fixed top-2 sm:top-4 left-0 right-0 z-50 w-full px-3 sm:px-6 pointer-events-none`
- Bar: `max-w-6xl mx-auto pointer-events-auto border border-line/90 bg-surface/95 backdrop-blur-2xl` + header shadow, `rounded-full` (becomes `rounded-3xl` while the mobile menu is open), `transition-all duration-200`.
- Inner row: `px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4`.
- **Left: logo lockup.** Square logo `w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-line bg-surface p-0.5`, then a two-line wordmark (bold name over tiny tracked uppercase sub-label) and a small pulsing dot (`hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse`). Logo scales `group-hover:scale-105 group-active:scale-95`.
- **Center (desktop `lg+` only): segmented chip nav.** Container `hidden lg:flex bg-surface-alt border border-line p-1 rounded-full`; each link `nav-chip px-4 py-1.5 rounded-full text-xs font-bold`. **Active** = `bg-primary text-on-primary shadow-xs`. **Idle** = `text-ink-soft hover:text-ink hover:bg-surface`.
- **Right cluster** `flex items-center gap-1.5 sm:gap-2 shrink-0`:
  1. Phone pill (visible `xl+`): `pressable hidden xl:inline-flex ... rounded-full bg-surface-alt border border-line px-3 py-1.5 text-xs font-bold` with a small phone icon in `text-primary`.
  2. Phone icon button (below `xl`): `icon-btn xl:hidden p-1.5 sm:p-2 rounded-full bg-surface-alt border border-line`.
  3. **Primary CTA** "Book Service" (label shortens to "Book" on mobile): `btn-cta ... bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm`.
  4. QR icon button (`lg+` only) opens the social modal.
  5. Hamburger (`lg:hidden`): `icon-btn p-1.5 sm:p-2 rounded-full border`; when open it flips to a filled `bg-primary text-on-primary` with an X icon.
- **Mobile menu:** drops **down inside the header pill** (not a side drawer, not a centered popup). Container `header-dropdown lg:hidden px-3 pb-3`, inner `rounded-2xl bg-surface-alt border border-line p-1.5`, links in `grid grid-cols-3 gap-1`, each `pressable px-2 py-2.5 rounded-xl text-xs font-bold text-center` (active = filled primary). A dim backdrop button (`menu-veil fixed inset-0 z-40 bg-ink/25 lg:hidden`) closes it; Escape also closes; leaving animates with `.is-leaving` (160 ms).
- `<main>` is offset by `pt-14 sm:pt-20` so content sits just under the pill.

### 5.2 Hero (`id="home"`)
- `relative overflow-hidden bg-ink text-on-primary`.
- Full-bleed background photo: `next/image fill priority sizes="100vw" className="object-cover object-right"`.
- Readability veil: `absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30` (dark on the text side, fading to the photo).
- Content: `relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 grid lg:grid-cols-12 gap-8 items-center`.
- **Left `lg:col-span-7 space-y-5`:**
  1. Eyebrow line: `text-xs sm:text-sm font-bold tracking-[0.18em] uppercase` (three short words separated by bullets).
  2. H1 (two lines): line 1 plain, line 2 `block` with the gradient-text treatment.
  3. Lead paragraph `text-sm sm:text-lg max-w-xl leading-relaxed`.
  4. Button row `flex flex-col sm:flex-row gap-3 pt-1`:
     - Primary: `btn-cta ... gradient px-7 py-3.5 rounded-full font-black text-sm sm:text-base shadow-md shadow-primary/30` + arrow icon (label and icon get `relative z-10` so the sheen sits behind them).
     - Secondary (ghost, glass): `pressable ... bg-white/10 hover:bg-white/20 border border-white/25 px-6 py-3.5 rounded-full font-bold backdrop-blur-sm` with a phone icon and the number.
- **Right `lg:col-span-5`: white "checker" card:** `rounded-3xl bg-surface/95 text-ink p-5 sm:p-6 shadow-2xl border border-white/40 backdrop-blur` containing an H2 (`text-base sm:text-lg font-black`), one helper line (`text-xs sm:text-sm text-ink-soft mt-1 mb-3.5`) and the ZIP checker (see 6.6).

### 5.3 Services (`id="services"`): interactive tile selector + detail panel
- Section: `bg-surface-tint border-y border-line-tint py-10 sm:py-14`, standard container.
- Centered H2 `text-2xl sm:text-3xl font-black mb-1` + one-line sub `text-center text-sm text-ink-soft mb-6`.
- **Tile row** (`role="tablist"`): `grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4`. Each tile is a button:
  - `card-lift group h-full w-full flex flex-col items-center text-center gap-2 p-4 rounded-2xl border shadow-xs`
  - Idle: `bg-surface border-line hover:border-primary hover:shadow-lg`. Selected: `bg-surface border-primary ring-2 ring-primary/30 shadow-lg`.
  - Icon disc: `w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center` (selected `bg-primary`, idle `bg-primary-strong group-hover:bg-primary`), icon `w-7 h-7 sm:w-8 sm:h-8 text-on-primary`.
  - Name `text-sm font-extrabold leading-tight`, note `text-[11px] text-muted leading-snug`.
  - Clicking selects and smooth-scrolls to the panel below.
- **Detail panel** (`role="tabpanel"`): `mt-6 rounded-3xl bg-surface border border-line shadow-lg overflow-hidden scroll-mt-24`.
  - **Panel header band:** `bg-gradient-to-r from-primary-strong via-primary to-accent text-on-primary px-5 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`. Left: icon tile `w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/30` + H3 + tagline (`text-xs sm:text-sm`, lighter). Right: two chips `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 text-[11px] sm:text-xs font-bold` with an icon each.
  - **Panel body:** `p-4 sm:p-7 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start`.
    - Left `lg:col-span-5 space-y-5`: description paragraph, a small uppercase heading (`text-[11px] font-extrabold uppercase tracking-wider text-muted mb-2.5`), a checklist (`space-y-2`, each item `flex items-start gap-2.5 text-sm` with a `w-4 h-4 text-primary shrink-0 mt-0.5` check icon), then a tinted mini-card `rounded-2xl bg-surface-tint/70 border border-line-tint p-4 space-y-2.5` holding a ZIP checker and a "prefer to call?" link.
    - Right `lg:col-span-7`: the booking form card (see 6.7), keyed to the selected item.

### 5.4 Why Choose
- `max-w-7xl ... py-10 sm:py-14 grid lg:grid-cols-12 gap-8 items-start`.
- Left `lg:col-span-7`: H2 (`text-2xl sm:text-3xl font-black text-primary-strong mb-5`) + `space-y-3` checklist (`text-sm sm:text-base`, check icon `w-5 h-5 text-primary`).
- Right `lg:col-span-5`: tinted card `rounded-3xl bg-surface-tint/70 border border-line-tint p-6 space-y-5`, two stacked info rows separated by `border-t border-line-tint pt-5`. Each row is `flex items-start gap-4` with a large icon (`w-9 h-9 text-primary-strong`), a bold small label, a big value (`text-2xl font-black`) and a muted line; an underlined text link (`underline underline-offset-2`).

### 5.5 About (`id="about"`, two stacked blocks in one wrapper)
**About block:** `py-14 sm:py-20 lg:py-24 bg-surface relative overflow-hidden border-b border-line`.
- Two decorative blurred orbs: `absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] pointer-events-none` and a mirrored one bottom-left tinted with `accent`.
- **Top header row:** `flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line`. Left: eyebrow pill (see 6.3) → H2 with gradient name → a row with the script tagline (`font-script text-2xl sm:text-3xl text-primary`) and a small uppercase pill. Right: gradient CTA button `px-6 py-3.5 rounded-full font-extrabold shadow-md shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]` with calendar + arrow icons.
- **Story grid:** `grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-10 sm:py-12`.
  - Left `lg:col-span-7 space-y-6`: two paragraphs (`text-sm sm:text-base text-ink-soft leading-relaxed`, key phrases as `<strong className="text-ink">`), then a **pillar grid** `grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2`. Each pillar: `p-4 rounded-2xl bg-surface-alt border border-line hover:border-primary shadow-xs group`, top row = icon bubble (`w-8 h-8 rounded-xl bg-primary/10 text-primary`, `group-hover:scale-110`) + tiny badge pill (`text-[10px] font-bold uppercase tracking-wider rounded-full border px-2 py-0.5`), then title `text-sm font-bold` + body `text-xs text-ink-soft`.
  - Right `lg:col-span-5 flex justify-center`: **framed photo** `relative w-full max-w-md rounded-3xl overflow-hidden border border-line shadow-xl bg-surface p-3` → inner `relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden` with `object-cover object-top hover:scale-105 transition-transform duration-500`. Floating badge along the bottom: `absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-surface/95 backdrop-blur-md border border-line shadow-lg flex items-center justify-between` (round icon + two-line name/subtitle on the left, small status pill on the right).
- **Stats strip:** `grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-line text-center`; each stat `p-3 rounded-2xl bg-surface-alt border border-line` with a big number (`text-xl sm:text-2xl font-black text-primary`), a bold label (`text-xs font-bold mt-0.5`) and a muted sub-label (`text-[11px] text-muted`).

**Brands strip** (directly under About, same wrapper): `py-8 sm:py-14 bg-surface-alt/70 border-y border-line`.
- Header row `flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-line`: left = eyebrow pill + `h3 text-2xl sm:text-3xl font-black tracking-tight mt-2`; right = a white pill `rounded-full bg-surface border border-line px-4 py-2 text-xs shadow-xs` with a shield icon.
- Grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4`; each cell `p-4 rounded-2xl border border-line bg-surface h-20 flex flex-col justify-center items-center text-center group hover:border-primary hover:shadow-md hover:bg-surface-tint/30 hover:-translate-y-0.5 transition-all duration-200`; name `text-sm font-black tracking-tight group-hover:text-primary`, sub-line `text-[10px] text-muted font-medium mt-0.5`.

### 5.6 Service Area (`id="service-area"`)
- `bg-surface py-10 sm:py-16 border-b border-line`, **narrow** container (`max-w-5xl`).
- Centered header block (`max-w-2xl mx-auto mb-8`): H2 with one gradient phrase, one-line sub, then the ZIP checker constrained to `max-w-md mx-auto mt-5 text-left`.
- Region cards `grid md:grid-cols-3 gap-5`; each `rounded-2xl bg-surface-alt border border-line p-5` with an H3 (`flex items-center gap-2 font-black mb-3`, pin icon `w-4 h-4 text-primary`) and a list `space-y-1.5 text-sm text-ink-soft`.
- Fine print `text-xs text-muted mt-3`.
- **Call-out bar:** `mt-6 rounded-2xl bg-surface-tint border border-line-tint p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`, text left, solid primary pill button right (`px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-sm font-bold shrink-0`).

### 5.7 Reviews (`id="reviews"`)
- `py-16 lg:py-24 bg-surface border-b border-line`, standard container.
- Centered header `max-w-3xl mx-auto mb-12`: eyebrow pill → H2 (`text-3xl sm:text-4xl lg:text-5xl`) → sub (`text-base sm:text-lg`) → **filter pills** `flex flex-wrap items-center justify-center gap-2 mt-6`. Pill: `px-4 py-2 rounded-full text-xs font-bold`; active = gradient + `shadow-md shadow-primary/25 border border-white/20 text-on-primary`; idle = `bg-surface-alt text-ink-soft hover:bg-line`.
- Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Card: `p-6 rounded-3xl bg-surface-alt border border-line hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between`.
  - Top row: stars (`w-4 h-4 fill-star text-star`) left, service tag pill (`text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-line-tint`) right.
  - Quote: `text-xs sm:text-sm text-ink-soft leading-relaxed italic mb-4` wrapped in curly quotes.
  - Footer: `pt-4 border-t border-line`, name `text-xs sm:text-sm font-bold`, location `text-[11px] text-muted`.

### 5.8 FAQ (`id="faq"`)
- `py-16 lg:py-24 bg-surface border-b border-line`, **reading** container (`max-w-4xl`).
- Centered header (eyebrow pill, H2, sub) `mb-12`.
- Accordion `space-y-3`, **starts fully collapsed**. Item: `rounded-3xl border bg-surface-alt/60 overflow-hidden card-lift`; closed `border-line hover:border-primary`, open `border-primary shadow-md`.
  - Trigger button: `w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base hover:text-primary`; left = per-question icon (`w-4 h-4 shrink-0`) + question; right = chevron `w-5 h-5 text-muted transition-transform duration-200` that rotates 180° and turns primary when open.
  - Answer: `px-6 pb-5 pt-1 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-line/60 bg-surface`.
  - Each question gets its own icon; icon tints are status-ish (success/primary/etc.), so map them to tokens.

### 5.9 Contact (`id="contact"`)
- `bg-surface-alt py-8 sm:py-12`, standard container. Centered header (H2 `text-2xl sm:text-4xl font-black tracking-tight` + sub `max-w-2xl`).
- `grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`.
  - **Left `lg:col-span-5 space-y-4`: two info cards**, each `p-4 rounded-2xl bg-surface border border-line shadow-sm`:
    - *Phones:* label row (`flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider` + icon), then two stacked link-tiles `block px-4 py-2.5 rounded-xl border` (primary line uses `bg-surface-tint/80 border-line-tint hover:border-primary` with `text-xl font-black`; secondary uses `bg-surface-alt border-line` with `text-base font-black`), each with a tiny uppercase caption above the number.
    - *Details:* sub-blocks separated by `pt-3 border-t border-line`: Email (break-all link), Operating Hours (`<dl>` rows `flex justify-between`, values `font-bold`, "Closed" in `danger`), Service Area sentence, Follow Us (social link buttons `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold` that invert to filled on hover).
  - **Right `lg:col-span-7`:** the booking form card (6.7).

### 5.10 CTA bar (closing strip)
- `bg-ink text-on-primary`; container `py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-white/15`.
- Three "icon + two-line text" items (`flex items-center gap-3`, icon disc `w-11 h-11 rounded-full bg-primary`): Call (small label + large `text-xl font-black` number), Book online (button), Service area (link). Cells get `lg:pr-6` / `lg:px-6` / `lg:pl-6` to space the dividers.
- Fourth cell: full-width-on-mobile gradient CTA `btn-cta w-full lg:w-auto px-6 py-3 rounded-full font-black text-sm`.

### 5.11 Footer
- `relative bg-surface-alt text-ink-soft border-t border-line`.
- Main: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12`, grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6` with four columns:
  1. **Brand (4 cols):** logo lockup (larger: `w-11 h-11 rounded-2xl`, name `text-xl font-black`), tagline in italic, short paragraph `text-xs sm:text-sm leading-relaxed max-w-md`, two highlight pills, then "Official Social Channels" caption + social buttons.
  2. **Links (2 cols):** column heading style `text-xs font-bold uppercase tracking-widest flex items-center gap-2` preceded by a `w-1.5 h-1.5 rounded-full bg-primary` dot; link list `space-y-2 text-xs sm:text-sm hover:text-primary`; a bold "All ..." link with arrow.
  3. **Contact (3 cols):** heading + white card `p-4 rounded-2xl bg-surface border border-line shadow-sm space-y-2.5` with micro-labels (`text-[10px] font-bold uppercase tracking-wider text-muted`), phone links, hours, coverage.
  4. **QR (3 cols):** heading with QR icon + white card `p-4 rounded-2xl ... flex flex-col items-center text-center space-y-3` containing a 3-way segmented toggle (`flex items-center gap-1 p-1 bg-surface-alt rounded-full w-full`, buttons `flex-1 py-1 text-[10px] font-bold rounded-full`, active = filled), the generated QR image in a `p-2 rounded-xl border shadow-inner` frame (`w-32 h-32`), and two caption lines.
- **Legal strip:** `border-t border-line py-6 bg-surface`, container `flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted`: copyright left, bullet-separated trust facts right (`flex flex-wrap items-center justify-center gap-3 sm:gap-5`).

---

## 6. Reusable component patterns

### 6.1 Buttons

| Kind | Classes |
| :--- | :--- |
| **Primary CTA (gradient, sheen)** | `btn-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-accent text-on-primary px-7 py-3.5 rounded-full font-black text-sm sm:text-base shadow-md shadow-primary/30 cursor-pointer` (children get `relative z-10`) |
| Compact CTA (header) | same but `px-2.5 sm:px-4 py-1.5 sm:py-2 font-bold text-xs sm:text-sm shadow-sm` |
| Solid primary pill | `px-5 py-2.5 rounded-full bg-primary hover:bg-primary-strong text-on-primary text-sm font-bold` |
| Ghost on dark | `pressable ... bg-white/10 hover:bg-white/20 border border-white/25 text-on-primary rounded-full backdrop-blur-sm` |
| Neutral pill | `pressable ... bg-surface-alt hover:bg-surface border border-line hover:border-primary rounded-full text-xs font-bold shadow-xs` |
| Icon button | `icon-btn p-2 rounded-full bg-surface-alt border border-line hover:bg-surface hover:border-primary hover:text-primary shadow-xs` |
| Form submit | full width `py-3 px-5 rounded-full` gradient, `font-black text-sm shadow-md`, `disabled:opacity-60 disabled:cursor-not-allowed` |
| Text link | `font-bold underline underline-offset-2 hover:text-primary` |

Every clickable element gets `cursor-pointer`.

### 6.2 Icon bubbles
`w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center` (small) · `w-11 h-11 rounded-full bg-primary text-on-primary` (CTA bar) · `w-14 h-14 sm:w-16 sm:h-16 rounded-full` (tile) · `w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/30` (on gradient). Icons are `lucide-react`, stroke style, always `aria-hidden="true"` when decorative.

### 6.3 Eyebrow pill (above section headings)
`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-line-tint text-primary-strong text-xs font-bold uppercase tracking-wider shadow-xs mb-3` with a `w-3.5 h-3.5` icon.

### 6.4 Badges / chips
Tiny tag: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border`. Info chip on gradient: `px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 text-[11px] sm:text-xs font-bold`.

### 6.5 Cards
- Standard: `rounded-2xl bg-surface border border-line shadow-sm p-4`
- Muted: `rounded-2xl bg-surface-alt border border-line p-5`
- Tinted: `rounded-2xl bg-surface-tint border border-line-tint p-4/5`
- Large: `rounded-3xl bg-surface border border-line shadow-lg overflow-hidden`
- Hover on grid cards: `hover:border-primary hover:shadow-md hover:-translate-y-0.5` (or the `card-lift` class).

### 6.6 ZIP / availability checker (reusable "input + button + feedback")
- Form `flex gap-2`; input wrapper `relative flex-1` with a left icon (`w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2`); input `w-full pl-10 pr-3 py-3 text-sm bg-surface border border-line rounded-full focus:outline-none focus:ring-2 focus:ring-primary`; button `px-5 py-3 bg-primary hover:bg-primary-strong text-on-primary rounded-full text-sm font-black shrink-0 shadow-xs`.
- Feedback area (`aria-live="polite" mt-2.5`): three result boxes `p-3 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5` in `success` (in area, with "book now" underline link), `warning` (out of area, with call link) and `danger` (invalid input, `role="alert"`).

### 6.7 Booking form card
- Card `rounded-2xl bg-surface border border-line shadow-sm p-4 sm:p-6`; header H3 + sub; form `space-y-3`.
- Inputs use icon-in-field: wrapper `relative`, icon `w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2`, field `w-full pl-9 pr-3 py-2 text-sm bg-surface-alt border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface text-ink placeholder:text-muted`.
- Field grid `grid grid-cols-1 sm:grid-cols-2 gap-3` (name, phone, email, address, date, time window). Full-width rows below: optional brand/model input, `rows={2}` textarea with `resize-none`.
- Error: `role="alert" rounded-xl bg-danger/10 border border-danger/30 px-3.5 py-2.5 text-sm font-medium text-danger`.
- Submit (6.1) + a `text-center text-[11px] text-muted` reassurance line.
- **Success state replaces the form:** centered `w-12 h-12 rounded-full bg-primary/10 text-primary` check bubble, thank-you H4, a summary `<dl>` box (`max-w-sm mx-auto p-4 bg-surface-alt rounded-xl border border-line text-left space-y-1.5 text-xs sm:text-sm`, rows `flex justify-between gap-3` with muted `dt` and bold `dd`, reference in `font-mono`), then two buttons (gradient "Call" + neutral "Book another").
- Anti-spam: an off-screen **honeypot** field on every form. Hidden appliance/service picker when the form is "locked" to the selected tile.

### 6.8 Modals (booking + social)
- Overlay `fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm menu-veil`.
- Panel `menu-panel relative w-full max-w-lg (max-w-2xl for social) bg-surface rounded-3xl shadow-2xl border border-line overflow-hidden`.
- Booking modal header: `flex items-center justify-between px-6 py-4 border-b border-line bg-surface-alt` with an icon bubble + title + tiny sub-line on the left and an `icon-btn` close (X) on the right; body `p-6`. Form labels: `block text-xs font-bold uppercase tracking-wider mb-1.5`; inputs `w-full px-3.5 py-2.5 bg-surface-alt border border-line rounded-xl text-xs sm:text-sm focus:bg-surface focus:ring-2 focus:ring-primary`; a tinted info strip (`p-3 rounded-xl bg-surface-tint border border-line-tint flex items-center justify-between text-xs`); full-width gradient submit `py-3.5 rounded-xl font-black`.
- Success state: `w-16 h-16` circle check, confirmation H4, reference in mono, tinted guarantee box, close button.
- Social modal: centered header (eyebrow pill + H3 + sub), floating close button `absolute top-5 right-5 p-2 rounded-full bg-surface-alt`, `grid grid-cols-1 sm:grid-cols-2 gap-6` of QR cards, small centered footer line with `border-t pt-4`.

### 6.9 Global background treatments
- Blurred "ambient" orbs behind feature sections (About only): 500px circles, `blur-[130px]`, ~10 to 40% opacity tinted from primary/accent, `pointer-events-none`.
- Frosted glass only where content overlaps imagery or the header: `backdrop-blur-sm/md/2xl` with `bg-*/95` or `bg-white/10`.
- Text selection: `selection:bg-primary selection:text-on-primary` on `<body>`.

---

## 7. Motion & interaction (drop into `globals.css`)

All motion is small and quick (180–240 ms, ease-out-quint style `cubic-bezier(0.22, 1, 0.36, 1)`). Keep this class vocabulary; put the class names on the same kinds of elements.

| Class | Used on | Behavior |
| :--- | :--- | :--- |
| `.pressable` | neutral pills, links, mobile-menu items | hover: up 1px · active: down 1px + `scale(0.97)` |
| `.pressable-icon` | icon inside a `.pressable` | hover `scale(1.12)` · active `scale(0.92)` |
| `.btn-cta` | every gradient CTA | hover: up 2px + soft primary-tinted shadow + a diagonal white **sheen** sweeps across via `::after` · active: press-in |
| `.icon-btn` | round icon buttons | hover: up 1px + rotate −8° · active: `scale(0.9)` |
| `.nav-chip` | desktop nav links | hover up 1px · active `scale(0.96)` |
| `.card-lift` | tiles, FAQ items | hover up 4px · active up 1px + `scale(0.995)` (240 ms) |
| `.menu-veil` | dim backdrops | fade in 220 ms / out 180 ms (`.is-leaving`) |
| `.menu-panel` | modal panels | scale/slide in 340 ms / out 180 ms |
| `.header-dropdown` | mobile menu | slides down 8px + fades in 220 ms / out 160 ms |
| `.menu-item` | menu children | staggered `itemIn` (70 ms then +40 ms per item, up to 6) |

Keyframes needed: `veilIn`, `veilOut`, `dropDownIn`, `dropDownOut`, `panelIn`, `panelOut`, `itemIn`.

> **Known bug in the source site:** `.menu-panel` references `panelIn`, but `@keyframes panelIn` is **never defined** (only `panelOut` is). Define it in the new build, e.g. `from { opacity: 0; transform: scale(0.96) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); }`.

The `.btn-cta` sheen (recolor-free, it uses white at low alpha):

```css
.btn-cta { position: relative; overflow: hidden; isolation: isolate;
  transition: transform 180ms cubic-bezier(0.22,1,0.36,1), box-shadow 180ms ease, filter 180ms ease; }
.btn-cta::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.28) 45%, transparent 70%);
  transform: translateX(-130%); transition: transform 520ms cubic-bezier(0.22,1,0.36,1); }
.btn-cta:hover { transform: translateY(-2px);
  box-shadow: 0 14px 28px -10px color-mix(in srgb, var(--primary) 45%, transparent), 0 0 0 1px rgba(255,255,255,0.2) inset; }
.btn-cta:hover::after { transform: translateX(130%); }
.btn-cta:active { transform: translateY(1px) scale(0.97); transition-duration: 80ms; }
```

Also small utility animations used sparingly: `animate-pulse` on the brand dot, `animate-float-slow` / `animate-soft-pulse` are defined but optional.

### Reduced motion (required)
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .pressable, .btn-cta, .icon-btn, .nav-chip, .card-lift, .pressable-icon { transition: none !important; }
  .pressable:hover, .pressable:active, .btn-cta:hover, .btn-cta:active, .icon-btn:hover, .icon-btn:active,
  .nav-chip:hover, .nav-chip:active, .card-lift:hover, .card-lift:active { transform: none; }
  .btn-cta::after, .menu-veil, .menu-panel, .menu-item, .header-dropdown { animation: none !important; }
}
```

> **Do not copy** the unused "luxury glass" CSS block (`.glass-pill*`, `.glass-card-*`, `.btn-glass-*`, `.glow-*`, `.shimmer-effect`). No component uses it; it is leftover from an earlier dark theme.

---

## 8. Responsive behavior

| Breakpoint | Behavior |
| :--- | :--- |
| Base (mobile) | Single column everywhere. Header shows logo + phone icon + short "Book" + hamburger. Tiles 2-up. Padding `px-4`. |
| `sm` (640) | Header spacing grows; "Book Service" label appears; tiles 4-up; form fields 2-up; hero buttons go side-by-side. |
| `md` (768) | Region cards 3-up; brand grid 4-up; review grid 2-up; footer 2-up; About/Brands header rows go horizontal. |
| `lg` (1024) | 12-col grids engage (hero, panel, About, Contact, Footer); desktop chip nav shows and hamburger hides; tiles 7-up; reviews 3-up; brands 6-up; CTA bar 4-up with dividers. |
| `xl` (1280) | Full phone-number pill appears in the header (below `xl` it is an icon). |

Mobile-first rule: write the base class for phones, add `sm:`/`lg:` overrides. Body copy shrinks to `text-sm`/`text-xs` on phones; headings step up at `sm` and `lg`. Body has `overflow-x: hidden`.

---

## 9. Images & assets

| Asset | Treatment |
| :--- | :--- |
| Logo (square) | `next/image fill object-contain` inside a rounded bordered tile; also used to crop favicon set (`favicon.ico`, `icon.png`, `apple-icon.png`, `icon-192/512.png` for the manifest) |
| Hero photo | Full-bleed `fill priority sizes="100vw" object-cover object-right`, always under the dark gradient veil so text stays readable |
| About photo | Framed card (`rounded-3xl p-3` outer, `rounded-2xl` inner), `object-cover object-top`, slow zoom on hover |
| Icons | `lucide-react` only, sized `w-3.5`–`w-9`; brand-logo SVGs (social) are inline components |
| QR codes | Generated client-side with the `qrcode` package (220px, margin 1, error-correction M) |
| Alt text | Descriptive for photos; `aria-hidden` for decorative icons |

---

## 10. Accessibility patterns to keep

- One `<h1>` (hero). Sections use `h2`; cards use `h3`/`h4`.
- Tile selector uses `role="tablist"` / `role="tab"` (`aria-selected`, `aria-controls`) and a `role="tabpanel"`.
- Mobile menu button has `aria-label` + `aria-expanded`; Escape closes the menu.
- Inputs have `aria-label` or a linked `<label>` (visually hidden with `sr-only` when the design uses icon+placeholder).
- Form errors use `role="alert"`; the checker result area is `aria-live="polite"`.
- Focus rings: `focus:outline-none focus:ring-2 focus:ring-primary` on all fields.
- Full `prefers-reduced-motion` support (Section 7).
- Phone numbers are `tel:` links, email is `mailto:`, external links have `target="_blank" rel="noopener noreferrer"`.

---

## 11. Data-driven content (keeps components generic)

Content lives in `lib/` so the layout can be reused unchanged:

| File | Holds |
| :--- | :--- |
| `lib/site.ts` | site name, URL (from `NEXT_PUBLIC_SITE_URL`), phones, email, hours, service radius, social URLs |
| `lib/appliances.ts` (rename to `services.ts`) | array of `{ slug, name, icon, tileNote, tagline, description, commonIssues[], turnaround, bookingLabel }` that drives the Services tiles, panel, footer links and booking dropdown |
| `lib/reviews.ts` | array of `{ id, name, location, service, rating, comment }` |
| `lib/faqs.ts` | array of `{ q, a }`; feeds both the accordion and FAQ schema |
| `lib/service-area.ts` | ZIP list/radius check returning `"in" | "out" | "invalid"` |
| `lib/booking/*` | validation, reference-number generator, email templates |

The Services section renders **one tile per array item** and the panel updates from the selected item, so the client's own services list drops straight in (tile grid column count `lg:grid-cols-7` should be adjusted to the item count, e.g. `lg:grid-cols-6` for six).

---

## 12. Metadata & SEO scaffolding

- Root layout: `metadataBase`, `title.template = "%s | {Site Name}"`, description, Open Graph + Twitter (`summary_large_image`), `viewport.themeColor` (set to the client's surface color), fonts via `next/font/google` (`display: "swap"`), JSON-LD `LocalBusiness` in the layout.
- `app/page.tsx`: `alternates.canonical = "/"`, its own `openGraph`, plus `FAQPage` JSON-LD.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx` (1200×630).
- Single page means one sitemap entry (`/`); the anchors are not separate URLs.

---

## 13. Booking / form flow (behavioral spec)

- Three entry points, one backend: the in-page contact form, the panel form under the selected service, and the popup modal, all calling one server action (`submitBooking`).
- Server flow: validate/normalize → honeypot check → deterministic reference (`PREFIX-XXXXXX`) → send one confirmation email to the customer and one notification to the business (Resend batch, idempotency key). Email is required on every form. No database.
- Every "Book" button anywhere calls `openBooking(serviceLabel?, notes?)` from `useSite()`. The ZIP checker, when the ZIP is in area, offers "Schedule your repair" that opens the modal preloaded with the selected service.

---

## 14. What to change per client (checklist)

- [ ] Palette → fill every token in Section 2 (and the two hard-coded shadow tints).
- [ ] Fonts → one sans (+ optional script accent).
- [ ] Logo, favicon set, hero photo, About photo.
- [ ] `lib/site.ts`, services array, reviews, FAQs, service-area logic.
- [ ] Nav array (rename, add or drop sections; keep slug `id` = link target).
- [ ] Copy for every heading, sub-line, eyebrow, badge and stat.
- [ ] Trust facts in the CTA bar and footer strip.
- [ ] Adjust the tile grid column count to the number of services.
- [ ] Rewrite the JSON-LD business type and hours.

**Keep unchanged:** container widths, section order and rhythm, radius/shadow scale, the gradient-CTA pattern, the pill header, the tab-style service selector, the accordion behavior, the modal system, all motion classes, and the anchor/slug navigation.

---

## 15. Prompt to give Claude

Paste this along with the file and the client's brand details:

> Build a **single-page** marketing/booking website for the client below, using the attached `LAYOUT-STYLE-GUIDE.md` as the **exact** structure and styling spec.
>
> **Stack:** Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + `lucide-react` + `next/font/google`. Read `node_modules/next/dist/docs/` first if the installed Next.js version differs from what you know.
>
> **Rules**
> 1. One route only (`/`). All navigation uses **slug/anchor links** (`#home`, `#services`, ...) with smooth scroll, `scroll-margin-top`, and an IntersectionObserver-driven active state. Do not create extra pages.
> 2. Follow the guide's section order, containers, spacing, radii, shadows, typography scale, grids, breakpoints and component class patterns **exactly**.
> 3. Use **only the role tokens** from Section 2 in class names. Fill them from the client's palette below. Do not copy any color from the original site.
> 4. Recreate the motion system (Section 7) including the missing `panelIn` keyframe and the reduced-motion block. Do not include the unused glass/glow CSS.
> 5. Keep content in `lib/` data files as in Section 11 so the layout stays generic.
> 6. Keep the accessibility patterns in Section 10.
> 7. Replace all copy, contact data, services, reviews, FAQs and service-area logic with the client's. Never reuse the original business's name, numbers or claims. Do not fabricate reviews, ratings or credentials; use clearly marked placeholders if the client has not supplied them.
> 8. When done, run the build and lint, fix errors, and check the page at mobile (375px), tablet (768px) and desktop (1280px+).
>
> **Client brand details:**
> - Business name / tagline:
> - Palette (map to the tokens in Section 2): primary, primary-strong, accent, ink, ink-soft, muted, surface, surface-alt, surface-tint, border, border-tint, success, warning, danger, star
> - Fonts (sans + optional script):
> - Logo / hero photo / about photo files:
> - Services list (name, icon, short note, tagline, description, common issues, turnaround):
> - Nav sections wanted (slug + label):
> - Contact (phones, email, hours, social links, service area / radius):
> - Reviews, FAQs, brands/partners, trust stats:
> - Booking backend (email provider, notify address):
