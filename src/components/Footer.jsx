export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#D4AF37]/40 bg-[#FFF8EE]">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-sm text-[#6B6B6B]">
          © {new Date().getFullYear()} Book My Purohit
        </p>
        <p className="text-xs text-[#6B6B6B] mt-1">
          Bengali Hindu Ritual Services • Malda
        </p>
      </div>
    </footer>
  );
}
