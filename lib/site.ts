// Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. https://www.example.com).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Smart Appliance Services";
export const PRIMARY_PHONE = "+1-571-459-8155";
export const EMAIL = "Smart.applianceservices.va@gmail.com";

export const SOCIAL_LINKS = [
  "https://www.facebook.com/smartapplianceservicess/",
  "https://instagram.com/ssmartappliance",
];

// Service area: ZIPs whose center is within this many miles of Washington, DC.
// If you change either value, re-run scripts/generate-service-area.mjs.
export const SERVICE_RADIUS_MILES = 40;
export const SERVICE_CENTER = { lat: 38.9072, lng: -77.0369 } as const;
