import { additionalRituals } from "./catalogue";

export const languages = { bn: "বাংলা", hi: "हिन्दी", en: "English" };
export const locales = { bn: "bn-IN", hi: "hi-IN", en: "en-IN" };

export const ritualDetails = {
  griha: { category: "home", icon: "⌂", name: ["গৃহপ্রবেশ", "गृह प्रवेश", "Griha Pravesh"], detail: ["নতুন বাড়িতে প্রবেশের পুজো", "नए घर में प्रवेश की पूजा", "A puja for moving into a new home"] },
  annaprashan: { category: "family", icon: "◉", name: ["অন্নপ্রাশন", "अन्नप्राशन", "Annaprashan"], detail: ["শিশুর প্রথম অন্নগ্রহণের অনুষ্ঠান", "शिशु को पहली बार अन्न खिलाने का संस्कार", "Your baby's first rice ceremony"] },
  lakshmi: { category: "festival", icon: "❋", name: ["লক্ষ্মীপুজো", "लक्ष्मी पूजा", "Lakshmi Puja"], detail: ["বাড়িতে মা লক্ষ্মীর আরাধনা", "घर पर माँ लक्ष्मी की पूजा", "Worship Maa Lakshmi at home"] },
  saraswati: { category: "festival", icon: "✿", name: ["সরস্বতী পুজো", "सरस्वती पूजा", "Saraswati Puja"], detail: ["বিদ্যার দেবী মা সরস্বতীর আরাধনা", "विद्या की देवी माँ सरस्वती की पूजा", "Worship Maa Saraswati, goddess of learning"] },
  ...additionalRituals,
  other: { name: ["অন্যান্য পুজো", "अन्य पूजा", "Other puja"] },
};

export const areas = {
  englishBazar: ["ইংরেজবাজার", "इंग्लिश बाज़ार", "English Bazar"],
  oldMalda: ["পুরাতন মালদা", "पुराना मालदा", "Old Malda"],
  other: ["মালদার অন্য এলাকা", "मालदा का अन्य इलाका", "Another area in Malda"],
};

export const copy = {
  brand: ["বুক মাই পুরোহিত", "बुक माय पुरोहित", "Book My Purohit"],
  language: ["ভাষা", "भाषा", "Language"],
  home: ["হোম", "होम", "Home"],
  rituals: ["পুজো", "पूजाएँ", "Pujas"],
  purohits: ["পুরোহিত", "पुरोहित", "Purohits"],
  book: ["পুজোর অনুরোধ পাঠান", "पूजा का अनुरोध भेजें", "Request a puja"],
  coverage: ["ইংরেজবাজার ও পুরাতন মালদা", "इंग्लिश बाज़ार और पुराना मालदा", "English Bazar and Old Malda"],
  hero: ["মালদায় বাড়ির পুজোর জন্য পুরোহিত বুক করুন", "मालदा में घर की पूजा के लिए पुरोहित बुक करें", "Book a purohit for your home puja in Malda"],
  intro: ["পুজো, তারিখ আর এলাকা জানান। পুরোহিতের সময় মিলিয়ে খরচ ও পুজোর সামগ্রীর তালিকা WhatsApp-এ জানানো হবে।", "पूजा, तारीख और इलाका बताएं। पुरोहित की उपलब्धता देखकर खर्च और पूजा सामग्री की सूची WhatsApp पर भेजी जाएगी।", "Share your puja, date and locality. We’ll check availability and send the cost and samagri list on WhatsApp."],
  choose: ["পুজো বেছে নিন", "पूजा चुनें", "Choose a puja"],
  chat: ["WhatsApp-এ কথা বলুন", "WhatsApp पर बात करें", "Chat on WhatsApp"],
  catalog: ["কোন পুজোর জন্য পুরোহিত চাই?", "किस पूजा के लिए पुरोहित चाहिए?", "Which puja are you planning?"],
  how: ["কীভাবে বুক করবেন", "बुकिंग कैसे करें", "How booking works"],
  stepDate: ["তারিখ ও এলাকা জানান", "तारीख और इलाका बताएं", "Share your date and locality"],
  stepConfirm: ["সময় ও খরচ জেনে বুকিং নিশ্চিত করুন", "समय और खर्च जानकर बुकिंग पक्की करें", "Agree on the time and cost to confirm"],
  requestInfo: ["ফর্মটি পূরণ করে WhatsApp-এ মেসেজটি পাঠান। পুরোহিতের সময় ও খরচে সম্মতি হলে বুকিং নিশ্চিত হবে।", "फ़ॉर्म भरकर WhatsApp पर संदेश भेजें। समय और खर्च पर सहमति के बाद बुकिंग पक्की होगी।", "Fill in the form and send the message in WhatsApp. Your booking is confirmed once you agree on the time and cost."],
  name: ["আপনার নাম", "आपका नाम", "Your name"],
  ritual: ["পুজোর নাম", "पूजा का नाम", "Puja"],
  customRitual: ["কোন পুজো?", "कौन सी पूजा?", "Which puja?"],
  date: ["পুজোর তারিখ", "पूजा की तारीख", "Puja date"],
  time: ["সুবিধার সময়", "पसंद का समय", "Preferred time"],
  morning: ["সকাল", "सुबह", "Morning"],
  afternoon: ["দুপুর", "दोपहर", "Afternoon"],
  evening: ["সন্ধ্যা", "शाम", "Evening"],
  flexible: ["সময় নিয়ে কথা বলব", "समय पर बात करेंगे", "Flexible"],
  area: ["এলাকা", "इलाका", "Area"],
  locality: ["পাড়া, গ্রাম বা কাছের পরিচিত জায়গা", "मोहल्ला, गाँव या पास की पहचान", "Neighbourhood, village or nearby landmark"],
  notes: ["অতিরিক্ত তথ্য (ঐচ্ছিক)", "अतिरिक्त जानकारी (वैकल्पिक)", "Extra details (optional)"],
  pick: ["বেছে নিন", "चुनें", "Select"],
  send: ["WhatsApp-এ অনুরোধ খুলুন", "WhatsApp में अनुरोध खोलें", "Open request in WhatsApp"],
  opened: ["বুকিংয়ের অনুরোধ করতে WhatsApp-এ মেসেজটি পাঠান।", "बुकिंग का अनुरोध करने के लिए WhatsApp में संदेश भेजें।", "Send the message in WhatsApp to submit your request."],
  greeting: ["নমস্কার, মালদায় পুজোর জন্য একজন পুরোহিত বুক করতে চাই।", "नमस्ते, मैं मालदा में पूजा के लिए पुरोहित बुक करना चाहता/चाहती हूँ।", "Hello, I’d like to request a purohit for a puja in Malda."],
  preferred: ["পছন্দের পুরোহিত", "पसंद के पुरोहित", "Preferred purohit"],
  roster: ["আপনার পুজো ও এলাকার জন্য পুরোহিতের সময় জানতে অনুরোধ পাঠান।", "अपनी पूजा और इलाके के लिए पुरोहित की उपलब्धता पूछें।", "Send a request to check which purohits can serve your area on your date."],
  profile: ["পরিচয় দেখুন", "परिचय देखें", "View profile"],
  sample: ["নমুনা প্রোফাইল", "नमूना प्रोफ़ाइल", "Sample profile"],
  sampleNote: ["এই প্রোফাইলটি উদাহরণ। আপনার পুজোর জন্য পুরোহিতের নাম ও সময় WhatsApp-এ নিশ্চিত করুন।", "यह प्रोफ़ाइल एक उदाहरण है। अपनी पूजा के लिए पुरोहित का नाम और समय WhatsApp पर पक्का करें।", "This is an example profile. Confirm the assigned purohit and time over WhatsApp."],
  spoken: ["ভাষা", "भाषाएँ", "Languages"],
  Bengali: ["বাংলা", "बंगाली", "Bengali"],
  Hindi: ["হিন্দি", "हिन्दी", "Hindi"],
  Sanskrit: ["সংস্কৃত", "संस्कृत", "Sanskrit"],
  missing: ["এই পেজটি পাওয়া যায়নি।", "यह पेज नहीं मिला।", "This page could not be found."],
  skip: ["মূল অংশে যান", "मुख्य भाग पर जाएँ", "Skip to content"],
};

export function translation(language) {
  const index = Object.keys(languages).indexOf(language);
  return (message) => (typeof message === "string" ? copy[message] : message)[index];
}
