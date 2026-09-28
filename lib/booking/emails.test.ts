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
