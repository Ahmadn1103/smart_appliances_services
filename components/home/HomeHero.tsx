import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import BookButton from "@/components/BookButton";

const HERO_PHONES = [
  { tel: "5718992995", label: "(571) 899-2995" },
  { tel: "5719924222", label: "(571) 992-4222" },
];

export default function HomeHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute top-20 bottom-0 right-0 w-full lg:w-[60%]">
        <Image
          src="/hero-technician-2.jpg"
          alt="Smart Appliance Services lead technician smiling in a home kitchen, giving a thumbs up"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/60 sm:from-slate-950/95 sm:via-slate-900/80 sm:to-slate-900/30" aria-hidden="true" />

      {/* Brush-stroke tagline, top right */}
      <Image
        src="/hero-tagline.png"
        alt="All Brands, All Appliances, One Team"
        width={630}
        height={418}
        priority
        className="hidden sm:block absolute z-10 sm:top-[7.5rem] sm:right-8 lg:top-[7.5rem] lg:right-6 sm:w-44 lg:w-52 h-auto drop-shadow-[0_12px_24px_rgba(2,6,23,0.45)] pointer-events-none select-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <Image
            src="/hero-tagline.png"
            alt="All Brands, All Appliances, One Team"
            width={630}
            height={418}
            className="sm:hidden w-28 h-auto ml-auto -mr-1 drop-shadow-[0_8px_16px_rgba(2,6,23,0.45)]"
          />
          <p className="text-[10px] sm:text-sm font-bold tracking-[0.14em] sm:tracking-[0.18em] text-blue-200 uppercase">
            Professional &bull; Reliable &bull; Affordable
          </p>
          <h1 className="text-2xl sm:text-[46px] lg:text-[58px] font-black tracking-tight leading-[1.08]">
            Expert Appliance Repair
            <span className="block bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent">for Your Home</span>
          </h1>
          <p className="text-[13px] sm:text-lg text-slate-200 max-w-xl leading-relaxed">
            Fast, honest and professional service for all major home appliances. We get your appliances running again, so you can get back to what matters most.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 pt-1">
            <BookButton className="btn-cta col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-5 py-3 sm:py-2.5 rounded-full font-black text-sm shadow-md shadow-blue-500/30 cursor-pointer">
              <span className="relative z-10">Schedule Your Repair</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10" aria-hidden="true" />
            </BookButton>
            {HERO_PHONES.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="pressable inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-2 sm:px-4 py-3 sm:py-2.5 rounded-full font-bold text-sm backdrop-blur-sm"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{p.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
