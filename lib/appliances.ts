// Single source of truth for the appliances we repair. Feeds the homepage tiles, /services,
// /services/[slug], the booking forms' appliance lists and the sitemap.

export type IconKey = "refrigerator" | "washer" | "dryer" | "oven" | "dishwasher" | "disposal" | "microwave";

export interface Appliance {
  slug: string;
  /** Value sent with a booking and shown in emails. */
  bookingLabel: string;
  /** Short name for tiles and nav. */
  name: string;
  icon: IconKey;
  /** One-line symptom summary for the homepage tile. */
  tileNote: string;
  tagline: string;
  description: string;
  commonIssues: string[];
  turnaround: string;
  metaTitle: string;
  metaDescription: string;
}

export const APPLIANCES: readonly Appliance[] = [
  {
    slug: "refrigerator-repair",
    bookingLabel: "Refrigerators & Freezers",
    name: "Refrigerator",
    icon: "refrigerator",
    tileNote: "Cooling issues, leaks, not running",
    tagline: "French door, side-by-side, built-in & column units",
    description:
      "A failing refrigerator is an emergency. Our technicians arrive with the right diagnostic tools to test compressors, start relays, defrost systems, evaporator fan motors and sealed systems, protecting your groceries and your peace of mind.",
    commonIssues: [
      "Not cooling or freezer thawing",
      "Ice maker stopped dispensing or leaking water",
      "Frost buildup on the back evaporator wall",
      "Loud buzzing compressor or clicking relay",
      "Water pooling under crisper drawers",
      "Constant running with warm interior temperatures",
    ],
    turnaround: "Same-day or next-morning priority dispatch",
    metaTitle: "Refrigerator Repair in DC, MD & Northern VA",
    metaDescription:
      "Refrigerator and freezer repair for cooling problems, leaks, ice makers and noisy compressors in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "washer-repair",
    bookingLabel: "Washers",
    name: "Washer",
    icon: "washer",
    tileNote: "Not spinning, not draining, leaks",
    tagline: "High-efficiency, front-load, top-load & smart washers",
    description:
      "From front loaders that refuse to drain to unbalanced spin cycles, we troubleshoot motor control units, drain pumps, drive belts, suspension rods and door locking mechanisms.",
    commonIssues: [
      "Washer won't drain (OE / 5E error codes)",
      "Violent shaking, banging or walking during spin",
      "Door latch jammed or locked with laundry inside",
      "Fills with water but won't agitate or spin",
      "Water leaking onto the floor mid-cycle",
      "Unresponsive control panel or power failures",
    ],
    turnaround: "Fast 24 to 48-hour service appointments",
    metaTitle: "Washer Repair in DC, MD & Northern VA",
    metaDescription:
      "Front-load and top-load washer repair for draining, spinning, leaking and error-code problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "dryer-repair",
    bookingLabel: "Dryers",
    name: "Dryer",
    icon: "dryer",
    tileNote: "No heat, not starting, noisy",
    tagline: "Gas & electric heating diagnostics and drive repair",
    description:
      "Dryers that blow cold air or screech like a jet engine need professional attention. We service heating coils, thermal cut-offs, flame sensors, igniters, idler pulleys and drum belts.",
    commonIssues: [
      "Drum spins but produces no heat",
      "Clothes need 2 to 3 cycles to dry",
      "Loud squealing, thumping or grinding",
      "Runs a few minutes then shuts down",
      "Burning odor or overheating cabinet",
      "Start button not responding",
    ],
    turnaround: "Same-day dispatch available across the DMV",
    metaTitle: "Dryer Repair in DC, MD & Northern VA",
    metaDescription:
      "Gas and electric dryer repair for no heat, long dry times, noise and start failures in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "oven-range-repair",
    bookingLabel: "Ranges, Ovens & Cooktops",
    name: "Oven & Range",
    icon: "oven",
    tileNote: "Heating issues, error codes",
    tagline: "Gas burners, electric elements, convection fans & dual-fuel units",
    description:
      "Cooking appliance failures need safe, certified care. We service igniters, gas safety valves, bake elements, broil coils and touch control boards.",
    commonIssues: [
      "Gas burners clicking endlessly without lighting",
      "Bake element not heating or temperature off by 50°+",
      "Electric glass cooktop burners not turning on",
      "Oven door locked in self-clean cycle",
      "F10 / F90 or similar sensor error codes",
      "Gas smell near the range (needs immediate attention)",
    ],
    turnaround: "Fast scheduling for prompt kitchen restoration",
    metaTitle: "Oven & Range Repair in DC, MD & Northern VA",
    metaDescription:
      "Gas and electric oven, range and cooktop repair for heating, igniter and error-code problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "dishwasher-repair",
    bookingLabel: "Dishwashers",
    name: "Dishwasher",
    icon: "dishwasher",
    tileNote: "Not cleaning, leaks, not draining",
    tagline: "Pumps, leaks and clean-cycle restoration",
    description:
      "Don't let dirty dishes pile up. We diagnose circulation pumps, water inlet valves, float switches, detergent dispensers and clogged drain lines on standard and luxury dishwashers.",
    commonIssues: [
      "Standing dirty water in the bottom tub",
      "Dishes come out gritty or with a white film",
      "Water leaking from the door corners onto cabinetry",
      "Won't start or beeps continuously",
      "Spray arms blocked or not rotating",
      "Soap dispenser stays closed during the cycle",
    ],
    turnaround: "Prompt scheduling with fully stocked vans",
    metaTitle: "Dishwasher Repair in DC, MD & Northern VA",
    metaDescription:
      "Dishwasher repair for leaks, draining, cleaning and start problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "garbage-disposal-repair",
    bookingLabel: "Garbage Disposals",
    name: "Garbage Disposal",
    icon: "disposal",
    tileNote: "Not working, jammed",
    tagline: "Jams, motor hum, worn blades & under-sink leaks",
    description:
      "A locked or leaking disposal creates odors and sink backups. We clear stuck impellers, reset internal overloads, replace worn seals and install new heavy-duty units.",
    commonIssues: [
      "Hums loudly when switched on but won't spin",
      "Water dripping from the bottom housing into the cabinet",
      "Kitchen sink backs up or drains slowly",
      "Trips the breaker or reset button",
      "Persistent foul odor despite cleaning",
      "Severe vibration or grinding noise",
    ],
    turnaround: "Same-day priority appointments available",
    metaTitle: "Garbage Disposal Repair in DC, MD & Northern VA",
    metaDescription:
      "Garbage disposal repair and replacement for jams, leaks and motor problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "microwave-repair",
    bookingLabel: "Microwaves",
    name: "Microwave",
    icon: "microwave",
    tileNote: "Not heating, turns off",
    tagline: "Over-the-range, built-in & countertop microwaves",
    description:
      "A microwave that runs but doesn't heat, or sparks inside, should be checked by a professional. We test magnetrons, high-voltage diodes and capacitors, door switches and control boards.",
    commonIssues: [
      "Runs but does not heat food",
      "Sparking or arcing inside the cavity",
      "Turntable not rotating",
      "Display or keypad unresponsive",
      "Door won't latch or the unit turns off mid-cycle",
      "Trips the breaker when started",
    ],
    turnaround: "Prompt appointments across the DMV",
    metaTitle: "Microwave Repair in DC, MD & Northern VA",
    metaDescription:
      "Microwave repair for heating, sparking, turntable and control problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
];

export const BOOKING_SERVICE_LABELS: readonly string[] = APPLIANCES.map((a) => a.bookingLabel);

export function getAppliance(slug: string): Appliance | undefined {
  return APPLIANCES.find((a) => a.slug === slug);
}
