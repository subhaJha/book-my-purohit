export const purohits = [
  {
    id: 1,

    // Basic Identity
    name: "Pandit Subhankar Chattopadhyay",
    area: "English Bazaar, Malda",
    experience: "15+ years",
    languages: ["Bengali", "Sanskrit"],
    phone: "91XXXXXXXXXX",

    // Ritual Expertise
    rituals: [
      { id: "lakshmi", label: "Lakshmi Puja", bn: "লক্ষ্মী পূজা" },
      { id: "griha", label: "Griha Pravesh", bn: "গৃহপ্রবেশ" },
      { id: "annaprashan", label: "Annaprashan", bn: "অন্নপ্রাশন" },
    ],

    // Profile Image
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",

    // Availability (Admin-managed)
 availability: {
  monday: {
    morning: true,
    afternoon: false,
    evening: true,
  },
  tuesday: {
    morning: true,
    afternoon: true,
    evening: false,
  },
  wednesday: {
    morning: false,
    afternoon: false,
    evening: false,
  },
  thursday: {
    morning: true,
    afternoon: true,
    evening: true,
  },
  friday: {
    morning: true,
    afternoon: false,
    evening: true,
  },
  saturday: {
    morning: true,
    afternoon: true,
    evening: true,
  },
  sunday: {
    morning: false,
    afternoon: true,
    evening: true,
  },
},


    // Pricing (Transparent & Ritual-wise)
    pricing: {
      lakshmi: 1500,
      griha: 3000,
      annaprashan: 2500,
    },

    // Reviews & Ratings
    reviews: [
      {
        name: "Anirban Das",
        rating: 5,
        comment: "Very peaceful puja and explained every ritual clearly.",
      },
      {
        name: "Soma Chatterjee",
        rating: 4,
        comment: "Came on time and conducted puja properly.",
      },
    ],

    // Calculated Field (for UI)
    rating: 4.5,
  },

  {
    id: 2,

    name: "Pandit Ramesh Mukherjee",
    area: "Old Malda",
    experience: "20+ years",
    languages: ["Bengali", "Hindi"],
    phone: "91XXXXXXXXXX",

    rituals: [
      { id: "saraswati", label: "Saraswati Puja", bn: "সরস্বতী পূজা" },
      { id: "lakshmi", label: "Lakshmi Puja", bn: "লক্ষ্মী পূজা" },
    ],

    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",

   availability: {
  monday: {
    morning: true,
    afternoon: false,
    evening: true,
  },
  tuesday: {
    morning: true,
    afternoon: true,
    evening: false,
  },
  wednesday: {
    morning: false,
    afternoon: false,
    evening: false,
  },
  thursday: {
    morning: true,
    afternoon: true,
    evening: true,
  },
  friday: {
    morning: true,
    afternoon: false,
    evening: true,
  },
  saturday: {
    morning: true,
    afternoon: true,
    evening: true,
  },
  sunday: {
    morning: false,
    afternoon: true,
    evening: true,
  },
},


    pricing: {
      saraswati: 1200,
      lakshmi: 1400,
    },

    reviews: [
      {
        name: "Ritwik Paul",
        rating: 5,
        comment: "Very knowledgeable and calm.",
      },
    ],

    rating: 5,
  },
];
