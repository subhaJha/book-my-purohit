import { useSyncExternalStore } from "react";
import { hasPendingApiRequests, subscribeToApiRequests } from "../bookingApi";
import { bookingCopy } from "../bookingCopy";
import { useLanguage } from "../language";

export default function ApiLoader() {
  const pending = useSyncExternalStore(subscribeToApiRequests, hasPendingApiRequests);
  const { t } = useLanguage();

  return (
    <div className="api-loader-status" role="status">
      {pending && (
        <span className="api-loader">
          <span className="api-loader-spinner" aria-hidden="true" />
          {t(bookingCopy.loading)}
        </span>
      )}
    </div>
  );
}
