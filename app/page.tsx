import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import SiteShell from "@/components/SiteShell";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import CtaBar from "@/components/home/CtaBar";
import HomeHero from "@/components/home/HomeHero";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChoose from "@/components/home/WhyChoose";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    absolute: "Appliance Repair in DC, MD & Northern VA | Smart Appliance Services",
  },
  description:
    "Refrigerator, washer, dryer, dishwasher, oven, microwave & disposal repair within 40 miles of Fredericksburg, Stafford, Manassas and Warrenton, VA. $89 diagnostic credited toward repair. 30-day warranty.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteShell>
        <HomeHero />
        <ServicesSection />
        <WhyChoose />
        <AboutSection />
        <ServiceAreaSection />
        <Reviews />
        <FAQSection />
        <ContactSection />
        <CtaBar />
      </SiteShell>
    </>
  );
}
