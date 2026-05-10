import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF8EE]/90 backdrop-blur border-b border-[#D4AF37]/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/">
          <div>
            <h1 className="text-lg font-semibold text-[#8B1D1D]">
              Book My Purohit
            </h1>
            <p className="text-xs text-[#6B6B6B]">
              Bengali Hindu Rituals • Malda
            </p>
          </div>
        </Link>

        <Link
          to="/rituals"
          className="text-sm bg-[#8B1D1D] text-white px-4 py-2 rounded-full hover:bg-[#6F1616] transition"
        >
          Book Puja
        </Link>
      </div>
    </header>
  );
}
