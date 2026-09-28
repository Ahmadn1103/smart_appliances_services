import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "Appliance Repair in DC, MD & Northern VA | Smart Appliance Services",
  },
  description:
    "Refrigerator, washer, dryer, dishwasher & oven repair across DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair. 30-day warranty.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HomeClient />
    </>
  );
}
