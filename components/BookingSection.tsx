"use client";

import { useState } from "react";
import { useBookingSubmit } from "@/components/useBookingSubmit";
import HoneypotField from "@/components/HoneypotField";
import { BOOKING_SERVICE_LABELS } from "@/lib/appliances";
import { Calendar, CheckCircle2, Clock, Mail, MapPin, Phone, User } from "lucide-react";

interface BookingSectionProps {
  initialService?: string;
  /** When set, the appliance picker is hidden and this appliance is always booked. */
  lockedService?: string;
  heading?: string;
  subheading?: string;
}

const INPUT =
  "w-full pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder-slate-400";
const ICON = "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2";

export default function BookingSection({
  initialService = BOOKING_SERVICE_LABELS[0],
  lockedService,
  heading = "Schedule Your Appliance Repair",
  subheading = "Book online in seconds. Our dispatch desk will confirm your arrival window.",
}: BookingSectionProps) {
  const [service, setService] = useState(lockedService ?? initialService);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ service, name, phone, email, address, date: preferredDate, timeSlot, brand, notes, website });
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-black text-[#060b16] tracking-tight">{heading}</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">{subheading}</p>
      </div>

      {reference ? (
        <div className="text-center space-y-4 py-2">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-xl font-black text-[#060b16]">Thank You, {name}!</h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto mt-1">
              Your request for <span className="font-bold text-slate-900">{service}</span> is in. We will confirm your arrival window shortly.
            </p>
          </div>
          <dl className="max-w-sm mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Reference</dt>
              <dd className="font-mono font-bold text-blue-700">{reference}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Arrival window</dt>
              <dd className="font-bold text-slate-800">
                {preferredDate || "Today/Tomorrow"}, {timeSlot.split(" ")[0]}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Diagnostic fee</dt>
              <dd className="font-bold text-emerald-600">$89, credited toward repair</dd>
            </div>
          </dl>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <a
              href="tel:5714598155"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call (571) 459-8155
            </a>
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
            >
              Book Another Service
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <HoneypotField value={website} onChange={setWebsite} />

          {!lockedService && (
            <div>
              <label htmlFor="booking-service" className="sr-only">
                Appliance needing service
              </label>
              <select
                id="booking-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 cursor-pointer"
              >
                {BOOKING_SERVICE_LABELS.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <User className={ICON} aria-hidden="true" />
              <input type="text" required aria-label="Full name" placeholder="Full name *" value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
            </div>
            <div className="relative">
              <Phone className={ICON} aria-hidden="true" />
              <input type="tel" required aria-label="Mobile phone" placeholder="Mobile phone *" value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT} />
            </div>
            <div className="relative">
              <Mail className={ICON} aria-hidden="true" />
              <input type="email" required aria-label="Email" placeholder="Email (for confirmation) *" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
            </div>
            <div className="relative">
              <MapPin className={ICON} aria-hidden="true" />
              <input type="text" required aria-label="Service address with ZIP code" placeholder="Address & 5-digit ZIP *" value={address} onChange={(e) => setAddress(e.target.value)} className={INPUT} />
            </div>
            <div className="relative">
              <Calendar className={ICON} aria-hidden="true" />
              <input type="date" required aria-label="Preferred date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className={INPUT} />
            </div>
            <div className="relative">
              <Clock className={ICON} aria-hidden="true" />
              <select aria-label="Preferred arrival window" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className={`${INPUT} appearance-none cursor-pointer`}>
                <option>Morning (8:00 AM - 12:00 PM)</option>
                <option>Early Afternoon (12:00 PM - 3:30 PM)</option>
                <option>Late Afternoon / Evening (3:30 PM - 7:30 PM)</option>
                <option>Earliest Available Emergency Slot</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            aria-label="Appliance brand and model"
            placeholder="Brand & model (optional, e.g. Samsung, LG, GE)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder-slate-400"
          />
          <textarea
            rows={2}
            aria-label="Describe the problem"
            placeholder="What is it doing? (e.g. not cooling, error code, leaking)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder-slate-400 resize-none"
          />

          {error && (
            <p role="alert" className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-sm font-medium text-rose-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3.5 sm:py-3 px-5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? "Sending your request…" : "Confirm & Dispatch Technician"}
          </button>
          <p className="text-center text-[11px] text-slate-500">
            $89 diagnostic fee, credited 100% toward an approved repair. No payment online.
          </p>
        </form>
      )}
    </div>
  );
}
