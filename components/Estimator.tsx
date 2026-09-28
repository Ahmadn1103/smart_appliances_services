"use client";

import { useState } from "react";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  Tag,
  Clock
} from "lucide-react";

interface EstimatorProps {
  onOpenBooking: (serviceName?: string, notes?: string) => void;
}

export default function Estimator({ onOpenBooking }: EstimatorProps) {
  const [serviceType, setServiceType] = useState<string>("Refrigerators & Freezers");
  const [selectedIssue, setSelectedIssue] = useState<string>("Not Cooling / Temperature Fluctuating");
  const [urgency, setUrgency] = useState<string>("Today (Urgent)");

  const issueOptions: Record<string, string[]> = {
    "Washers": [
      "Washer Not Draining or Agitating",
      "Violent Drum Shaking / Off-Balance",
      "Loud Squeaking / Bearing Roar",
      "Leaking Water From Door Boot or Base",
      "Digital Error Code / Inverter Power Fault",
    ],
    "Dryers": [
      "Dryer Drum Running Cold / Zero Heat",
      "Taking 2+ Cycles To Dry Clothes",
      "Burning Smell / High Thermal Hazard",
      "Loud Squeal / Broken Belt or Roller",
      "Exterior Vent Flap Blocked / No Airflow",
    ],
    "Refrigerators & Freezers": [
      "Not Cooling / Temperature Fluctuating",
      "Ice Maker Jammed or Not Producing",
      "Frost & Ice Buildup on Rear Wall",
      "Water Pooling Under Crisper Drawers",
      "Compressor Clicking / Buzzing Noise",
    ],
    "Ranges / Ovens & Cooktops": [
      "Oven Not Heating / Burner Clicking",
      "Gas Igniter Failing or Glow Bar Dim",
      "Uneven Baking / Temperature Off by 25°F+",
      "Glass Induction / Cooktop Sensor Fault",
      "Door Hinges Broken / Latch Locked",
    ],
    "Dishwashers": [
      "Standing Dirty Water in Tub Bottom",
      "Cloudy Dishes / Poor Wash Pressure",
      "Water Leaking Onto Kitchen Floor",
      "Error Code Flashing / Cycle Halts",
      "Door Not Latching / Float Switch Fault",
    ],
    "Garbage Disposals": [
      "Motor Humming / Impellers Jammed Solid",
      "Water Leaking From Bottom Seal or Flange",
      "Dead Silent / Reset Button Tripping",
      "Slow Draining / Kitchen Sink Backing Up",
      "Loud Grinding / Foreign Object Lodged",
    ],
  };

  const handleServiceChange = (service: string) => {
    setServiceType(service);
    setSelectedIssue(issueOptions[service][0]);
  };

  const getEstimateDetails = () => {
    return {
      priceRange: "$89 Diagnostic Fee (Credited With Repair)",
      duration: "1 - 2 hours on-site",
      diagnosticNote: "$89 Diagnostic Fee is 100% credited toward your approved parts & labor repair",
      benefit: "Repairing your appliance extends its lifespan by 5-10 years and cuts household power waste.",
    };
  };

  const details = getEstimateDetails();

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Honest & Upfront Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060b16] tracking-tight">
            Diagnostic & Cost Estimator
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            No surprise invoices. Know exactly how our <strong className="text-slate-900">$89 diagnostic fee</strong> works and get a clear picture before our technician arrives at your DMV residence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Options Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              
              {/* 1. Service Type */}
              <div>
                <p className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Step 1: Select Appliance Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(issueOptions).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleServiceChange(cat)}
                      className={`p-2.5 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        serviceType === cat
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-600 shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Specific Issue */}
              <div>
                <p className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Step 2: What is the primary failure symptom?
                </p>
                <div className="space-y-2">
                  {issueOptions[serviceType].map((issue) => (
                    <button
                      key={issue}
                      type="button"
                      onClick={() => setSelectedIssue(issue)}
                      className={`w-full p-3 rounded-2xl text-xs sm:text-sm font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedIssue === issue
                          ? "bg-blue-50 text-blue-900 border-blue-400 font-bold shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span>{issue}</span>
                      {selectedIssue === issue && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Urgency */}
              <div>
                <p className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Step 3: Preferred Service Timeline
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Today (Urgent)", label: "Today (Emergency)" },
                    { id: "Tomorrow", label: "Tomorrow" },
                    { id: "This Week", label: "Later This Week" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setUrgency(item.id)}
                      className={`p-2.5 rounded-full text-xs font-semibold border text-center transition-all cursor-pointer ${
                        urgency === item.id
                          ? "bg-blue-600 text-white font-bold border-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Card (Luxury Dark Theme matching logo) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#060b16] via-[#09152e] to-[#040813] text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold">
                      Estimate Summary
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {serviceType}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-cyan-300 border border-blue-400/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Selected Symptom:</p>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {selectedIssue}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Diagnostic Fee:</span>
                      <span className="text-sm font-extrabold text-cyan-300">
                        $89 (Credited With Repair)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Parts & Labor Warranty:</span>
                      <span className="text-sm font-bold text-white">
                        30-Day Guarantee
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Estimated Duration:</span>
                      <span className="text-sm font-bold text-white">
                        {details.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Service Coverage:</span>
                      <span className="text-sm font-bold text-cyan-300">
                        DMV & Surrounding
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-950/70 border border-blue-500/40 text-xs text-cyan-200 flex items-start gap-2">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>{details.diagnosticNote}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking(
                      serviceType,
                      `Issue: ${selectedIssue} | Urgency: ${urgency} | $89 Diagnostic Fee Accepted`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3.5 px-4 rounded-full font-black text-sm shadow-[0_4px_25px_rgba(37,99,235,0.45)] border border-white/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Schedule Dispatch For This Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  No advance credit card required • Pay upon diagnosis
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
