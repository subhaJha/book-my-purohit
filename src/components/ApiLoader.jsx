import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { hasPendingApiRequests, subscribeToApiRequests } from "../bookingApi";
import { bookingCopy } from "../bookingCopy";
import { useLanguage } from "../language";
import PurohitAnimation from "./PurohitAnimation";

export default function ApiLoader() {
  const pending = useSyncExternalStore(subscribeToApiRequests, hasPendingApiRequests);
  const [starting, setStarting] = useState(true);
  const loading = starting || pending;
  const { t } = useLanguage();
  const dialog = useRef(null);
  const title = useId();
  const message = useId();

  useEffect(() => {
    let pageReady = document.readyState === "complete";
    let introReady = false;
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function releaseWhenReady() {
      if (pageReady && introReady) setStarting(false);
    }

    function onPageLoad() {
      pageReady = true;
      releaseWhenReady();
    }

    window.addEventListener("load", onPageLoad, { once: true });
    const intro = window.setTimeout(() => {
      introReady = true;
      releaseWhenReady();
    }, motionReduced ? 0 : 850);
    // Slow nonessential assets should never prevent visitors from using the app.
    const deadline = window.setTimeout(() => setStarting(false), 4000);

    return () => {
      window.removeEventListener("load", onPageLoad);
      window.clearTimeout(intro);
      window.clearTimeout(deadline);
    };
  }, []);

  useLayoutEffect(() => {
    const element = dialog.current;
    if (loading && !element.open) element.showModal();
    if (!loading && element.open) element.close();
  }, [loading]);

  return (
    <dialog ref={dialog} className="api-loader" aria-labelledby={title} aria-describedby={message}
      onCancel={(event) => event.preventDefault()}>
      <div className="api-loader-content">
        {loading && <PurohitAnimation />}
        <p id={title} className="api-loader-brand">{t("brand")}</p>
        <p id={message} className="api-loader-message" role="status">{t(bookingCopy.loading)}</p>
        <span className="api-loader-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
    </dialog>
  );
}
