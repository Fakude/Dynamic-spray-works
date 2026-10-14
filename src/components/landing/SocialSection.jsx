import React from "react";
import { ExternalLink, MessageCircle, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const SITE_URL = "https://d1grabyq9lwdv8.cloudfront.net/";
const shareText = encodeURIComponent("Professional spray painting by Coating Solutions");

export default function SocialSection() {
  const shareSite = async () => {
    trackEvent("share_click", { placement: "social_section" });
    try {
      if (navigator.share) await navigator.share({ title: "Coating Solutions", text: "Professional spray painting services", url: SITE_URL });
      else window.open(`https://wa.me/?text=${shareText}%20${encodeURIComponent(SITE_URL)}`, "_blank", "noopener,noreferrer");
    } catch {
      // The visitor cancelled the native share dialog.
    }
  };

  return (
    <section id="social" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          <div className="bg-card p-6 md:col-span-1"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Follow & share</p><h2 className="font-heading text-3xl font-black uppercase leading-none text-foreground">See the work. Share the result.</h2></div>
          <a href="https://www.tiktok.com/@coatingsolutions" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("social_click", { network: "tiktok" })} className="group bg-card p-6 transition-colors hover:bg-secondary">
            <ExternalLink className="mb-8 h-6 w-6 text-primary" /><h3 className="font-heading font-bold text-foreground">Follow on TikTok</h3><p className="mt-2 text-sm text-muted-foreground">Watch project and spray-painting content from @coatingsolutions.</p>
          </a>
          <button type="button" onClick={shareSite} className="group bg-card p-6 text-left transition-colors hover:bg-secondary">
            <Share2 className="mb-8 h-6 w-6 text-primary" /><h3 className="font-heading font-bold text-foreground">Share our website</h3><p className="mt-2 text-sm text-muted-foreground">Send Coating Solutions to someone planning a painting project.</p><MessageCircle className="mt-4 h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
