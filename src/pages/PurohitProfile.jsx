import { useParams, Link } from "react-router-dom";
import { purohits } from "../data/purohits";
import FadeImage from "../components/FadeImage";
import AvailabilityCalendar from "../components/AvailabilityCalendar";

export default function PurohitProfile() {
  const { id } = useParams();
  const purohit = purohits.find((p) => p.id === Number(id));

  if (!purohit) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Purohit not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Image */}
        <div className="h-64 sm:h-80">
          <FadeImage src={purohit.image} alt={purohit.name} />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name & Location */}
          <h1 className="text-2xl font-semibold text-[#8B1D1D]">
            {purohit.name}
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            {purohit.area}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-500 text-sm">
              {"★".repeat(Math.round(purohit.rating))}
            </span>
            <span className="text-sm text-gray-600">
              ({purohit.rating})
            </span>
          </div>

          {/* Experience & Languages */}
          <div className="mt-4 text-sm space-y-1">
            <p>
              <strong>Experience:</strong> {purohit.experience}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {purohit.languages.join(", ")}
            </p>
          </div>

          {/* Rituals */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Rituals Performed
            </h3>
            <div className="flex flex-wrap gap-2">
              {purohit.rituals.map((r) => (
                <span
                  key={r.id}
                  className="text-xs bg-[#FFF1DC] text-[#8B1D1D] px-3 py-1 rounded-full"
                >
                  {r.label} • {r.bn}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Calendar (Day + Time Slots) */}
          <AvailabilityCalendar availability={purohit.availability} />

          {/* Pricing */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Pricing
            </h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(purohit.pricing).map(
                ([ritual, price]) => (
                  <li
                    key={ritual}
                    className="flex justify-between border-b pb-1"
                  >
                    <span className="capitalize">
                      {ritual.replace("_", " ")}
                    </span>
                    <span className="font-medium">
                      ₹{price}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Reviews
            </h3>

            {purohit.reviews.length === 0 && (
              <p className="text-sm text-gray-500">
                No reviews yet
              </p>
            )}

            {purohit.reviews.map((r, index) => (
              <div
                key={index}
                className="border-b py-3 text-sm"
              >
                <p className="font-medium">{r.name}</p>
                <p className="text-yellow-500 text-xs">
                  {"★".repeat(r.rating)}
                </p>
                <p className="text-gray-600">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to={`/book?purohit=${encodeURIComponent(
                purohit.name
              )}`}
              className="flex-1 text-center bg-[#8B1D1D] text-white py-3 rounded-xl font-medium hover:bg-[#6F1616] transition"
            >
              Book This Purohit
            </Link>

            <a
              href={`tel:${purohit.phone}`}
              className="flex-1 text-center border border-[#8B1D1D] text-[#8B1D1D] py-3 rounded-xl font-medium hover:bg-[#8B1D1D] hover:text-white transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
