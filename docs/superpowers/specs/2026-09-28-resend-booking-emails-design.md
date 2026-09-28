# Resend Booking Emails — Design

Date: 2026-09-28
Status: Approved by user; amended 2026-09-28 (see "Amendments")

## Goal

When a customer submits an appointment request on the site, exactly **one email goes to the customer** (confirmation) and **exactly one goes to the business** (dispatch notification), sent through Resend. The confirmation reference number shown on screen is the same one in both emails.

## Amendments after reading the live code

The first draft was written against stale assumptions. Corrections, all confirmed against the current files:

1. **Three forms, not two.** `components/BookingSection.tsx` (in-page, home), `components/BookingModal.tsx` (popup, used on `/`, `/contact`, `/services`), and the form in `app/contact/page.tsx`. All three submit through the same server action.
2. **Email is required on every form** (user decision). The popup had no email input and the contact form's was optional; both get a required email so every booking produces both emails.
3. **Brand is "Smart Appliance Services"**, references are `SMART-XXXXXX`, phones are (571) 459-8155 and (571) 899-2995, palette is blue/cyan (see `app/globals.css`). Not "Eco", `ECO-`, or (800) numbers.
4. **Service is free text** (1–100 chars) instead of a fixed list: the in-page form and the popup/contact form use different lists, and lists will keep changing.
5. The popup and contact form collect only a ZIP in their "address" field; the in-page form collects street address + ZIP. The field is treated as "service address / ZIP" (1–200 chars).

## Current state

- All three forms are client-only. On submit they show a success screen; `BookingSection` invents a random reference client-side. Nothing is sent or stored.
- Fields: service, name, phone, email, address, notes (all forms); date, time slot, brand (in-page form only).
- Sender domain `smart-applianceservices.com` is verified in Resend.
- `.env` (gitignored) holds `RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL`, `BOOKING_FROM_EMAIL`.

## Non-goals

No database, admin dashboard, calendar/availability logic, payments, SMS, or attachments. Bookings live in the emails. No visual redesign of the forms: changes are limited to a required email input (popup), required-ness (contact form), a hidden honeypot, a pending state on the submit button, an error message, and showing the server-issued reference on success screens.

## Architecture

```
BookingSection / BookingModal / ContactPage  (client)
        │  useBookingSubmit().submit(fields)      one attemptId per form session
        ▼
app/actions/booking.ts  ("use server")  submitBooking(raw)
        │  1. validate + normalise      lib/booking/validate.ts
        │  2. honeypot check
        │  3. reference from attemptId  lib/booking/reference.ts
        │  4. render both emails        lib/booking/emails.ts
        │  5. resend.batch.send([customer, business], { idempotencyKey })
        ▼
   returns { ok: true, reference } | { ok: false, error }
```

| Unit | Purpose | Depends on |
|---|---|---|
| `lib/booking/validate.ts` | Parse and validate raw input into a typed `BookingRequest`; trim, cap lengths, check email/phone/date, detect honeypot | nothing |
| `lib/booking/reference.ts` | Deterministic `SMART-XXXXXX` from `attemptId`; idempotency key builder | node `crypto` |
| `lib/booking/emails.ts` | Pure functions returning `{subject, html, text}` for the customer and business emails; HTML-escapes all user text | `BookingRequest` |
| `app/actions/booking.ts` | Orchestration, env checks, Resend call, error mapping | the three above, `resend` |
| `components/useBookingSubmit.ts` | Client hook: attempt id, pending/error/reference state, double-submit guard | the action |
| `components/HoneypotField.tsx` | Off-screen trap input shared by the three forms | nothing |

New dependencies: `resend`; dev: `vitest`.

## Exactly-once behaviour

1. **Client:** the hook ignores a second `submit` while one is in flight (ref guard) and the button is disabled while pending. One `attemptId` (UUID) is created per form session and renewed on `reset()`.
2. **Reference:** `"SMART-" + 6 chars` derived from a hash of `attemptId` (letters and digits, excluding `I`, `O`, `0`, `1`). Same attempt → same reference on screen and in both emails.
3. **Idempotency key:** `booking/<reference>-<first 16 hex of sha256(normalised fields)>`, passed as `{ idempotencyKey }` to `resend.batch.send`. Resend keeps keys for 24 h and, for an identical payload, returns the original response without sending again. Consequences:
   - Retrying an unchanged submission after a network error or timeout never duplicates emails.
   - Editing a field and resubmitting produces a different key, so no `409 invalid_idempotent_request`.
   - `409 concurrent_idempotent_requests` is shown as a retryable "still processing" error.
4. **One call:** both emails go in one `batch.send` array `[customer, business]`. Resend's docs do not say whether a batch is atomic, so correctness does not depend on it: any error, or a response without exactly two ids, means failure to the user, and retrying with the same key is safe.

## Emails

Sender: `BOOKING_FROM_EMAIL` = `Smart Appliance Services <booking@smart-applianceservices.com>`.

**Business email** — to `BOOKING_NOTIFY_EMAIL`; `reply_to` = customer email; subject `New booking SMART-XXXXXX — <service> — <name>`. Body: reference, service, name, phone (as `tel:` link), email (as `mailto:`), address/ZIP, preferred date and time slot, brand, notes. Fields not collected by a given form are omitted.

**Customer email** — to the customer; `reply_to` = business notify address; subject `Your appointment request SMART-XXXXXX`. Body in the brand blue palette (`#1053b8` primary, `#092c68` dark, `#00b4d8` accent): reference, service, requested window (if given), $89 diagnostic credited toward an approved repair, 30-day labor and parts warranty, "dispatch will call to confirm your arrival window", phones (571) 459-8155 and (571) 899-2995. HTML and plain-text parts.

All user-supplied text is HTML-escaped. Single-line fields have newlines stripped so they cannot inject into subjects.

## Validation and abuse

Server re-validates everything (Server Actions are reachable by direct POST):

- Required: service (1–100), name (1–100), phone, email (≤254, basic format), address/ZIP (1–200).
- Phone: only digits, spaces, `+ ( ) - .`; 7–15 digits.
- Optional: brand (≤100), notes (≤1000, newlines allowed), date (`YYYY-MM-DD`, real calendar date, not earlier than yesterday UTC to tolerate timezones), time slot (free text ≤60, because the option labels change with the UI).
- `attemptId`: 8–64 chars of letters, digits, hyphen.
- Hidden honeypot field `website`: if filled, return a fake success without sending.
- The API key is read only inside the server action and never reaches the client bundle.

## Failure behaviour

| Situation | Result |
|---|---|
| Validation fails | `{ ok: false }` with a message; form stays open |
| `RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL` or `BOOKING_FROM_EMAIL` missing | Logged server-side; user sees generic failure + phone number |
| Resend returns an error / throws | Logged server-side (reference + error name only); user sees "We couldn't submit your request. Please call (571) 459-8155."; form keeps its data; retry is safe |
| Success | Success screen with the server-issued reference |

The success screen is never shown unless Resend accepted both messages.

## Testing

- Vitest unit tests: validation (good/bad inputs, honeypot, dates), reference determinism/format, idempotency key changes with payload, email builders (escaping, omission of empty fields, subject sanitising).
- Action test with a mocked `resend` module: exactly one `batch.send` call carrying two messages, correct recipients/reply-to, idempotency key passed, error mapping, missing-env handling.
- Manual end-to-end once the API key is saved: submit once from each form, confirm exactly one email in each inbox; resubmit an identical form and confirm no new emails.

## Open items

- `RESEND_API_KEY` not yet saved to disk at the time of writing; needed only for the manual end-to-end test.
