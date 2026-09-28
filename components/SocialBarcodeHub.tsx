"use client";

import QrCodeCard from "./QrCodeCard";
import { QrCode, Sparkles, Star, Phone } from "lucide-react";

// Custom Brand Icons (clean SVG)
function GoogleIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function SocialBarcodeHub() {
  return (
    <section
      id="connect-barcodes"
      className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Official Connect & Barcode Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Connect With Us & <span className="text-blue-600">Scan Directly</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Point your smartphone camera at any barcode below to leave a 5-star Google review, follow our official Facebook updates, or watch our technicians live on Instagram.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Star Rated Local Service</span>
            </span>
            <span>•</span>
            <span>Smart Appliance Services LLC • DMV</span>
          </div>
        </div>

        {/* 4 QR Barcode Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Google Account & Reviews */}
          <QrCodeCard
            type="google"
            title="Google Business"
            subtitle="Scan to read verified reviews or leave your 5-star rating on our Google profile."
            defaultUrl="https://g.page/r/smartapplianceservices"
            badge="5.0 ★ Google Verified"
            icon={<GoogleIcon />}
            brandColor="#4285F4"
            accentGradient="linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)"
            actionText="Open Google Reviews"
          />

          {/* 2. Facebook Page */}
          <QrCodeCard
            type="facebook"
            title="Facebook Page"
            subtitle="Scan to follow our official Facebook page for seasonal maintenance tips & discounts."
            defaultUrl="https://www.facebook.com/smartapplianceservicess/"
            badge="Official Community"
            icon={<FacebookIcon />}
            brandColor="#1877F2"
            accentGradient="linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)"
            actionText="Visit Facebook Page"
          />

          {/* 3. Instagram Page */}
          <QrCodeCard
            type="instagram"
            title="Instagram Page"
            subtitle="Scan to watch behind-the-scenes appliance repairs, technician reels, and stories."
            defaultUrl="https://instagram.com/ssmartappliance"
            badge="@ssmartappliance"
            icon={<InstagramIcon />}
            brandColor="#E1306C"
            accentGradient="linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)"
            actionText="Follow on Instagram"
          />

          {/* 4. Instant Call / Dispatch Barcode */}
          <QrCodeCard
            type="phone"
            title="Direct Dispatch"
            subtitle="Scan with your phone to instantly dial our dispatch desk for same-day service."
            defaultUrl="tel:5714598155"
            badge="Live DMV Dispatch"
            icon={<Phone className="w-6 h-6 text-white" />}
            brandColor="#2563eb"
            accentGradient="linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%)"
            actionText="Call (571) 459-8155"
          />

        </div>

        {/* Footer info pill */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Fast, frictionless scan from any iPhone or Android camera.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
