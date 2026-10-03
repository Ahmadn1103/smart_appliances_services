import { describe, expect, it } from "vitest";
import { validateBooking } from "./validate";

const NOW = new Date("2026-09-28T12:00:00Z");

const base = {
  attemptId: "attempt-12345678",
  service: "Refrigerators",
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
      service: "Refrigerators",
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

  it("rejects an address with no ZIP code", () => {
    const result = validateBooking({ ...base, address: "123 Main St, Arlington VA" });
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") expect(result.error).toMatch(/ZIP/);
  });

  it("rejects a ZIP outside the 40-mile service area", () => {
    const result = validateBooking({ ...base, address: "1 Market St, Frederick MD 21701" });
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") expect(result.error).toMatch(/21701.*40-mile/);
  });

  it("accepts a bare in-area ZIP", () => {
    valid({ ...base, address: "22030" });
  });

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
