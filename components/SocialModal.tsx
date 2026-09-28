"use client";

import { X, QrCode } from "lucide-react";
import QrCodeCard from "./QrCodeCard";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function SocialModal({ isOpen, onClose }: SocialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm menu-veil">
      <div className="menu-panel relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="icon-btn absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Scannable Channels</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Connect With Smart Appliance Services
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Scan below with your phone camera or click to follow our official Facebook page and Instagram account.
          </p>
        </div>

        {/* 2 Scannable QR Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <QrCodeCard
            title="Facebook Page"
            subtitle="Follow repairs, updates & seasonal deals"
            defaultUrl="https://www.facebook.com/smartapplianceservicess/"
            badge="Official Page"
            icon={<FacebookIcon />}
            brandColor="#1877F2"
            accentGradient="from-blue-600 to-indigo-600"
            actionText="Visit Facebook"
            type="facebook"
          />

          <QrCodeCard
            title="Instagram Reels"
            subtitle="Watch behind-the-scenes master repairs"
            defaultUrl="https://instagram.com/ssmartappliance"
            badge="@ssmartappliance"
            icon={<InstagramIcon />}
            brandColor="#E1306C"
            accentGradient="from-pink-600 via-purple-600 to-amber-500"
            actionText="Follow Instagram"
            type="instagram"
          />
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
          Smart Appliance Services LLC • Washington DC, Maryland & Northern Virginia
        </div>

      </div>
    </div>
  );
}
