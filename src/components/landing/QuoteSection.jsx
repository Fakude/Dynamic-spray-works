import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock3, FileCheck2, LockKeyhole, MessageCircle } from "lucide-react";
import QuoteForm from "./QuoteForm";

const BENEFITS = [
  {
    icon: FileCheck2,
    title: "Clear scope",
    description: "Review every project detail before sending your request.",
  },
  {
    icon: Clock3,
    title: "Fast follow-up",
    description: "Our team aims to respond within one business day.",
  },
  {
    icon: LockKeyhole,
    title: "No payment details",
    description: "A quotation request never asks for card or banking information.",
  },
];

export default function QuoteSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="quote" className="relative py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <div className="mb-5 inline-flex items-center gap-2 border-l-2 border-primary pl-3">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                WhatsApp quotation
              </span>
            </div>
            <h2 className="mb-6 font-heading text-3xl font-black text-foreground sm:text-4xl md:text-5xl">
              A simpler way to <span className="text-primary">request a quote</span>
            </h2>
            <p className="mb-9 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
              Add your project, contact, and location details; review everything; then
              send the prepared request directly to Coating Solutions on WhatsApp.
            </p>

            <div className="space-y-4">
              {BENEFITS.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4 border-t border-border py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-border bg-card p-6 sm:p-10"
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
