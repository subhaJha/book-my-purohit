import { rituals } from "../data/rituals";
import RitualCard from "../components/RitualCard";

export default function Rituals() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#8B1D1D] mb-2">
        Hindu Rituals & Pujas
      </h1>

      <p className="text-[#6B6B6B] mb-6">
        Select a ritual to find experienced Bengali purohits in Malda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual) => (
          <RitualCard key={ritual.id} ritual={ritual} />
        ))}
      </div>
    </div>
  );
}
