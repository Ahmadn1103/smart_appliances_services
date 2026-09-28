"use client";

import { useState } from "react";
import { useBookingSubmit } from "@/components/useBookingSubmit";
import HoneypotField from "@/components/HoneypotField";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import SocialModal from "@/components/SocialModal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Wrench,
} from "lucide-react";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function ContactClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [website, setWebsite] = useState("");
  const { submit, pending, error, reference, reset: resetBooking } = useBookingSubmit();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zip: "",
    service: "Refrigerators & Freezers",
    notes: "",
  });

  const handleOpenBooking = () => setIsModalOpen(true);
  const handleOpenSocial = () => setIsSocialModalOpen(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      service: formData.service,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.zip,
      notes: formData.notes,
      website,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Floating Glass Pill Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} onOpenSocial={handleOpenSocial} />

      <main className="flex-1 pt-14 sm:pt-20">
        {/* Contact Page Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-3 pb-6 sm:pt-6 sm:pb-10 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
          <div className="relative max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>We&apos;re Ready to Help Across the DMV</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Get in Touch with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                Smart Appliance Services
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have a broken appliance or need urgent diagnostics? Call our direct DMV lines or fill out the dispatch request below for same-day priority scheduling.
            </p>
          </div>
        </section>

        {/* Content Grid: Contact Details & Dispatch Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Phone Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Call Dispatch Desks</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                      Primary DMV Line
                    </span>
                    <a
                      href="tel:5714598155"
                      className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors flex items-center justify-between group"
                    >
                      <span>(571) 459-8155</span>
                      <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Secondary Support Line
                    </span>
                    <a
                      href="tel:5718992995"
                      className="text-xl font-black text-slate-800 hover:text-blue-600 transition-colors flex items-center justify-between group"
                    >
                      <span>(571) 899-2995</span>
                      <Phone className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Business Hours Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Direct</span>
                  </div>
                  <a
                    href="mailto:Smart.applianceservices.va@gmail.com"
                    className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors break-all"
                  >
                    Smart.applianceservices.va@gmail.com
                  </a>
                </div>

                {/* Business Hours */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    <span>Operating Hours</span>
                  </div>

                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Monday – Friday:</span>
                      <span className="font-bold text-slate-900">8:00 AM – 5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Saturday:</span>
                      <span className="font-bold text-slate-900">9:00 AM – 4:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Sunday:</span>
                      <span className="font-bold text-rose-600">Closed</span>
                    </div>
                  </div>
                </div>

                {/* DMV Service Region */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>Service Area</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Mobile service vans serving <strong className="text-slate-900">Washington DC</strong>, <strong className="text-slate-900">Maryland</strong>, and <strong className="text-slate-900">Northern Virginia</strong> (Fairfax, Arlington, Alexandria, Loudoun, Prince William, Montgomery County, and surrounding DMV areas).
                  </p>
                </div>

                {/* Official Social Links */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Official Social Channels
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="https://www.facebook.com/smartapplianceservicess/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-semibold transition-all shadow-xs"
                    >
                      <FacebookIcon className="w-4 h-4" />
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <a
                      href="https://instagram.com/ssmartappliance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-600 text-pink-700 hover:text-white border border-pink-200 hover:border-pink-600 text-xs font-semibold transition-all shadow-xs"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>@ssmartappliance</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Dispatch Request Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                
                <div className="space-y-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>$89 Diagnostic Fee (Credited With Repair)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Request an Appliance Technician
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Fill out the form below. Our dispatch coordinator will contact you immediately to lock in your arrival window.
                  </p>
                </div>

                {reference ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900">
                        Dispatch Request Received!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our dispatch team is reviewing your request for <strong className="text-blue-700 font-semibold">{formData.service}</strong> and will call <strong className="text-slate-900">{formData.phone}</strong> shortly.
                      </p>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        Reference <strong className="font-mono text-blue-700">{reference}</strong>. A confirmation email is on its way to <strong className="text-slate-900">{formData.email}</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-md mx-auto text-xs text-slate-700 space-y-1 text-left">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Confirmed Service Terms</span>
                      </div>
                      <div>✓ $89 Diagnostic Fee 100% credited toward your approved repair</div>
                      <div>✓ 30-Day Labor & Parts Warranty included</div>
                      <div>✓ Certified & background-checked technicians</div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetBooking();
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            zip: "",
                            service: "Refrigerators & Freezers",
                            notes: "",
                          });
                        }}
                        className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer border border-slate-200"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <HoneypotField value={website} onChange={setWebsite} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-1" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input id="contact-1"
                          type="text"
                          required
                          placeholder="e.g. John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-2" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input id="contact-2"
                          type="tel"
                          required
                          placeholder="e.g. (571) 459-8155"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-3" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input id="contact-3"
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-4" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          DMV Zip Code <span className="text-rose-500">*</span>
                        </label>
                        <input id="contact-4"
                          type="text"
                          required
                          placeholder="e.g. 22102, 20001, 20850"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-5" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Appliance Needing Service <span className="text-rose-500">*</span>
                      </label>
                      <select id="contact-5"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer"
                      >
                        <option value="Refrigerators & Freezers">Refrigerators & Freezers</option>
                        <option value="Washers (Front & Top Load)">Washers (Front & Top Load)</option>
                        <option value="Dryers (Gas & Electric)">Dryers (Gas & Electric)</option>
                        <option value="Dishwashers">Dishwashers</option>
                        <option value="Ranges, Ovens & Cooktops">Ranges, Ovens & Cooktops</option>
                        <option value="Garbage Disposals">Garbage Disposals</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-6" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Appliance Brand & Issue Description
                      </label>
                      <textarea id="contact-6"
                        rows={3}
                        placeholder="e.g. Samsung French Door Refrigerator: freezer working but fridge section is warm..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      {error && (
                        <p role="alert" className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm font-medium text-rose-700">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={pending}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {pending ? "Sending your request…" : "Submit Dispatch Request"}
                      </button>

                      <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                        <span className="text-blue-700 font-semibold">✓ $89 Credited Toward Repair</span>
                        <span>✓ 30-Day Warranty</span>
                        <span>✓ DMV Rapid Mobile Dispatch</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenSocial={handleOpenSocial} />

      {/* Modals */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SocialModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />
    </div>
  );
}
