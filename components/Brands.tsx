import { ShieldCheck, Award } from "lucide-react";

export default function Brands() {
  const brands = [
    { name: "Samsung", logo: "/brands/samsung.svg" },
    { name: "LG Electronics", logo: "/brands/lg.svg" },
    { name: "Whirlpool", logo: "/brands/whirlpool.svg" },
    { name: "Bosch", logo: "/brands/bosch.svg" },
    { name: "GE Profile / Café", logo: "/brands/ge.svg" },
    { name: "KitchenAid", logo: "/brands/kitchenaid.svg" },
    { name: "Maytag", logo: "/brands/maytag.svg" },
    { name: "Frigidaire", logo: "/brands/frigidaire.svg" },
    { name: "Electrolux", logo: "/brands/electrolux.svg" },
    { name: "Miele", logo: "/brands/miele.svg" },
  ];

  return (
    <section className="py-6 sm:py-9 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Comprehensive Brand Expertise</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
              Factory-Trained On All Major Brands & Systems
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Using 100% Genuine OEM Factory Replacement Parts</span>
          </div>
        </div>

        {/* Brands Grid with Clean White Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="p-2 sm:p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center h-12 sm:h-16"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="h-5 sm:h-8 w-full max-w-[7rem] object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
