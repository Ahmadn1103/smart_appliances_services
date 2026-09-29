"use client";

import { useSite } from "@/components/SiteShell";

interface BookButtonProps {
  /** Appliance booking label to preselect in the booking popup. */
  service?: string;
  notes?: string;
  className?: string;
  children: React.ReactNode;
}

export default function BookButton({ service, notes, className, children }: BookButtonProps) {
  const { openBooking } = useSite();
  return (
    <button type="button" onClick={() => openBooking(service, notes)} className={className}>
      {children}
    </button>
  );
}
