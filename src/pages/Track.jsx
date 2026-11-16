import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookingApi } from "../bookingApi";
import { bookingCopy as b } from "../bookingCopy";
import { locales, ritualDetails } from "../content";
import { useLanguage } from "../language";

const trackingCode = /(?:^|\/track\/)([a-f0-9]{32})\/?$/;

export default function Track() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);

  function open(event) {
    event.preventDefault();
    const entry = new FormData(event.currentTarget).get("tracking").trim();
    const code = entry.match(trackingCode)?.[1];
    setInvalid(!code);
    if (code) navigate(`/track/${code}`);
  }

  return (
    <section className="narrow page-section">
      <h1>{t(b.track)}</h1>
      {id ? <BookingStatus key={id} id={id} /> : (
        <form className="panel booking-form" onSubmit={open}>
          <div className="form-grid"><label className="wide">{t(b.privateLink)}<input name="tracking" required maxLength={300} /></label></div>
          {invalid && <p className="error" role="alert">{t(b.invalidLink)}</p>}
          <button className="button primary standalone">{t(b.track)} →</button>
        </form>
      )}
    </section>
  );
}

function BookingStatus({ id }) {
  const { language, t } = useLanguage();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/track/${id}`;

  useEffect(() => {
    let alive = true;
    bookingApi(`bookings/${encodeURIComponent(id)}`)
      .then((data) => { if (alive) setRecord(data); })
      .catch((cause) => { if (alive) setError(cause.status === 404 ? "invalidLink" : "failure"); });
    return () => { alive = false; };
  }, [id]);

  async function accept() {
    setBusy(true);
    setError("");
    const path = `bookings/${encodeURIComponent(id)}`;
    try {
      setRecord(await bookingApi(`${path}/accept`, { method: "POST", body: { revision: record.revision } }));
    } catch (cause) {
      if (cause.status === 409) {
        try {
          setRecord(await bookingApi(path));
          setError("refreshQuote");
        } catch { setError("failure"); }
      } else setError("failure");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      document.getElementById("tracking-link").select();
    }
  }

  if (!record) return <p className={error ? "error" : "intro"} role="status">{t(b[error || "loading"])}</p>;
  const { quote, status } = record;
  const date = new Intl.DateTimeFormat(locales[language], { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date(`${record.date}T12:00:00+05:30`));
  const money = new Intl.NumberFormat(locales[language], { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  return (
    <div className="panel booking-form">
      <p className={`status-pill status-${status}`}>{t(b[status])}</p>
      <h2>{record.customRitual || t(ritualDetails[record.ritual].name)}</h2>
      <p>{date}</p>
      {status === "requested" && <p className="muted">{t(b.requestedInfo)}</p>}
      {quote && (
        <div className="quote">
          <p><strong>{t("purohits")}</strong> · {quote.purohit}</p>
          <p><strong>{t(b.timeAgreed)}</strong> · {quote.time} IST</p>
          <dl>
            {["dakshina", "travel", "materials"].map((key) => <div key={key}><dt>{t(b[key])}</dt><dd>{money.format(quote[key])}</dd></div>)}
            <div><dt>{t(b.total)}</dt><dd><strong>{money.format(quote.dakshina + quote.travel + quote.materials)}</strong></dd></div>
          </dl>
          {quote.samagri && <p className="samagri">{quote.samagri}</p>}
        </div>
      )}
      {status === "quoted" && <button className="button primary standalone" onClick={accept} disabled={busy}>{t(b[busy ? "loading" : "accept"])}</button>}
      {error && <p className="error" role="alert">{t(b[error])}</p>}
      <div className="tracking-box">
        <label htmlFor="tracking-link">{t(b.saveLink)}</label>
        <div className="actions">
          <input id="tracking-link" readOnly value={link} onFocus={(event) => event.target.select()} />
          <button className="button secondary" onClick={copy}>{t(b.copyLink)}</button>
        </div>
        {copied && <p role="status">{t(b.copied)}</p>}
      </div>
    </div>
  );
}
