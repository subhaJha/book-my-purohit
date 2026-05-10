import FadeImage from "./FadeImage";
import { Link } from "react-router-dom";

export default function PurohitCard({ purohit }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="h-48">
        <FadeImage src={purohit.image} alt={purohit.name} />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#8B1D1D]">
          {purohit.name}
        </h3>

        <p className="text-sm text-[#6B6B6B] mt-1">
          {purohit.area}
        </p>

        <p className="text-sm mt-2">
          Experience: <span className="font-medium">{purohit.experience}</span>
        </p>

        <Link
          to={`/purohit/${purohit.id}`}
          className="inline-block mt-4 text-sm text-white bg-[#8B1D1D] px-4 py-2 rounded-full hover:bg-[#6F1616] transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
