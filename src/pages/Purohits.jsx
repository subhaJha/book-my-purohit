import { Link, useSearchParams } from "react-router-dom";
import { bookingCopy } from "../bookingCopy";
import { ritualDetails } from "../content";
import { useLanguage } from "../language";

export default function Purohits() {
  const { t } = useLanguage();
  const portal = ["পুরোহিত লগইন", "पुरोहित लॉगिन", "Purohit login"];
  const [params] = useSearchParams();
  const ritual = params.get("ritual");
  const query = Object.hasOwn(ritualDetails, ritual) ? `?ritual=${ritual}` : "";

  return (
    <section className="narrow page-section panel">
      <p className="coverage">{t("coverage")}</p>
      <h1>{t("purohits")}</h1>
      <p className="intro">{t(bookingCopy.aboutPurohits)}</p>
      <Link className="button primary standalone" to={`/book${query}`}>{t("book")} →</Link>
      <div><Link className="text-link" to="/purohit-portal">{t(portal)} ↗</Link></div>
    </section>
  );
}
