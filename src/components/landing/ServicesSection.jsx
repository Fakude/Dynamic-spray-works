import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Pavement Painting",
    description:
      "Transform your driveways and walkways with our professional airless spray coating that protects and beautifies.",
    image:
      "https://media.base44.com/images/public/6a0a933d536cec25447f18b5/b2d44774c_generated_1e8831f3.png",
  },
  {
    title: "Roof Painting",
    description:
      "Extend the life of your roof with durable, weather-resistant coatings applied with precision spraying equipment.",
    image:
      "https://media.base44.com/images/public/6a0a933d536cec25447f18b5/0074d1199_generated_9b428bff.png",
  },
  {
    title: "Boundary Wall Painting",
    description:
      "Give your property a fresh, clean look with smooth, even boundary wall coatings that stand the test of time.",
    image:
      "https://media.base44.com/images/public/6a0a933d536cec25447f18b5/a5f70c167_generated_300f7cf3.png",
  },
  {
    title: "Site Preparation",
    description:
      "Thorough surface cleaning, pressure washing, and preparation to ensure the best possible finish every time.",
    image:
      "https://media.base44.com/images/public/6a0a933d536cec25447f18b5/97f45bbcb_generated_9aa92247.png",
  },
];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-lg text-foreground">
            {service.title}
          </h3>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
            <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-foreground">
            Our Services
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-2xl mx-auto">
            We deliver premium airless spray painting solutions for residential and
            commercial properties across South Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
