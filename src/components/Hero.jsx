export default function Hero() {
  return (
    <section className="px-4 pt-6 pb-10">
      {/* Highlight Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
          Trusted Bengali Purohits <br />
          for Every Sacred Ritual
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          Easily find verified local purohits in Malda for household pujas,
          life rituals, and traditional ceremonies.
        </p>

        <div className="mt-5 flex gap-3">
          <a
            href="#rituals"
            className="flex-1 text-center bg-[#E6B566] text-gray-900 py-3 rounded-xl font-medium active:scale-95 transition"
          >
            Choose Ritual
          </a>

          <a
            href="#contact"
            className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-xl font-medium active:scale-95 transition"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-xl py-3 text-xs shadow-sm">
          ✔ Verified
        </div>
        <div className="bg-white rounded-xl py-3 text-xs shadow-sm">
          📍 Local
        </div>
        <div className="bg-white rounded-xl py-3 text-xs shadow-sm">
          📞 Easy Booking
        </div>
      </div>
    </section>
  );
}
