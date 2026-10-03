"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Tag,
  Home,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

interface AboutAdSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function AboutAdSection({ onOpenBooking }: AboutAdSectionProps) {
  const pillars = [
    {
      title: "Dependable Service",
      description: "We show up on time, respect your home, and get the job done right the first time. Real-time technician dispatch across the DMV.",
      icon: ShieldCheck,
      badge: "On-Time Dispatch",
    },
    {
      title: "Skilled & Certified Technicians",
      description: "Our technicians are factory-trained and equipped with digital diagnostics, OEM schematics, and specialized master tools.",
      icon: Award,
      badge: "Master Technicians",
    },
    {
      title: "Fair & Transparent Pricing",
      description: "Diagnostic fee is only $89 (100% credited toward your repair upon approval). No hidden add-ons, just clear flat-rate quotes.",
      icon: Tag,
      badge: "$89 Credited with Repair",
    },
    {
      title: "Residential Appliance Experts",
      description: "From simple seal replacements to complex sealed refrigeration compressors and inverter drives, we service all major brands.",
      icon: Home,
      badge: "All Major Brands",
    },
    {
      title: "Precision Solutions",
      description: "We restore equipment efficiency and reduce household electrical strain, keeping your home running smoothly for years to come.",
      icon: Zap,
      badge: "Lasting Durability",
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-100/40 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>WHO WE ARE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              About <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">Smart Appliance Services</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="font-script text-2xl sm:text-3xl text-blue-600">
                Appliance repairs? Leave it to us.
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold border border-slate-200">
                DIAGNOSE • REPAIR • MAINTENANCE
              </span>
            </div>
          </div>
        </div>

        {/* Center Grid: Story & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center py-6 sm:py-12">
          
          {/* Left Text & Value Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Founded in 2021, <strong className="text-slate-900">Smart Appliance Services LLC</strong> is a family-owned business built on a simple promise: providing fast, honest diagnostics and expert repairs without high-pressure sales or inflated part markups.
              </p>
              <p>
                With over <strong className="text-slate-900">15+ years of hands-on field experience</strong>, our technicians carry OEM diagnostic software and stocked service vehicles to resolve issues on the very first visit throughout DC, Maryland, and Northern Virginia.
              </p>
            </div>

            {/* Contract Highlights Grid */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 transition-all shadow-xs group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="hidden sm:block text-xs text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual Image Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-3">
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/mj-technician.jpeg"
                  alt="Smart Appliance Services technician diagnosing a refrigerator with a tablet"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Certified Technician</div>
                      <div className="text-[10px] text-slate-500">15+ Years Hands-On Experience</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Est. 2021
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Bottom Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-200 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-blue-600">15+</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Years Experience</div>
            <div className="text-[11px] text-slate-500">Hands-on Expertise</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-blue-600">10+</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Warranty Partners</div>
            <div className="text-[11px] text-slate-500">Authorized Vendor</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-blue-600">$89</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Diagnostic Fee</div>
            <div className="text-[11px] text-slate-500">100% Credited With Repair</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-blue-600">30-Day</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Labor & Parts Warranty</div>
            <div className="text-[11px] text-slate-500">Guaranteed Workmanship</div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Online Repair Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
