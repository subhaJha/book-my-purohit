import { useEffect, useState } from "react";
import { bookingApi } from "../../bookingApi";
import { areas } from "../../content";

function saveError(cause) {
  if (cause.status === 409) return "That email is already in use.";
  if (cause.status === 422) return "Check the profile fields and try again.";
  return "Could not save the account. Try again.";
}

export function NewPurohit({ password, onSave }) {
  return (
    <div className="panel directory-add">
      <h2>Add new purohit</h2>
      <p className="muted">Give the purohit their sign-in email and password privately.</p>
      <DirectoryForm role="purohit" password={password} onSave={onSave} />
    </div>
  );
}

export function DirectoryList({ role, password, onSave }) {
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    bookingApi(`admin/directory/${role}?${new URLSearchParams({ search: query })}`, { password })
      .then((data) => { if (active) setResult(data); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [password, role, query, refresh]);

  async function loadMore() {
    setBusy(true);
    setFailed(false);
    try {
      const params = new URLSearchParams({ search: query, before: result.next });
      const data = await bookingApi(`admin/directory/${role}?${params}`, { password });
      setResult({ records: [...result.records, ...data.records], next: data.next });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-list">
      <h2>{role === "purohit" ? "Purohit list" : "Customer list"}</h2>
      <form className="directory-search" onSubmit={(event) => {
        event.preventDefault();
        setResult(null);
        setFailed(false);
        setQuery(new FormData(event.currentTarget).get("search"));
        setRefresh((version) => version + 1);
      }}>
        <label className="catalog-search">Search by name or email<input type="search" name="search" maxLength={100} /></label>
        <button className="button secondary" disabled={busy}>Search</button>
      </form>
      {failed && <p className="error" role="alert">Could not load accounts. Try again.</p>}
      {!result && !failed && <p role="status">Loading accounts…</p>}
      {result?.records.length === 0 && <p>No accounts match.</p>}
      {result?.records.map((record) => (
        <article className="panel" key={record.id}>
          <div className="section-heading">
            <h3>{record.name}</h3>
            <span className={`status-pill ${record.active ? "status-confirmed" : "status-cancelled"}`}>{record.active ? "Active" : "Disabled"}</span>
          </div>
          <p>{record.email}{record.phone && ` · +91 ${record.phone}`}{record.area && ` · ${areas[record.area][2]}`}</p>
          <details>
            <summary>Edit {role}</summary>
            <DirectoryForm role={role} record={record} password={password} onSave={(updated) => {
              setResult((state) => ({ ...state, records: state.records.map((item) => item.id === updated.id ? updated : item) }));
              onSave?.();
            }} />
          </details>
        </article>
      ))}
      {result?.next && <button className="button secondary" disabled={busy} onClick={loadMore}>Load more</button>}
    </div>
  );
}

function DirectoryForm({ role, record, password, onSave }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setError("");
    setSaved(false);
    const values = Object.fromEntries(new FormData(form));
    values.active = values.active === "on";
    if (!values.password) delete values.password;

    try {
      const result = await bookingApi(`admin/directory/${role}${record ? `/${record.id}` : ""}`, {
        method: record ? "PATCH" : "POST", password, body: values,
      });
      const passwordInput = form.elements.namedItem("password");
      if (passwordInput) passwordInput.value = "";
      setSaved(true);
      onSave?.(result);
    } catch (cause) {
      setError(saveError(cause));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="directory-form">
      <fieldset className="form-grid" disabled={busy}>
        <label>Name<input name="name" defaultValue={record?.name} maxLength={80} required /></label>
        <label>Email<input name="email" type="email" defaultValue={record?.email} maxLength={254} required /></label>
        {role === "purohit" && (
          <>
            <label>Mobile number<input name="phone" type="tel" defaultValue={record?.phone} pattern="(?:[+]91)?[6-9][0-9]{9}" required /></label>
            <label>Service area<select name="area" defaultValue={record?.area ?? "englishBazar"}>
              {Object.entries(areas).map(([id, label]) => <option value={id} key={id}>{label[2]}</option>)}
            </select></label>
            <label className="wide">{record ? "New password (optional)" : "Initial password"}
              <input name="password" type="password" minLength={10} maxLength={128} autoComplete="new-password" required={!record} />
            </label>
          </>
        )}
        <label className="wide account-toggle"><input type="checkbox" name="active" defaultChecked={record?.active ?? true} /> Account can sign in</label>
        <button className="button primary">{busy ? "Saving…" : record ? "Save changes" : "Add purohit"}</button>
      </fieldset>
      {error && <p className="error" role="alert">{error}</p>}
      {saved && <p role="status">Saved successfully.</p>}
    </form>
  );
}
