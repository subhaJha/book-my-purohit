import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../catalogue";
import { ritualDetails } from "../content";
import { useLanguage } from "../language";

const labels = {
  all: ["সব পুজো", "सभी पूजाएँ", "All pujas"],
  search: ["পুজোর নাম খুঁজুন", "पूजा का नाम खोजें", "Search for a puja"],
  empty: ["এই নামে কোনও পুজো পাওয়া যায়নি।", "इस नाम की कोई पूजा नहीं मिली।", "No pujas match your search."],
  intro: ["মালদায় পুজো বা অনুষ্ঠানের জন্য অনুরোধ পাঠান। পুরোহিতের সময় মিলিয়ে বুকিং নিশ্চিত করা হবে।", "मालदा में पूजा या संस्कार के लिए अनुरोध भेजें। पुरोहित की उपलब्धता देखकर बुकिंग पक्की होगी।", "Request a puja or ceremony in Malda. Your booking depends on local purohit availability."],
};

export default function Rituals() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const normalized = search.normalize("NFC").trim().toLowerCase();
  const matches = Object.entries(ritualDetails).filter(([id, ritual]) =>
    id !== "other" && (!category || ritual.category === category) &&
    ritual.name.some((label) => label.normalize("NFC").toLowerCase().includes(normalized)));

  return (
    <section className="page-section">
      <h1>{t("catalog")}</h1>
      <p className="intro">{t(labels.intro)}</p>
      <label className="catalog-search">
        {t(labels.search)}
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      <div className="catalog-filters">
        {[["", labels.all], ...Object.entries(categories)].map(([id, label]) =>
          <button type="button" className="filter-chip" aria-pressed={category === id} key={id} onClick={() => setCategory(id)}>{t(label)}</button>)}
      </div>
      {matches.length ? (
        <div className="catalog-results">
          {matches.map(([id, ritual]) => (
            <Link className="catalog-entry" key={id} to={`/book?ritual=${id}`}>
              <span><strong>{t(ritual.name)}</strong><small>{t(categories[ritual.category])}</small></span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      ) : <p className="intro" role="status">{t(labels.empty)}</p>}
      <Link className="button secondary standalone" to="/book?ritual=other">{t(ritualDetails.other.name)} →</Link>
    </section>
  );
}
