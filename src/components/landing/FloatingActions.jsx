import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const PHONE = "27676244130";
const message = encodeURIComponent("Hello Dynamic Spray Works, I would like a free quotation.");

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3" aria-label="Quick contact actions">
      <a
        href={`https://wa.me/${PHONE}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { placement: "floating_action" })}
        className="group flex h-14 items-center gap-2 rounded-full bg-emerald-500 px-4 text-sm font-bold text-white shadow-xl shadow-black/30 transition hover:scale-105 hover:bg-emerald-400"
        aria-label="Request a quote on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp quote</span>
      </a>
      <a
        href={`tel:+${PHONE}`}
        onClick={() => trackEvent("phone_click", { placement: "floating_action" })}
        className="flex h-12 w-12 items-center justify-center self-end rounded-full border border-border bg-card text-primary shadow-lg transition hover:scale-105 hover:bg-secondary"
        aria-label="Call Dynamic Spray Works"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
