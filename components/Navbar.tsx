"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Calendar, Menu, X, QrCode } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenSocial?: () => void;
}

const PHONES = [
  { tel: "5718992995", label: "(571) 899-2995", role: "Primary" },
  { tel: "5719924222", label: "(571) 992-4222", role: "Secondary" },
];

export default function Navbar({ onOpenBooking, onOpenSocial }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
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
  // Close the mobile call dropdown on outside tap or Escape
  useEffect(() => {
    if (!callOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!(e.target as HTMLElement).closest("[data-call-menu]")) setCallOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCallOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [callOpen]);

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
          className="max-w-7xl mx-auto pointer-events-auto border border-slate-200/90 bg-white/95 rounded-[1.75rem] shadow-[0_10px_35px_rgba(0,0,0,0.08),0_2px_10px_rgba(37,99,235,0.06)]"
        >
          <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
            <a href="#home" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="relative w-20 h-14 sm:w-32 sm:h-20 group-hover:scale-105 group-active:scale-95 transition-all duration-200 shrink-0">
                <Image
                  src="/smart-logo.png"
                  alt="Smart Appliance Services Logo"
                  fill
                  sizes="128px"
                  className="object-contain"
                  priority
                />
              </div>
            </a>

            <nav className="hidden lg:flex items-center bg-slate-100/90 border border-slate-200/80 p-1 rounded-full">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`nav-chip whitespace-nowrap px-2.5 xl:px-4 py-1.5 rounded-full text-xs font-bold ${
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
              {PHONES.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="pressable hidden 2xl:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-white text-slate-800 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:shadow-md"
                  title={`Call ${p.role}: ${p.label}`}
                >
                  <Phone className="pressable-icon w-3.5 h-3.5 text-blue-600" />
                  <span>{p.label}</span>
                </a>
              ))}

              {/* Mobile only: one Contact button that reveals both numbers */}
              <div className="relative sm:hidden" data-call-menu>
                <button
                  type="button"
                  onClick={() => setCallOpen((o) => !o)}
                  aria-expanded={callOpen}
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Contact</span>
                </button>
                {callOpen && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-[5.5rem] w-[calc(100vw-2rem)] max-w-xs rounded-2xl bg-white border border-slate-200 shadow-xl p-2 space-y-1.5 z-50">
                    {PHONES.map((p, i) => (
                      <a
                        key={`call-${p.tel}`}
                        href={`tel:${p.tel}`}
                        onClick={() => setCallOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 active:scale-95 transition-transform ${
                          i === 0 ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-900 border border-slate-200"
                        }`}
                      >
                        <Phone className={`w-4 h-4 shrink-0 ${i === 0 ? "text-white" : "text-blue-600"}`} aria-hidden="true" />
                        <span className="flex flex-col leading-tight">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${i === 0 ? "text-blue-100" : "text-slate-500"}`}>
                            {p.role}
                          </span>
                          <span className="text-base font-black">{p.label}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {PHONES.map((p, i) => (
                <a
                  key={`icon-${p.tel}`}
                  href={`tel:${p.tel}`}
                  className={`icon-btn hidden sm:flex 2xl:hidden flex-col items-center justify-center gap-0.5 px-1.5 py-1.5 min-w-[3rem] rounded-2xl border ${
                    i === 0
                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                      : "text-blue-600 bg-slate-100 border-slate-200 hover:bg-white hover:border-blue-300"
                  }`}
                  aria-label={`Call ${p.role}: ${p.label}`}
                  title={`Call ${p.role}: ${p.label}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide leading-none">{p.role}</span>
                </a>
              ))}

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
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {PHONES.map((p, i) => (
                    <a
                      key={`menu-${p.tel}`}
                      href={`tel:${p.tel}`}
                      onClick={closeMenu}
                      className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-2.5 text-center active:scale-95 transition-transform ${
                        i === 0
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-slate-800 border border-slate-200"
                      }`}
                    >
                      <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${i === 0 ? "text-blue-100" : "text-slate-500"}`}>
                        <Phone className="w-3 h-3" aria-hidden="true" /> {p.role}
                      </span>
                      <span className="text-sm font-black">{p.label}</span>
                    </a>
                  ))}
                </div>
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
