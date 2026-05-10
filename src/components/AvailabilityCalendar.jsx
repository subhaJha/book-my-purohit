const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const SLOT_LABELS = {
  morning: "Morning (6–11 AM)",
  afternoon: "Afternoon (12–4 PM)",
  evening: "Evening (5–9 PM)",
};

export default function AvailabilityCalendar({ availability }) {
  if (!availability) {
    return (
      <p className="text-sm text-gray-500">
        Availability not provided
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">
        Availability (Day & Time Slots)
      </h3>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <div
            key={day}
            className="bg-[#FFF8EE] border border-[#D4AF37]/40 rounded-xl p-4"
          >
            {/* Day Name */}
            <h4 className="font-medium text-[#8B1D1D] capitalize mb-3">
              {day}
            </h4>

            {/* Time Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              {Object.entries(SLOT_LABELS).map(
                ([slotKey, slotLabel]) => {
                  const isAvailable =
                    availability?.[day]?.[slotKey];

                  return (
                    <div
                      key={slotKey}
                      className={`px-3 py-2 rounded-lg text-center border ${
                        isAvailable
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                      }`}
                    >
                      <p className="font-medium">
                        {slotLabel}
                      </p>
                      <p className="text-xs mt-1">
                        {isAvailable
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
