import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

const REASONS = [
  "Experienced, certified technicians",
  "Same-day and next-day appointments",
  "All major brands and models",
  "Honest, upfront pricing: $89 diagnostic, credited toward repair",
  "Fully licensed and insured",
  "30-day labor and parts warranty",
];

export default function WhyChoose() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7">
        <h2 className="text-2xl sm:text-3xl font-black text-blue-800 mb-5">Why Choose Smart Appliance Services?</h2>
        <ul className="space-y-3">
          {REASONS.map((reason) => (
            <li key={reason} className="flex items-start gap-3 text-sm sm:text-base text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5 rounded-3xl bg-blue-50/70 border border-blue-100 p-6 space-y-5">
        <div className="flex items-start gap-4">
          <MapPin className="w-9 h-9 text-blue-700 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-blue-800">Service Area</p>
            <p className="text-2xl font-black text-slate-900 leading-tight">Serving Virginia, DC &amp; Maryland</p>
            <p className="text-sm text-slate-600 mt-0.5">
              Within {SERVICE_RADIUS_MILES} Miles
            </p>
            <a href="#service-area" className="inline-block mt-2 text-sm font-bold text-blue-700 hover:text-blue-900 underline underline-offset-2">
              Check your ZIP code
            </a>
          </div>
        </div>
        <div className="border-t border-blue-200 pt-5 flex items-start gap-4">
          <ShieldCheck className="w-9 h-9 text-blue-700 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-blue-800">All Work Guaranteed</p>
            <p className="text-sm text-slate-600 mt-0.5">Your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
