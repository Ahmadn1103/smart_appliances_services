"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import SocialModal from "@/components/SocialModal";
import { SERVICE_GROUPS } from "@/lib/appliances";

interface SiteContextValue {
  openBooking: (serviceName?: string, notes?: string) => void;
  openSocial: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteShell>");
  return ctx;
}

/** Navbar, footer and the booking/social modals, shared by every page so pages can stay server components. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [service, setService] = useState<string>(SERVICE_GROUPS[0].bookingLabel);
  const [notes, setNotes] = useState("");

  const openBooking = useCallback((serviceName?: string, preload?: string) => {
    if (serviceName) setService(serviceName);
    setNotes(preload ?? "");
    setBookingOpen(true);
  }, []);
  const openSocial = useCallback(() => setSocialOpen(true), []);
  const value = useMemo(() => ({ openBooking, openSocial }), [openBooking, openSocial]);

  return (
    <SiteContext.Provider value={value}>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        <Navbar onOpenBooking={openBooking} onOpenSocial={openSocial} />
        <main className="flex-1">{children}</main>
        <Footer onOpenSocial={openSocial} />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          preselectedService={service}
          notesPreload={notes}
        />
        <SocialModal isOpen={socialOpen} onClose={() => setSocialOpen(false)} />
      </div>
    </SiteContext.Provider>
  );
}
