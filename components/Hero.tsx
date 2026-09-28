"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Tag,
  Clock,
  Phone,
  Calendar,
  Star,
  Check,
  ArrowRight,
  MapPin,
  Sparkles,
  Refrigerator,
  Shirt,
  Wind,
  Flame,
  UtensilsCrossed,
} from "lucide-react";

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenSocial?: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const [selectedService, setSelectedService] = useState("Refrigeration");
  const [zipCode, setZipCode] = useState("");
  const [zipChecked, setZipChecked] = useState(false);

  const quickServices = [
    { id: "Refrigeration", label: "Refrigerator", icon: Refrigerator, note: "Cooling / Leaks" },
    { id: "Washers", label: "Washer", icon: Shirt, note: "Spin / Drain" },
    { id: "Dryers", label: "Dryer", icon: Wind, note: "Heat / Vent" },
    { id: "Cooking", label: "Range & Oven", icon: Flame, note: "Igniter / Bake" },
    { id: "Dishwashers", label: "Dishwasher", icon: Sparkles, note: "Pump / Wash" },
    { id: "Garbage Disposals", label: "Disposal", icon: UtensilsCrossed, note: "Jam / Drain" },
  ];

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      setZipChecked(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 pt-3 sm:pt-8 pb-12 sm:pb-20 border-b border-slate-200">
      {/* Background soft ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-blue-100/60 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-cyan-100/50 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Strip (Desktop/Tablet) */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 sm:mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="font-script text-2xl sm:text-3xl text-blue-600 tracking-wide">
              Appliance repairs? Leave it to us.
            </span>
            <span className="h-4 w-px bg-slate-300 inline" />
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-slate-600 font-extrabold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              15+ YEARS EXPERIENCE • FOUNDED 2021
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Partnered with 10+ Home Warranty Companies</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span>DMV Appliance Repair • DC, MD & VA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Appliance Repairs? <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                Leave It To Us.
              </span>
            </h1>

            {/* Sub-text using client bio from contract */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Founded in 2021, our team brings <strong className="text-slate-900 font-bold">15+ years of hands-on experience</strong> to every service call across Washington DC, Maryland, and Virginia. We provide honest diagnosis, quality workmanship, and dependable repairs.
            </p>

            {/* 3 Key Feature Badges (Single compact row on mobile) */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-0.5">
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-2.5 text-center sm:text-left text-[10px] sm:text-sm font-semibold text-slate-800 bg-slate-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="leading-tight sm:leading-normal font-bold sm:font-semibold">$89 Diagnostic (Credited)</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-2.5 text-center sm:text-left text-[10px] sm:text-sm font-semibold text-slate-800 bg-slate-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="leading-tight sm:leading-normal font-bold sm:font-semibold">30-Day Labor Warranty</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-2.5 text-center sm:text-left text-[10px] sm:text-sm font-semibold text-slate-800 bg-slate-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="leading-tight sm:leading-normal font-bold sm:font-semibold">Mon–Fri 8–5 • Sat 9–4</span>
              </div>
            </div>

            {/* CTAs with Contract Phone Numbers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1.5">
              <button
                onClick={() => onOpenBooking(selectedService)}
                className="btn-cta w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-7 py-3 sm:py-3.5 rounded-full font-black text-sm sm:text-base shadow-md shadow-blue-500/25 cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
                <span className="relative z-10">Book Service Online</span>
              </button>

              <a
                href="tel:5714598155"
                className="pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-white text-slate-900 border border-slate-200 hover:border-blue-300 px-5 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base shadow-xs hover:shadow-md"
              >
                <Phone className="pressable-icon w-4 h-4 text-blue-600" />
                <span>Call (571) 459-8155</span>
              </a>

              <a
                href="tel:5718992995"
                className="hidden lg:inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 px-2 py-2 text-xs font-semibold"
              >
                <span>Secondary: (571) 899-2995</span>
              </a>
            </div>

            {/* Social Proof & DMV badge */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2 sm:pt-3 border-t border-slate-200 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">5.0 Star</span>
                <span className="text-slate-500 text-[11px] sm:text-xs">(Google Reviews)</span>
              </div>

              <div className="h-4 w-px bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-2 text-slate-600 font-medium text-xs sm:text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>10+ Home Warranty Partners</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Service Dispatch Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-4 sm:p-7 relative text-slate-900">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 mb-3 sm:mb-5">
                <div>
                  <h2 className="text-sm sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>Quick Service Dispatch</span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Select your appliance for fast DMV dispatch
                  </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs">
                  $89 Diagnostic
                </span>
              </div>

              {/* Service Selection Pills */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-5">
                <p className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Which appliance needs repair?
                </p>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {quickServices.map((srv) => {
                    const Icon = srv.icon;
                    const isSelected = selectedService === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedService(srv.id)}
                        className={`pressable flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border text-center cursor-pointer min-h-[58px] sm:min-h-[64px] ${
                          isSelected
                            ? "bg-blue-50 text-blue-900 border-blue-500 font-bold shadow-xs"
                            : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 sm:mb-1 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                        <span className="text-[11px] sm:text-xs leading-tight font-bold">{srv.label}</span>
                        <span className={`text-[9px] sm:text-[10px] truncate max-w-full ${isSelected ? "text-blue-700 font-medium" : "text-slate-400"}`}>
                          {srv.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zip Code Check Form */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-5">
                <label htmlFor="hero-zip" className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Check DMV Availability
                </label>
                <form onSubmit={handleCheckZip} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="hero-zip"
                      type="text"
                      placeholder="Enter 5-digit DMV Zip"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                        setZipChecked(false);
                      }}
                      maxLength={5}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-black transition-all cursor-pointer shrink-0 shadow-xs"
                  >
                    Check
                  </button>
                </form>

                {zipChecked && (
                  <div className="p-2.5 sm:p-3 bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs text-blue-900 flex items-start gap-2 animate-in fade-in">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Technicians active in your area!</span> Fast dispatch available across DC, MD & VA.
                    </div>
                  </div>
                )}
              </div>

              {/* Dispatch Action Button Pill */}
              <button
                type="button"
                onClick={() => onOpenBooking(selectedService)}
                className="btn-cta w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 sm:py-3.5 px-4 rounded-full font-black text-xs sm:text-sm shadow-md shadow-blue-500/25 cursor-pointer"
              >
                <span className="relative z-10">Continue With {selectedService}</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </button>

              <div className="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>✓ $89 Credited</span>
                <span>✓ 30-Day Warranty</span>
                <span>✓ DMV Vans</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Bottom Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-12">
          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:border-blue-300 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900">30-Day Warranty</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500">Parts & Labor Protected</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:border-blue-300 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900">$89 Diagnostic</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500">Credited with Repair</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:border-blue-300 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900">Local Dispatch</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500">DC, MD & VA Vans</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:border-blue-300 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900">10+ Warranties</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500">Verified Partner</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
