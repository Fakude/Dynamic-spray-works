export const CONSENT_COOKIE = "dsw_consent_v1";
export const defaultConsent = { essential: true, analytics: false, marketing: false };

const normalise = (value = {}) => ({
  essential: true,
  analytics: value.analytics === true,
  marketing: value.marketing === true,
});

export function readConsent() {
  if (typeof document === "undefined") return null;
  const item = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`));
  if (!item) return null;
  try {
    return normalise(JSON.parse(decodeURIComponent(item.split("=").slice(1).join("="))));
  } catch {
    return null;
  }
}

export function saveConsent(value) {
  const consent = normalise(value);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("dsw-consent-change", { detail: consent }));
  return consent;
}
