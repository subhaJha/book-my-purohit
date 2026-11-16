import { Link } from "react-router-dom";
import hero from "../assets/purohit-hero.png";
import { useLanguage } from "../language";
import { bookingCopy as b } from "../bookingCopy";
import { RitualGrid } from "../components/RitualCard";

const heroIntro = ["গৃহপ্রবেশ, অন্নপ্রাশন বা বাড়ির পুজো। তারিখ আর এলাকা জানান, আমরা স্থানীয় পুরোহিতের সঙ্গে সময় মিলিয়ে দেব।", "गृह प्रवेश, अन्नप्राशन या घर की पूजा। तारीख और इलाका बताएं, हम स्थानीय पुरोहित की उपलब्धता देखेंगे।", "For griha pravesh, annaprashan and home pujas. Share your date and locality and we’ll check availability with a local purohit."];
const stepDetails = [
  ["তালিকা থেকে পুজোটি বেছে নিন, অথবা আপনার পুজোর নাম লিখুন।", "सूची से पूजा चुनें या अपनी पूजा का नाम लिखें।", "Pick a puja from the catalogue or tell us what you’re planning."],
  ["মোবাইল নম্বর দিন এবং বুকিং দেখার ব্যক্তিগত লিঙ্কটি রাখুন।", "मोबाइल नंबर दें और बुकिंग का निजी लिंक संभालकर रखें।", "Leave your mobile number and save your private tracking link."],
  ["পুরোহিতের নাম, দক্ষিণা ও যাতায়াতের খরচ দেখে বুকিং নিশ্চিত করুন।", "पुरोहित का नाम, दक्षिणा और यात्रा खर्च देखकर बुकिंग पक्की करें।", "Review the purohit’s name, dakshina and travel cost before confirming."],
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="coverage"><span className="coverage-dot" />{t("coverage")}</p>
          <h1>{t("hero")}</h1>
          <p className="intro">{t(heroIntro)}</p>
          <div className="actions">
            <Link className="button primary" to="/book">{t("book")} <span aria-hidden="true">→</span></Link>
            <a href="#pujas" className="button secondary">{t("choose")}</a>
          </div>
        </div>
        <div className="hero-frame">
          <img className="hero-photo" src={hero} alt="" fetchPriority="high" />
        </div>
      </section>
      <section className="section" id="pujas">
        <div className="section-heading">
          <h2>{t("catalog")}</h2>
          <Link className="text-link" to="/rituals">{t("rituals")} →</Link>
        </div>
        <RitualGrid />
      </section>
      <section className="steps section">
        <div className="section-heading">
          <h2>{t("how")}</h2>
          <Link to="/track" className="text-link">{t(b.track)} →</Link>
        </div>
        <ol>
          {["choose", "stepDate", "stepConfirm"].map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">{index + 1}</span>
              <div><strong>{t(step)}</strong><p>{t(stepDetails[index])}</p></div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}