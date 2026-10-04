import { AirVent, CalendarCheck,ChefHat, CircleDot, Rows2, Shirt, ThermometerSnowflake, Wine, CookingPot, Flame, Snowflake, Fan, Microwave, Refrigerator, Sparkles, Trash2, UtensilsCrossed, WashingMachine, Wind } from "lucide-react";
import type { IconKey } from "@/lib/appliances";

const ICONS = {
  refrigerator: Refrigerator,
  washer: WashingMachine,
  dryer: Wind,
  oven: CookingPot,
  dishwasher: Sparkles,
  disposal: UtensilsCrossed,
  microwave: Microwave,
  compactor: Trash2,
  ventCleaning: Fan,
  rangeHood: AirVent,
  wallOven: Flame,
  iceMaker: Snowflake,
  freezer: ThermometerSnowflake,
  wineCooler: Wine,
  combo: Shirt,
  doubleOven: Rows2,
  cooktop: CircleDot,
  range: ChefHat,
  pmCheck: CalendarCheck,
} as const;

export default function ApplianceIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden="true" />;
}
