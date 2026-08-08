import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMG =
  "https://media.base44.com/images/public/6a0a933d536cec25447f18b5/fc65910a2_generated_62d03ac4.png";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Professional airless spray painting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-body font-medium text-primary tracking-wide uppercase">
              Professional Airless Spraying
            </span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6">
            <span className="text-primary">Dynamic</span>
            <br />
            <span className="text-foreground">Spray Works</span>
          </h1>

          <p className="text-lg sm:text-xl font-body text-muted-foreground max-w-lg mb-4">
            Let us make your house a home.
          </p>

          <p className="text-sm sm:text-base font-body text-muted-foreground/70 max-w-md mb-10">
            Expert pavement, roof &amp; wall painting using cutting-edge airless spraying
            technology. Serving South Africa with quality that lasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#quote">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold rounded-full px-8 text-base gap-2 hover:scale-105 transition-transform"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#services">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground font-heading font-semibold rounded-full px-8 text-base hover:bg-secondary"
              >
                Our Services
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 80h1440V30C1200 70 960 0 720 40S240 90 0 30v50z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
