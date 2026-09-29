// Customer testimonials shown on the homepage and /reviews.
// NOTE: these are not tied to a verifiable source yet. Do not add Review/AggregateRating schema
// or "verified" wording until they are replaced with real Google reviews (see project.md).

export interface Review {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
}

export const REVIEWS: readonly Review[] = [
  {
    id: 1,
    name: "Marcus Vance",
    location: "McLean, VA",
    service: "Refrigeration",
    rating: 5,
    comment:
      "Our French door refrigerator stopped cooling on a Sunday with hundreds of dollars in groceries inside. Smart Appliance Services sent a technician out within 2 hours. He had the inverter sensor on his van and repaired it immediately. Incredible service and fair pricing!",
  },
  {
    id: 2,
    name: "Elena Rostova",
    location: "Bethesda, MD",
    service: "Garbage Disposals",
    rating: 5,
    comment:
      "Our kitchen garbage disposal jammed completely and leaked water into the cabinet below. Armani diagnosed the motor flywheel blockage and replaced the worn seal in 30 minutes. Super clean, courteous, and transparent flat-rate pricing!",
  },
  {
    id: 3,
    name: "David Chen",
    location: "Washington, DC",
    service: "Dishwashers",
    rating: 5,
    comment:
      "Our Bosch dishwasher was flashing error code E15 and wouldn't drain. Another company told us to buy a new machine. The Smart Appliance technician diagnosed a simple clogged pressure sensor, replaced it, and tested the wash cycle in under an hour. Saved us a fortune!",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    location: "Arlington, VA",
    service: "Dryers",
    rating: 5,
    comment:
      "Our dryer was taking nearly 2 hours to dry a load of towels. The technician quickly diagnosed a faulty heating element coil, replaced it with OEM parts, and checked the airflow. Now clothes dry in 35 minutes! Total lifesaver.",
  },
  {
    id: 5,
    name: "Robert Morales",
    location: "Silver Spring, MD",
    service: "Washers",
    rating: 5,
    comment:
      "Front-load washer sounded like a jet engine during spin cycles. The technician explained the tub bearing issue clearly, quoted an upfront price, and fixed it cleanly without leaving a single drop of dirty water on our hardwood floors. Highly recommend!",
  },
  {
    id: 6,
    name: "Patricia Miller",
    location: "Alexandria, VA",
    service: "Ranges & Ovens",
    rating: 5,
    comment:
      "Very professional from the dispatch call to the actual repair. Our $89 diagnostic fee was credited 100% toward fixing the bake igniter on our gas range, plus they gave us a 30-day parts and labor warranty. Will always use Smart Appliance Services!",
  },
];
