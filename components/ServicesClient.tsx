"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import SocialModal from "@/components/SocialModal";
import Brands from "@/components/Brands";
import {
  Refrigerator,
  Flame,
  Shirt,
  Wind,
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  Tag,
  Clock,
  Phone,
  CheckCircle2,
  Wrench,
  ArrowRight,
  Zap,
} from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  icon: any;
  color: string;
  accentGradient: string;
  description: string;
  commonIssues: string[];
  diagnosticDetail: string;
  turnaroundTime: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "refrigeration",
    name: "Refrigerators & Freezers",
    tagline: "French door, side-by-side, built-in & column units",
    icon: Refrigerator,
    color: "#2563eb",
    accentGradient: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
    description:
      "A failing refrigerator is an emergency. Our technicians arrive with the right diagnostic tools to test compressors, start relays, defrost systems, evaporator fan motors, and sealed systems, protecting your groceries and peace of mind.",
    commonIssues: [
      "Not cooling or freezer thawing",
      "Ice maker stopped dispensing or leaking water",
      "Frost buildup on back evaporator wall",
      "Loud buzzing compressor or clicking relay",
      "Water puddles pooling under crisper drawers",
      "Constant running with warm interior temperatures",
    ],
    diagnosticDetail: "$89 Diagnostic Fee (100% credited toward completed repair)",
    turnaroundTime: "Same-day or next-morning priority dispatch",
  },
  {
    id: "washers",
    name: "Washers (Front & Top Load)",
    tagline: "High-efficiency, front-load, top-load & smart washer repairs",
    icon: Shirt,
    color: "#2563eb",
    accentGradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    description:
      "From high-end front loaders that refuse to drain to unbalanced spin cycles, we troubleshoot motor control units, drain pumps, drive belts, suspension rods, and door locking mechanisms.",
    commonIssues: [
      "Washer refuses to drain water (OE / 5E error codes)",
      "Violent shaking, banging, or walking during spin cycle",
      "Door latch jammed or locked shut with laundry inside",
      "Washer fills with water but refuses to agitate or spin",
      "Water leaking onto floor during cycle transitions",
      "Unresponsive digital control panel or power failures",
    ],
    diagnosticDetail: "$89 Diagnostic Fee (100% credited toward completed repair)",
    turnaroundTime: "Fast 24 to 48-hour service appointments",
  },
  {
    id: "dryers",
    name: "Dryers (Gas & Electric)",
    tagline: "Precision heating diagnostics & mechanical drive restoration",
    icon: Wind,
    color: "#f59e0b",
    accentGradient: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
    description:
      "Tumble dryers that blow cold air or screech like a jet engine need professional attention. We service heating coils, thermal cut-offs, flame sensors, igniters, idler pulleys, and drum belts.",
    commonIssues: [
      "Drum spins normally but produces zero heat",
      "Clothes require 2 to 3 full cycles to dry",
      "Loud squealing, thumping, or grinding metal noises",
      "Dryer runs for 5 minutes then abruptly shuts down",
      "Burning odor or overheating exterior cabinet",
      "Push-to-start button not responding",
    ],
    diagnosticDetail: "$89 Diagnostic Fee (100% credited toward completed repair)",
    turnaroundTime: "Same-day dispatch available across DMV",
  },
  {
    id: "dishwashers",
    name: "Dishwashers",
    tagline: "Sanitization pumps, leak prevention & clean cycle restoration",
    icon: Sparkles,
    color: "#06b6d4",
    accentGradient: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
    description:
      "Don't let dirty dishes pile up in the sink. We diagnose circulation pumps, water inlet valves, float switches, detergent dispensers, and clogged drain lines for all luxury and standard dishwashers.",
    commonIssues: [
      "Standing dirty water pooling in the bottom tub",
      "Dishes coming out dirty, gritty, or with white film",
      "Water leaking from bottom door corners onto cabinetry",
      "Dishwasher won't start or beeps continuously",
      "Spray arms blocked or not rotating",
      "Soap dispenser cup remaining closed during cycle",
    ],
    diagnosticDetail: "$89 Diagnostic Fee (100% credited toward completed repair)",
    turnaroundTime: "Prompt scheduling with fully stocked vans",
  },
  {
    id: "ranges-ovens",
    name: "Ranges, Ovens & Cooktops",
    tagline: "Gas burners, electric elements, convection fans & dual-fuel units",
    icon: Flame,
    color: "#ef4444",
    accentGradient: "linear-gradient(135deg, #dc2626 0%, #f87171 100%)",
    description:
      "Whether you are preparing family dinner or hosting guests, cooking appliance failures require safe, certified care. We service igniters, gas safety valves, bake elements, broil coils, and touch control boards.",
    commonIssues: [
      "Gas surface burners clicking endlessly without igniting",
      "Oven bake element not heating or temperature is off by 50°+",
      "Electric smooth glass cooktop burners not turning on",
      "Oven door locked in self-clean cycle",
      "F10 / F90 or similar sensor failure error codes",
      "Gas smell near range (requires immediate attention)",
    ],
    diagnosticDetail: "$89 Diagnostic Fee (100% credited toward completed repair)",
    turnaroundTime: "Fast scheduling for prompt kitchen restoration",
  },
  {
    id: "garbage-disposals",
    name: "Garbage Disposals",
    tagline: "Jammed flywheels, motor hums, blade wear & under-sink plumbing leaks",
    icon: UtensilsCrossed,
    color: "#10b981",
    accentGradient: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    description:
      "A locked or leaking garbage disposal creates unpleasant kitchen odors and sink backups. We clear stuck impellers, reset internal overloads, replace worn seals, and install new heavy-duty units.",
    commonIssues: [
      "Disposal hums loudly when switched on but won't spin",
      "Water dripping from disposal bottom housing into cabinet",
      "Kitchen sink backs up and drains extremely slowly",
      "Disposal trips electrical circuit breaker or reset button",
      "Persistent foul food odor despite cleaning",
      "Severe vibrating noises or grinding sound",
    ],
    diagnosticDetail: "$89 Diagnostic Fee (100% credited toward completed repair)",
    turnaroundTime: "Same-day priority appointments available",
  },
];

export default function ServicesClient() {
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Floating Crisp Glass Pill Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} onOpenSocial={handleOpenSocial} />

      <main className="flex-1 pt-14 sm:pt-20">
        {/* Services Page Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-3 pb-6 sm:pt-6 sm:pb-10 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
          <div className="relative max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>Certified Appliance Repair Across the DMV</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Expert Repairs for Every{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                Major Home Appliance
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Founded in 2021 with over <strong className="text-slate-900 font-semibold">15+ years of technician experience</strong>. Transparent <strong className="text-blue-700 font-semibold">$89 diagnostic fee</strong> credited 100% toward your repair, backed by our <strong className="text-slate-900 font-semibold">30-day labor & parts warranty</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => handleOpenBooking("General Appliance Diagnostic")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                Schedule Diagnostic
              </button>
              <a
                href="tel:5714598155"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call (571) 459-8155</span>
              </a>
            </div>
          </div>
        </section>

        {/* Home Warranty & Brands Banner */}
        <Brands />

        {/* Comprehensive 6-Service Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <h2 className="sr-only">Appliance repair services we offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-blue-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group"
                >
                  <div className="space-y-4">
                    {/* Header with Icon Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center p-3 shadow-sm"
                        style={{ background: item.accentGradient }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>Prompt Arrival</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-blue-700 mt-0.5 font-semibold">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Common Issues List */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                        Common Symptoms We Resolve:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {item.commonIssues.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 border-t border-slate-100 space-y-3 mt-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-700 font-bold">$89 Diagnostic Fee</span>
                      <span className="text-slate-500">Credited Toward Repair</span>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(item.name, `Booked from Services Catalog: ${item.name}`)}
                      className="w-full py-3 rounded-2xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Book {item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 30-Day Warranty & Diagnostic Guarantee Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mx-auto md:mx-0">
                  <Tag className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">Upfront $89 Diagnostic</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every service visit starts with our transparent $89 diagnostic fee, which is 100% credited toward your completed repair upon approval.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto md:mx-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">30-Day Parts & Labor</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We stand behind our work. If the same issue reoccurs within 30 days of service, our technician will return at zero additional labor fee.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mx-auto md:mx-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">10+ Warranty Partners</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Authorized repair vendor trusted by top home warranty networks across Washington DC, Maryland, and Northern Virginia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenSocial={handleOpenSocial} />

      {/* Modals */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedService={selectedService}
        notesPreload={selectedNotes}
      />
      <SocialModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />
    </div>
  );
}
