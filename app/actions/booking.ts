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
