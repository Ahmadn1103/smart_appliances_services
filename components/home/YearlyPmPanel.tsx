"use client";

import { Calendar, CheckCircle2, Phone, ShieldCheck, Zap } from "lucide-react";
import ApplianceIcon from "@/components/ApplianceIcon";
import ZipChecker from "@/components/ZipChecker";
import { useSite } from "@/components/SiteShell";
import { APPLIANCES, PM_BUNDLES, PM_CHECK_LABEL } from "@/lib/appliances";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

const pm = APPLIANCES.find((a) => a.bookingLabel === PM_CHECK_LABEL)!;

const BUTTON =
  "w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm py-3 shadow-md transition-all cursor-pointer";

/** The Yearly PM Check panel: maintenance bundles with prices instead of the repair booking form. */
export default function YearlyPmPanel() {
  const { openBooking } = useSite();

  return (
    <div
      id="appliance-panel"
      role="tabpanel"
      aria-label={pm.name}
      className="mt-5 sm:mt-6 rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden scroll-mt-24"
    >
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white px-5 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/30 flex items-center justify-center shrink-0">
            <ApplianceIcon icon={pm.icon} className="w-7 h-7" />
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">{pm.name}</h3>
            <p className="text-xs sm:text-sm text-blue-100">{pm.tagline}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 text-[11px] sm:text-xs font-bold">
          <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25 uppercase">
            <Zap className="w-3.5 h-3.5" aria-hidden="true" /> Annual maintenance
          </li>
          <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/25">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> 30-Day Warranty
          </li>
        </ul>
      </div>

      <div className="p-4 sm:p-7 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed">{pm.description}</p>

          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">Why book a yearly check</h4>
            <ul className="space-y-2">
              {pm.commonIssues.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-4 space-y-2.5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Check your ZIP</h4>
            <p className="text-xs text-slate-600">Serving Virginia, DC &amp; Maryland, Within {SERVICE_RADIUS_MILES} Miles</p>
            <ZipChecker service={pm.bookingLabel} />
            <button type="button" onClick={() => openBooking(pm.bookingLabel)} className={BUTTON}>
              <Calendar className="w-4 h-4" aria-hidden="true" /> Book Service →
            </button>
            <div className="space-y-1.5 pt-0.5">
              <p className="text-center text-xs font-bold text-slate-600">Prefer to call?</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { tel: "5718992995", label: "(571) 899-2995" },
                  { tel: "5719924222", label: "(571) 992-4222" },
                ].map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-white border border-blue-200 hover:border-blue-400 px-2 py-2.5 text-[13px] font-bold text-slate-800 whitespace-nowrap active:scale-95 transition-transform"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-3">Choose your maintenance bundle</h4>
          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {PM_BUNDLES.map((b) => (
              <li key={b.appliances} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col">
                <p className="text-xs font-extrabold uppercase tracking-wider text-blue-700">{b.appliances} Appliances</p>
                <p className="mt-1 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">${b.price}.00</p>
                <p className="mt-2 mb-4 text-sm text-slate-500 leading-relaxed flex-1">{b.blurb}</p>
                <button type="button" onClick={() => openBooking(b.bookingLabel)} className={BUTTON}>
                  <Calendar className="w-4 h-4" aria-hidden="true" /> Book This Bundle
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
