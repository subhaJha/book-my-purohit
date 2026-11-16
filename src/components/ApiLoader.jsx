import { useId, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { hasPendingApiRequests, subscribeToApiRequests } from "../bookingApi";
import { bookingCopy } from "../bookingCopy";
import { useLanguage } from "../language";

export default function ApiLoader() {
  const pending = useSyncExternalStore(subscribeToApiRequests, hasPendingApiRequests);
  const { t } = useLanguage();
  const dialog = useRef(null);
  const title = useId();
  const message = useId();

  useLayoutEffect(() => {
    const element = dialog.current;
    if (pending && !element.open) element.showModal();
    if (!pending && element.open) element.close();
  }, [pending]);

  return (
    <dialog ref={dialog} className="api-loader" aria-labelledby={title} aria-describedby={message}
      onCancel={(event) => event.preventDefault()}>
      <div className="api-loader-content">
        <div className="loader-diya" aria-hidden="true">
          <span className="loader-diya-flame" />
          <span className="loader-diya-spark loader-diya-spark-left">✦</span>
          <span className="loader-diya-spark loader-diya-spark-right">✧</span>
          <span className="loader-diya-bowl">
            <span className="loader-diya-face" />
            <span className="loader-diya-smile" />
          </span>
          <span className="loader-diya-shadow" />
        </div>
        <p id={title} className="api-loader-brand">{t("brand")}</p>
        <p id={message} className="api-loader-message" role="status">{t(bookingCopy.loading)}</p>
        <span className="api-loader-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
    </dialog>
  );
}
