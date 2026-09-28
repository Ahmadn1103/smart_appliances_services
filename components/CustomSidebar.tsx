"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Refrigerator,
  Shirt,
  Wind,
  Flame,
  UtensilsCrossed,
} from "lucide-react";

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceName?: string) => void;
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

interface SidebarPanelProps {
  onClose?: () => void;
  onOpenBooking: (serviceName?: string) => void;
  persistent?: boolean;
}

const servicesList = [
  { name: "Refrigerators & Freezers", href: "/services#refrigeration", icon: Refrigerator },
  { name: "Washers", href: "/services#washers", icon: Shirt },
  { name: "Dryers", href: "/services#dryers", icon: Wind },
  { name: "Dishwashers", href: "/services#dishwashers", icon: Sparkles },
  { name: "Ranges & Ovens", href: "/services#ranges-ovens", icon: Flame },
  { name: "Garbage Disposals", href: "/services#garbage-disposals", icon: UtensilsCrossed },
];

/** Shared sidebar content: used by the mobile/tablet drawer and the always-visible desktop panel. */
function SidebarPanel({ onClose, onOpenBooking, persistent = false }: SidebarPanelProps) {
  const pathname = usePathname();
  const close = () => onClose?.();

  return (
    <>
    {/* Top Header */}
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-200 flex items-center justify-between">
      <Link href="/" onClick={close} className="flex items-center gap-2.5 group">
        <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-200 shadow-xs">
          <Image
            src="/smart-logo.jpeg"
            alt="Smart Appliance Services"
            fill
            sizes="36px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
            SMART APPLIANCE
          </span>
          <span className="text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase mt-0.5">
            SERVICES
          </span>
        </div>
      </Link>

      {!persistent && (
        <button
          onClick={close}
          type="button"
          className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 px-5 py-5 space-y-6">
      
      {/* Quick Dispatch CTA Button */}
      <div className="space-y-2">
        <button
          onClick={() => {
            close();
            onOpenBooking();
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appliance Service</span>
        </button>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span className="text-blue-700 font-bold">✓ $89 Diagnostic (Credited)</span>
          <span>✓ 30-Day Warranty</span>
        </div>
      </div>

      {/* Primary Navigation Links */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1 mb-1.5">
          Navigation
        </span>
        <Link
          href="/"
          onClick={close}
          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            pathname === "/"
              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <span>Home</span>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </Link>

        <Link
          href="/services"
          onClick={close}
          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            pathname === "/services"
              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <span>All Services</span>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </Link>

        <Link
          href="/contact"
          onClick={close}
          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            pathname === "/contact"
              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <span>Contact & Dispatch</span>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </Link>
      </div>

      {/* 6 Appliances Services Quick Grid */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Appliances We Service
          </span>
          <span className="text-[10px] font-semibold text-blue-600">6 Core Categories</span>
        </div>

        <div className={persistent ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-2"}>
          {servicesList.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={close}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-all group"
              >
                <Icon className="w-4 h-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Call Desks */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Direct DMV Phone Lines
        </span>

        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
              Primary Dispatch Desk
            </span>
            <a
              href="tel:5714598155"
              className="text-lg font-black text-slate-900 hover:text-blue-600 transition-colors flex items-center justify-between mt-0.5"
            >
              <span>(571) 459-8155</span>
              <Phone className="w-4 h-4 text-blue-600" />
            </a>
          </div>

          <div className="pt-2 border-t border-blue-200/60">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Secondary Support
            </span>
            <a
              href="tel:5718992995"
              className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors flex items-center justify-between mt-0.5"
            >
              <span>(571) 899-2995</span>
              <Phone className="w-3.5 h-3.5 text-slate-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Hours & Coverage Pills */}
      <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-[11px] mb-1">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Hours of Operation</span>
        </div>
        <div className="flex justify-between">
          <span>Mon–Fri:</span>
          <span className="font-semibold text-slate-900">8:00 AM – 5:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Saturday:</span>
          <span className="font-semibold text-slate-900">9:00 AM – 4:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Sunday:</span>
          <span className="font-semibold text-rose-600">Closed</span>
        </div>

        <div className="pt-2 mt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Washington DC • Maryland • Virginia</span>
        </div>
      </div>

      {/* Social Channels */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Follow Us
        </span>
        <div className={persistent ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-2"}>
          <a
            href="https://www.facebook.com/smartapplianceservicess/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-bold transition-all shadow-xs"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span>Facebook</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://instagram.com/ssmartappliance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-600 hover:text-white border border-pink-200 text-xs font-bold transition-all shadow-xs"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@ssmartappliance</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

    </div>

    {/* Bottom Footer in Sidebar */}
    <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 space-y-1">
      <div className="font-semibold text-slate-700">
        Smart Appliance Services LLC
      </div>
      <div>15+ Years Hands-On Experience • 10+ Warranty Partners</div>
    </div>
    </>
  );
}

/** Slide-out drawer for mobile and tablet (hidden from the xl breakpoint up, where the desktop panel takes over). */
export default function CustomSidebar({ isOpen, onClose, onOpenBooking }: CustomSidebarProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end xl:hidden">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Panel */}
      <aside
        className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] h-full bg-white text-slate-900 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Sidebar"
      >
        <SidebarPanel onClose={onClose} onOpenBooking={onOpenBooking} />
      </aside>
    </div>
  );
}

/** Always-visible sidebar for desktop (xl and up). The layout reserves its width with `xl:pl-72` on the body. */
export function DesktopSidebar({ onOpenBooking }: { onOpenBooking: (serviceName?: string) => void }) {
  return (
    <aside
      className="hidden xl:flex fixed left-0 top-0 z-40 h-screen w-72 flex-col justify-between overflow-y-auto bg-white text-slate-900 border-r border-slate-200 shadow-[4px_0_24px_rgba(15,23,42,0.05)]"
      aria-label="Site navigation"
    >
      <SidebarPanel onOpenBooking={onOpenBooking} persistent />
    </aside>
  );
}
