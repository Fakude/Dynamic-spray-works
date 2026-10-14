import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSiteMotion from "@/hooks/useSiteMotion";

const SERVICES = [
  { number: "01", title: "Roof & Exterior Painting", description: "Roof coating systems chosen for the surface and exposure, with controlled coverage across walls, trims and architectural details.", image: "/images/service-cutouts/exterior-house.png", watermark: "EXTERIOR" },
  { number: "02", title: "Pavement Painting", description: "Driveways, walkways and pool surrounds prepared and coated as one considered surface.", image: "/images/service-cutouts/pavement-pool.png", watermark: "PAVING" },
  { number: "03", title: "Boundary Walls", description: "Clean coverage across long runs, piers, corners and detailed edges.", image: "/images/service-cutouts/wall-house.png", watermark: "WALLS" },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useSiteMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const cards = Array.from(sectionRef.current.querySelectorAll("[data-offer-card]"));
    const animations = cards.map((card, index) => {
      const image = card.querySelector("[data-offer-image]");
      const direction = index % 2 === 0 ? -1 : 1;
      return gsap.fromTo(image, { xPercent: direction * 38, opacity: 0.15, rotate: direction * -2 }, {
        xPercent: 0,
        opacity: 1,
        rotate: 0,
        ease: "power2.out",
        scrollTrigger: {
          id: `offer-${index + 1}`,
          trigger: card,
          start: "top 88%",
          end: "top 44%",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            const rect = card.getBoundingClientRect();
            const documentTop = rect.top + window.scrollY;
            window.__DSW_SCROLL_AUDIT__ = { ...(window.__DSW_SCROLL_AUDIT__ || {}), [`offer${index + 1}`]: { start: self.start, end: self.end, documentTop } };
            card.dataset.triggerStart = String(self.start);
            card.dataset.triggerEnd = String(self.end);
            card.dataset.documentTop = String(documentTop);
          },
        },
      });
    });
    let refreshFrame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(sectionRef.current);
    ScrollTrigger.refresh();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(refreshFrame);
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.revert();
      });
    };
  }, [reducedMotion]);

  return (
    <section id="services" ref={sectionRef} className="offers-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="offers-heading">
          <div><p className="section-kicker">What we coat</p><h2>Built for the surface.<br />Finished for the property.</h2></div>
          <p>Every quote starts with the real condition of the surface. Cleaning, masking and site preparation come before the coating, with access and the right coating system assessed for each job.</p>
        </div>
        <div className="offers-list">
          {SERVICES.map((service, index) => (
            <article key={service.title} data-offer-card className={`offer-card ${index % 2 ? "offer-card--reverse" : ""}`}>
              <span className="offer-card__watermark" aria-hidden="true">{service.watermark}</span>
              <div className="offer-card__visual"><img data-offer-image src={service.image} alt="" /></div>
              <div className="offer-card__copy"><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><a href="#quote">Discuss your surface <span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
