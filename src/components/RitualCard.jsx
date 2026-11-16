import { Link } from "react-router-dom";
import { ritualDetails } from "../content";
import { useLanguage } from "../language";

export function RitualGrid() {
  const { t } = useLanguage();
  return (
    <div className="ritual-grid">
      {Object.entries(ritualDetails).filter(([, ritual]) => ritual.detail).map(([id, ritual]) => (
        <Link className="ritual-card" key={id} to={`/book?ritual=${id}`}>
          <span className={`ritual-photo ritual-photo-${id}`} aria-hidden="true" />
          <span className="ritual-copy">
            <strong>{t(ritual.name)}</strong>
            <span className="muted">{t(ritual.detail)}</span>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </span>
        </Link>
      ))}
    </div>
  );
}