import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";

export const metadata: Metadata = {
  title: "Refrigerator, Washer, Dryer & Oven Repair",
  description:
    "Repair for refrigerators, washers, dryers, dishwashers, ranges, ovens and garbage disposals in DC, MD and Northern VA. $89 diagnostic credited toward repair.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Refrigerator, Washer, Dryer & Oven Repair | Smart Appliance Services",
    description:
      "Repair for refrigerators, washers, dryers, dishwashers, ranges, ovens and garbage disposals in DC, MD and Northern VA. $89 diagnostic credited toward repair.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refrigerator, Washer, Dryer & Oven Repair | Smart Appliance Services",
    description:
      "Repair for refrigerators, washers, dryers, dishwashers, ranges, ovens and garbage disposals in DC, MD and Northern VA. $89 diagnostic credited toward repair.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
