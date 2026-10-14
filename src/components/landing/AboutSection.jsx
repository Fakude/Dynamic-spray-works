import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PROCESS = [
  {
    title: "Assess",
    description: "We look at surface condition, access, area, exposure and the finish you want.",
  },
  {
    title: "Prepare",
    description: "Surfaces are cleaned and made ready; adjacent areas are protected before spraying.",
  },
  {
    title: "Apply",
    description: "The selected coating is applied with controlled airless spray technique and even coverage.",
  },
  {
    title: "Inspect",
    description: "Edges, transitions and broad surfaces are checked together before the project is closed out.",
  },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative border-y border-border bg-card py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <p className="section-kicker">How the work moves</p>
          <h2 className="section-title mt-4">Good coating starts before the trigger is pulled.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Coating Solutions follows a clear sequence so the application suits the
            property—not just the production speed of the equipment.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="min-h-64 bg-background p-7 sm:p-8"
            >
              <span className="font-heading text-sm font-bold text-primary">0{index + 1}</span>
              <h3 className="mt-16 font-heading text-2xl font-bold uppercase text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
