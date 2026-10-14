import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/projects/house-front-dusk.jpg"
          alt="Freshly coated modern house exterior at dusk"
          fetchPriority="high"
          className="h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/.96)_0%,hsl(var(--background)/.72)_38%,hsl(var(--background)/.12)_72%),linear-gradient(0deg,hsl(var(--background)/.88)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-primary sm:text-sm">
            Professional airless spray coating · South Africa
          </p>
          <h1 className="max-w-4xl font-heading text-[clamp(3.6rem,10vw,8.4rem)] font-bold uppercase leading-[0.79] tracking-[-0.035em] text-foreground">
            Make your
            <span className="block text-primary">house a home.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Careful preparation and controlled spray application for roofs, walls and
            paved surfaces—finished with an eye for the whole property.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#quote" className="primary-cta">
              Request a free quote <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#work" className="secondary-cta">
              View the project <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
