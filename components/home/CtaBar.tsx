import { ArrowRight, Calendar, MapPin, Phone } from "lucide-react";
import BookButton from "@/components/BookButton";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

export default function CtaBar() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-white/15">
        <div className="flex items-center gap-3 lg:pr-6">
          <span className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs text-slate-300">Call Now</span>
            <a href="tel:5718992995" className="block text-lg font-black text-sky-300 hover:text-sky-200 leading-tight">(571) 899-2995</a>
            <a href="tel:5719924222" className="block text-lg font-black text-sky-300 hover:text-sky-200 leading-tight">(571) 992-4222</a>
          </span>
        </div>

        <BookButton className="flex items-center gap-3 lg:px-6 text-left cursor-pointer group">
          <span className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-black">Book Online</span>
            <span className="block text-xs text-slate-300 group-hover:text-white">Fast & easy scheduling →</span>
          </span>
        </BookButton>

        <a href="#service-area" className="flex items-center gap-3 lg:px-6 group">
          <span className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-black">DMV Area</span>
            <span className="block text-xs text-slate-300 group-hover:text-white">Virginia-based, {SERVICE_RADIUS_MILES}-mile radius →</span>
          </span>
        </a>

        <div className="flex items-center lg:pl-6">
          <BookButton className="btn-cta w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full font-black text-sm cursor-pointer">
            <span className="relative z-10">Schedule Your Repair</span>
            <ArrowRight className="w-4 h-4 relative z-10" aria-hidden="true" />
          </BookButton>
        </div>
      </div>
    </section>
  );
}
