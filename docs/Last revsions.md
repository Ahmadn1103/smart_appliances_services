# Layout, Styling & Spacing Spec (Mobile + Desktop)

**Instructions for Claude:** You are rebuilding the look and layout of an existing local-service website for a different business. Keep THEIR content (name, services, phones, areas, logos, photos). Copy the STRUCTURE, STYLING, SIZES and SPACING below exactly. Stack: Next.js App Router, React, Tailwind CSS v4, lucide-react icons. Content is data-driven: services, areas and phone numbers live in small data files and components only read from them.

Breakpoints used: **phone** = below 640px, **sm** = 640px+ (tablet), **lg** = 1024px+ (desktop), **2xl** = 1536px+ (extra wide). Always check a screenshot at **390px wide** first, then 768, 1024, 1280, 1536. Format below is `phone / sm / lg`.

---

## 1. Design tokens

- Primary blue `blue-600` / hover `blue-700`. Accent cyan `cyan-500`. Main CTA gradient: `bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500`.
- Text: headings `slate-900`, body `slate-600/700`, muted `slate-500`, hero body `slate-200` on dark.
- Surfaces: white cards on `slate-50` / `blue-50/70` sections; borders `slate-200`.
- Corners: cards `rounded-2xl`, small cards `rounded-xl`, every button and pill `rounded-full`, stacked call badges `rounded-2xl`.
- Shadows: buttons `shadow-md shadow-blue-500/30`; floating images `drop-shadow-[0_12px_24px_rgba(2,6,23,0.45)]`; cards `shadow-sm`.
- Weights: headings `font-black`, buttons/numbers `font-bold` or `font-black`, nav `font-bold`, list links `font-semibold`.
- Section padding: `py-8 sm:py-16` (compact strips `py-6 sm:py-9`). Container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Press feedback on tappable things: `active:scale-95 transition-transform`.
- Always wrap phone numbers with `whitespace-nowrap`.

---

## 2. Typography scale (exact values)

| Element | Phone | sm | lg | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Hero H1 | `text-2xl` (24px) | `text-[46px]` | `text-[58px]` | `font-black tracking-tight leading-[1.08]`; 2nd line in cyan gradient text |
| Hero eyebrow | `text-[10px]` | `text-sm` | `text-sm` | uppercase `font-bold`, tracking `0.14em` phone / `0.18em` sm+ |
| Hero paragraph | `text-[13px]` | `text-lg` | `text-lg` | `leading-relaxed max-w-xl text-slate-200` |
| Section H2 | `text-2xl` | `text-4xl` | `text-4xl` | `font-black tracking-tight` |
| About-style big H2 | `text-3xl` | `text-4xl` | `text-5xl` | `font-black tracking-tight` |
| Strip H3 (logo strip) | `text-xl` | `text-2xl` | `text-2xl` | |
| Script tagline | `text-2xl` | `text-3xl` | `text-3xl` | handwriting font (Caveat), blue |
| Nav links | `text-xs` | `text-xs` | `text-xs` | `font-bold whitespace-nowrap`, `px-2.5` then `xl:px-4`, `py-1.5` |
| Header Book button | `text-xs` ("Book") | `text-sm` ("Book Service") | `text-sm` | gradient CTA, `font-bold` |
| Header Contact button (phone only) | `text-xs` | hidden | hidden | solid `bg-blue-600 text-white`, `px-3 py-2.5` |
| Header call pills | n/a | n/a | `text-xs` (2xl+) | `font-bold px-3 py-1.5 bg-slate-100 border` |
| Header call icon badge label | `text-[8px]` | `text-[9px]` | | uppercase `font-bold leading-none`, under a 14px icon |
| Hero buttons | `text-sm` | `text-sm` | `text-sm` | see section 5 |
| Tile name | `text-[11px]` | `text-sm` | `text-sm` | `font-extrabold leading-tight` |
| Tile note | hidden | `text-[11px]` | `text-[11px]` | `text-slate-500 leading-snug` |
| Footer list links | `text-sm` | `text-sm` | `text-sm` | `font-semibold text-slate-700` |
| Stat number | `text-xl` | `text-2xl` | `text-2xl` | `font-black text-blue-600`; label `text-xs font-bold`; sublabel `text-[11px] text-slate-500` |
| CTA button (content blocks) | `text-sm` | `text-base` | `text-base` | `font-extrabold` |
| Small chips | `text-xs` | | | `px-2.5 py-1 rounded-full` |

Tuning rule: when something feels heavy, cut the PHONE size by 2-4px first and leave desktop alone. When text wraps, add `whitespace-nowrap` and shrink padding before shrinking font.

---

## 3. Header

**Desktop (lg+):** floating white pill, `max-w-7xl`, fixed near the top with a small gap (`top-2 sm:top-4`), `rounded-[1.75rem]`, `bg-white/95`, soft shadow. Left to right: logo | centered nav chips | call buttons | Book button | QR button.
- Logo: a **transparent PNG** (no box, no border, no background) at `w-20 h-14` phone / `sm:w-32 sm:h-20`, `object-contain`. Do not exceed 80px tall on desktop or the header becomes too tall.
- Nav: pill container `bg-slate-100/90 border rounded-full p-1`; links are chips; active chip `bg-blue-600 text-white`. Never let a link wrap.
- Call buttons: TWO separate buttons, Primary (solid blue) and Secondary (outlined/light). Below 2xl they are small stacked badges (icon on top, tiny `PRIMARY` / `SECONDARY` label, `min-w-[3rem] rounded-2xl px-1.5 py-1.5`). At 2xl+ they are pills showing the full number.
- If the QR button hangs outside the pill, widen the container (`max-w-7xl`) and hide the full-number pills below 2xl.

**Phone (below sm):** logo, ONE blue **Contact** button, Book button, hamburger.
- Contact opens a dropdown listing both numbers (Primary solid blue row, Secondary white row with border). Position it `fixed left-1/2 -translate-x-1/2 top-[5.5rem] w-[calc(100vw-2rem)] max-w-xs rounded-2xl bg-white border shadow-xl p-2 space-y-1.5 z-50`. Do NOT anchor it `absolute` to the small button: it spills off the screen edge. Rows are `px-3 py-3 rounded-xl`, label `text-[10px]` uppercase, number `text-base font-black`.
- Close on outside tap (mousedown + touchstart), Escape, or tapping a number.
- The hamburger menu starts with two large call buttons (2-column grid), then the page links in a 3-column grid.

---

## 4. Hero

- Full-bleed dark section, runs behind the floating header. Background photo sits in its own box: `absolute top-20 bottom-0 right-0 w-full lg:w-[60%]`, `object-cover object-top`, so the person's face is not hidden behind the header. A gradient overlay fades the photo into the text side: desktop `bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/30`; phones `bg-gradient-to-b from-slate-950/90 via-slate-900/75 to-slate-900/60`.
- Text column: `lg:col-span-7 space-y-5`; padding `pt-24 pb-10 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20`.
- Do not place a form card over the subject's face. Keep the hero to: eyebrow, H1, paragraph, buttons.
- **Buttons:** `grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5`. Main CTA is `col-span-2 sm:col-span-1` (full width on phone), gradient, `px-5 py-3 sm:py-2.5 rounded-full font-black text-sm`. The two phone buttons are glass: `bg-white/10 hover:bg-white/20 border border-white/25 text-white px-2 sm:px-4 py-3 sm:py-2.5 rounded-full font-bold text-sm backdrop-blur-sm`, each with a 14px phone icon.
- **Brush-stroke tagline image** (a short 3-line slogan): a transparent PNG with a hand-painted blue brush shape. Desktop/tablet: floating top-right, `hidden sm:block absolute z-10 sm:top-[7.5rem] sm:right-8 lg:right-6 sm:w-44 lg:w-52` plus the drop shadow. Phone: render a second copy INLINE at the top of the text column, `sm:hidden w-28 ml-auto` (right-aligned), so it never overlaps the headline. If the supplied image has a fake checkerboard baked in, cut the shape out (flood-fill the non-blue pixels from the borders, keep enclosed text, soften the edge, crop to bounds) and preview it on a dark background.

---

## 5. Services tile grid + selected panel

- Grid: `grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4`. Never force all tiles into one row: labels wrap one word per line.
- Tile: white card `rounded-2xl border shadow-xs`, centered column, `p-2.5 sm:p-4`, icon in a blue circle `w-11 h-11 sm:w-16 sm:h-16` (icon `w-5 h-5 sm:w-8 sm:h-8`), name below, note only from sm up. Selected tile: `border-blue-500 ring-2 ring-blue-500/30 shadow-lg`.
- Selecting a tile swaps the panel below it (title, tagline, tags like price/turnaround, "common problems" bullets, a compact booking form). Footer links deep-link to a specific tile with `?service=<slug>#services`; handle same-page clicks with a custom window event and `scrollIntoView` (a plain `#hash` link does nothing when the URL already has that hash).
- Booking dropdowns start on a required, disabled placeholder option (`Choose your service`) styled `invalid:text-slate-400`, not a pre-selected first item.

---

## 6. Logo strip

- Logos only, no description text. Full color (not grayscale).
- Grid `grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3`. Cards `h-12 sm:h-16 rounded-xl p-2 sm:p-3 bg-white border border-slate-200 flex items-center justify-center hover:border-blue-500 hover:shadow-md`.
- Logo `h-5 sm:h-8 w-full max-w-[7rem] object-contain`.
- 10 logos in 5 columns = two even rows. Section padding `py-6 sm:py-9`, heading `text-xl sm:text-2xl`. Use current SVG logos; crop each SVG's `viewBox` to its real bounding box (some icon-library wordmarks sit in a 24x24 box with lots of empty space).

---

## 7. Service-area section

- Heading line with the key number in a blue gradient text span. The ZIP check input sits directly under it (no extra intro sentence).
- Below it, a **row of dropdown cards, one per state/region**: `grid md:grid-cols-3 gap-3 sm:gap-4 items-start`. Each is a native `<details>` card: `rounded-2xl bg-slate-50 border border-slate-200 open:bg-white open:shadow-sm`; summary row with a map-pin icon, bold name, small muted count (`text-xs font-bold text-slate-500`) and a chevron that rotates when open (`group-open:rotate-180`). Inside: wrapped chips `text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200`. All start closed. `items-start` keeps the other cards from stretching when one opens.
- Below the cards: a `bg-blue-50 border border-blue-200 rounded-2xl p-5` callout with text on the left and TWO call buttons on the right (`flex-col sm:flex-row gap-2`): primary solid blue, secondary white with `border-blue-300 text-blue-700`, both `px-5 py-2.5 text-sm font-bold rounded-full whitespace-nowrap`.
- "Prefer to call?" under a ZIP card: label on its own centered line (`text-xs font-bold`), then a 2-column grid of equal pills `rounded-full bg-white border border-blue-200 px-2 py-2.5 text-[13px] font-bold whitespace-nowrap`.
- Compact "why choose" card: big heading (`text-2xl font-black leading-tight`), small second line, a link underneath, and a divider (`border-t border-blue-200 pt-5`) above a second row of the same shape.

---

## 8. About block

- Header stack: small badge pill (`text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200`), H2 with a gradient span, script tagline, then a small uppercase tag line pill.
- Two columns on desktop (story text left, framed photo right with a floating glass badge at the bottom: `bg-white/95 backdrop-blur rounded-xl p-3.5 shadow-lg`), one column on phones.
- Stats row: 2 columns on phone, 4 on desktop, cards `p-3 rounded-2xl bg-slate-50 border border-slate-200`, numbers all the same blue (no special green for money).
- The main CTA button goes BELOW the stats row: `mt-6 flex justify-center`, button `w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-extrabold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-md shadow-blue-500/25`. It is full width on phones and centered at its natural width on larger screens. (Without `justify-center` the content looks left-heavy.)

---

## 9. Footer

- Columns on desktop (brand, services list, contact box, QR box); stacked on phones.
- Services list column: heading with a small blue dot, items `text-sm font-semibold text-slate-700`, item padding `py-1.5` phone / `sm:py-1`, each item has a 4px dot that turns blue and scales up on hover (`group-hover:bg-blue-600 group-hover:scale-150`) and shifts 2px right. Under the list a divider (`pt-3 mt-1 border-t border-slate-200`) then ONE solid blue pill button ("All Services", `px-3.5 py-1.5 rounded-full text-xs font-bold`). Do not mix navigation links into the services list.
- Contact box: white card `p-4 rounded-2xl border shadow-sm`; Primary line larger (`text-base font-black`), Secondary smaller (`text-xs font-bold`), each with a phone icon, then hours and coverage rows.
- QR box: tab pills (Facebook / Instagram only), 128px QR in a white framed square, caption under it.

---

## 10. Mobile checklist

1. Header uses one Contact dropdown (centered, fixed), not two icons.
2. Hero: smaller type (section 2), strong top-to-bottom overlay, inline right-aligned small banner, full-width main CTA, two equal phone buttons, `py-3` tap targets.
3. Tiles: 3 columns, no notes.
4. Any inline "label + two numbers" wraps badly: put the label on its own line and the numbers in a 2-column grid of nowrap pills.
5. Call-button pairs stack with `flex-col sm:flex-row`.
6. Dropdowns/popovers: `fixed` + centered, never absolutely anchored near an edge.
7. All primary CTAs `w-full sm:w-auto` on phones.
8. Minimum tap target about 40-44px tall; add `active:scale-95`.
9. Use arbitrary sizes (`text-[13px]`, `text-[10px]`) when standard steps are one notch off.
10. Verify no horizontal scroll at 390px and that the header never overflows at 1024, 1280 and 1536.

---

## 11. Working method

- Make one small change, then screenshot at phone width and desktop width and compare against the numbers above.
- "Smaller" means about one step (2px or one Tailwind step); "bigger so it's visible" means a full step.
- If a screenshot from the owner shows an old state, ask for a hard refresh before assuming a bug.
- After any data or copy change run the type check and unit tests; label strings leak into tests and emails.
