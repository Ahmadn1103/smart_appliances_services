import { checkZip, extractZip } from "../service-area";
import { SERVICE_RADIUS_MILES } from "../site";

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

  const zip = extractZip(address);
  if (!zip) return invalid("Please include your 5-digit ZIP code so we can confirm we service your area.");
  if (checkZip(zip) !== "in") {
    return invalid(
      `Sorry, ${zip} is outside our ${SERVICE_RADIUS_MILES}-mile service area around Washington, DC. Please call us if you're near the edge.`,
    );
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
