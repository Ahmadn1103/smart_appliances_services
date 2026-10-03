import { ChevronDown, MapPin, Phone } from "lucide-react";
import ZipChecker from "@/components/ZipChecker";
import { SERVICE_AREA_STATES } from "@/lib/service-area-cities";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="bg-white py-8 sm:py-16 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Serving Virginia, DC &amp; Maryland, Within{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
              {SERVICE_RADIUS_MILES} Miles
            </span>
          </h2>
          <div className="max-w-md mx-auto mt-5 text-left">
            <ZipChecker />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 items-start">
          {SERVICE_AREA_STATES.map((state) => (
            <details key={state.code} className="group rounded-2xl bg-slate-50 border border-slate-200 open:bg-white open:shadow-sm">
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3.5 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 font-black text-slate-900">
                  <MapPin className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  {state.name}
                  <span className="text-xs font-bold text-slate-500">
                    {state.cities.length} {state.cities.length === 1 ? "city" : "cities"}
                  </span>
                </span>
                <ChevronDown className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="flex flex-wrap gap-1.5 text-xs text-slate-700 px-4 pb-4">
                {state.cities.map((city) => (
                  <li
                    key={city.name}
                    title={`ZIP ${city.zips.length > 12 ? `${city.zips.slice(0, 12).join(", ")} and more` : city.zips.join(", ")}`}
                    className="px-2.5 py-1 rounded-full bg-white border border-slate-200"
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Cities near the edge may have ZIPs beyond the {SERVICE_RADIUS_MILES}-mile line, so check your ZIP above.
        </p>

        <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-blue-900">
            <span className="font-bold">Outside {SERVICE_RADIUS_MILES} miles or right on the edge?</span> Give us a call and we will let you know if we can make it out.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <a
              href="tel:5718992995"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold whitespace-nowrap active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> (571) 899-2995
            </a>
            <a
              href="tel:5719924222"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-blue-50 border border-blue-300 text-blue-700 text-sm font-bold whitespace-nowrap active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> (571) 992-4222
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
