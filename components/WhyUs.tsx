import {
  ShieldCheck,
  Zap,
  Truck,
  Tag,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Award,
  Sparkles
} from "lucide-react";

export default function WhyUs() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Dependable Service",
      description:
        "We show up on time, respect your home, and get the job done right the first time. Clear communication with 2-hour arrival windows across the DMV area.",
      tag: "On-Time Dispatch",
    },
    {
      icon: Award,
      title: "Skilled & Certified Technicians",
      description:
        "Our technicians are fully trained, certified, and equipped with factory OEM schematics, digital thermal testers, and commercial-grade diagnostic tools.",
      tag: "Certified Master Techs",
    },
    {
      icon: Tag,
      title: "Fair & Transparent Pricing ($89 Diagnostic)",
      description:
        "No hidden fees or surprise add-ons. Our $89 comprehensive diagnostic fee is credited 100% directly toward your repair upon approval. Honest flat-rate pricing.",
      tag: "$89 Credited with Repair",
    },
    {
      icon: ShieldCheck,
      title: "30-Day Labor & Parts Warranty",
      description:
        "Every single repair and OEM component installed is backed by our full 30-day parts and labor guarantee. If the issue returns within 30 days, we return at zero charge.",
      tag: "30-Day Guarantee",
    },
    {
      icon: Truck,
      title: "Residential Appliance Experts",
      description:
        "From small sensor fixes to complex sealed refrigeration compressors and smart inverter washer tubs, we handle all residential appliance brands with care.",
      tag: "Appliances First",
    },
    {
      icon: Sparkles,
      title: "Precision Diagnostic Testing",
      description:
        "Every repair is followed by thorough system load testing to ensure calibrated temperature, silent operation, and long-term reliability for your household.",
      tag: "Smart Reliability",
    },
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>The Smart Appliance Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060b16] tracking-tight">
            Why DMV Homeowners Rely On Us
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Dependable service, certified technicians, upfront $89 diagnostic pricing, and our ironclad 30-day parts and labor warranty.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#060b16] flex items-center justify-center text-cyan-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 border border-blue-200">
                      {point.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#060b16] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standard on every DMV service dispatch</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
