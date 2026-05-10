import { useSearchParams } from "react-router-dom";
import { purohits } from "../data/purohits";
import PurohitCard from "../components/PurohitCard";

export default function Purohits() {
  const [params] = useSearchParams();
  const selectedRitual = params.get("ritual");

  const filteredPurohits = selectedRitual
    ? purohits.filter((p) => p.rituals.includes(selectedRitual))
    : purohits;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#8B1D1D] mb-2">
        Available Purohits
      </h1>

      <p className="text-[#6B6B6B] mb-6">
        {selectedRitual
          ? "Showing purohits for selected ritual."
          : "Browse verified Bengali purohits in Malda."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPurohits.map((purohit) => (
          <PurohitCard key={purohit.id} purohit={purohit} />
        ))}
      </div>
    </div>
  );
}
