import { SERVICE_AREA_ZIPS } from "./service-area-zips";

export type ZipCheck = "in" | "out" | "invalid";

/** First standalone 5-digit ZIP in free text ("12 Main St, Fairfax VA 22030" or "22030"), else null. */
export function extractZip(text: string): string | null {
  const matches = text.match(/(?<!\d)\d{5}(?!\d)/g);
  return matches ? matches[matches.length - 1] : null;
}

export function checkZip(zip: string): ZipCheck {
  const value = zip.trim();
  if (!/^\d{5}$/.test(value)) return "invalid";
  return SERVICE_AREA_ZIPS.has(value) ? "in" : "out";
}

export function haversineMiles(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 3958.8;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
