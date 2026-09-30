import { ShieldCheck, Award } from "lucide-react";

export default function Brands() {
  const brands = [
    { name: "Samsung", type: "Smart Appliances" },
    { name: "LG Electronics", type: "Inverter DirectDrive" },
    { name: "Whirlpool", type: "Laundry & Kitchen" },
    { name: "Bosch", type: "Quiet Dish & Cook" },
    { name: "GE Profile / Café", type: "Complete Suites" },
    { name: "KitchenAid", type: "Gourmet Ranges" },
    { name: "Sub-Zero & Wolf", type: "Luxury Refrigeration" },
    { name: "Maytag", type: "Commercial Tech" },
    { name: "Frigidaire", type: "Cooling & Cooking" },
    { name: "Thermador", type: "Luxury Kitchen Suites" },
    { name: "Electrolux", type: "Swedish Precision" },
    { name: "Miele", type: "German Engineering" },
  ];

  return (
    <section className="py-8 sm:py-14 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Comprehensive Brand Expertise</span>
            </div>
            <h3 className="text-lg sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Factory-Trained On All Major Brands & Systems
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Using 100% Genuine OEM Factory Replacement Parts</span>
          </div>
        </div>

        {/* Brands Grid with Clean White Cards */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="p-2 sm:p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md hover:bg-blue-50/30 hover:-translate-y-0.5 transition-all duration-200 text-center flex flex-col justify-center items-center h-14 sm:h-20 group"
            >
              <p className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                {brand.name}
              </p>
              <p className="hidden sm:block text-[10px] text-slate-500 font-medium mt-0.5">
                {brand.type}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
