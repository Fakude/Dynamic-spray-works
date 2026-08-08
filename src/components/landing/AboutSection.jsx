import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Award, ThumbsUp } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "We use only premium-grade coatings and industry-leading airless spray equipment.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Airless spraying covers large areas quickly — minimising disruption to your daily life.",
  },
  {
    icon: Award,
    title: "Experienced Team",
    description:
      "Our skilled professionals bring years of expertise to every project, big or small.",
  },
  {
    icon: ThumbsUp,
    title: "Customer First",
    description:
      "From free quotes to final inspection, your satisfaction is our top priority.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-foreground">
            Built on Trust &amp; Quality
          </h2>
          <p className="mt-4 text-muted-foreground font-body max-w-2xl mx-auto">
            Dynamic Spray Works (Pty) Ltd is committed to delivering flawless finishes that
            protect your property and elevate its value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
