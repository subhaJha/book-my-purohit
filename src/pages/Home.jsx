import { Link } from "react-router-dom";
import FadeImage from "../components/FadeImage";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Left */}
      <div>
        <h2 className="text-3xl font-semibold text-[#8B1D1D] leading-snug">
          Book Trusted Bengali Purohits
          <br /> for Sacred Hindu Rituals
        </h2>

        <p className="mt-4 text-[#6B6B6B]">
          Find verified local purohits in Malda for household pujas,
          life rituals, and traditional ceremonies with ease.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/rituals"
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#c9a633] transition"
          >
            Explore Rituals
          </Link>

          <Link
            to="/purohits"
            className="border border-[#8B1D1D] text-[#8B1D1D] px-6 py-3 rounded-xl font-medium hover:bg-[#8B1D1D] hover:text-white transition"
          >
            View Purohits
          </Link>
        </div>
      </div>

      {/* Right */}
      <FadeImage
        src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19"
        alt="Hindu Puja"
      />
    </div>
  );
}
