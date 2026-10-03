// Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. https://www.example.com).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Smart Appliance Services";
export const PRIMARY_PHONE = "+1-571-899-2995";
export const EMAIL = "Smart.applianceservices.va@gmail.com";

export const SOCIAL_LINKS = [
  "https://www.facebook.com/smartapplianceservicess/",
  "https://instagram.com/ssmartappliance",
];

// Service area: ZIPs whose center is within this many miles of any of our Virginia bases.
// If you change any of these, re-run scripts/generate-service-area.mjs.
export const SERVICE_RADIUS_MILES = 40;
export const SERVICE_CENTERS = [
  { lat: 38.3032, lng: -77.4605 }, // Fredericksburg, VA
  { lat: 38.4221, lng: -77.4083 }, // Stafford, VA
  { lat: 38.7509, lng: -77.4753 }, // Manassas, VA
  { lat: 38.7135, lng: -77.7953 }, // Warrenton, VA
] as const;
/** Human-readable version of SERVICE_CENTERS for page copy. */
export const SERVICE_BASES = "Fredericksburg, Stafford, Manassas and Warrenton, VA";
