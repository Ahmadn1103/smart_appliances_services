import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import BookingSection from "@/components/BookingSection";
import { EMAIL, SERVICE_BASES, SERVICE_RADIUS_MILES } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Contact Us</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Have a broken appliance? Call us or request a technician below and our dispatch team will confirm your arrival window.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Dispatch</span>
              </div>
              <a
                href="tel:5718992995"
                className="block px-4 py-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 hover:border-blue-400 transition-colors"
              >
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Primary DMV Line</span>
                <span className="text-xl font-black text-slate-900">(571) 899-2995</span>
              </a>
              <a
                href="tel:5719924222"
                className="block px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Secondary Support Line</span>
                <span className="text-base font-black text-slate-800">(571) 992-4222</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Email</span>
                </div>
                <a href={`mailto:${EMAIL}`} className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors break-all">
                  {EMAIL}
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Operating Hours</span>
                </div>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <dt>Monday – Friday</dt>
                    <dd className="font-bold text-slate-900">8:00 AM – 5:00 PM</dd>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <dt>Saturday</dt>
                    <dd className="font-bold text-slate-900">9:00 AM – 4:00 PM</dd>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <dt>Sunday</dt>
                    <dd className="font-bold text-rose-600">Closed</dd>
                  </div>
                </dl>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Service Area</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Mobile service within <strong className="text-slate-900">{SERVICE_RADIUS_MILES} miles of {SERVICE_BASES}</strong>.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Follow Us</span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.facebook.com/smartapplianceservicess/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-semibold transition-all"
                  >
                    Facebook <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                  </a>
                  <a
                    href="https://instagram.com/ssmartappliance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-600 text-pink-700 hover:text-white border border-pink-200 hover:border-pink-600 text-xs font-semibold transition-all"
                  >
                    @ssmartappliance <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <BookingSection
              heading="Request an Appliance Technician"
              subheading="Tell us what needs repair and when you are free."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
