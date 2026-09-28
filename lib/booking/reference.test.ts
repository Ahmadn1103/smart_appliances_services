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
