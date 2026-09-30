"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Calendar, Menu, X, QrCode } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenSocial?: () => void;
}

export default function Navbar({ onOpenBooking, onOpenSocial }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "service-area", label: "Service Area" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // navLinks is a constant list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        onClick={closeMenu}
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen}
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-slate-900/30 lg:hidden transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 w-full px-3 sm:px-6 pointer-events-none">
        <div
          className="max-w-6xl mx-auto pointer-events-auto border border-slate-200/90 bg-white/95 rounded-[1.75rem] shadow-[0_10px_35px_rgba(0,0,0,0.08),0_2px_10px_rgba(37,99,235,0.06)]"
        >
          <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            <a href="#home" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-200 shadow-xs group-hover:border-blue-500 group-hover:scale-105 group-active:scale-95 transition-all duration-200 shrink-0">
                <Image
                  src="/smart-logo.jpeg"
                  alt="Smart Appliance Services Logo"
                  fill
                  sizes="56px"
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
            </a>

            <nav className="hidden lg:flex items-center bg-slate-100/90 border border-slate-200/80 p-1 rounded-full">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`nav-chip px-4 py-1.5 rounded-full text-xs font-bold ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="tel:5714598155"
                className="pressable hidden xl:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-white text-slate-800 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:shadow-md"
                title="Call 571-459-8155 (Primary Dispatch)"
              >
                <Phone className="pressable-icon w-3.5 h-3.5 text-blue-600" />
                <span>(571) 459-8155</span>
              </a>

              <a
                href="tel:5714598155"
                className="icon-btn xl:hidden p-2.5 sm:p-2 rounded-full text-blue-600 bg-slate-100 border border-slate-200 hover:bg-white hover:border-blue-300"
                aria-label="Call Dispatch"
                title="Call (571) 459-8155"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="btn-cta inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-white relative z-10" />
                <span className="hidden sm:inline relative z-10">Book Service</span>
                <span className="sm:hidden relative z-10">Book</span>
              </button>

              {onOpenSocial && (
                <button
                  onClick={onOpenSocial}
                  type="button"
                  className="icon-btn hidden lg:inline-flex p-2 rounded-full text-slate-700 bg-slate-100 hover:bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 cursor-pointer shadow-xs"
                  aria-label="Open social QR codes"
                  title="Scan to connect"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={toggleMenu}
                type="button"
                className={`icon-btn lg:hidden p-2.5 sm:p-2 rounded-full border cursor-pointer shadow-xs shrink-0 ${
                  menuOpen
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-slate-700 bg-slate-100 hover:bg-white border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                title="Menu"
              >
                <span className="relative block w-4 h-4">
                  <Menu
                    className={`absolute inset-0 w-4 h-4 transition-all duration-300 ease-out motion-reduce:transition-none ${
                      menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-4 h-4 transition-all duration-300 ease-out motion-reduce:transition-none ${
                      menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div
            id="mobile-nav"
            inert={!menuOpen}
            aria-hidden={!menuOpen}
            className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
              menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <div className="px-3 pb-3">
                <nav aria-label="Mobile navigation" className="rounded-2xl bg-slate-50 border border-slate-200 p-1.5 grid grid-cols-3 gap-1">
                  {navLinks.map((link, i) => {
                    const isActive = activeId === link.id;
                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={closeMenu}
                        style={{ transitionDelay: menuOpen ? `${60 + i * 30}ms` : "0ms" }}
                        className={`px-2 py-3 rounded-xl text-xs font-bold text-center transition-[opacity,transform,background-color,color] duration-300 ease-out motion-reduce:transition-none active:scale-95 ${
                          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                        } ${
                          isActive
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-700 hover:bg-white hover:text-blue-700"
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
