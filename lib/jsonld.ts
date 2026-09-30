import { faqs } from "@/lib/faqs";
import { EMAIL, OWNER_NAME, PRIMARY_PHONE, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

// No aggregateRating/review markup on purpose: the on-page testimonials are not verifiable.
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/smart-logo.jpeg`,
  image: `${SITE_URL}/mj-technician.jpg`,
  founder: { "@type": "Person", name: OWNER_NAME, alternateName: "MJ" },
  telephone: PRIMARY_PHONE,
  email: EMAIL,
  description:
    "Appliance repair and installation for refrigerators, freezers, washers, dryers, dishwashers, ovens, ranges and garbage disposals, plus dryer vent cleaning and house duct cleaning, in Washington DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair; 30-day labor and parts warranty.",
  priceRange: "$$",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Washington, DC" },
    { "@type": "AdministrativeArea", name: "Maryland" },
    { "@type": "AdministrativeArea", name: "Northern Virginia" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
  ],
  sameAs: SOCIAL_LINKS,
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
