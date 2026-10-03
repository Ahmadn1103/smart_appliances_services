"use client";

import { useId, useState } from "react";
import { CheckCircle2, MapPin, Phone, XCircle } from "lucide-react";
import { checkZip, type ZipCheck } from "@/lib/service-area";
import { SERVICE_BASES, SERVICE_RADIUS_MILES } from "@/lib/site";
import { useSite } from "@/components/SiteShell";

interface ZipCheckerProps {
  /** Appliance booking label to preselect if the customer books after a successful check. */
  service?: string;
  className?: string;
}

interface Result {
  zip: string;
  status: ZipCheck;
}

export default function ZipChecker({ service, className = "" }: ZipCheckerProps) {
  const inputId = useId();
  const { openBooking } = useSite();
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = zip.trim();
    setResult({ zip: value, status: checkZip(value) });
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
        <label htmlFor={inputId} className="sr-only">
          Your 5-digit ZIP code
        </label>
        <div className="relative flex-1">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="Enter your ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setResult(null);
            }}
            className="w-full pl-10 pr-3 py-3 text-base sm:text-sm bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-black transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          Check
        </button>
      </form>

      <div aria-live="polite" className="mt-2.5">
        {result?.status === "in" && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p>
                <span className="font-bold">Good news, we service {result.zip}.</span> Technicians are available in your area.
              </p>
              <button
                type="button"
                onClick={() => openBooking(service)}
                className="font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-950 cursor-pointer"
              >
                Schedule your repair →
              </button>
            </div>
          </div>
        )}
        {result?.status === "out" && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
            <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1.5">
              <p>
                <span className="font-bold">Sorry, {result.zip} is outside our {SERVICE_RADIUS_MILES}-mile service area</span> around {SERVICE_BASES}.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-bold text-amber-800">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  Near the edge? Call
                </span>
                <a href="tel:5718992995" className="underline underline-offset-2 hover:text-amber-950">(571) 899-2995</a>
                <a href="tel:5719924222" className="underline underline-offset-2 hover:text-amber-950">(571) 992-4222</a>
              </div>
            </div>
          </div>
        )}
        {result?.status === "invalid" && (
          <p role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs sm:text-sm text-rose-700 font-medium">
            Please enter a valid 5-digit ZIP code.
          </p>
        )}
      </div>
    </div>
  );
}
