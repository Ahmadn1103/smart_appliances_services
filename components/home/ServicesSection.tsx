import { CheckCircle2, Phone } from "lucide-react";
import BookButton from "@/components/BookButton";
import { ALSO_SERVICED, APPLIANCE_CATEGORIES, BRANDS_SERVED, SERVICE_GROUPS } from "@/lib/appliances";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-slate-50 border-y border-slate-200 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl sm:text-3xl font-black text-slate-900">Our Services</h2>
        <p className="text-center text-xs sm:text-base text-slate-600 mt-1.5 mb-6 sm:mb-10">
          Book online in under a minute, or call us. We will take care of the rest.
        </p>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {SERVICE_GROUPS.map((group) => (
            <article
              key={group.key}
              className="flex flex-col rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs"
            >
              <h3 className="text-base sm:text-xl font-black text-slate-900 leading-snug">{group.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{group.blurb}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-px" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-2">
                <BookButton
                  service={group.bookingLabel}
                  className="btn-cta whitespace-nowrap rounded-full bg-blue-600 text-white px-3 py-2.5 text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <span className="relative z-10">Book Appointment</span>
                </BookButton>
                <a
                  href="tel:5714598155"
                  className="pressable inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white text-slate-800 px-3 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap hover:border-blue-400"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" /> Call Us
                </a>
              </div>
            </article>
          ))}
        </div>

        <div id="appliances" className="mt-10 sm:mt-14">
          <h2 className="text-center text-xl sm:text-3xl font-black text-slate-900">Appliances We Service</h2>
          <p className="text-center text-xs sm:text-base text-slate-600 mt-1.5 mb-5 sm:mb-8">
            Also: {ALSO_SERVICED.join(", ")}.
          </p>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {APPLIANCE_CATEGORIES.map((category) => (
              <div key={category.title} className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-black text-blue-800 pb-2 mb-3 border-b border-slate-100">
                  {category.title}
                </h3>
                <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-700">
                  {category.items.map((item, i) => (
                    <li key={`${item}-${i}`} className="flex items-start gap-2">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 sm:mt-10 text-center text-xs sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          <span className="font-black text-slate-900">We Service Most Major Appliance Brands</span> — {BRANDS_SERVED}.
        </p>
      </div>
    </section>
  );
}
