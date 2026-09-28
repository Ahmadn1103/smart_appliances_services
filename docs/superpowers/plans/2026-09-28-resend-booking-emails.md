# Resend Booking Emails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every booking submitted from any of the three site forms sends exactly one confirmation email to the customer and exactly one notification email to the business through Resend.

**Architecture:** One Next.js Server Action (`submitBooking`) validates the submission, derives a deterministic `SMART-XXXXXX` reference and an idempotency key, renders two emails, and sends both in a single `resend.batch.send` call. A small client hook gives the three forms shared pending/error/success state and a double-submit guard. Pure logic lives in `lib/booking/*` and is unit-tested with Vitest; Resend is mocked in the action test.

**Tech Stack:** Next.js 16.3 App Router (Server Actions), React 19, TypeScript strict, Tailwind v4, `resend` (new), `vitest` (new, dev).

**Spec:** `docs/superpowers/specs/2026-09-28-resend-booking-emails-design.md` (read it first; it records why the design differs from the first draft).

## Global Constraints

- **Read the Next docs first.** `AGENTS.md`: this Next.js has breaking changes; the Server Actions guide is `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`. A `"use server"` file may only export async functions as values (type exports are fine).
- Brand is **Smart Appliance Services**; references are `SMART-XXXXXX` (6 chars from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`).
- Business phones: **(571) 459-8155** (`tel:5714598155`) and **(571) 899-2995** (`tel:5718992995`). Never use the old (800) number.
- Email palette: primary `#1053b8`, dark `#092c68`, accent `#00b4d8`.
- Sender comes from `BOOKING_FROM_EMAIL` (`Smart Appliance Services <booking@smart-applianceservices.com>`); business alerts go to `BOOKING_NOTIFY_EMAIL`; `RESEND_API_KEY` is server-only and never logged.
- Idempotency key format: `booking/<reference>-<first 16 hex of sha256(fields)>`; Resend keys last 24 h, max 256 chars.
- Service, time slot and brand are free text (1–100 / ≤60 / ≤100 chars): the UI option lists change often, so never validate them against a fixed list.
- Email is **required** on all three forms.
- Files under `lib/` that Vitest imports use **relative imports** (no `@/` alias configured for Vitest).
- **Do not run `git commit`** unless the user asks. `components/` and much of `app/` are untracked or carry unrelated in-progress work, so a blanket commit would sweep it in.
- **The UI files are edited by the user concurrently** (a rebrand is in progress). Before each UI edit, re-read the file and anchor on the strings quoted in the task; if a quoted string has changed, adapt the edit to the same intent rather than forcing it.

## Review Focus

Inputs and failure modes the spec implies that most need a pinned test (each has a test in the task named):

1. Name/notes containing `<script>` or `"`/`'` → must be HTML-escaped in both emails (Task 3).
2. Name/service containing `\r\n` (header/subject injection) → cleaned at validation and again in subject builders (Tasks 1, 3).
3. Identical retry (double click, network retry) → same reference and same idempotency key; edited retry → different key (Tasks 2, 4).
4. Resend returns an error, throws, returns fewer than two ids, or env vars are missing → `ok: false`, never a success screen (Task 4).
5. Real-world input shapes: non-ASCII names (`José Núñez`), phones like `+1 (571) 459-8155`, empty-string optional fields from untouched inputs, yesterday's date from a customer in another timezone (Task 1).

---

### Task 1: Test tooling and input validation

**Files:**
- Modify: `package.json` (deps + `test` script)
- Create: `vitest.config.ts`
- Create: `lib/booking/validate.ts`
- Test: `lib/booking/validate.test.ts`

**Interfaces:**
- Produces (used by Tasks 2–7):
  ```ts
  export type BookingFields = { service: string; name: string; phone: string; email: string; address: string; date?: string; timeSlot?: string; brand?: string; notes?: string; website?: string };
  export type BookingRequest = { service: string; name: string; phone: string; email: string; address: string; date?: string; timeSlot?: string; brand?: string; notes?: string };
  export type ValidationResult =
    | { status: "valid"; attemptId: string; value: BookingRequest }
    | { status: "invalid"; error: string }
    | { status: "spam" };
  export function validateBooking(raw: unknown, now?: Date): ValidationResult;
  ```

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install resend
npm install -D vitest
```
Expected: both added to `package.json`, no errors.

- [ ] **Step 2: Add the test script and Vitest config**

In `package.json` `scripts`, add `"test": "vitest run"` after `"lint": "eslint"` (add a comma to `lint`).

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "app/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Write the failing tests**

Create `lib/booking/validate.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { validateBooking } from "./validate";

const NOW = new Date("2026-09-28T12:00:00Z");

const base = {
  attemptId: "attempt-12345678",
  service: "Refrigerators & Freezers",
  name: "Jane Doe",
  phone: "(571) 459-8155",
  email: "jane@example.com",
  address: "123 Main St, Arlington VA 22201",
};

function valid(raw: unknown) {
  const result = validateBooking(raw, NOW);
  if (result.status !== "valid") {
    throw new Error(`expected valid, got ${JSON.stringify(result)}`);
  }
  return result;
}

function invalid(raw: unknown) {
  const result = validateBooking(raw, NOW);
  expect(result.status).toBe("invalid");
}

describe("validateBooking", () => {
  it("accepts a minimal booking and omits optional fields", () => {
    const result = valid(base);
    expect(result.attemptId).toBe("attempt-12345678");
    expect(result.value).toEqual({
      service: "Refrigerators & Freezers",
      name: "Jane Doe",
      phone: "(571) 459-8155",
      email: "jane@example.com",
      address: "123 Main St, Arlington VA 22201",
    });
  });

  it("treats empty-string optional fields as absent", () => {
    const { value } = valid({ ...base, date: "", timeSlot: "", brand: "  ", notes: "" });
    expect(value).not.toHaveProperty("date");
    expect(value).not.toHaveProperty("timeSlot");
    expect(value).not.toHaveProperty("brand");
    expect(value).not.toHaveProperty("notes");
  });

  it("keeps optional fields when provided", () => {
    const { value } = valid({
      ...base,
      date: "2026-10-02",
      timeSlot: "Morning (8:00 AM - 12:00 PM)",
      brand: "Sub-Zero",
      notes: "Clicking noise",
    });
    expect(value.date).toBe("2026-10-02");
    expect(value.timeSlot).toBe("Morning (8:00 AM - 12:00 PM)");
    expect(value.brand).toBe("Sub-Zero");
    expect(value.notes).toBe("Clicking noise");
  });

  it("accepts non-ASCII names and +1 phone formats", () => {
    const { value } = valid({ ...base, name: "José Núñez", phone: "+1 (571) 459-8155" });
    expect(value.name).toBe("José Núñez");
    expect(value.phone).toBe("+1 (571) 459-8155");
  });

  it("trims fields and strips newlines from single-line fields", () => {
    const { value } = valid({ ...base, name: "  Jane\r\nBcc: evil@x.com  ", service: "Washers\n" });
    expect(value.name).toBe("Jane Bcc: evil@x.com");
    expect(value.service).toBe("Washers");
  });

  it("keeps newlines in notes", () => {
    const { value } = valid({ ...base, notes: "line one\r\nline two" });
    expect(value.notes).toBe("line one\nline two");
  });

  it.each(["service", "name", "phone", "email", "address"])("rejects a missing %s", (field) => {
    invalid({ ...base, [field]: "   " });
    invalid({ ...base, [field]: undefined });
  });

  it.each(["jane@", "jane example@x.com", "a@b", "@x.com", "jane@@x.com"])(
    "rejects bad email %s",
    (email) => invalid({ ...base, email }),
  );

  it.each(["abc", "123", "555-CALL-NOW", "1234567890123456"])("rejects bad phone %s", (phone) =>
    invalid({ ...base, phone }),
  );

  it("rejects over-long fields", () => {
    invalid({ ...base, name: "a".repeat(101) });
    invalid({ ...base, address: "a".repeat(201) });
    invalid({ ...base, notes: "a".repeat(1001) });
    invalid({ ...base, timeSlot: "a".repeat(61) });
  });

  it.each(["", "short", "has spaces in it 123", "x".repeat(65)])("rejects bad attemptId %j", (attemptId) =>
    invalid({ ...base, attemptId }),
  );

  it("validates dates: real calendar date, not before yesterday UTC", () => {
    valid({ ...base, date: "2026-09-28" });
    valid({ ...base, date: "2026-09-27" });
    invalid({ ...base, date: "2026-09-26" });
    invalid({ ...base, date: "2026-02-30" });
    invalid({ ...base, date: "28/09/2026" });
  });

  it("flags a filled honeypot as spam, but not a blank one", () => {
    expect(validateBooking({ ...base, website: "http://spam.example" }, NOW).status).toBe("spam");
    expect(validateBooking({ ...base, website: "   " }, NOW).status).toBe("valid");
  });

  it("rejects non-object input", () => {
    invalid(null);
    invalid("hello");
    invalid(42);
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npx vitest run lib/booking/validate.test.ts`
Expected: FAIL — cannot resolve `./validate`.

- [ ] **Step 5: Write the implementation**

Create `lib/booking/validate.ts`:
```ts
export type BookingFields = {
  service: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  date?: string;
  timeSlot?: string;
  brand?: string;
  notes?: string;
  /** Honeypot: real users never fill this. */
  website?: string;
};

export type BookingRequest = {
  service: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  date?: string;
  timeSlot?: string;
  brand?: string;
  notes?: string;
};

export type ValidationResult =
  | { status: "valid"; attemptId: string; value: BookingRequest }
  | { status: "invalid"; error: string }
  | { status: "spam" };

const DAY_MS = 86_400_000;

function isControl(code: number): boolean {
  return code < 32 || code === 127;
}

/** Single-line text: control characters (incl. CR/LF/tab) become spaces. */
function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    out += isControl(ch.codePointAt(0)!) ? " " : ch;
  }
  return out.replace(/ {2,}/g, " ").trim();
}

/** Multi-line text: keeps "\n", normalises "\r\n", strips other control characters. */
function cleanMultiline(value: unknown): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value.replace(/\r\n?/g, "\n")) {
    out += ch !== "\n" && isControl(ch.codePointAt(0)!) ? " " : ch;
  }
  return out.trim();
}

const invalid = (error: string): ValidationResult => ({ status: "invalid", error });

function isRealDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export function validateBooking(raw: unknown, now: Date = new Date()): ValidationResult {
  if (typeof raw !== "object" || raw === null) return invalid("Invalid request.");
  const r = raw as Record<string, unknown>;

  if (typeof r.website === "string" && r.website.trim() !== "") return { status: "spam" };

  const attemptId = typeof r.attemptId === "string" ? r.attemptId : "";
  if (!/^[A-Za-z0-9-]{8,64}$/.test(attemptId)) {
    return invalid("Something went wrong. Please refresh the page and try again.");
  }

  const service = clean(r.service);
  const name = clean(r.name);
  const phone = clean(r.phone);
  const email = clean(r.email);
  const address = clean(r.address);
  const date = clean(r.date);
  const timeSlot = clean(r.timeSlot);
  const brand = clean(r.brand);
  const notes = cleanMultiline(r.notes);

  if (!service) return invalid("Please choose the appliance that needs service.");
  if (!name) return invalid("Please enter your name.");
  if (!address) return invalid("Please enter your service address or ZIP code.");

  const digits = phone.replace(/\D/g, "");
  if (!/^[0-9+()\-.\s]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    return invalid("Please enter a valid phone number.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return invalid("Please enter a valid email address.");
  }

  if (
    service.length > 100 ||
    name.length > 100 ||
    address.length > 200 ||
    brand.length > 100 ||
    timeSlot.length > 60 ||
    notes.length > 1000
  ) {
    return invalid("One of the fields is too long. Please shorten it and try again.");
  }

  if (date) {
    const earliest = new Date(now.getTime() - DAY_MS).toISOString().slice(0, 10);
    if (!isRealDate(date) || date < earliest) {
      return invalid("Please choose today or a future date.");
    }
  }

  const value: BookingRequest = { service, name, phone, email, address };
  if (date) value.date = date;
  if (timeSlot) value.timeSlot = timeSlot;
  if (brand) value.brand = brand;
  if (notes) value.notes = notes;

  return { status: "valid", attemptId, value };
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run lib/booking/validate.test.ts`
Expected: all tests PASS.

---

### Task 2: Reference number and idempotency key

**Files:**
- Create: `lib/booking/reference.ts`
- Test: `lib/booking/reference.test.ts`

**Interfaces:**
- Consumes: `BookingRequest` from `./validate`.
- Produces:
  ```ts
  export function referenceFromAttempt(attemptId: string): string; // "SMART-XXXXXX"
  export function idempotencyKey(reference: string, request: BookingRequest): string;
  ```

- [ ] **Step 1: Write the failing tests**

Create `lib/booking/reference.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { idempotencyKey, referenceFromAttempt } from "./reference";
import type { BookingRequest } from "./validate";

const request: BookingRequest = {
  service: "Washers",
  name: "Jane Doe",
  phone: "(571) 459-8155",
  email: "jane@example.com",
  address: "22201",
};

describe("referenceFromAttempt", () => {
  it("has the SMART-XXXXXX format without ambiguous characters", () => {
    for (const id of ["attempt-00000001", "attempt-00000002", "3f1b8c1e-aaaa-bbbb-cccc-123456789abc"]) {
      expect(referenceFromAttempt(id)).toMatch(/^SMART-[A-HJ-NP-Z2-9]{6}$/);
    }
  });

  it("is deterministic per attempt and differs between attempts", () => {
    expect(referenceFromAttempt("attempt-00000001")).toBe(referenceFromAttempt("attempt-00000001"));
    expect(referenceFromAttempt("attempt-00000001")).not.toBe(referenceFromAttempt("attempt-00000002"));
  });
});

describe("idempotencyKey", () => {
  const ref = "SMART-ABC234";

  it("is stable for an identical request", () => {
    expect(idempotencyKey(ref, request)).toBe(idempotencyKey(ref, { ...request }));
  });

  it("changes when any field changes", () => {
    const original = idempotencyKey(ref, request);
    expect(idempotencyKey(ref, { ...request, phone: "(571) 899-2995" })).not.toBe(original);
    expect(idempotencyKey(ref, { ...request, notes: "now with notes" })).not.toBe(original);
    expect(idempotencyKey(ref, { ...request, date: "2026-10-02" })).not.toBe(original);
  });

  it("has the booking/<reference>-<16 hex> shape and fits Resend's 256-char limit", () => {
    const key = idempotencyKey(ref, request);
    expect(key).toMatch(/^booking\/SMART-ABC234-[0-9a-f]{16}$/);
    expect(key.length).toBeLessThanOrEqual(256);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/booking/reference.test.ts`
Expected: FAIL — cannot resolve `./reference`.

- [ ] **Step 3: Write the implementation**

Create `lib/booking/reference.ts`:
```ts
import { createHash } from "node:crypto";
import type { BookingRequest } from "./validate";

// 32 symbols (no I, O, 0, 1). 256 % 32 === 0, so each byte maps uniformly.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function referenceFromAttempt(attemptId: string): string {
  const digest = createHash("sha256").update(attemptId).digest();
  let code = "";
  for (let i = 0; i < 6; i++) code += ALPHABET[digest[i] % ALPHABET.length];
  return `SMART-${code}`;
}

export function idempotencyKey(reference: string, request: BookingRequest): string {
  const fields = JSON.stringify([
    request.service,
    request.name,
    request.phone,
    request.email,
    request.address,
    request.date ?? "",
    request.timeSlot ?? "",
    request.brand ?? "",
    request.notes ?? "",
  ]);
  const hash = createHash("sha256").update(fields).digest("hex").slice(0, 16);
  return `booking/${reference}-${hash}`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/booking/reference.test.ts`
Expected: all PASS.

---

### Task 3: Email builders

**Files:**
- Create: `lib/booking/emails.ts`
- Test: `lib/booking/emails.test.ts`

**Interfaces:**
- Consumes: `BookingRequest` from `./validate`.
- Produces:
  ```ts
  export type EmailContent = { subject: string; html: string; text: string };
  export function escapeHtml(value: string): string;
  export function buildCustomerEmail(request: BookingRequest, reference: string): EmailContent;
  export function buildBusinessEmail(request: BookingRequest, reference: string): EmailContent;
  ```

- [ ] **Step 1: Write the failing tests**

Create `lib/booking/emails.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { buildBusinessEmail, buildCustomerEmail, escapeHtml } from "./emails";
import type { BookingRequest } from "./validate";

const ref = "SMART-ABC234";

const minimal: BookingRequest = {
  service: "Refrigerators & Freezers",
  name: "Jane Doe",
  phone: "(571) 459-8155",
  email: "jane@example.com",
  address: "22201",
};

const full: BookingRequest = {
  ...minimal,
  date: "2026-10-02",
  timeSlot: "Morning (8:00 AM - 12:00 PM)",
  brand: "Sub-Zero",
  notes: "Clicking noise\nFreezer is warm",
};

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});

describe("buildBusinessEmail", () => {
  it("puts reference, service and name in the subject", () => {
    expect(buildBusinessEmail(full, ref).subject).toBe(
      "New booking SMART-ABC234 — Refrigerators & Freezers — Jane Doe",
    );
  });

  it("includes every provided field, with tel and mailto links", () => {
    const { html, text } = buildBusinessEmail(full, ref);
    for (const part of ["SMART-ABC234", "Refrigerators &amp; Freezers", "Jane Doe", "22201", "2026-10-02", "Morning (8:00 AM - 12:00 PM)", "Sub-Zero"]) {
      expect(html).toContain(part);
    }
    expect(html).toContain('href="tel:5714598155"');
    expect(html).toContain('href="mailto:jane@example.com"');
    expect(html).toContain("Clicking noise<br>Freezer is warm");
    expect(text).toContain("Phone: (571) 459-8155");
    expect(text).toContain("Notes: Clicking noise\nFreezer is warm");
  });

  it("omits rows for fields that were not collected", () => {
    const { html, text } = buildBusinessEmail(minimal, ref);
    for (const label of ["Brand", "Preferred date", "Time window", "Notes"]) {
      expect(html).not.toContain(label);
      expect(text).not.toContain(label);
    }
  });

  it("escapes markup in user text", () => {
    const { html } = buildBusinessEmail(
      { ...minimal, name: `<script>alert("x")</script>`, notes: `<img src=x onerror=alert(1)>` },
      ref,
    );
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
  });

  it("keeps the subject on one line even if given raw newlines", () => {
    const { subject } = buildBusinessEmail({ ...minimal, name: "Jane\r\nBcc: evil@x.com", service: "Washers\n" }, ref);
    expect(subject).not.toMatch(/[\r\n]/);
  });
});

describe("buildCustomerEmail", () => {
  it("has the reference in the subject", () => {
    expect(buildCustomerEmail(full, ref).subject).toBe("Your appointment request SMART-ABC234");
  });

  it("confirms the details, fee credit, warranty and both phone numbers", () => {
    const { html, text } = buildCustomerEmail(full, ref);
    for (const part of ["SMART-ABC234", "Refrigerators &amp; Freezers", "2026-10-02", "$89", "30-day", "(571) 459-8155", "(571) 899-2995"]) {
      expect(html).toContain(part);
    }
    for (const part of ["SMART-ABC234", "$89", "30-day", "(571) 459-8155", "(571) 899-2995"]) {
      expect(text).toContain(part);
    }
  });

  it("omits date and window when not provided and never mentions the old brand", () => {
    const { html, text } = buildCustomerEmail(minimal, ref);
    expect(html).not.toContain("Preferred date");
    expect(text).not.toContain("Preferred date");
    expect(html + text).not.toMatch(/Eco Appliance|ECO-|\(800\)/);
  });

  it("escapes the customer's name", () => {
    const { html } = buildCustomerEmail({ ...minimal, name: `<b>Jane</b>` }, ref);
    expect(html).not.toContain("<b>Jane</b>");
    expect(html).toContain("&lt;b&gt;Jane&lt;/b&gt;");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/booking/emails.test.ts`
Expected: FAIL — cannot resolve `./emails`.

- [ ] **Step 3: Write the implementation**

Create `lib/booking/emails.ts`:
```ts
import type { BookingRequest } from "./validate";

export type EmailContent = { subject: string; html: string; text: string };

const BUSINESS_NAME = "Smart Appliance Services";
const PRIMARY_PHONE = "(571) 459-8155";
const SECONDARY_PHONE = "(571) 899-2995";

const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Row = { label: string; value?: string; href?: string };

function renderRows(rows: Row[]): string {
  return rows
    .filter((row) => row.value)
    .map(({ label, value, href }) => {
      const safe = escapeHtml(value!);
      const cell = href
        ? `<a href="${escapeHtml(href)}" style="color:#1053b8;">${safe}</a>`
        : safe.replace(/\n/g, "<br>");
      return `<tr><td style="padding:8px 16px 8px 0;color:#64748b;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0f172a;font-weight:600;">${cell}</td></tr>`;
    })
    .join("");
}

function renderText(rows: Row[]): string {
  return rows
    .filter((row) => row.value)
    .map(({ label, value }) => `${label}: ${value}`)
    .join("\n");
}

function layout(bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px;"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;"><tr><td style="background:#092c68;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:700;">${escapeHtml(BUSINESS_NAME)}</td></tr><tr><td style="padding:28px;color:#0f172a;font-size:15px;line-height:1.55;">${bodyHtml}</td></tr></table></td></tr></table></body></html>`;
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function buildBusinessEmail(request: BookingRequest, reference: string): EmailContent {
  const rows: Row[] = [
    { label: "Reference", value: reference },
    { label: "Service", value: request.service },
    { label: "Name", value: request.name },
    { label: "Phone", value: request.phone, href: telHref(request.phone) },
    { label: "Email", value: request.email, href: `mailto:${request.email}` },
    { label: "Address / ZIP", value: request.address },
    { label: "Preferred date", value: request.date },
    { label: "Time window", value: request.timeSlot },
    { label: "Brand", value: request.brand },
    { label: "Notes", value: request.notes },
  ];

  const html = layout(
    `<h1 style="margin:0 0 4px;font-size:22px;color:#092c68;">New booking request</h1>` +
      `<p style="margin:0 0 16px;color:#475569;">Call the customer to confirm the arrival window.</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0">${renderRows(rows)}</table>`,
  );

  const text = `New booking request\nCall the customer to confirm the arrival window.\n\n${renderText(rows)}`;

  return {
    subject: oneLine(`New booking ${reference} — ${request.service} — ${request.name}`),
    html,
    text,
  };
}

export function buildCustomerEmail(request: BookingRequest, reference: string): EmailContent {
  const rows: Row[] = [
    { label: "Service", value: request.service },
    { label: "Address / ZIP", value: request.address },
    { label: "Preferred date", value: request.date },
    { label: "Time window", value: request.timeSlot },
    { label: "Appliance brand", value: request.brand },
  ];

  const html = layout(
    `<h1 style="margin:0 0 8px;font-size:22px;color:#092c68;">Thanks, ${escapeHtml(request.name)}. We got your request.</h1>` +
      `<p style="margin:0 0 16px;">Our dispatch team will call you shortly to confirm your arrival window.</p>` +
      `<p style="margin:0 0 16px;padding:12px 16px;background:#eff6ff;border-left:4px solid #00b4d8;border-radius:6px;">Your reference: <strong style="color:#1053b8;">${escapeHtml(reference)}</strong></p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0">${renderRows(rows)}</table>` +
      `<p style="margin:16px 0 0;">The $89 diagnostic fee is credited 100% toward your approved repair, and our repairs are backed by a 30-day labor &amp; parts warranty.</p>` +
      `<p style="margin:16px 0 0;">Questions? Call <a href="${telHref(PRIMARY_PHONE)}" style="color:#1053b8;">${PRIMARY_PHONE}</a> or <a href="${telHref(SECONDARY_PHONE)}" style="color:#1053b8;">${SECONDARY_PHONE}</a>, or just reply to this email.</p>`,
  );

  const text = [
    `Thanks, ${request.name}. We got your request.`,
    "Our dispatch team will call you shortly to confirm your arrival window.",
    "",
    `Your reference: ${reference}`,
    renderText(rows),
    "",
    "The $89 diagnostic fee is credited 100% toward your approved repair, and our repairs are backed by a 30-day labor & parts warranty.",
    "",
    `Questions? Call ${PRIMARY_PHONE} or ${SECONDARY_PHONE}, or just reply to this email.`,
    `— ${BUSINESS_NAME}`,
  ].join("\n");

  return { subject: `Your appointment request ${reference}`, html, text };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/booking/emails.test.ts`
Expected: all PASS.

---

### Task 4: The `submitBooking` Server Action

**Files:**
- Create: `app/actions/booking.ts`
- Test: `app/actions/booking.test.ts`

**Interfaces:**
- Consumes: `validateBooking` (Task 1), `referenceFromAttempt` / `idempotencyKey` (Task 2), `buildCustomerEmail` / `buildBusinessEmail` (Task 3).
- Produces (used by Task 5 hook):
  ```ts
  export type BookingResult = { ok: true; reference: string } | { ok: false; error: string };
  export async function submitBooking(raw: unknown): Promise<BookingResult>;
  ```

- [ ] **Step 1: Write the failing tests**

Create `app/actions/booking.test.ts`:
```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { batchSend } = vi.hoisted(() => ({ batchSend: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    batch = { send: batchSend };
  },
}));

import { submitBooking } from "./booking";

const input = {
  attemptId: "attempt-12345678",
  service: "Refrigerators & Freezers",
  name: "Jane Doe",
  phone: "(571) 459-8155",
  email: "jane@example.com",
  address: "22201",
};

const twoIds = { data: { data: [{ id: "a" }, { id: "b" }] }, error: null };

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("BOOKING_NOTIFY_EMAIL", "desk@example.com");
  vi.stubEnv("BOOKING_FROM_EMAIL", "Smart Appliance Services <booking@example.com>");
  batchSend.mockReset();
  batchSend.mockResolvedValue(twoIds);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("submitBooking", () => {
  it("sends exactly one batch with a customer email and a business email", async () => {
    const result = await submitBooking(input);

    expect(result).toEqual({ ok: true, reference: expect.stringMatching(/^SMART-[A-Z2-9]{6}$/) });
    expect(batchSend).toHaveBeenCalledTimes(1);

    const [messages, options] = batchSend.mock.calls[0];
    expect(messages).toHaveLength(2);
    expect(messages[0]).toMatchObject({
      from: "Smart Appliance Services <booking@example.com>",
      to: ["jane@example.com"],
      replyTo: "desk@example.com",
    });
    expect(messages[1]).toMatchObject({
      from: "Smart Appliance Services <booking@example.com>",
      to: ["desk@example.com"],
      replyTo: "jane@example.com",
    });
    for (const message of messages) {
      expect(message.subject).toContain((result as { reference: string }).reference);
      expect(message.html).toBeTruthy();
      expect(message.text).toBeTruthy();
    }
    expect(options.idempotencyKey).toContain(`booking/${(result as { reference: string }).reference}-`);
  });

  it("uses the same reference and idempotency key for an identical retry", async () => {
    const first = await submitBooking(input);
    const second = await submitBooking({ ...input });
    expect(second).toEqual(first);
    expect(batchSend.mock.calls[1][1].idempotencyKey).toBe(batchSend.mock.calls[0][1].idempotencyKey);
  });

  it("uses a different idempotency key when the customer edits a field", async () => {
    await submitBooking(input);
    await submitBooking({ ...input, phone: "(571) 899-2995" });
    expect(batchSend.mock.calls[1][1].idempotencyKey).not.toBe(batchSend.mock.calls[0][1].idempotencyKey);
  });

  it("returns a failure with the phone number when Resend returns an error", async () => {
    batchSend.mockResolvedValue({ data: null, error: { name: "validation_error", message: "bad" } });
    const result = await submitBooking(input);
    expect(result).toEqual({ ok: false, error: expect.stringContaining("(571) 459-8155") });
  });

  it("returns a failure when the Resend call throws", async () => {
    batchSend.mockRejectedValue(new Error("network down"));
    const result = await submitBooking(input);
    expect(result).toEqual({ ok: false, error: expect.stringContaining("(571) 459-8155") });
  });

  it("treats a response without exactly two ids as a failure", async () => {
    batchSend.mockResolvedValue({ data: { data: [{ id: "only-one" }] }, error: null });
    const result = await submitBooking(input);
    expect(result.ok).toBe(false);
  });

  it("asks the customer to wait when Resend reports a concurrent request", async () => {
    batchSend.mockResolvedValue({ data: null, error: { name: "concurrent_idempotent_requests", message: "busy" } });
    const result = await submitBooking(input);
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/still being processed/i) });
  });

  it.each(["RESEND_API_KEY", "BOOKING_NOTIFY_EMAIL", "BOOKING_FROM_EMAIL"])(
    "fails without calling Resend when %s is missing",
    async (name) => {
      vi.stubEnv(name, "");
      const result = await submitBooking(input);
      expect(result).toEqual({ ok: false, error: expect.stringContaining("(571) 459-8155") });
      expect(batchSend).not.toHaveBeenCalled();
    },
  );

  it("pretends to succeed for honeypot spam without sending", async () => {
    const result = await submitBooking({ ...input, website: "http://spam.example" });
    expect(result.ok).toBe(true);
    expect(batchSend).not.toHaveBeenCalled();
  });

  it("rejects invalid input with a message and without sending", async () => {
    const result = await submitBooking({ ...input, email: "not-an-email" });
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/email/i) });
    expect(batchSend).not.toHaveBeenCalled();
  });

  it("never logs the API key", async () => {
    batchSend.mockRejectedValue(new Error("boom"));
    await submitBooking(input);
    const logged = JSON.stringify((console.error as ReturnType<typeof vi.fn>).mock.calls);
    expect(logged).not.toContain("re_test_key");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run app/actions/booking.test.ts`
Expected: FAIL — cannot resolve `./booking`.

- [ ] **Step 3: Write the implementation**

Create `app/actions/booking.ts`:
```ts
"use server";

import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { buildBusinessEmail, buildCustomerEmail } from "../../lib/booking/emails";
import { idempotencyKey, referenceFromAttempt } from "../../lib/booking/reference";
import { validateBooking } from "../../lib/booking/validate";

export type BookingResult = { ok: true; reference: string } | { ok: false; error: string };

const GENERIC_ERROR = "We couldn't submit your request. Please call (571) 459-8155.";
const BUSY_ERROR = "Your request is still being processed. Please wait a moment and try again.";

function sentCount(data: unknown): number {
  const list = Array.isArray(data) ? data : (data as { data?: unknown } | null)?.data;
  return Array.isArray(list) ? list.length : 0;
}

export async function submitBooking(raw: unknown): Promise<BookingResult> {
  const parsed = validateBooking(raw);
  if (parsed.status === "invalid") return { ok: false, error: parsed.error };
  if (parsed.status === "spam") {
    // Look successful to bots; send nothing.
    return { ok: true, reference: referenceFromAttempt(randomUUID()) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.BOOKING_NOTIFY_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;
  if (!apiKey || !notifyTo || !from) {
    console.error("[booking] missing RESEND_API_KEY, BOOKING_NOTIFY_EMAIL or BOOKING_FROM_EMAIL");
    return { ok: false, error: GENERIC_ERROR };
  }

  const request = parsed.value;
  const reference = referenceFromAttempt(parsed.attemptId);
  const customer = buildCustomerEmail(request, reference);
  const business = buildBusinessEmail(request, reference);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.batch.send(
      [
        { from, to: [request.email], replyTo: notifyTo, ...customer },
        { from, to: [notifyTo], replyTo: request.email, ...business },
      ],
      { idempotencyKey: idempotencyKey(reference, request) },
    );

    if (error) {
      console.error("[booking] resend error", reference, error.name);
      return { ok: false, error: error.name === "concurrent_idempotent_requests" ? BUSY_ERROR : GENERIC_ERROR };
    }
    if (sentCount(data) !== 2) {
      console.error("[booking] unexpected resend response", reference);
      return { ok: false, error: GENERIC_ERROR };
    }
  } catch (err) {
    console.error("[booking] resend call failed", reference, err instanceof Error ? err.name : "unknown");
    return { ok: false, error: GENERIC_ERROR };
  }

  return { ok: true, reference };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run app/actions/booking.test.ts`
Expected: all PASS.

- [ ] **Step 5: Typecheck against the real Resend types**

Run: `npx tsc --noEmit`
Expected: no errors. If TypeScript rejects `replyTo`, `idempotencyKey`, or the shape of `batch.send`'s arguments, open `node_modules/resend/dist/index.d.ts`, find the `CreateEmailOptions` / `CreateBatchOptions` types, and change only the property names to match (the design does not change). Re-run Step 4 and this step.

- [ ] **Step 6: Run the whole suite**

Run: `npm test`
Expected: all test files PASS.

---

### Task 5: Client hook, honeypot, and the in-page booking form

**Files:**
- Create: `components/useBookingSubmit.ts`
- Create: `components/HoneypotField.tsx`
- Modify: `components/BookingSection.tsx`

**Interfaces:**
- Consumes: `submitBooking`, `BookingResult` (Task 4); `BookingFields` (Task 1).
- Produces (used by Tasks 6–7):
  ```ts
  export function useBookingSubmit(): {
    submit: (fields: BookingFields) => Promise<boolean>;
    pending: boolean;
    error: string | null;
    reference: string | null;   // non-null once the booking succeeded
    reset: () => void;          // new attempt id, clears reference/error
  };
  export default function HoneypotField(props: { value: string; onChange: (value: string) => void }): JSX.Element;
  ```

- [ ] **Step 1: Create the hook**

Create `components/useBookingSubmit.ts`:
```ts
"use client";

import { useCallback, useRef, useState } from "react";
import { submitBooking } from "@/app/actions/booking";
import type { BookingFields } from "@/lib/booking/validate";

const NETWORK_ERROR = "We couldn't submit your request. Please call (571) 459-8155.";

const newAttemptId = () => crypto.randomUUID();

export function useBookingSubmit() {
  const [attemptId, setAttemptId] = useState(newAttemptId);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const inFlight = useRef(false);

  const submit = useCallback(
    async (fields: BookingFields): Promise<boolean> => {
      if (inFlight.current) return false;
      inFlight.current = true;
      setPending(true);
      setError(null);
      try {
        const result = await submitBooking({ ...fields, attemptId });
        if (result.ok) {
          setReference(result.reference);
          return true;
        }
        setError(result.error);
        return false;
      } catch {
        setError(NETWORK_ERROR);
        return false;
      } finally {
        inFlight.current = false;
        setPending(false);
      }
    },
    [attemptId],
  );

  const reset = useCallback(() => {
    setAttemptId(newAttemptId());
    setReference(null);
    setError(null);
  }, []);

  return { submit, pending, error, reference, reset } as const;
}
```

- [ ] **Step 2: Create the honeypot component**

Create `components/HoneypotField.tsx`:
```tsx
interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/** Off-screen trap for bots. Real users never see or fill it. */
export default function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
```

- [ ] **Step 3: Wire `components/BookingSection.tsx`**

Re-read the file, then make these edits (anchors are the current strings):

1. Replace `import { useState } from "react";` with:
```tsx
import { useState } from "react";
import { useBookingSubmit } from "@/components/useBookingSubmit";
import HoneypotField from "@/components/HoneypotField";
```
2. Replace
```tsx
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
```
with
```tsx
  const [website, setWebsite] = useState("");
  const { submit, pending, error, reference, reset } = useBookingSubmit();
```
3. Replace the whole `handleSubmit` (the `const handleSubmit = (e: React.FormEvent) => { ... };` block that builds `randomRef`) with:
```tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      service,
      name,
      phone,
      email,
      address,
      date: preferredDate,
      timeSlot,
      brand,
      notes,
      website,
    });
  };
```
4. Replace `{isSubmitted ? (` with `{reference ? (`.
5. Replace `{referenceNumber}` with `{reference}`.
6. Replace `onClick={() => setIsSubmitted(false)}` with `onClick={reset}`.
7. In the email input, replace `type="email"` + `placeholder="Email Address (for confirmation)"` with:
```tsx
                      type="email"
                      required
                      placeholder="Email Address (for confirmation) *"
```
8. Immediately after the opening `<form onSubmit={handleSubmit} className="...">` tag, insert `<HoneypotField value={website} onChange={setWebsite} />` as its first child.
9. Replace the submit CTA button with a pending-aware one and add the error message above it:
```tsx
                {error && (
                  <p role="alert" className="mb-3 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-medium text-rose-700">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-base shadow-[0_4px_25px_rgba(37,99,235,0.45)] border border-white/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {pending ? "Sending your request…" : "Confirm & Dispatch Technician ($89 Diagnostic)"}
                </button>
```
(Keep the `<p>` "No advance payment required online…" that follows the button.)

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: no errors from the files touched in this task. (Report, don't fix, any pre-existing errors in files you did not touch.)

- [ ] **Step 5: Verify the form in the browser without an API key (failure path)**

Run `npm run dev`, open http://localhost:3000/#booking, fill the form, submit. With `RESEND_API_KEY` empty or unsaved in `.env`, expected: the button shows "Sending your request…", then the rose error box shows "We couldn't submit your request. Please call (571) 459-8155." and the form keeps all typed values; **no** success screen. Server terminal logs `[booking] missing RESEND_API_KEY…`.

---

### Task 6: Popup booking modal

**Files:**
- Modify: `components/BookingModal.tsx`

**Interfaces:**
- Consumes: `useBookingSubmit`, `HoneypotField` (Task 5).

- [ ] **Step 1: Wire the hook and state**

Re-read the file, then:

1. Replace `import { useState, useEffect } from "react";` with:
```tsx
import { useState, useEffect } from "react";
import { useBookingSubmit } from "@/components/useBookingSubmit";
import HoneypotField from "@/components/HoneypotField";
```
2. Replace `const [isDone, setIsDone] = useState(false);` with:
```tsx
  const [website, setWebsite] = useState("");
  const { submit, pending, error, reference, reset } = useBookingSubmit();
```
(This stays above the `if (!isOpen) return null;` line, as hooks must.)
3. Replace the `handleSubmit` block (`e.preventDefault(); setIsDone(true);`) with:
```tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ service, name, phone, email, address, notes, website });
  };
```

- [ ] **Step 2: Success screen shows the real reference**

1. Replace `{isDone ? (` with `{reference ? (`.
2. In the "Close Window" button's `onClick`, replace `setIsDone(false);` with `reset();` (keep `onClose();`).
3. After the closing `</h4>` of "Dispatch Request Confirmed!", insert:
```tsx
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Reference <strong className="font-mono text-cyan-300">{reference}</strong>. A confirmation email is on its way to <strong className="text-white">{email}</strong>.
              </p>
```

- [ ] **Step 3: Add the required email field, honeypot, error and pending button**

1. Insert `<HoneypotField value={website} onChange={setWebsite} />` as the first child of `<form onSubmit={handleSubmit} className="space-y-4">`.
2. After the "Your Name" block (the `<div>` containing the input with `placeholder="Full Name"`), insert:
```tsx
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#050b16] border border-blue-500/30 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
```
3. Replace the submit button (the one reading "Confirm Dispatch ($89 Diagnostic)") with, and place the error above it inside the same `<div className="pt-2">`:
```tsx
                {error && (
                  <p role="alert" className="mb-3 rounded-xl border border-rose-400/40 bg-rose-950/50 px-3.5 py-2.5 text-xs font-medium text-rose-200">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {pending ? "Sending your request…" : "Confirm Dispatch ($89 Diagnostic)"}
                </button>
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: no new errors from `BookingModal.tsx`; unused imports (e.g. an icon) are not introduced by this task.

- [ ] **Step 5: Verify in the browser (failure path)**

With the dev server running, click any "Book" button to open the popup, confirm the new required Email field is visible and styled like its neighbours, submit with a valid form. Expected (no API key yet): the button says "Sending your request…" then the rose error appears in the popup; no success screen.

---

### Task 7: Contact page form

**Files:**
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `useBookingSubmit`, `HoneypotField` (Task 5).

- [ ] **Step 1: Wire the hook and state**

Re-read the file, then:

1. After the existing imports, add:
```tsx
import { useBookingSubmit } from "@/components/useBookingSubmit";
import HoneypotField from "@/components/HoneypotField";
```
2. Replace `const [formSubmitted, setFormSubmitted] = useState(false);` with:
```tsx
  const [website, setWebsite] = useState("");
  const { submit, pending, error, reference, reset: resetBooking } = useBookingSubmit();
```
3. Replace the `handleSubmit` block (`e.preventDefault(); setFormSubmitted(true);`) with:
```tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      service: formData.service,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.zip,
      notes: formData.notes,
      website,
    });
  };
```

- [ ] **Step 2: Success screen and reset**

1. Replace `{formSubmitted ? (` with `{reference ? (`.
2. In the "Submit Another Request" button's `onClick`, replace `setFormSubmitted(false);` with `resetBooking();` (keep the `setFormData({...})` reset that follows).
3. After the `</p>` that ends the "Thank you, … will call … shortly." paragraph in the success block, insert:
```tsx
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Reference <strong className="font-mono text-cyan-300">{reference}</strong>. A confirmation email is on its way to <strong className="text-white">{formData.email}</strong>.
                      </p>
```

- [ ] **Step 3: Required email, honeypot, error, pending button**

1. In the form, change the Email label from `Email Address` to `Email Address <span className="text-red-400">*</span>` and add `required` to the `type="email"` input.
2. Insert `<HoneypotField value={website} onChange={setWebsite} />` as the first child of `<form onSubmit={handleSubmit} className="space-y-4">`.
3. Replace the submit button ("Confirm Dispatch Request ($89 Diagnostic)") and place the error above it inside the same `<div className="pt-2">`:
```tsx
                      {error && (
                        <p role="alert" className="mb-3 rounded-2xl border border-rose-400/40 bg-rose-950/50 px-4 py-3 text-xs sm:text-sm font-medium text-rose-200">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={pending}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {pending ? "Sending your request…" : "Confirm Dispatch Request ($89 Diagnostic)"}
                      </button>
```

- [ ] **Step 4: Typecheck, lint, build**

Run: `npx tsc --noEmit`, `npm run lint`, then `npm run build`
Expected: no new errors; the production build succeeds (this also proves the Server Action bundles and that `RESEND_API_KEY` is not referenced from client code).

- [ ] **Step 5: Verify in the browser (failure path)**

Open http://localhost:3000/contact, submit a valid form. Expected: pending text, then the rose error; no success screen. Try submitting with the email blank: the browser blocks it (required).

---

### Task 8: Live end-to-end check and docs

**Files:**
- Modify: `project.md`

**Precondition:** `.env` has a non-empty `RESEND_API_KEY` (check with `grep -c '^RESEND_API_KEY=.' .env`, which should print `1`; never print the key). Restart `npm run dev` so Next reloads `.env`.

- [ ] **Step 1: Send one booking from each form to a real inbox you control**

Use your own email as the customer email. Submit once from (a) `/#booking`, (b) the popup, (c) `/contact`.
Expected for each: success screen showing a `SMART-XXXXXX` reference; **exactly one** email in the customer inbox ("Your appointment request SMART-XXXXXX") and **exactly one** in `smart.applianceservices.va@gmail.com` ("New booking SMART-XXXXXX — …"); the reference in the emails equals the one on screen; replying to the customer email addresses `smart.applianceservices.va@gmail.com`; the sender shows `Smart Appliance Services <booking@smart-applianceservices.com>`.

- [ ] **Step 2: Verify a double click does not duplicate**

On `/contact`, fill the form and double-click (or press Enter twice quickly on) the submit button. Expected: still exactly one email in each inbox. (Same-payload retries reusing one idempotency key are covered by the unit tests in Tasks 2 and 4; say so in the final report rather than claiming a live retry test.)

- [ ] **Step 3: Verify server-side validation live**

In the popup, enter phone `abc` (the browser allows it because it is `type="tel"`) with everything else valid and submit. Expected: the rose error "Please enter a valid phone number." and no emails. The honeypot path is covered by the unit tests in Tasks 1 and 4.

- [ ] **Step 4: Update `project.md`**

In section "5. Key Interactive Features", replace the "Fast Dispatch Booking Engine" bullet's description with: bookings from the in-page form, popup, and `/contact` form submit through the `submitBooking` Server Action (`app/actions/booking.ts`), which sends one confirmation email to the customer and one notification email to the business via Resend and returns a `SMART-XXXXXX` reference. Add a new section "8. Environment Variables" listing `RESEND_API_KEY` (server-only), `BOOKING_NOTIFY_EMAIL`, `BOOKING_FROM_EMAIL` (must be on a Resend-verified domain), noting `.env` is gitignored; and add `npm test` (Vitest) to the run commands.

- [ ] **Step 5: Final full verification**

Run: `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`
Expected: all pass (report any pre-existing failures in files this plan did not touch).

---

## Self-Review (done)

- **Spec coverage:** three forms wired (Tasks 5–7); required email everywhere (Tasks 5–7); reference from attempt + idempotency key (Task 2, used in Task 4); one batched call, error/short-response handling (Task 4); validation rules incl. free-text service/time slot, phone, date tolerance, honeypot (Task 1); escaped HTML, subject sanitising, brand/phones/palette (Task 3); failure table incl. missing env (Task 4); success only after Resend accepts (Tasks 4–7); live E2E and docs (Task 8). Spec "Open items" (API key) is Task 8's precondition.
- **Placeholders:** none; every code step has full code, every UI edit names exact anchors.
- **Type consistency:** `BookingFields`/`BookingRequest`/`ValidationResult` (Task 1) are the same names used in Tasks 2–5; `referenceFromAttempt`, `idempotencyKey`, `buildCustomerEmail`, `buildBusinessEmail`, `submitBooking`, `BookingResult`, `useBookingSubmit` (`submit/pending/error/reference/reset`) match across tasks; `HoneypotField` props match its three uses.
