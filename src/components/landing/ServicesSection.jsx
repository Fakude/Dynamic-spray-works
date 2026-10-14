import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    title: "Pavement Painting",
    description: "Prepared and coated driveways, walkways and other suitable paved surfaces.",
  },
  {
    title: "Roof Painting",
    description: "Roof coating systems selected and applied for the surface, condition and exposure.",
  },
  {
    title: "Boundary Wall Painting",
    description: "Consistent coverage across long wall runs, corners, piers and detailed edges.",
  },
  {
    title: "Site Preparation",
    description: "Cleaning, masking and surface preparation matched to the job before coating begins.",
  },
];

function ServiceRow({ service, index, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group grid gap-4 border-t border-border py-7 sm:grid-cols-[4rem_1fr_1.2fr] sm:items-start sm:gap-8 sm:py-9"
    >
      <span className="font-heading text-sm font-bold text-primary">0{index + 1}</span>
      <h3 className="font-heading text-2xl font-bold uppercase leading-none text-foreground sm:text-3xl">{service.title}</h3>
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{service.description}</p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-5 md:grid-cols-[1fr_1fr] md:items-end"
        >
          <div>
            <p className="section-kicker">What we coat</p>
            <h2 className="section-title mt-4">Four services. One standard of finish.</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:justify-self-end md:text-base">
            Every quotation is based on the surface in front of us—its condition,
            access, preparation requirements and the coating system it needs.
          </p>
        </motion.div>

        <div className="border-b border-border">
          {SERVICES.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
