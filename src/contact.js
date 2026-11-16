const phone = import.meta.env.VITE_WHATSAPP_NUMBER;

export function whatsappLink(message) {
  return /^91[6-9][0-9]{9}$/.test(phone || "")
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : null;
}
