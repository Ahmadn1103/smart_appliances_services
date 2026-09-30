import { ArrowRight, Phone } from "lucide-react";
import BookButton from "@/components/BookButton";
import ZipChecker from "@/components/ZipChecker";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

export default function HomeHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-xs sm:text-sm font-bold tracking-[0.18em] text-blue-200 uppercase">
            Professional &bull; Reliable &bull; Affordable
          </p>
          <h1 className="text-3xl sm:text-5xl 2xl:text-6xl font-black tracking-tight leading-[1.08]">
            Expert Appliance Repair
            <span className="block bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent">for Your Home</span>
          </h1>
          <p className="text-xs sm:text-lg text-slate-200 max-w-xl leading-relaxed">
            Fast, honest and professional service for all major home appliances, plus dryer vent and duct cleaning. We get your home running smoothly again, so you can get back to what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <BookButton className="btn-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-7 py-3.5 rounded-full font-black text-sm sm:text-base shadow-md shadow-blue-500/30 cursor-pointer">
              <span className="relative z-10">Schedule Your Repair</span>
              <ArrowRight className="w-4 h-4 relative z-10" aria-hidden="true" />
            </BookButton>
            <a
              href="tel:5714598155"
              className="pressable inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-full font-bold text-sm sm:text-base backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>(571) 459-8155</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-3xl bg-white/95 text-slate-900 p-5 sm:p-6 shadow-2xl border border-white/40 backdrop-blur">
            <h2 className="text-base sm:text-lg font-black">Do we service your area?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3.5">
              We serve homes within {SERVICE_RADIUS_MILES} miles of Washington, DC. Enter your ZIP to check.
            </p>
            <ZipChecker />
          </div>
        </div>
      </div>
    </section>
  );
}
