"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Phone, Tag } from "lucide-react";
import ApplianceIcon from "@/components/ApplianceIcon";
import BookingSection from "@/components/BookingSection";
import ZipChecker from "@/components/ZipChecker";
import { APPLIANCES } from "@/lib/appliances";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

export default function ServicesSection() {
  const [selectedSlug, setSelectedSlug] = useState(APPLIANCES[0].slug);
  const selected = APPLIANCES.find((a) => a.slug === selectedSlug) ?? APPLIANCES[0];

  const select = (slug: string) => {
    setSelectedSlug(slug);
    document.getElementById("appliance-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="services" className="bg-blue-50/70 border-y border-blue-100 py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-black text-slate-900 mb-1">Choose Your Appliance</h2>
        <p className="text-center text-sm text-slate-600 mb-6">
          Select an appliance to see common problems and book your appointment right below.
        </p>

        <ul className="grid grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4" role="tablist" aria-label="Appliances we repair">
          {APPLIANCES.map((a) => {
            const isSelected = a.slug === selected.slug;
            return (
              <li key={a.slug} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="appliance-panel"
                  onClick={() => select(a.slug)}
                  className={`card-lift group h-full w-full flex flex-col items-center text-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-2xl border shadow-xs cursor-pointer ${
                    isSelected
                      ? "bg-white border-blue-500 ring-2 ring-blue-500/30 shadow-lg"
                      : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg"
                  }`}
                >
                  <span
                    className={`w-11 h-11 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center transition-colors ${
                      isSelected ? "bg-blue-600" : "bg-blue-700 group-hover:bg-blue-600"
                    }`}
                  >
                    <ApplianceIcon icon={a.icon} className="w-5 h-5 sm:w-8 sm:h-8" />
                  </span>
                  <span className="text-[11px] sm:text-sm font-extrabold text-slate-900 leading-tight">{a.name}</span>
                  <span className="hidden sm:block text-[11px] text-slate-500 leading-snug">{a.tileNote}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          id="appliance-panel"
          role="tabpanel"
          aria-label={`${selected.name} repair`}
          className="mt-5 sm:mt-6 rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden scroll-mt-24"
        >
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white px-5 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/30 flex items-center justify-center shrink-0">
                <ApplianceIcon icon={selected.icon} className="w-7 h-7" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">{selected.name} Repair</h3>
                <p className="text-xs sm:text-sm text-blue-100">{selected.tagline}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 text-[11px] sm:text-xs font-bold">
              <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25">
                <Tag className="w-3.5 h-3.5" aria-hidden="true" /> $89 diagnostic, credited toward repair
              </li>
              <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {selected.turnaround}
              </li>
            </ul>
          </div>

          <div className="p-4 sm:p-7 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">{selected.description}</p>

              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">Common problems we fix</h4>
                <ul className="space-y-2">
                  {selected.commonIssues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-4 space-y-2.5">
                <h4 className="text-sm font-black text-slate-900">Do we service your area?</h4>
                <p className="text-xs text-slate-600">
                  Enter your ZIP. We serve homes within {SERVICE_RADIUS_MILES} miles of Washington, DC.
                </p>
                <ZipChecker service={selected.bookingLabel} />
                <a href="tel:5714598155" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700">
                  <Phone className="w-4 h-4 text-blue-600" aria-hidden="true" /> Prefer to call? (571) 459-8155
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BookingSection
                key={selected.slug}
                lockedService={selected.bookingLabel}
                heading={`Book Your ${selected.name} Repair`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
