import React, { useEffect, useState } from "react";
import { Cookie, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultConsent, readConsent, saveConsent } from "@/lib/consent";
import { initialiseTracking } from "@/lib/analytics";

export default function CookieConsent() {
  const stored = readConsent();
  const [visible, setVisible] = useState(!stored);
  const [details, setDetails] = useState(false);
  const [preferences, setPreferences] = useState(stored || defaultConsent);

  useEffect(() => {
    const existing = readConsent();
    if (existing) initialiseTracking(existing);
    const openSettings = () => {
      setPreferences(readConsent() || defaultConsent);
      setDetails(true);
      setVisible(true);
    };
    const onChange = (event) => initialiseTracking(event.detail);
    window.addEventListener("dsw-open-cookie-settings", openSettings);
    window.addEventListener("dsw-consent-change", onChange);
    return () => {
      window.removeEventListener("dsw-open-cookie-settings", openSettings);
      window.removeEventListener("dsw-consent-change", onChange);
    };
  }, []);

  const choose = (value) => {
    setPreferences(saveConsent(value));
    setVisible(false);
    setDetails(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/50 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:flex"><Cookie className="h-5 w-5 text-primary" /></div>
          <div className="flex-1">
            <h2 id="cookie-title" className="font-heading text-lg font-bold text-foreground">Your privacy choices</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Essential cookies remember your choice. Optional analytics and marketing tools load only if you allow them and valid provider IDs are configured.</p>
            {details && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background/60 p-4"><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /><span className="text-sm font-semibold text-foreground">Essential</span></div><p className="mt-2 text-xs text-muted-foreground">Always active. Stores only your consent preference.</p></div>
                <label className="cursor-pointer rounded-xl border border-border bg-background/60 p-4"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold text-foreground">Analytics</span><input type="checkbox" className="h-4 w-4 accent-primary" checked={preferences.analytics} onChange={(event) => setPreferences((value) => ({ ...value, analytics: event.target.checked }))} /></div><p className="mt-2 text-xs text-muted-foreground">Measures anonymous visits and useful actions.</p></label>
                <label className="cursor-pointer rounded-xl border border-border bg-background/60 p-4"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold text-foreground">Marketing</span><input type="checkbox" className="h-4 w-4 accent-primary" checked={preferences.marketing} onChange={(event) => setPreferences((value) => ({ ...value, marketing: event.target.checked }))} /></div><p className="mt-2 text-xs text-muted-foreground">Allows configured Meta and TikTok pixels.</p></label>
              </div>
            )}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <Button type="button" variant="ghost" onClick={() => setDetails((value) => !value)}>{details ? "Hide details" : "Manage preferences"}</Button>
              <Button type="button" variant="outline" onClick={() => choose(defaultConsent)}>Reject optional</Button>
              {details && <Button type="button" variant="secondary" onClick={() => choose(preferences)}>Save choices</Button>}
              <Button type="button" onClick={() => choose({ essential: true, analytics: true, marketing: true })}>Accept all</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
