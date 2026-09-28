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
