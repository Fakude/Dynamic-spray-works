import React from "react";
import AboutSection from "@/components/landing/AboutSection";
import FaqSection from "@/components/landing/FaqSection";
import FloatingActions from "@/components/landing/FloatingActions";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";
import ProjectStorySection from "@/components/landing/ProjectStorySection";
import QuoteSection from "@/components/landing/QuoteSection";
import ServiceAreasSection from "@/components/landing/ServiceAreasSection";
import ServicesSection from "@/components/landing/ServicesSection";
import SocialSection from "@/components/landing/SocialSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProjectStorySection />
        <ServicesSection />
        <AboutSection />
        <ServiceAreasSection />
        <QuoteSection />
        <FaqSection />
        <SocialSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
