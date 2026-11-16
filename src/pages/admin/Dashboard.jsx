import { useState } from "react";
import { bookingApi } from "../../bookingApi";
import { areas, ritualDetails } from "../../content";
import { DirectoryList, NewPurohit } from "./Directory";

const statusLabels = { requested: "New request", quoted: "Quote ready", confirmed: "Confirmed", completed: "Completed", cancelled: "Cancelled" };
const amounts = ["dakshina", "travel", "materials"];

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("bookings");
  const [roster, setRoster] = useState([]);
  const [bookings, setBookings] = useState(null);
  const [next, setNext] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(secret, status, cursor) {
    setBusy(true);
    setError("");
    const search = new URLSearchParams({ status });
    if (cursor) search.set("before", cursor);
    try {
      const [result, available] = await Promise.all([
        bookingApi(`admin?${search}`, { password: secret }),
        bookingApi("admin/directory/roster", { password: secret }),
      ]);
      setRoster(available.records);
      setPassword(secret);
      setFilter(status);
      setBookings((current) => cursor ? [...current, ...result.bookings] : result.bookings);
      setNext(result.next);
    } catch (cause) {
      setError(cause.status === 401 ? "Check your admin password." :
        cause.status === 503 ? "Set BOOKING_ADMIN_PASSWORD to at least 16 characters on the server." :
        "Could not load bookings. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function refreshRoster() {
    try {
      setRoster((await bookingApi("admin/directory/roster", { password })).records);
    } catch {
      setError("Could not refresh the purohit roster. Refresh the booking queue.");
    }
  }

  return (
    <section className="page-section admin-page" lang="en">
      <div className="admin-banner">
        <div>
          <p>Book My Purohit · Staff</p>
          <h1>Admin dashboard</h1>
        </div>
        {bookings !== null && <span className="staff-session">Signed in</span>}
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {bookings === null ? (
        <form className="panel booking-form narrow" onSubmit={(event) => {
          event.preventDefault();
          load(new FormData(event.currentTarget).get("password"), "");
        }}>
          <h2>Staff sign-in</h2>
          <p className="muted">Open your booking queue to review requests and prepare quotes.</p>
          <div className="form-grid"><label className="wide">Admin password<input name="password" type="password" autoComplete="current-password" required /></label></div>
          <button className="button primary standalone" disabled={busy}>Sign in</button>
        </form>
      ) : (
        <>
          <nav className="catalog-filters" aria-label="Admin sections">
            {Object.entries({ bookings: "Bookings", add: "Add new purohit", purohit: "Purohit list", customer: "User list" })
              .map(([id, label]) => <button type="button" className="filter-chip" key={id} disabled={busy}
                aria-pressed={section === id} onClick={() => setSection(id)}>{label}</button>)}
            <button className="button secondary" disabled={busy} onClick={() => {
              setPassword("");
              setBookings(null);
              setRoster([]);
              setFilter("");
              setNext(null);
              setSection("bookings");
            }}>Sign out</button>
          </nav>
          {section === "add" && <NewPurohit password={password} onSave={() => {
            setSection("purohit");
            refreshRoster();
          }} />}
          {(section === "purohit" || section === "customer") && (
            <DirectoryList key={section} role={section} password={password} onSave={section === "purohit" ? refreshRoster : undefined} />
          )}
          {section === "bookings" && <>
          <div className="actions admin-toolbar">
            <select className="language" aria-label="Filter bookings" value={filter} disabled={busy} onChange={(event) => load(password, event.target.value)}>
              <option value="">All bookings</option>
              {Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
            <button className="button secondary" disabled={busy} onClick={() => load(password, filter)}>Refresh</button>

          </div>
          <div className="admin-list">
            <h2>{filter ? statusLabels[filter] : "All bookings"}</h2>
            {bookings.length === 0 && <p>No bookings in this view.</p>}
            {bookings.map((record) => (
              <Booking key={`${record.id}-${record.revision}`} record={record} password={password} roster={roster} onChange={(updated) => {
                setBookings((items) => items.flatMap((item) => item.id !== record.id ? [item] :
                  !filter || filter === updated.status ? [{ ...item, ...updated }] : []));
              }} />
            ))}
          </div>
          {next && <button className="button secondary standalone" disabled={busy} onClick={() => load(password, filter, next)}>Load more</button>}
          </>}
        </>
      )}
    </section>
  );
}

function Booking({ record, password, roster, onChange }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { quote, status } = record;
  const [purohitId, setPurohitId] = useState(record.purohitId || "");
  const assigned = roster.find(({ id }) => id === purohitId);
  const canQuote = status === "requested" || status === "quoted";
  const canCancel = canQuote || status === "confirmed";

  async function update(status, quote, assignedId) {
    setBusy(true);
    setError("");
    try {
      onChange(await bookingApi(`admin/${record.id}`, { password, method: "PATCH", body: { status, quote, purohitId: assignedId, revision: record.revision } }));
    } catch (cause) {
      setError(cause.status === 409 ? "Booking changed. Refresh the list before trying again." : "Could not save the update. Check the fields and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="panel">
      <p className={`status-pill status-${status}`}>{statusLabels[status]}</p>
      <h2>{record.customRitual || ritualDetails[record.ritual].name[2]} · {record.date}</h2>
      <p><strong>{record.name}</strong> · <a className="text-link" href={`tel:+91${record.phone}`}>+91 {record.phone}</a> · {record.lang.toUpperCase()}</p>
      <p>{areas[record.area][2]} · {record.locality} · {record.time}</p>
      {record.preferred && <p>Requested purohit · {record.preferred}</p>}
      {record.notes && <p>{record.notes}</p>}
      <a className="text-link" href={`/track/${record.id}`} target="_blank" rel="noreferrer">Open customer tracking page ↗</a>
      {quote && !canQuote && <p>{quote.purohit} · {quote.time} IST · ₹{quote.dakshina + quote.travel + quote.materials}</p>}
      {canQuote && (
        <details>
          <summary>{status === "quoted" ? "Edit quote" : "Assign purohit and post quote"}</summary>
          <form onSubmit={(event) => {
            event.preventDefault();
            const values = Object.fromEntries(new FormData(event.currentTarget));
            for (const key of amounts) values[key] = Number(values[key]);
            if (purohitId) values.purohit = assigned?.name || quote?.purohit;
            update("quoted", values, purohitId || null);
          }}>
            <fieldset disabled={busy} className="form-grid">
              <label>Assign purohit
                <select value={purohitId} onChange={(event) => setPurohitId(event.target.value)}>
                  <option value="">External purohit (enter name)</option>
                  {purohitId && !assigned && <option value={purohitId}>{quote?.purohit} (unavailable)</option>}
                  {roster.map(({ id, name, area }) => <option key={id} value={id}>{name} · {areas[area][2]}</option>)}
                </select>
              </label>
              {!purohitId && <label>Purohit name<input name="purohit" required maxLength={120} defaultValue={quote?.purohit} /></label>}
              <label>Agreed time (IST)<input name="time" type="time" required defaultValue={quote?.time} /></label>
              {amounts.map((key) => <label key={key}>{key} (₹)<input name={key} type="number" required min="0" max="1000000" defaultValue={quote?.[key] ?? 0} /></label>)}
              <label className="wide">Samagri list / customer instructions<textarea name="samagri" rows="3" maxLength={1500} defaultValue={quote?.samagri} /></label>
              <button className="button primary">Post quote</button>
            </fieldset>
          </form>
        </details>
      )}
      <div className="actions">
        {status === "confirmed" && <button className="button primary" disabled={busy} onClick={() => update("completed")}>Mark completed</button>}
        {canCancel && <button className="button secondary" disabled={busy} onClick={() => {
          if (window.confirm("Cancel this booking?")) update("cancelled");
        }}>Cancel booking</button>}
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </article>
  );
}
