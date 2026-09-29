import { CookingPot, Microwave, Refrigerator, Sparkles, UtensilsCrossed, WashingMachine, Wind } from "lucide-react";
import type { IconKey } from "@/lib/appliances";

const ICONS = {
  refrigerator: Refrigerator,
  washer: WashingMachine,
  dryer: Wind,
  oven: CookingPot,
  dishwasher: Sparkles,
  disposal: UtensilsCrossed,
  microwave: Microwave,
} as const;

export default function ApplianceIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden="true" />;
}
