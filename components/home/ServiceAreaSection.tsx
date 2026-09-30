import { MapPin, Phone } from "lucide-react";
import ZipChecker from "@/components/ZipChecker";
import { SERVICE_RADIUS_MILES } from "@/lib/site";

const AREAS = [
  { region: "Washington, DC", places: ["All DC neighborhoods"] },
  {
    region: "Maryland",
    places: ["Montgomery County", "Prince George's County", "Bethesda", "Rockville", "Silver Spring", "Gaithersburg"],
  },
  {
    region: "Northern Virginia",
    places: [
      "Fairfax County", "Arlington County", "Loudoun County", "Prince William County", "Aldie", "Alexandria",
      "Annandale", "Arlington", "Ashburn", "Bristow", "Broad Run", "Burke",
      "Catharpin", "Catlett", "Centreville", "Chantilly", "Clifton", "Dahlgren",
      "Delaplane", "Dumfries", "Dunn Loring", "Fairfax", "Fairfax Station", "Falls Church",
      "Gainesville", "Great Falls", "Hamilton", "Haymarket", "Herndon", "Leesburg",
      "Lorton", "Manassas", "McLean", "Middleburg", "Nokesville", "Oakton",
      "Occoquan", "Paeonian Springs", "Reston", "Springfield", "Stafford", "Sterling",
      "The Plains", "Triangle", "Vienna", "Warrenton", "Waterford", "Woodbridge",
    ],
  },
];

export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="bg-white py-8 sm:py-16 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We Come to You, Within{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
              {SERVICE_RADIUS_MILES} Miles
            </span>{" "}
            of DC
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">Enter your ZIP code to see if we service your address.</p>
          <div className="max-w-md mx-auto mt-5 text-left">
            <ZipChecker />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-5">
          {AREAS.map((area) => (
            <div key={area.region} className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <h3 className="flex items-center gap-2 font-black text-slate-900 mb-3">
                <MapPin className="w-4 h-4 text-blue-600" aria-hidden="true" /> {area.region}
              </h3>
              <ul className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                {area.places.map((place) => (
                  <li key={place} className="px-2.5 py-1 rounded-full bg-white border border-slate-200">{place}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Some outer parts of a county may fall beyond the {SERVICE_RADIUS_MILES}-mile line, so check your ZIP above.
        </p>

        <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-blue-900">
            <span className="font-bold">Outside {SERVICE_RADIUS_MILES} miles or right on the edge?</span> Give us a call and we will let you know if we can make it out.
          </p>
          <a
            href="tel:5714598155"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shrink-0"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> (571) 459-8155
          </a>
        </div>
      </div>
    </section>
  );
}
