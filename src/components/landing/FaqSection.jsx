import React from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  ["Which surfaces do you paint?", "We provide pavement, roof, and boundary wall painting, plus surface and site preparation for suitable residential and commercial projects."],
  ["Why use airless spray painting?", "Airless spraying can provide fast, even coverage over large prepared surfaces. The correct method depends on the surface, coating, access, and weather."],
  ["How is my quotation calculated?", "Pricing depends on surface area and condition, preparation, coating system, access, location, and project timing. Final pricing follows an assessment."],
  ["Do I pay when requesting a quote?", "No. A quotation request is free and does not require card or banking information."],
  ["How quickly will you respond?", "We aim to respond within one business day. Complex projects may require an on-site assessment before a final quote."],
  ["Which areas do you serve?", "We assess projects across South Africa subject to location, project scope, and team availability. Send your suburb or town to confirm service."],
];

export default function FaqSection() {
  return (
    <section id="faq" className="border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Helpful answers</p>
          <h2 className="font-heading text-3xl font-black text-foreground sm:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="border-b border-border">
          {FAQS.map(([question, answer]) => (
            <details key={question} className="group border-t border-border bg-background p-5 open:border-primary/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-bold text-foreground">
                {question}<ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
