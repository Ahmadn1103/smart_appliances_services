"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Tag,
  ShieldCheck,
  Award,
  MapPin,
  BadgeCheck,
  Clock,
  QrCode,
} from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getFaqIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Tag className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 1:
        return <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />;
      case 2:
        return <Award className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 3:
        return <MapPin className="w-4 h-4 text-rose-600 shrink-0" />;
      case 4:
        return <BadgeCheck className="w-4 h-4 text-amber-600 shrink-0" />;
      case 5:
        return <Clock className="w-4 h-4 text-cyan-600 shrink-0" />;
      case 6:
        return <QrCode className="w-4 h-4 text-purple-600 shrink-0" />;
      default:
        return <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <section id="faq" className="py-8 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060b16] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear, honest answers about our $89 diagnostic fee, 30-day warranty, and appliance repair services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-3xl border bg-slate-50/60 overflow-hidden card-lift ${
                  isOpen ? "border-blue-300 shadow-md" : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#060b16] hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {getFaqIcon(index)}
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
