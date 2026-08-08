import React from "react";
import { MapPin, Navigation, SprayCan } from "lucide-react";

export default function ServiceAreasSection() {
  return (
    <section id="areas" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/60 p-7 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Service availability</p>
              <h2 className="font-heading text-3xl font-black text-foreground">Professional spray painting across South Africa</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">Availability depends on your location and project scope. Include your suburb or town in the quote request and our team will confirm travel and assessment arrangements.</p>
            </div>
            <a href="#quote" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-heading text-sm font-bold text-primary-foreground transition hover:bg-primary/90">
              <Navigation className="h-4 w-4" />Check your area<SprayCan className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
