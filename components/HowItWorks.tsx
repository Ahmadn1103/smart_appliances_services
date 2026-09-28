import { Calendar, Search, Wrench, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Calendar,
      title: "Schedule in 60 Seconds",
      description:
        "Select your service online or call our friendly dispatch team. Choose a convenient 2-hour arrival window with same-day emergency slots available.",
    },
    {
      step: "02",
      icon: Search,
      title: "Expert Diagnostic",
      description:
        "Our certified technician arrives promptly in uniform, inspects your appliance with precision digital diagnostic tools, and pinpoints the root cause.",
    },
    {
      step: "03",
      icon: Wrench,
      title: "Upfront Approval & Fix",
      description:
        "We give you a transparent flat-rate quote. Once approved, your $89 diagnostic fee is credited 100% toward the repair, completed immediately using genuine OEM parts.",
    },
    {
      step: "04",
      icon: CheckCircle,
      title: "Tested & Warrantied",
      description:
        "We perform full diagnostic load testing to ensure peak efficiency, clean up completely, and back the repair with our 30-day parts and labor warranty.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#060b16] tracking-tight">
            How Smart Appliance Services Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From the moment you contact us to our final test run, experience an effortless and courteous service journey.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-xl transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#060b16] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Step {item.step} Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
