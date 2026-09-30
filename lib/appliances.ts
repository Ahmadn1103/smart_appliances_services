// Single source of truth for what we service. Feeds the homepage services section, the footer
// and the booking forms' service lists. Order matters: appliance repair first, then dryer vent
// cleaning, then duct cleaning.

export type ServiceGroupKey = "repair" | "dryer-vent" | "duct";

export interface ServiceGroup {
  key: ServiceGroupKey;
  title: string;
  blurb: string;
  items: readonly string[];
  /** Value preselected in the booking popup. */
  bookingLabel: string;
}

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    key: "repair",
    title: "Home Appliance Repair & Installation",
    blurb: "Expert repair for the appliances you rely on every day.",
    items: [
      "Refrigerator & Freezer Repair",
      "Washer & Dryer Repair",
      "Oven, Range & Cooktop Repair",
      "Dishwasher Repair",
      "Appliance Installation",
      "Appliance Diagnosis & Troubleshooting",
    ],
    bookingLabel: "Refrigerators & Freezers",
  },
  {
    key: "dryer-vent",
    title: "Dryer Vent Cleaning",
    blurb: "A clean vent dries faster and helps prevent lint fires.",
    items: ["Dryer Vent Cleaning", "Lint & Blockage Removal", "Dryer Vent Inspection"],
    bookingLabel: "Dryer Vent Cleaning",
  },
  {
    key: "duct",
    title: "House Duct Cleaning",
    blurb: "Fresher air and cleaner vents throughout your home.",
    items: ["Residential Air Duct Cleaning", "Vent & Register Cleaning"],
    bookingLabel: "Air Duct Cleaning",
  },
];

export interface ApplianceCategory {
  title: string;
  items: readonly string[];
}

export const APPLIANCE_CATEGORIES: readonly ApplianceCategory[] = [
  {
    title: "Kitchen Appliances",
    items: [
      "Refrigerators",
      "Freezers",
      "Ice Makers",
      "Dishwashers",
      "Ovens",
      "Wall Ovens",
      "Ranges",
      "Cooktops",
      "Gas Ranges",
      "Electric Ranges",
      "Induction Cooktops & Ranges",
      "Microwaves",
      "Over-the-Range Microwaves",
      "Range Hoods",
      "Garbage Disposals",
      "Trash Compactors",
    ],
  },
  {
    title: "Laundry Appliances",
    items: [
      "Washing Machines",
      "Top-Load Washers",
      "Front-Load Washers",
      "Dryers",
      "Electric Dryers",
      "Gas Dryers",
      "Washer & Dryer Combos",
      "Stackable Washer & Dryer Units",
    ],
  },
  {
    title: "Specialty & Other Home Appliances",
    items: [
      "Wine Coolers",
      "Beverage Refrigerators",
      "Built-In Refrigerators",
      "Built-In Ice Makers",
      "Compact Refrigerators",
      "Under-Counter Refrigerators",
      "Under-Counter Freezers",
      "Dehumidifiers",
      "Portable Air Conditioners",
      "Garbage Disposals",
    ],
  },
];

export const BRANDS_SERVED =
  "Samsung, LG, Whirlpool, Maytag, GE, Frigidaire, Bosch, KitchenAid, Kenmore, Electrolux, Amana, and More";

/** Other appliances we fix, called out on the homepage. */
export const ALSO_SERVICED: readonly string[] = [
  "Garbage Disposals",
  "Ice Makers",
  "Wine & Beverage Coolers",
  "Range Hoods",
];

// Labels sent with a booking and shown in emails. Appliances first, cleaning services last.
export const BOOKING_SERVICE_LABELS: readonly string[] = [
  "Refrigerators & Freezers",
  "Washers",
  "Dryers",
  "Ranges, Ovens & Cooktops",
  "Dishwashers",
  "Microwaves",
  "Garbage Disposals",
  "Ice Makers",
  "Wine & Beverage Coolers",
  "Range Hoods",
  "Appliance Installation",
  "Dryer Vent Cleaning",
  "Air Duct Cleaning",
];
