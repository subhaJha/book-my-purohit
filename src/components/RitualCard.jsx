import FadeImage from "./FadeImage";
import { Link } from "react-router-dom";

export default function RitualCard({ ritual }) {
  return (
    <Link
      to={`/purohits?ritual=${ritual.id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="h-40">
        <FadeImage src={ritual.image} alt={ritual.name} />
      </div>

      <div className="p-4 text-center">
        <h3 className="font-medium text-[#8B1D1D] group-hover:text-black transition">
          {ritual.name}
        </h3>
      </div>
    </Link>
  );
}
