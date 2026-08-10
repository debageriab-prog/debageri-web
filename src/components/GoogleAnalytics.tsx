"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const CONSENT_KEY = "debageri-analytics-consent";
const CONSENT_CHANGE_EVENT = "debageri:analytics-consent-change";
const OPEN_SETTINGS_EVENT = "debageri:open-cookie-settings";

type Consent = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  function choose(nextConsent: Exclude<Consent, null>) {
    if (nextConsent === "declined") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      deleteAnalyticsCookies();
    }
    window.localStorage.setItem(CONSENT_KEY, nextConsent);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    setSettingsOpen(false);
  }

  return (
    <>
      {measurementId && consent === "accepted" ? <AnalyticsScripts measurementId={measurementId} /> : null}
      {consent === null || settingsOpen ? (
        <section
          aria-label="Analytics cookies"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-[#e8d8c8] bg-[#fdfaf6] p-5 shadow-[0_18px_55px_rgba(61,48,39,0.18)] sm:p-6"
        >
          <h2 className="text-lg font-semibold text-[#3D3027]">Help us improve Debageri</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#7a5e4a]">
            We would like to use Google Analytics cookies to understand which pages people visit. Analytics is off unless you accept. Read our{" "}
            <Link href="/privacy" className="font-semibold underline underline-offset-2">privacy policy</Link>.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose("accepted")} className="rounded-full bg-[#3D3027] px-5 py-2.5 text-sm font-semibold text-[#F7F2EA]">
              Accept analytics
            </button>
            <button type="button" onClick={() => choose("declined")} className="rounded-full border border-[#c4a98e] px-5 py-2.5 text-sm font-semibold text-[#5a4535]">
              Decline
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}

function AnalyticsScripts({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const configuredId = useRef<string | null>(null);

  useEffect(() => {
    window.dataLayer ??= [];
    window.gtag ??= (...args: unknown[]) => window.dataLayer?.push(args);

    if (configuredId.current !== measurementId) {
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { anonymize_ip: true, send_page_view: false });
      configuredId.current = measurementId;
    }
  }, [measurementId]);

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

function deleteAnalyticsCookies() {
  const domain = window.location.hostname;
  const domainCandidates = ["", domain, `.${domain}`];

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;

    for (const cookieDomain of domainCandidates) {
      const domainAttribute = cookieDomain ? `; Domain=${cookieDomain}` : "";
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}

function getConsentSnapshot(): Consent {
  const savedConsent = window.localStorage.getItem(CONSENT_KEY);
  return savedConsent === "accepted" ? "accepted" : savedConsent === "declined" ? "declined" : null;
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  };
}
