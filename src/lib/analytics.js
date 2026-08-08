import { readConsent } from "@/lib/consent";

const ids = {
  ga: import.meta.env.VITE_GA_MEASUREMENT_ID,
  meta: import.meta.env.VITE_META_PIXEL_ID,
  tiktok: import.meta.env.VITE_TIKTOK_PIXEL_ID,
};

const addScript = (id, src) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

function loadGoogleAnalytics() {
  if (!/^G-[A-Z0-9]+$/.test(ids.ga || "")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ids.ga, { anonymize_ip: true });
  addScript("dsw-ga", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.ga)}`);
}

function loadMetaPixel() {
  if (!/^\d{5,20}$/.test(ids.meta || "")) return;
  const fbq = window.fbq || function fbq() { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
  fbq.queue = fbq.queue || [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  fbq("init", ids.meta);
  fbq("track", "PageView");
  addScript("dsw-meta", "https://connect.facebook.net/en_US/fbevents.js");
}
function loadTikTokPixel() {
  if (!/^[A-Z0-9]{10,30}$/.test(ids.tiktok || "")) return;
  window.TiktokAnalyticsObject = "ttq";
  const ttq = (window.ttq = window.ttq || []);
  ttq.methods = ["page", "track"];
  ttq.methods.forEach((method) => {
    ttq[method] = ttq[method] || function queue() { ttq.push([method].concat([].slice.call(arguments))); };
  });
  addScript("dsw-tiktok", `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(ids.tiktok)}&lib=ttq`);
  ttq.page();
}

export function initialiseTracking(consent) {
  window.gtag?.("consent", "update", {
    analytics_storage: consent?.analytics ? "granted" : "denied",
    ad_storage: consent?.marketing ? "granted" : "denied",
    ad_user_data: consent?.marketing ? "granted" : "denied",
    ad_personalization: consent?.marketing ? "granted" : "denied",
  });
  if (consent?.analytics) loadGoogleAnalytics();
  if (consent?.marketing) {
    window.fbq?.("consent", "grant");
    loadMetaPixel();
    loadTikTokPixel();
  } else {
    window.fbq?.("consent", "revoke");
  }
}

export function trackEvent(name, parameters = {}) {
  const consent = readConsent();
  const safeName = String(name).replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 40);
  if (consent?.analytics) window.gtag?.("event", safeName, parameters);
  if (consent?.marketing) {
    window.fbq?.("trackCustom", safeName, parameters);
    window.ttq?.track?.(safeName, parameters);
  }
}
