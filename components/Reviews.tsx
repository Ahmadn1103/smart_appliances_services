import { Star, ThumbsUp } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";

export default function Reviews() {
  return (
    <section id="reviews" className="py-8 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            What DMV Homeowners Say
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Feedback from neighbors who rely on our prompt diagnostics, transparent $89 fee credit, and 30-day warranty.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {REVIEWS.map((review) => (
            <li
              key={review.id}
              className="min-w-0 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                  <div className="flex text-amber-400" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }, (_, s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {review.service}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-snug italic mb-2">&ldquo;{review.comment}&rdquo;</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-900">{review.name}</p>
                <span className="text-[10px] text-slate-500">{review.location}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
