const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ManageAvailability() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#8B1D1D] mb-4">
        Weekly Availability
      </h2>

      <div className="space-y-3">
        {days.map(day => (
          <label key={day} className="flex items-center gap-3">
            <input type="checkbox" className="accent-[#8B1D1D]" />
            <span>{day}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
