import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookingApi } from "../bookingApi";
import { bookingCopy as b } from "../bookingCopy";
import { locales, ritualDetails } from "../content";
import { useLanguage } from "../language";



const labels = {
  login: ["সাইন ইন করুন", "साइन इन करें", "Sign in"],
  register: ["অ্যাকাউন্ট খুলুন", "खाता बनाएँ", "Create account"],
  email: ["ইমেল", "ईमेल", "Email"],
  password: ["পাসওয়ার্ড", "पासवर्ड", "Password"],
  passwordHint: ["অন্তত ১০টি অক্ষর দিন।", "कम से कम 10 अक्षर रखें।", "Use at least 10 characters."],
  intro: ["সাইন ইন করে নতুন বুকিংগুলির অবস্থা এক জায়গায় দেখুন।", "साइन इन करके अपनी नई बुकिंग एक जगह देखें।", "Sign in to keep track of your new bookings in one place."],
  logout: ["সাইন আউট করুন", "साइन आउट करें", "Sign out"],
  history: ["আমার বুকিং", "मेरी बुकिंग", "My bookings"],
  empty: ["এই অ্যাকাউন্টে এখনও কোনও বুকিং নেই।", "इस खाते में अभी कोई बुकिंग नहीं है।", "This account has no bookings yet."],
  wrong: ["ইমেল বা পাসওয়ার্ডটি যাচাই করুন।", "ईमेल या पासवर्ड जाँचें।", "Check your email and password."],
  duplicate: ["এই ইমেল দিয়ে অ্যাকাউন্ট খোলা গেল না। সাইন ইন করে দেখুন।", "इस ईमेल से खाता नहीं बन पाया। साइन इन करके देखें।", "Couldn’t create an account with this email. Try signing in."],
  more: ["আরও বুকিং দেখুন", "और बुकिंग देखें", "Show more bookings"],
};

export default function Account() {
  const { language, t } = useLanguage();
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(undefined);
  const [history, setHistory] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [historyError, setHistoryError] = useState(false);

  useEffect(() => {
    let alive = true;
    bookingApi("account").then((result) => {
      if (alive) setUser(result);
    }).catch((cause) => {
      if (alive) {
        setUser(null);
        if (cause.status !== 401) setError(b.failure);
      }
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    bookingApi("account/bookings").then((result) => {
      if (alive) setHistory(result);
    }).catch(() => { if (alive) setHistoryError(true); });
    return () => { alive = false; };
  }, [user]);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      setHistoryError(false);
      setUser(await bookingApi(`account/${mode}`, { method: "POST", body: Object.fromEntries(new FormData(event.currentTarget)) }));
    } catch (cause) {
      setError(cause.status === 401 ? labels.wrong : cause.status === 409 ? labels.duplicate : b.failure);
    } finally {
      setBusy(false);
    }
  }

  async function logOut() {
    setBusy(true);
    setError(null);
    try {
      await bookingApi("account/logout", { method: "POST", body: {} });
      setHistory(null);
      setHistoryError(false);
      setUser(null);
      setMode("login");
    } catch {
      setError(b.failure);
    } finally {
      setBusy(false);
    }
  }

  async function more() {
    setBusy(true);
    setHistoryError(false);
    try {
      const result = await bookingApi(`account/bookings?before=${history.next}`);
      setHistory({ bookings: [...history.bookings, ...result.bookings], next: result.next });
    } catch {
      setHistoryError(true);
    } finally {
      setBusy(false);
    }
  }

  const dateFormat = new Intl.DateTimeFormat(locales[language], { dateStyle: "medium", timeZone: "Asia/Kolkata" });

  return (
    <section className="narrow page-section">
      <h1>{t(b.account)}</h1>
      {error && <p className="error" role="alert">{t(error)}</p>}
      {user === undefined ? <p role="status">{t(b.loading)}</p> : user ? (
        <>
          <div className="panel account-profile">
            <div><h2>{user.name}</h2><p className="muted">{user.email}</p></div>
            <button className="button secondary" disabled={busy} onClick={logOut}>{t(labels.logout)}</button>
          </div>
          <div className="section-heading section">
            <h2>{t(labels.history)}</h2>
            <Link className="text-link" to="/book">{t("book")} →</Link>
          </div>
          {historyError && <p className="error" role="alert">{t(b.failure)}</p>}
          {!history && !historyError && <p role="status">{t(b.loading)}</p>}
          {history?.bookings.length === 0 && <p className="intro">{t(labels.empty)}</p>}
          {history && <div className="account-history">
            {history.bookings.map((item) => (
              <Link className="catalog-entry" key={item.id} to={`/track/${item.id}`}>
                <span><strong>{item.customRitual || t(ritualDetails[item.ritual].name)}</strong>
                  <small>{dateFormat.format(new Date(`${item.date}T12:00:00+05:30`))}</small></span>
                <span className={`status-pill status-${item.status}`}>{t(b[item.status])}</span>
              </Link>
            ))}
          </div>}
          {history?.next && <button className="button secondary standalone" disabled={busy} onClick={more}>{t(labels.more)}</button>}
        </>
      ) : (
        <>
          <p className="intro">{t(labels.intro)}</p>
          <div className="catalog-filters">
            {["login", "register"].map((choice) => (
              <button className="filter-chip" key={choice} type="button" aria-pressed={mode === choice} disabled={busy}
                onClick={() => { setMode(choice); setError(null); }}>{t(labels[choice])}</button>
            ))}
          </div>
          <form className="panel booking-form" onSubmit={submit} key={mode}>
            <div className="form-grid">
              {mode === "register" && <label className="wide">{t("name")}<input name="name" required maxLength={80} autoComplete="name" /></label>}
              <label className="wide">{t(labels.email)}<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
              <label className="wide">{t(labels.password)}<input name="password" type="password" required minLength={10} maxLength={128}
                autoComplete={mode === "register" ? "new-password" : "current-password"} /></label>
            </div>
            {mode === "register" && <p className="muted">{t(labels.passwordHint)}</p>}
            <button className="button primary standalone" disabled={busy}>{busy ? t(b.loading) : t(labels[mode])}</button>
          </form>
        </>
      )}
    </section>
  );
}
