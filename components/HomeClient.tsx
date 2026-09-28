"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import AboutAdSection from "@/components/AboutAdSection";
import ServicesSection from "@/components/ServicesSection";
import Estimator from "@/components/Estimator";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import BookingSection from "@/components/BookingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import SocialModal from "@/components/SocialModal";

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Refrigerators & Freezers");
  const [selectedNotes, setSelectedNotes] = useState<string>("");

  const handleOpenBooking = (serviceName?: string, notes?: string) => {
    if (serviceName) setSelectedService(serviceName);
    if (notes) setSelectedNotes(notes);
    setIsModalOpen(true);
  };

  const handleOpenSocial = () => {
    setIsSocialModalOpen(true);
  };

  const handleSelectServiceFromSection = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedNotes(`Service requested: ${serviceName} | $89 Diagnostic accepted`);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Floating Crisp Glass Pill Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} onOpenSocial={handleOpenSocial} />

      <main className="flex-1 pt-14 sm:pt-20">
        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} onOpenSocial={handleOpenSocial} />

        {/* Brands Supported & Home Warranty Partners */}
        <Brands />

        {/* Dedicated "Who We Are / About Smart Appliance Services" Section with AI image */}
        <div id="about-section">
          <AboutAdSection onOpenBooking={handleOpenBooking} />
        </div>

        {/* 6 Core Services with Primary Focus on Appliances (No HVAC) */}
        <ServicesSection onSelectService={handleSelectServiceFromSection} />

        {/* Diagnostic & Cost Estimator ($89 Diagnostic) */}
        <Estimator onOpenBooking={handleOpenBooking} />

        {/* Why Choose Us (15+ Years Experience + 10+ Warranty Partners) */}
        <WhyUs />

        {/* How It Works */}
        <HowItWorks />

        {/* Verified Customer Reviews */}
        <Reviews />

        {/* Full Scheduling Form */}
        <BookingSection initialService={selectedService} />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer (with Embedded Scannable QR Codes) */}
      <Footer onOpenSocial={handleOpenSocial} />

      {/* Fast Dispatch Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedService={selectedService}
        notesPreload={selectedNotes}
      />

      {/* Interactive Social Popup Modal (FB & IG only) */}
      <SocialModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />
    </div>
  );
}
