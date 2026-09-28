import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Book Appliance Repair | Call (571) 459-8155",
  description:
    "Call (571) 459-8155 or request a technician online. Mobile appliance repair in DC, Maryland and Northern Virginia. Mon-Fri 8-5, Sat 9-4.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Book Appliance Repair | Call (571) 459-8155 | Smart Appliance Services",
    description:
      "Call (571) 459-8155 or request a technician online. Mobile appliance repair in DC, Maryland and Northern Virginia. Mon-Fri 8-5, Sat 9-4.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Appliance Repair | Call (571) 459-8155 | Smart Appliance Services",
    description:
      "Call (571) 459-8155 or request a technician online. Mobile appliance repair in DC, Maryland and Northern Virginia. Mon-Fri 8-5, Sat 9-4.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
