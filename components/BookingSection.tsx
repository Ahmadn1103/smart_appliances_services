"use client";

import { useState } from "react";
import { useBookingSubmit } from "@/components/useBookingSubmit";
import HoneypotField from "@/components/HoneypotField";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Check,
  Tag
} from "lucide-react";

interface BookingSectionProps {
  initialService?: string;
}

export default function BookingSection({ initialService = "Refrigerators & Freezers" }: BookingSectionProps) {
  const [service, setService] = useState(initialService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (8:00 AM - 12:00 PM)");
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const { submit, pending, error, reference, reset } = useBookingSubmit();

  const servicesList = [
    "Refrigerators & Freezers",
    "Washers",
    "Dryers",
    "Dishwashers",
    "Ranges & Ovens",
    "Garbage Disposals",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      service,
      name,
      phone,
      email,
      address,
      date: preferredDate,
      timeSlot,
      brand,
      notes,
      website,
    });
  };

  return (
    <section id="booking" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Fast DMV Mobile Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060b16] tracking-tight">
            Schedule Your Appliance Repair
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Book online in seconds. Our dispatch desk will confirm your 2-hour arrival window. Upfront <strong className="text-slate-900">$89 diagnostic fee</strong> credited 100% with your approved repair.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {reference ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blue-200 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Appointment Dispatch Requested
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#060b16] mt-3">
                  Thank You, {name}!
                </h3>
                <p className="text-slate-600 text-sm max-w-lg mx-auto mt-2">
                  Your repair request for <span className="font-bold text-slate-900">{service}</span> has been assigned to our local DMV mobile service route.
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Confirmation Ref:</span>
                  <span className="font-mono font-bold text-blue-700">{reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Appliance Service:</span>
                  <span className="font-bold text-slate-800">{service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Arrival Window:</span>
                  <span className="font-bold text-slate-800">{preferredDate || "Today/Tomorrow"}, {timeSlot.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Diagnostic Fee:</span>
                  <span className="font-bold text-emerald-600">$89 (Credited toward approved repair)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Warranty Coverage:</span>
                  <span className="font-bold text-slate-800">30-Day Labor & Parts</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="tel:5714598155"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call (571) 459-8155 Directly
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl space-y-8"
            >
              <HoneypotField value={website} onChange={setWebsite} />
              {/* 1. Select Service */}
              <div>
                <p className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  1. Which Appliance Needs Service? <span className="text-rose-500">*</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {servicesList.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setService(item)}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        service === item
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-600 shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Customer Contact Info */}
              <div>
                <p className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  2. Contact & Service Address
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (Mobile) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address (for confirmation) *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Service Street Address & Zip Code *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Appointment Slot */}
              <div>
                <p className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  3. Preferred Arrival Window
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900"
                    />
                  </div>

                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 appearance-none cursor-pointer"
                    >
                      <option>Morning (8:00 AM - 12:00 PM)</option>
                      <option>Early Afternoon (12:00 PM - 3:30 PM)</option>
                      <option>Late Afternoon / Evening (3:30 PM - 7:30 PM)</option>
                      <option>Earliest Available Emergency Slot</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Brand & Symptoms */}
              <div>
                <label htmlFor="booking-4" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  4. Brand & Problem Description
                </label>
                <div className="space-y-3">
                  <input id="booking-4"
                    type="text"
                    placeholder="Appliance Brand & Model (e.g., Samsung, Sub-Zero, LG, GE Profile)"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                  />

                  <textarea
                    rows={3}
                    placeholder="Describe the failure symptom (e.g., Refrigerator clicking noise, Washer error code UE, Dryer not heating)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              {/* Diagnostic Fee Agreement Pill */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
                <Tag className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <span className="font-bold">Transparent $89 Diagnostic Fee:</span> An expert certified technician visits your home with full digital diagnostics. Upon quote approval, your entire $89 fee is credited 100% directly toward your parts & labor repair.
                </div>
              </div>

              {/* Submit CTA Pill */}
              <div>
                {error && (
                  <p role="alert" className="mb-3 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm font-medium text-rose-700">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-base shadow-[0_4px_25px_rgba(37,99,235,0.45)] border border-white/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {pending ? "Sending your request…" : "Confirm & Dispatch Technician ($89 Diagnostic)"}
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  No advance payment required online. Pay upon diagnostic inspection.
                </p>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
