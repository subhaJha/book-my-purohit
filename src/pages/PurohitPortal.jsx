import { useEffect, useState } from "react";
import { bookingApi } from "../bookingApi";
import { bookingCopy as b } from "../bookingCopy";
import { areas, locales, ritualDetails } from "../content";
import { useLanguage } from "../language";

const labels = {
  title: ["পুরোহিত পোর্টাল", "पुरोहित पोर्टल", "Purohit portal"],
  intro: ["অ্যাডমিনের দেওয়া ইমেল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।", "एडमिन से मिले ईमेल और पासवर्ड से साइन इन करें।", "Sign in with the email and password provided by your administrator."],
  email: ["ইমেল", "ईमेल", "Email"],
  password: ["পাসওয়ার্ড", "पासवर्ड", "Password"],
  signIn: ["সাইন ইন করুন", "साइन इन करें", "Sign in"],
  signOut: ["সাইন আউট করুন", "साइन आउट करें", "Sign out"],
  schedule: ["আমার পুজোর তালিকা", "मेरी पूजाओं की सूची", "My assigned pujas"],
  empty: ["আপনার কাছে এখনও কোনও পুজো দেওয়া হয়নি।", "आपको अभी कोई पूजा नहीं सौंपी गई है।", "No pujas are assigned to you yet."],
  wrong: ["ইমেল বা পাসওয়ার্ডটি যাচাই করুন।", "ईमेल या पासवर्ड जाँचें।", "Check your email and password."],
  more: ["আরও দেখুন", "और देखें", "Show more"],
};

export default function PurohitPortal() {
  const { language, t } = useLanguage();
  const [schedule, setSchedule] = useState(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    bookingApi("purohit/schedule").then((data) => {
      if (active) setSchedule(data);
    }).catch((cause) => {
      if (!active) return;
      setSchedule(null);
      if (cause.status !== 401) setError(b.failure);
    });
    return () => { active = false; };
  }, []);

  async function run(action) {
    setBusy(true);
    setError(null);
    try { await action(); } catch (cause) {
      setError(cause.status === 401 ? labels.wrong : b.failure);
    } finally { setBusy(false); }
  }

  const dateFormat = new Intl.DateTimeFormat(locales[language], { dateStyle: "medium", timeZone: "Asia/Kolkata" });

  return (
    <section className="narrow page-section">
      <h1>{t(labels.title)}</h1>
      {error && <p className="error" role="alert">{t(error)}</p>}
      {schedule === undefined ? <p role="status">{t(b.loading)}</p> : schedule ? (
        <>
          <div className="panel account-profile">
            <h2>{schedule.name}</h2>
            <button className="button secondary" disabled={busy} onClick={() => run(async () => {
              await bookingApi("purohit/logout", { method: "POST", body: {} });
              setSchedule(null);
            })}>{t(labels.signOut)}</button>
          </div>
          <div className="section"><h2>{t(labels.schedule)}</h2></div>
          {schedule.bookings.length === 0 && <p className="intro">{t(labels.empty)}</p>}
          <div className="account-history">
            {schedule.bookings.map((item) => (
              <article className="panel" key={item.reference}>
                <p className={`status-pill status-${item.status}`}>{t(b[item.status])}</p>
                <h3>{item.customRitual || t(ritualDetails[item.ritual].name)}</h3>
                <p>{dateFormat.format(new Date(`${item.date}T12:00:00+05:30`))}{item.time && ` · ${item.time} IST`}</p>
                <p>{t(areas[item.area])}{item.locality && ` · ${item.locality}`}</p>
                {item.dakshina !== null && <p>{t(b.dakshina)} · ₹{item.dakshina}</p>}
                {item.samagri && <p className="samagri">{item.samagri}</p>}
              </article>
            ))}
          </div>
          {schedule.next && <button className="button secondary standalone" disabled={busy} onClick={() => run(async () => {
            const next = await bookingApi(`purohit/schedule?before=${schedule.next}`);
            setSchedule({ ...next, bookings: [...schedule.bookings, ...next.bookings] });
          })}>{t(labels.more)}</button>}
        </>
      ) : (
        <>
          <p className="intro">{t(labels.intro)}</p>
          <form className="panel booking-form" onSubmit={(event) => {
            event.preventDefault();
            const body = Object.fromEntries(new FormData(event.currentTarget));
            run(async () => {
              await bookingApi("purohit/login", { method: "POST", body });
              setSchedule(await bookingApi("purohit/schedule"));
            });
          }}>
            <div className="form-grid">
              <label className="wide">{t(labels.email)}<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
              <label className="wide">{t(labels.password)}<input type="password" name="password" autoComplete="current-password" required minLength={10} maxLength={128} /></label>
            </div>
            <button className="button primary standalone" disabled={busy}>{t(busy ? b.loading : labels.signIn)}</button>
          </form>
        </>
      )}
    </section>
  );
}
