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
