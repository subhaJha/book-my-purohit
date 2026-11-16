import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { areas, ritualDetails } from "../content";
import { categories } from "../catalogue";
import { useLanguage } from "../language";
import { bookingCopy as b } from "../bookingCopy";
import { bookingApi } from "../bookingApi";

const times = ["morning", "afternoon", "evening", "flexible"];
const invalidFields = ["সব প্রয়োজনীয় তথ্য ও সঠিক মোবাইল নম্বর দিন।", "सभी ज़रूरी जानकारी और सही मोबाइल नंबर भरें।", "Fill in all required fields with a valid mobile number."];
const indiaDate = new Intl.DateTimeFormat("en-CA", { dateStyle: "short", timeZone: "Asia/Kolkata" });

export default function Book() {
  const [params] = useSearchParams();
  const requested = params.get("ritual");
  return <BookingForm key={params.toString()} initialRitual={Object.hasOwn(ritualDetails, requested) ? requested : ""} preferred={params.get("purohit")?.trim().slice(0, 120)} />;
}

function BookingForm({ initialRitual, preferred }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const retry = useRef(null);
  const [ritual, setRitual] = useState(initialRitual);
  const [errors, setErrors] = useState([]);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const details = Object.fromEntries(Array.from(new FormData(form), ([field, value]) => [field, value.trim()]));
    const invalid = Object.keys(details).filter((field) => !form.elements[field].validity.valid ||
      (form.elements[field].required && !details[field]));
    setErrors(invalid);
    setFailed(false);
    if (invalid.length) {
      form.elements[invalid[0]].focus();
      return;
    }

    const payload = { ...details, lang: language, preferred };
    const signature = JSON.stringify(payload);
    if (signature !== retry.current?.signature) {
      const key = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("");
      retry.current = { signature, key };
    }

    setBusy(true);
    try {
      const { id } = await bookingApi("bookings", { method: "POST", body: { ...payload, key: retry.current.key } });
      navigate(`/track/${id}`, { replace: true });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  const invalid = (field) => errors.includes(field) || undefined;
  return (
    <section className="narrow page-section">
      <p className="coverage">{t("coverage")}</p>
      <h1>{t("book")}</h1>
      <p className="intro">{t(b.request)}</p>
      <form className="panel booking-form" noValidate onSubmit={submit}>
        <fieldset disabled={busy}>
          <div className="form-grid">
            <label>{t("name")}<input name="name" autoComplete="name" maxLength={80} required aria-invalid={invalid("name")} /></label>
            <label>{t(b.phone)}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="(?:[+]91)?[6-9][0-9]{9}" placeholder="9876543210" maxLength={13} required aria-invalid={invalid("phone")} /></label>
            <label className="wide">{t("ritual")}
              <select name="ritual" value={ritual} onChange={(event) => setRitual(event.target.value)} required aria-invalid={invalid("ritual")}>
                <option value="">{t("pick")}</option>
                {Object.entries(categories).map(([category, label]) => (
                  <optgroup key={category} label={t(label)}>
                    {Object.entries(ritualDetails).filter(([, item]) => item.category === category)
                      .map(([id, item]) => <option key={id} value={id}>{t(item.name)}</option>)}
                  </optgroup>
                ))}
                <option value="other">{t(ritualDetails.other.name)}</option>
              </select>
            </label>
            {ritual === "other" && <label className="wide">{t("customRitual")}<input name="customRitual" maxLength={80} required aria-invalid={invalid("customRitual")} /></label>}
            <label>{t("date")}<input name="date" type="date" min={indiaDate.format(new Date())} required aria-invalid={invalid("date")} /></label>
            <label>{t("time")}
              <select name="time" defaultValue="" required aria-invalid={invalid("time")}>
                <option value="">{t("pick")}</option>
                {times.map((time) => <option key={time} value={time}>{t(time)}</option>)}
              </select>
            </label>
            <label>{t("area")}
              <select name="area" defaultValue="" required aria-invalid={invalid("area")}>
                <option value="">{t("pick")}</option>
                {Object.entries(areas).map(([id, area]) => <option key={id} value={id}>{t(area)}</option>)}
              </select>
            </label>
            <label>{t("locality")}<input name="locality" maxLength={120} required aria-invalid={invalid("locality")} /></label>
            <label className="wide">{t("notes")}<textarea name="notes" rows={3} maxLength={300} /></label>
          </div>
          {preferred && <p>{t("preferred")} · {preferred}</p>}
          <p className="muted">{t(b.privacy)}</p>
          {errors.length > 0 && <p className="error" role="alert">{t(invalidFields)}</p>}
          {failed && <p className="error" role="alert">{t(b.failure)}</p>}
          <button className="button primary standalone" type="submit">{t(b[busy ? "loading" : "submit"])} →</button>
        </fieldset>
      </form>
    </section>
  );
}
