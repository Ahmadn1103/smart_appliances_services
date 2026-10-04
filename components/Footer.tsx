"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APPLIANCES } from "@/lib/appliances";
import QRCode from "qrcode";
import { Phone, Mail, MapPin, ShieldCheck, Clock, Tag, QrCode, ArrowRight, ExternalLink } from "lucide-react";

interface FooterProps {
  onOpenSocial?: () => void;
}

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

/**
 * Footer service links jump to the booking panel for that appliance (not the tile grid), even when the URL
 * already has the hash; on other pages the link navigates home to the same spot.
 */
function goToServices(e: React.MouseEvent<HTMLAnchorElement>, slug?: string) {
  const section = document.getElementById("services");
  if (!section) return;
  e.preventDefault();
  if (!slug) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#services");
    return;
  }
  window.dispatchEvent(new CustomEvent("select-appliance", { detail: slug }));
  // Wait a frame so the panel for the chosen appliance has rendered before scrolling to it.
  requestAnimationFrame(() => {
    document.getElementById("appliance-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  history.replaceState(null, "", "#appliance-panel");
}

export default function Footer({ onOpenSocial }: FooterProps) {
  const [activeQrType, setActiveQrType] = useState<"facebook" | "instagram">("facebook");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const qrOptions = {
    facebook: {
      url: "https://www.facebook.com/smartapplianceservicess/",
      label: "Facebook",
      note: "Official Page & Special Offers",
    },
    instagram: {
      url: "https://instagram.com/ssmartappliance",
      label: "Instagram",
      note: "@ssmartappliance Repair Reels",
    },
  };

  useEffect(() => {
    QRCode.toDataURL(qrOptions[activeQrType].url, {
      width: 220,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((dataUri) => {
        setQrDataUrl(dataUri);
      })
      .catch((err) => console.error("Error generating footer QR code:", err));
  }, [activeQrType]);

  return (
    <footer className="relative bg-slate-50 text-slate-700 border-t border-slate-200">
      {/* Main Footer Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Brand Info & Identity (4 columns on desktop) */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm group-hover:border-blue-500 transition-all shrink-0">
                <Image
                  src="/smart-logo.png"
                  alt="Smart Appliance Services Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-none">
                    SMART APPLIANCE
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase leading-none">
                    SERVICES
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-xs text-slate-500 italic font-medium">
                    Appliance repairs? Leave it to us.
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              Reliable appliance repair across the DMV with over <strong className="text-slate-900 font-semibold">15+ years of hands-on expertise</strong>. Founded in 2021 and proudly partnered with <strong className="text-blue-700 font-semibold">10+ leading home warranty companies</strong>.
            </p>

            {/* Highlights Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>$89 Diagnostic (Credited)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Warranty</span>
              </span>
            </div>

            {/* Social Media Quick Connect */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Official Social Channels
              </span>
              <div className="flex flex-wrap items-center gap-2">
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

          {/* Core Appliance Services (3 columns on desktop, list split in 2 columns) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Services</span>
            </h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 sm:gap-y-1 text-sm font-semibold text-slate-700 [&_a]:py-1.5 sm:[&_a]:py-1">
              {APPLIANCES.map((appliance) => (
                <li key={appliance.slug}>
                  <Link
                    href={`/?service=${appliance.slug}#appliance-panel`}
                    onClick={(e) => goToServices(e, appliance.slug)}
                    className="group inline-flex items-center gap-2 hover:text-blue-600 transition-all duration-200 hover:translate-x-0.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-600 group-hover:scale-150 transition-all" aria-hidden="true" />
                    {appliance.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3 mt-1 border-t border-slate-200">
              <Link
                href="/#services"
                onClick={(e) => goToServices(e)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* DMV Dispatch & Contact Panel (3.5 columns on desktop) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>DMV Dispatch</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Primary Hotline
                </span>
                <a
                  href="tel:5718992995"
                  className="flex items-center gap-1.5 text-slate-900 font-black text-base hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>(571) 899-2995</span>
                </a>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Secondary Line
                </span>
                <a
                  href="tel:5719924222"
                  className="flex items-center gap-1.5 text-slate-700 font-bold text-xs hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>(571) 992-4222</span>
                </a>
              </div>

              <div className="pt-1 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div>Mon–Fri: 8AM–5PM</div>
                    <div>Saturday: 9AM–4PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="text-[11px]">DC • Maryland • Virginia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded QR Code Panel (2.5 columns on desktop) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>Scan QR Code</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
              {/* QR Toggle Buttons */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-full w-full">
                <button
                  type="button"
                  onClick={() => setActiveQrType("facebook")}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                    activeQrType === "facebook"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQrType("instagram")}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                    activeQrType === "instagram"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Instagram
                </button>
              </div>

              {/* QR Image Frame */}
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`Smart Appliance Services ${qrOptions[activeQrType].label} QR Code`}
                    className="w-32 h-32 object-contain"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-xs text-slate-400">
                    Loading QR...
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-900 block">
                  {qrOptions[activeQrType].note}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Scan with your phone camera
                </span>
              </div>

              <a
                href={qrOptions[activeQrType].url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-full text-white text-xs font-bold transition-colors ${
                  activeQrType === "facebook"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                <span>Open {qrOptions[activeQrType].label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-footer Legal & Trust Bar */}
      <div className="border-t border-slate-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smart Appliance Services LLC. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs">
            <span className="text-blue-700 font-semibold">$89 Diagnostic (Credited With Repair)</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-900 font-semibold">30-Day Labor & Parts Warranty</span>
            <span className="text-slate-300">•</span>
            <span>10+ Home Warranty Partners</span>
            <span className="text-slate-300">•</span>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
