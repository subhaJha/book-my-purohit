import { Link } from "react-router-dom";
import heroImg from "../assets/purohit-hero.png"; // save the screenshot image in assets

export default function Home() {
  return (
    <section className="min-h-screen bg-[#fdf6ee] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center px-6 lg:px-12 py-12 gap-10">
        
        {/* LEFT CONTENT */}
        <div className="z-10">
          {/* Top mantra */}
          <div className="flex items-center gap-3 text-[#b76b18] mb-6">
            <div className="h-[1px] w-10 bg-[#d4a15a]" />
            <span className="text-sm md:text-base tracking-wide font-medium">
              ॥ ॐ नमः शिवाय ॥
            </span>
            <div className="h-[1px] w-10 bg-[#d4a15a]" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.95]">
            <span className="text-[#2f1408]">Book My</span>
            <br />
            <span className="text-[#d97706]">Purohit</span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg md:text-xl text-[#5c4a3d] leading-relaxed max-w-xl">
            Find verified Bengali purohits for all your pujas,
            rituals, weddings, griha pravesh, shraddha ceremonies,
            and sacred occasions with ease.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-center">
            <div>
              <div className="text-3xl mb-2">🛕</div>
              <p className="text-sm text-[#5b4636]">
                Verified
                <br />
                Purohits
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">📅</div>
              <p className="text-sm text-[#5b4636]">
                Easy
                <br />
                Booking
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-sm text-[#5b4636]">
                Experienced
                <br />
                & Trusted
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-[#5b4636]">
                Secure
                <br />
                & Safe
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/rituals"
              className="bg-[#d97706] hover:bg-[#c66a05] text-white px-8 py-4 rounded-full text-lg font-semibold transition shadow-lg"
            >
              Explore Rituals
            </Link>

            <Link
              to="/purohits"
              className="border-2 border-[#8B1D1D] text-[#8B1D1D] hover:bg-[#8B1D1D] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition"
            >
              View Purohits
            </Link>
          </div>

          {/* Bottom Card */}
          <div className="mt-12 bg-white/70 backdrop-blur-md border border-[#ead7c0] rounded-2xl px-5 py-4 flex items-center gap-4 shadow-md max-w-md">
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/50?img=1"
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/50?img=2"
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/50?img=3"
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#2f1408]">
                5000+ Happy Families
              </h4>
              <p className="text-sm text-[#6b5b4f]">
                Trusted by devotees across Bengal
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#fdf6ee] z-10 rounded-[40px]" />

          <img
            src={heroImg}
            alt="Purohit Performing Puja"
            className="w-full max-w-[750px] object-cover rounded-[40px] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}