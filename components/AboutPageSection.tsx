"use client";

import AboutAdSection from "@/components/AboutAdSection";
import { useSite } from "@/components/SiteShell";

/** Lets the server-rendered /about page reuse the bio section, which needs the booking popup. */
export default function AboutPageSection() {
  const { openBooking } = useSite();
  return <AboutAdSection onOpenBooking={openBooking} />;
}
