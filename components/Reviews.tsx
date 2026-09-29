import { Star, ThumbsUp } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";

export default function Reviews() {
  // The list is rendered twice so the CSS marquee can loop seamlessly (it slides by exactly half its width).
  const loop = [...REVIEWS, ...REVIEWS];

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

      <div className="marquee overflow-hidden py-2">
        <ul className="marquee-track flex w-max">
          {loop.map((review, i) => (
            <li
              key={`${review.id}-${i}`}
              aria-hidden={i >= REVIEWS.length}
              className="w-[80vw] sm:w-[22rem] shrink-0 mr-4 md:mr-6 p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }, (_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {review.service}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic mb-4">&ldquo;{review.comment}&rdquo;</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900">{review.name}</p>
                <span className="text-[11px] text-slate-500">{review.location}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
