"use client";

import { useState, useEffect } from "react";
import { useBookingSubmit } from "@/components/useBookingSubmit";
import { BOOKING_SERVICE_LABELS } from "@/lib/appliances";
import HoneypotField from "@/components/HoneypotField";
import { X, Calendar, Phone, CheckCircle2, ShieldCheck, Tag, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  notesPreload?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService = "",
  notesPreload = "",
}: BookingModalProps) {
  const [service, setService] = useState(preselectedService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState(notesPreload);
  const [website, setWebsite] = useState("");
  const { submit, pending, error, reference, reset } = useBookingSubmit();

  useEffect(() => {
    if (preselectedService) setService(preselectedService);
    if (notesPreload) setNotes(notesPreload);
  }, [preselectedService, notesPreload]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ service, name, phone, email, address, notes, website });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm menu-veil">
      <div className="menu-panel relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Schedule Dispatch</h3>
              <p className="text-[11px] text-blue-700 font-medium">$89 Diagnostic (100% Credited With Repair)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="icon-btn p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {reference ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-black text-slate-900">
                Dispatch Request Confirmed!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Reference <strong className="font-mono text-blue-700">{reference}</strong>. A confirmation email is on its way to <strong className="text-slate-900">{email}</strong>.
              </p>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Our Smart Appliance Services dispatch coordinator will contact you at <strong className="text-blue-700">{phone || "(571) 899-2995"}</strong> shortly to confirm your exact arrival time.
              </p>

              <div className="p-3.5 bg-blue-50 rounded-xl text-xs text-slate-700 border border-blue-200 max-w-sm mx-auto space-y-1 text-left">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Backed By Our Customer Guarantee</span>
                </div>
                <div>✓ $89 Diagnostic Fee 100% credited toward your approved repair</div>
                <div>✓ Backed by our 30-Day Labor & Parts Warranty</div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <HoneypotField value={website} onChange={setWebsite} />
              <div>
                <label htmlFor="modal-1" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Appliance Service Needed
                </label>
                <select id="modal-1"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 invalid:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="" disabled>
                    Choose your service
                  </option>
                  {BOOKING_SERVICE_LABELS.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-2" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input id="modal-2"
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="modal-3" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input id="modal-3"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-4" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input id="modal-4"
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="modal-5" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    DMV Zip Code
                  </label>
                  <input id="modal-5"
                    type="text"
                    required
                    placeholder="e.g. 22102, 20001"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-6" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Appliance Brand & Issue Description
                </label>
                <textarea id="modal-6"
                  rows={2}
                  placeholder="e.g. Samsung refrigerator warm, Whirlpool washer not spinning..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-700">$89 Diagnostic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Warranty</span>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2 text-xs font-medium text-rose-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                {pending ? "Submitting Request..." : "Confirm Dispatch Request"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
