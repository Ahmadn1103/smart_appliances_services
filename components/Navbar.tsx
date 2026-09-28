"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, QrCode } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenSocial?: () => void;
}

export default function Navbar({ onOpenBooking, onOpenSocial }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLeaving, setMenuLeaving] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const closeMenu = () => {
    if (!menuOpen || menuLeaving) return;
    setMenuLeaving(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setMenuLeaving(false);
    }, 160);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    setMenuOpen(true);
  };

  useEffect(() => {
    setMenuOpen(false);
    setMenuLeaving(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, menuLeaving]);

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          onClick={closeMenu}
          className={`menu-veil fixed inset-0 z-40 bg-slate-900/25 md:hidden ${menuLeaving ? "is-leaving" : ""}`}
          aria-label="Close menu"
        />
      )}

      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 w-full px-3 sm:px-6 pointer-events-none">
        <div
          className={`max-w-5xl mx-auto pointer-events-auto border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08),0_2px_10px_rgba(37,99,235,0.06)] transition-all duration-200 ${
            menuOpen
              ? "rounded-3xl"
              : "rounded-full"
          }`}
        >
          <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-200 shadow-xs group-hover:border-blue-500 group-hover:scale-105 group-active:scale-95 transition-all duration-200 shrink-0">
                <Image
                  src="/smart-logo.jpeg"
                  alt="Smart Appliance Services Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-200 leading-none">
                    SMART APPLIANCE
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase leading-none">
                    SERVICES
                  </span>
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center bg-slate-100/90 border border-slate-200/80 p-1 rounded-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-chip px-4 py-1.5 rounded-full text-xs font-bold ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="tel:5714598155"
                className="pressable hidden lg:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-white text-slate-800 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:shadow-md"
                title="Call 571-459-8155 (Primary Dispatch)"
              >
                <Phone className="pressable-icon w-3.5 h-3.5 text-blue-600" />
                <span>(571) 459-8155</span>
              </a>

              <a
                href="tel:5714598155"
                className="icon-btn lg:hidden p-1.5 sm:p-2 rounded-full text-blue-600 bg-slate-100 border border-slate-200 hover:bg-white hover:border-blue-300"
                aria-label="Call Dispatch"
                title="Call (571) 459-8155"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="btn-cta inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-white relative z-10" />
                <span className="hidden sm:inline relative z-10">Book Service</span>
                <span className="sm:hidden relative z-10">Book</span>
              </button>

              {onOpenSocial && (
                <button
                  onClick={onOpenSocial}
                  type="button"
                  className="icon-btn hidden md:inline-flex p-2 rounded-full text-slate-700 bg-slate-100 hover:bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 cursor-pointer shadow-xs"
                  aria-label="Open social QR codes"
                  title="Scan to connect"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={toggleMenu}
                type="button"
                className={`icon-btn md:hidden p-1.5 sm:p-2 rounded-full border cursor-pointer shadow-xs shrink-0 ${
                  menuOpen
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-slate-700 bg-slate-100 hover:bg-white border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                title="Menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div
              className={`header-dropdown md:hidden px-3 pb-3 ${menuLeaving ? "is-leaving" : ""}`}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-1.5">
                <nav className="grid grid-cols-3 gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`pressable px-2 py-2.5 rounded-xl text-xs font-bold text-center ${
                          isActive
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-700 hover:bg-white hover:text-blue-700"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
