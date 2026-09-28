"use client";

import { useState } from "react";
import { Star, CheckCircle, ThumbsUp } from "lucide-react";

export default function Reviews() {
  const [filter, setFilter] = useState("all");

  const reviews = [
    {
      id: 1,
      name: "Marcus Vance",
      location: "McLean, VA",
      service: "Refrigeration",
      date: "3 days ago",
      rating: 5,
      comment:
        "Our French door refrigerator stopped cooling on a Sunday with hundreds of dollars in groceries inside. Smart Appliance Services sent a technician out within 2 hours. He had the inverter sensor on his van and repaired it immediately. Incredible service and fair pricing!",
    },
    {
      id: 2,
      name: "Elena Rostova",
      location: "Bethesda, MD",
      service: "Garbage Disposals",
      date: "1 week ago",
      rating: 5,
      comment:
        "Our kitchen garbage disposal jammed completely and leaked water into the cabinet below. Armani diagnosed the motor flywheel blockage and replaced the worn seal in 30 minutes. Super clean, courteous, and transparent flat-rate pricing!",
    },
    {
      id: 3,
      name: "David Chen",
      location: "Washington, DC",
      service: "Dishwashers",
      date: "2 weeks ago",
      rating: 5,
      comment:
        "Our Bosch dishwasher was flashing error code E15 and wouldn't drain. Another company told us to buy a new machine. The Smart Appliance technician diagnosed a simple clogged pressure sensor, replaced it, and tested the wash cycle in under an hour. Saved us a fortune!",
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      location: "Arlington, VA",
      service: "Dryers",
      date: "3 weeks ago",
      rating: 5,
      comment:
        "Our dryer was taking nearly 2 hours to dry a load of towels. The technician quickly diagnosed a faulty heating element coil, replaced it with OEM parts, and checked the airflow. Now clothes dry in 35 minutes! Total lifesaver.",
    },
    {
      id: 5,
      name: "Robert Morales",
      location: "Silver Spring, MD",
      service: "Washers",
      date: "1 month ago",
      rating: 5,
      comment:
        "Front-load washer sounded like a jet engine during spin cycles. The technician explained the tub bearing issue clearly, quoted an upfront price, and fixed it cleanly without leaving a single drop of dirty water on our hardwood floors. Highly recommend!",
    },
    {
      id: 6,
      name: "Patricia Miller",
      location: "Alexandria, VA",
      service: "Ranges & Ovens",
      date: "1 month ago",
      rating: 5,
      comment:
        "Very professional from the dispatch call to the actual repair. Our $89 diagnostic fee was credited 100% toward fixing the bake igniter on our gas range, plus they gave us a 30-day parts and labor warranty. Will always use Smart Appliance Services!",
    },
  ];

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.service.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Trusted by Hundreds of DMV Homeowners
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Read real feedback from neighbors who rely on our prompt diagnostics, transparent $89 fee credit, and 30-day warranty.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: "all", label: "All Reviews" },
              { id: "refrigeration", label: "Refrigerators" },
              { id: "washers", label: "Washers" },
              { id: "dryers", label: "Dryers" },
              { id: "dishwashers", label: "Dishwashers" },
              { id: "ranges", label: "Ranges & Ovens" },
              { id: "garbage disposals", label: "Disposals" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === btn.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 border border-white/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {review.service}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{review.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <span className="text-[11px] text-slate-500">{review.location}</span>
                </div>
                <span className="text-[10px] text-slate-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
