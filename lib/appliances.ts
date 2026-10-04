// Single source of truth for the appliances we repair. Feeds the homepage tiles, /services,
// /services/[slug], the booking forms' appliance lists and the sitemap.

export type IconKey = "refrigerator" | "washer" | "dryer" | "oven" | "dishwasher" | "disposal" | "microwave" | "compactor" | "ventCleaning" | "rangeHood" | "wallOven" | "iceMaker" | "freezer" | "wineCooler" | "combo" | "doubleOven" | "cooktop" | "range" | "pmCheck";

export const PM_CHECK_LABEL = "Yearly PM Check";

export interface PmBundle {
  appliances: number;
  price: number;
  /** Value sent with a booking and shown in emails. */
  bookingLabel: string;
  blurb: string;
}

const WORD = ["", "one", "two", "three", "four", "five"];

function pmBundle(appliances: number, price: number): PmBundle {
  return {
    appliances,
    price,
    bookingLabel: `${PM_CHECK_LABEL} - ${appliances} appliances ($${price})`,
    blurb: `Yearly check and maintenance for any ${WORD[appliances]} of your appliances.`,
  };
}

export const PM_BUNDLES: readonly PmBundle[] = [pmBundle(2, 139), pmBundle(3, 189), pmBundle(4, 239), pmBundle(5, 299)];

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
    bookingLabel: "Refrigerators",
    name: "Refrigerator",
    icon: "refrigerator",
    tileNote: "Cooling issues, leaks, not running",
    tagline: "French door, side-by-side, top-freezer & built-in units",
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
    slug: "freezer-repair",
    bookingLabel: "Freezers",
    name: "Freezer",
    icon: "freezer",
    tileNote: "Not freezing, frost, warm inside",
    tagline: "Upright, chest & built-in freezers",
    description:
      "A freezer that is not holding temperature puts your food at risk. We diagnose compressors, evaporator fans, defrost heaters and timers, thermostats, door gaskets and control boards.",
    commonIssues: [
      "Not freezing or food thawing",
      "Heavy frost or ice buildup",
      "Compressor runs constantly or clicks",
      "Loud fan or rattling noise",
      "Water pooling around the base",
      "Door will not seal or stay closed",
    ],
    turnaround: "Same-day or next-morning priority dispatch",
    metaTitle: "Freezer Repair in DC, MD & Northern VA",
    metaDescription:
      "Upright and chest freezer repair for temperature, frost and noise problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "ice-maker-repair",
    bookingLabel: "Ice Makers",
    name: "Ice Maker",
    icon: "iceMaker",
    tileNote: "No ice, leaks, small or cloudy cubes",
    tagline: "Refrigerator ice makers & standalone built-in ice machines",
    description:
      "When the ice stops, we trace the cause: water inlet valves, fill tubes, ice maker modules, thermostats, pumps and clogged lines on refrigerator and undercounter ice makers.",
    commonIssues: [
      "Not making ice or making very little",
      "Ice maker leaking water",
      "Small, hollow or cloudy cubes",
      "Ice jammed or clumped in the bin",
      "Dispenser not delivering ice",
      "Bad taste or odor in the ice",
    ],
    turnaround: "Prompt appointments across the DMV",
    metaTitle: "Ice Maker Repair in DC, MD & Northern VA",
    metaDescription:
      "Ice maker repair for no ice, leaks, jams and dispenser problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "wine-cooler-repair",
    bookingLabel: "Wine Coolers",
    name: "Wine Cooler",
    icon: "wineCooler",
    tileNote: "Not cooling, warm, noisy",
    tagline: "Built-in & freestanding wine coolers",
    description:
      "Wine needs steady temperatures. We service compressors and thermoelectric systems, cooling fans, thermostats, door seals and control boards on single and dual-zone wine coolers.",
    commonIssues: [
      "Not cooling or temperature too warm",
      "Temperature swings between zones",
      "Compressor not starting or running constantly",
      "Noisy or vibrating fan",
      "Frost buildup or condensation inside",
      "Display or controls not working",
    ],
    turnaround: "Prompt appointments across the DMV",
    metaTitle: "Wine Cooler Repair in DC, MD & Northern VA",
    metaDescription:
      "Wine cooler and beverage fridge repair for cooling, temperature and noise problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
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
    slug: "washer-dryer-combo-repair",
    bookingLabel: "Washer & Dryer Combos",
    name: "Washer & Dryer Combo",
    icon: "combo",
    tileNote: "Not drying, leaks, error codes",
    tagline: "All-in-one and stacked washer-dryer units",
    description:
      "All-in-one combo units have to wash and dry in one drum. We service drain pumps, heating elements, condensers, door seals, motors and control boards on ventless and vented combos.",
    commonIssues: [
      "Washes but clothes stay damp",
      "Water leaking from the door or base",
      "Will not drain or spin",
      "Heating or condenser problems",
      "Loud banging or vibration",
      "Error codes or controls not responding",
    ],
    turnaround: "Fast 24 to 48-hour service appointments",
    metaTitle: "Washer & Dryer Combo Repair in DC, MD & Northern VA",
    metaDescription:
      "All-in-one washer dryer combo repair for drying, draining, leaking and error-code problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
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
  {
    slug: "double-oven-repair",
    bookingLabel: "Double Ovens",
    name: "Double Oven",
    icon: "doubleOven",
    tileNote: "One oven out, uneven heat",
    tagline: "Stacked & built-in double ovens",
    description:
      "Two ovens, two sets of parts. We test bake and broil elements, igniters, temperature sensors, door locks and control boards on both the upper and lower cavity.",
    commonIssues: [
      "Upper or lower oven not heating",
      "Uneven or incorrect temperature",
      "Door locked or will not latch",
      "Convection fan not running",
      "Error codes on the display",
      "Clock or touch controls unresponsive",
    ],
    turnaround: "Fast scheduling for prompt kitchen restoration",
    metaTitle: "Double Oven Repair in DC, MD & Northern VA",
    metaDescription:
      "Double oven repair for heating, temperature and control problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "wall-oven-repair",
    bookingLabel: "Wall Ovens",
    name: "Wall Oven",
    icon: "wallOven",
    tileNote: "Not heating, door issues, error codes",
    tagline: "Single, double & combination built-in wall ovens",
    description:
      "Built-in wall ovens need careful, precise service. We diagnose bake and broil elements, igniters, temperature sensors, convection fans, door locks, hinges and electronic control boards.",
    commonIssues: [
      "Oven not heating or heating unevenly",
      "Temperature off by 25°F or more",
      "Door locked in self-clean cycle or won't latch",
      "Convection fan not running or noisy",
      "F-code error messages on the display",
      "Control panel or clock unresponsive",
    ],
    turnaround: "Fast scheduling for prompt kitchen restoration",
    metaTitle: "Wall Oven Repair in DC, MD & Northern VA",
    metaDescription:
      "Single and double wall oven repair for heating, temperature, door and error-code problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "cooktop-repair",
    bookingLabel: "Cooktops",
    name: "Cooktop",
    icon: "cooktop",
    tileNote: "Burners not lighting or heating",
    tagline: "Gas, electric & induction cooktops",
    description:
      "Cooktop failures are usually in the burners, igniters, infinite switches or control boards. We service gas, radiant electric and induction cooktops.",
    commonIssues: [
      "Gas burners clicking but not lighting",
      "Electric burner not heating",
      "Induction zone not detecting pans",
      "Cracked or damaged glass surface",
      "Knobs or touch controls failing",
      "Burner stays on or heats unevenly",
    ],
    turnaround: "Fast scheduling for prompt kitchen restoration",
    metaTitle: "Cooktop Repair in DC, MD & Northern VA",
    metaDescription:
      "Gas, electric and induction cooktop repair for burner, igniter and control problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "range-repair",
    bookingLabel: "Ranges",
    name: "Range",
    icon: "range",
    tileNote: "Burners, oven & error codes",
    tagline: "Freestanding & slide-in gas, electric & dual-fuel ranges",
    description:
      "When a range fails, the whole kitchen stops. We service igniters, gas safety valves, bake and broil elements, burners, sensors and control boards.",
    commonIssues: [
      "Burners clicking endlessly without lighting",
      "Oven not heating or temperature off",
      "Electric burner not turning on",
      "Oven door locked in self-clean",
      "F-code or sensor error messages",
      "Gas smell near the range (needs immediate attention)",
    ],
    turnaround: "Fast scheduling for prompt kitchen restoration",
    metaTitle: "Range Repair in DC, MD & Northern VA",
    metaDescription:
      "Gas, electric and dual-fuel range repair for burner, oven and error-code problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "range-hood-repair",
    bookingLabel: "Range Hoods",
    name: "Range Hood",
    icon: "rangeHood",
    tileNote: "Weak suction, noisy fan, no light",
    tagline: "Under-cabinet, wall-mount, island & downdraft hoods",
    description:
      "A range hood that stops pulling smoke and grease leaves your kitchen smelling and your cabinets coated. We service blower motors, fan speed switches, control boards, lights and ductwork connections, and clean or replace filters.",
    commonIssues: [
      "Fan runs but barely pulls air",
      "Loud rattling, humming or squealing blower",
      "Fan won't turn on or stuck on one speed",
      "Lights or touch controls not working",
      "Grease dripping from the filter or housing",
      "Backdraft damper stuck open or closed",
    ],
    turnaround: "Prompt appointments across the DMV",
    metaTitle: "Range Hood Repair in DC, MD & Northern VA",
    metaDescription:
      "Range hood repair for weak suction, noisy fans, lights and control problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
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
    slug: "trash-compactor-repair",
    bookingLabel: "Trash Compactors",
    name: "Trash Compactor",
    icon: "compactor",
    tileNote: "Won't compact, jammed, odors",
    tagline: "Built-in & freestanding kitchen trash compactors",
    description:
      "A compactor that won't crush or won't open is more than an inconvenience. We service drive motors, drive chains and rams, drawer tracks, safety switches, key locks and control boards.",
    commonIssues: [
      "Ram won't move or compact the load",
      "Drawer stuck, off-track or won't open",
      "Motor hums or runs but nothing happens",
      "Unit won't start with the key and drawer closed",
      "Loud grinding, squealing or chain noise",
      "Lingering odors or a broken charcoal filter",
    ],
    turnaround: "Prompt appointments across the DMV",
    metaTitle: "Trash Compactor Repair in DC, MD & Northern VA",
    metaDescription:
      "Trash compactor repair for jams, drawer, motor and drive problems in DC, Maryland and Northern Virginia. $89 diagnostic credited toward repair.",
  },
  {
    slug: "dryer-vent-cleaning",
    bookingLabel: "Dryer Vent Cleaning",
    name: "Dryer Vent Cleaning",
    icon: "ventCleaning",
    tileNote: "Long dry times, lint buildup",
    tagline: "Full-run vent cleaning for safer, faster drying",
    description:
      "Clogged dryer vents are a leading cause of house fires and long dry times. We clear lint from the full vent run, from the dryer connection to the exterior hood, and check airflow and the vent flap when we finish.",
    commonIssues: [
      "Clothes take multiple cycles to dry",
      "Dryer or laundry room feels unusually hot",
      "Burning smell while the dryer runs",
      "Lint buildup around the exterior vent hood",
      "Vent flap not opening or blocked by nesting",
      "Never had the vent cleaned",
    ],
    turnaround: "Fast 24 to 48-hour service appointments",
    metaTitle: "Dryer Vent Cleaning in DC, MD & Northern VA",
    metaDescription:
      "Professional dryer vent cleaning to remove lint, restore airflow and reduce fire risk in DC, Maryland and Northern Virginia.",
  },
  {
    slug: "yearly-pm-check",
    bookingLabel: PM_CHECK_LABEL,
    name: "Yearly PM Check",
    icon: "pmCheck",
    tileNote: "Maintenance bundles for 2 to 5 appliances",
    tagline: "Schedule your yearly visit online or by phone",
    description:
      "A yearly preventive maintenance visit helps catch small problems before they turn into breakdowns. Pick the bundle that matches the appliances you want checked.",
    commonIssues: [
      "Catch small problems before they become repairs",
      "Choose a bundle for 2 to 5 appliances",
      "One scheduled visit, one bundle price",
    ],
    turnaround: "Annual maintenance",
    metaTitle: "Yearly PM Check in DC, MD & Northern VA",
    metaDescription:
      "Yearly preventive maintenance bundles for 2 to 5 appliances in DC, Maryland and Northern Virginia, starting at $139.",
  },
];

export const BOOKING_SERVICE_LABELS: readonly string[] = [
  ...APPLIANCES.map((a) => a.bookingLabel),
  ...PM_BUNDLES.map((b) => b.bookingLabel),
];

export function isPmService(service: string): boolean {
  return service.startsWith(PM_CHECK_LABEL);
}

export function getAppliance(slug: string): Appliance | undefined {
  return APPLIANCES.find((a) => a.slug === slug);
}
