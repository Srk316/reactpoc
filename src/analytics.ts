// src/analytics.ts
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

let loaded = false;

export function initGA(measurementId: string) {
  if (loaded || !measurementId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: any[]) => {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  loaded = true;
}

type GAParams = Record<string, any>;

export function gaEvent(eventName: string, params?: GAParams) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params || {});
  }
}

export function pageView(path: string, title?: string) {
  gaEvent("page_view", { page_path: path, page_title: title });
}

export function setUserId(userId?: string) {
  if (!userId) return;
  if (typeof window.gtag === "function") {
    window.gtag("set", { user_id: userId });
  }
}

export function setUserProps(props: GAParams) {
  if (typeof window.gtag === "function") {
    window.gtag("set", "user_properties", props);
  }
}
