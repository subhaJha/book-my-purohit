import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { languages } from "../content";
import { useLanguage } from "../language";
import { bookingCopy as b } from "../bookingCopy";
import { whatsappLink } from "../contact";

const purohitLogin = ["পুরোহিত লগইন", "पुरोहित लॉगिन", "Purohit login"];
const admin = ["অ্যাডমিন ড্যাশবোর্ড", "एडमिन डैशबोर्ड", "Admin Dashboard"];

export default function Layout({ children }) {
  const { language, setLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const contact = whatsappLink(t("greeting"));

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#content">{t("skip")}</a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link to="/" className="brand"><span aria-hidden="true">✺</span>{t("brand")}</Link>
          <nav className="navigation">
            <NavLink to="/" end>{t("home")}</NavLink>
            <NavLink to="/rituals">{t("rituals")}</NavLink>
            <NavLink to="/purohits">{t("purohits")}</NavLink>
            <NavLink to="/track">{t(b.track)}</NavLink>
            <NavLink to="/account">{t(b.account)}</NavLink>
          </nav>
          <div className="header-actions">
            <select className="language" aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value)}>
              {Object.entries(languages).map(([id, label]) => <option key={id} lang={id} value={id}>{label}</option>)}
            </select>
            <NavLink className="staff-link" to="/admin">{t(admin)} <span aria-hidden="true">↗</span></NavLink>
          </div>
        </div>
      </header>
      <main id="content" tabIndex={-1} className="shell main-content">{children}</main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <div><strong>{t("brand")}</strong><p>{t("coverage")}</p></div>
          <Link to="/track">{t(b.track)} →</Link>
          <Link to="/purohit-portal">{t(purohitLogin)} ↗</Link>
          <Link to="/admin">{t(admin)} ↗</Link>
          {contact && <a href={contact} target="_blank" rel="noreferrer">{t("chat")} ↗</a>}
        </div>
      </footer>
    </>
  );
}