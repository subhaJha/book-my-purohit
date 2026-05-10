import { useSearchParams } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();
  const purohitName = params.get("purohit") || "";

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book ${purohitName} for a Bengali ritual in Malda.`
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-semibold text-[#8B1D1D] mb-2">
        Book a Purohit
      </h1>

      <p className="text-sm text-[#6B6B6B] mb-6">
        Send a booking enquiry via WhatsApp.
      </p>

      <a
        href={`https://wa.me/917908438097?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-[#1F7A1F] text-white py-4 rounded-xl font-medium hover:bg-green-700 transition"
      >
        📞 Book via WhatsApp
      </a>
    </div>
  );
}
