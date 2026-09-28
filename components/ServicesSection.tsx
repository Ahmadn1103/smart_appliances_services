"use client";

import { useState } from "react";
import {
  Wrench,
  CheckCircle2,
  Clock,
  Shirt,
  Wind,
  Snowflake,
  Flame,
  Sparkles,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: "refrigerators",
      title: "Refrigerators & Freezers",
      category: "Refrigeration",
      badge: "Food Preservation",
      icon: Snowflake,
      accentColor: "from-cyan-600 to-blue-500",
      description:
        "Emergency cooling diagnostics and master repairs on French-door, side-by-side, column, and built-in luxury refrigerators. We replace inverter compressors, defrosters, sensors, and dual evaporator systems.",
      covered: [
        "French Door & Side-by-Side Units",
        "Built-in & Luxury Column Refrigerators",
        "Sealed System Inverter Compressors",
        "Evaporator Fan Motors & Defrost Systems",
        "Dual Ice Makers & Cold Water Valves",
      ],
      commonIssues: [
        "Fresh food section warm while freezer is freezing",
        "Frost and thick snow buildup on freezer back wall",
        "Clicking / buzzing sound from lower rear compressor",
        "Water leaking onto kitchen hardwoods or under drawers",
        "Ice maker stopped dispensing or jammed solid",
      ],
      benefit: "Immediate diagnostics protect hundreds of dollars of household groceries and restore factory sealed cooling.",
    },
    {
      id: "washers",
      title: "Washers (Front & Top Load)",
      category: "Laundry",
      badge: "Fabric Care",
      icon: Shirt,
      accentColor: "from-blue-600 to-cyan-500",
      description:
        "Precision troubleshooting for high-efficiency, commercial-style, and smart washing machines. We repair electronic mainboards, heavy direct-drive motors, drain pumps, water inlet valves, and vibration suspension struts.",
      covered: [
        "Front-Load & Top-Load Washers",
        "High-Efficiency (HE) Washers",
        "Direct-Drive & Inverter Motors",
        "Drain Pumps & Filter Housings",
        "Suspension Rods & Shock Absorbers",
      ],
      commonIssues: [
        "Washer won't spin or leaves clothes dripping wet",
        "Water won't drain (OE / 5E error codes)",
        "Violent shaking or loud banging during high-speed spin",
        "Water leaking from bottom or door gasket during wash",
        "Foul mildew smell or door latch locked shut",
      ],
      benefit: "Restoring drum spin cuts subsequent dryer cycle time by 35% and avoids purchasing expensive new appliances.",
    },
    {
      id: "dryers",
      title: "Dryers (Gas & Electric)",
      category: "Laundry",
      badge: "Heating & Safety",
      icon: Wind,
      accentColor: "from-red-600 to-amber-500",
      description:
        "Complete heating, thermal safety, and mechanical restoration for electric and gas residential dryers. We service heating coils, gas solenoids, thermal fuses, and drum drive rollers.",
      covered: [
        "Gas & Electric Dryers",
        "Heating Elements & Gas Burner Coils",
        "High-Limit Thermal Fuses & Sensors",
        "Drive Belts, Idler Pulleys & Rollers",
        "Igniters & Flame Proving Sensors",
      ],
      commonIssues: [
        "Clothes take 2+ cycles to dry thoroughly",
        "Drum spins but produces zero heat",
        "High-pitched screeching or squealing noise",
        "Burning odor / exterior cabinet very hot",
        "Dryer shuts down after 5 minutes of run time",
      ],
      benefit: "Restoring full heating and balanced drum rotation eliminates safety hazards and slashes utility costs.",
    },
    {
      id: "dishwashers",
      title: "Dishwashers",
      category: "Kitchen",
      badge: "Kitchen Sanitizing",
      icon: Sparkles,
      accentColor: "from-teal-600 to-emerald-500",
      description:
        "Deep diagnostic inspections on built-in and panel-ready dishwashers. We resolve poor cleaning pressure, standing tub water, soap dispenser failures, door latch switches, and floor leak alerts.",
      covered: [
        "Built-in & Panel-Ready Dishwashers",
        "Circulation Wash Pumps & Impellers",
        "Drain Pumps & Anti-Siphon Check Valves",
        "Heating Elements & High-Temp Sanitize",
        "Float Switches & AquaStop Leak Sensors",
      ],
      commonIssues: [
        "Standing filthy water in bottom of tub after cycle",
        "Dishes coming out dirty, gritty, or cloudy",
        "Dishwasher leaking soapy water onto kitchen floor",
        "Error codes flashing / cycle stops midway",
        "Door won't latch properly or won't start",
      ],
      benefit: "Restoring high-pressure wash arms and heated dry cycles saves gallons of water compared to hand dishwashing.",
    },
    {
      id: "ranges-ovens",
      title: "Ranges, Ovens & Cooktops",
      category: "Cooking",
      badge: "Culinary Heat",
      icon: Flame,
      accentColor: "from-rose-600 to-red-500",
      description:
        "Precision temperature calibration and component replacement for gas ranges, electric radiant glass cooktops, induction systems, and double wall ovens.",
      covered: [
        "Gas Ranges, Burners & Pilot Igniters",
        "Electric Radiant & Smooth Ceramic Glass",
        "High-Efficiency Induction Cooktops",
        "Double Wall Ovens & Convection Fans",
        "Bake & Broil Heating Elements",
      ],
      commonIssues: [
        "Gas burner clicking repeatedly without igniting",
        "Oven fails to reach set temperature / uneven baking",
        "Bake element cracked, sparked, or dead",
        "Oven door locked shut or hinges misaligned",
        "Touch screen control error codes (F-codes)",
      ],
      benefit: "Accurate temperature sensors ensure even cooking and prevent wasted household electricity or gas.",
    },
    {
      id: "garbage-disposals",
      title: "Garbage Disposals",
      category: "Disposals",
      badge: "Under-Sink Care",
      icon: UtensilsCrossed,
      accentColor: "from-emerald-600 to-teal-500",
      description:
        "Fast resolution for jammed flywheels, humming motors, dull blades, and under-sink plumbing leaks. We unjam seized units, replace worn seals, or install brand-new heavy-duty quiet disposals.",
      covered: [
        "Continuous & Batch Feed Disposals",
        "Stuck Impellers & Jammed Flywheels",
        "Under-Sink Flange & Gasket Seals",
        "Internal Thermal Overload Resets",
        "Dishwasher Drain Connector Line",
      ],
      commonIssues: [
        "Disposal hums loudly when switched on but won't turn",
        "Water leaking from bottom plate into sink cabinet",
        "Kitchen sink drain backs up and drains very slowly",
        "Disposal trips circuit breaker or under-unit reset button",
        "Persistent unpleasant odor despite sink cleaning",
      ],
      benefit: "Quick resolution restores kitchen hygiene, eliminates sink clogs, and prevents costly cabinet water damage.",
    },
  ];

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-y border-slate-200 text-slate-900 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>Dedicated Appliance Focus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Appliance Repair Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From precision refrigeration to laundry care, our certified technicians solve the toughest appliance issues. All visits feature our <strong className="text-slate-900">$89 diagnostic fee</strong> (100% credited with repair) and a <strong className="text-blue-600 font-bold">30-day parts & labor warranty</strong>.
          </p>

          {/* Service Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-600"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              All Services
            </button>
            {services.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.category)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === item.category
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-600"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group card-lift rounded-3xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Top Card Banner */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  
                  {/* Covered Components */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Components Repaired</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {service.covered.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Issues */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-extrabold text-slate-900 block mb-1.5">
                      Top Reported Issues:
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      {service.commonIssues.slice(0, 3).map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Diagnostic</span>
                      <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-blue-600" />
                        <span>$89 Credited with Repair</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectService(service.title)}
                      className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Booking Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-cyan-400/50 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">
                Need Fast Dispatch Across DC, Maryland, or Virginia?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Our technicians travel in fully stocked diagnostic vans with factory OEM replacement components.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:5714598155"
              className="px-6 py-3 rounded-full bg-white text-[#050b16] font-black text-xs sm:text-sm hover:bg-slate-200 transition-colors shadow-md"
            >
              Call (571) 459-8155
            </a>
            <button
              onClick={() => onSelectService("General Appliance Diagnostic")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/30 cursor-pointer"
            >
              Book Priority Repair
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
