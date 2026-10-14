import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const PROJECT_FRAMES = [
  {
    src: "/images/projects/house-front-dusk.jpg",
    alt: "Freshly coated white house exterior viewed from the street at dusk",
    eyebrow: "Street elevation",
    title: "A finish that reads clean from the kerb.",
    body: "Even coverage lets the architecture, timber and landscape do the talking.",
  },
  {
    src: "/images/projects/house-pool-day.jpg",
    alt: "White two-storey house and pool in daylight",
    eyebrow: "Courtyard elevation",
    title: "Daylight shows every decision.",
    body: "Prepared surfaces and disciplined edges create a calm, consistent result.",
  },
  {
    src: "/images/projects/house-pool-side-dusk.jpg",
    alt: "Side view of the coated house beside a swimming pool at dusk",
    eyebrow: "Side elevation",
    title: "Complex lines. One continuous finish.",
    body: "Windows, corners and level changes are handled with the same attention as broad walls.",
  },
  {
    src: "/images/projects/house-pool-lit-dusk.jpg",
    alt: "Freshly coated house and illuminated pool courtyard at sunset",
    eyebrow: "Pool courtyard",
    title: "Light, shadow and every edge.",
    body: "A considered finish holds together from late afternoon into the evening.",
  },
  {
    src: "/images/projects/house-pool-wide-dusk.jpg",
    alt: "Wide rear view of the completed white house and pool at dusk",
    eyebrow: "Completed exterior",
    title: "The result should feel resolved.",
    body: "A coating system is successful when protection and presentation work together.",
  },
];

const FRAME_RANGES = [
  [0, 0.01, 0.14, 0.2],
  [0.15, 0.21, 0.34, 0.4],
  [0.35, 0.41, 0.54, 0.6],
  [0.55, 0.61, 0.74, 0.8],
  [0.75, 0.81, 0.99, 1],
];

function StoryFrame({ frame, index, progress }) {
  const [fadeInStart, visibleStart, visibleEnd, fadeOutEnd] = FRAME_RANGES[index];
  const values = index === 0 ? [1, 1, 1, 0] : index === PROJECT_FRAMES.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, [fadeInStart, visibleStart, visibleEnd, fadeOutEnd], values);
  const scale = useTransform(progress, [fadeInStart, fadeOutEnd], [1.045, 1]);
  const copyY = useTransform(progress, [fadeInStart, visibleStart], [24, 0]);

  return (
    <motion.figure style={{ opacity }} className="absolute inset-0 overflow-hidden bg-background">
      <motion.img
        src={frame.src}
        alt={frame.alt}
        loading={index === 0 ? "eager" : "lazy"}
        style={{ scale }}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/20" />
      <div className="absolute inset-x-0 bottom-0">
        <motion.figcaption
          style={{ y: copyY }}
          className="mx-auto grid max-w-7xl items-end gap-6 px-6 pb-12 pt-32 md:grid-cols-[auto_1fr] md:px-10 md:pb-16 lg:px-12"
        >
          <div className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary">
            0{index + 1} / 05
          </div>
          <div className="max-w-2xl md:justify-self-end">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{frame.eyebrow}</p>
            <h3 className="font-heading text-3xl font-bold leading-[0.95] text-white sm:text-5xl lg:text-6xl">{frame.title}</h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{frame.body}</p>
          </div>
        </motion.figcaption>
      </div>
    </motion.figure>
  );
}

export default function ProjectStorySection() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="work"
      ref={containerRef}
      className={`relative bg-background ${reduceMotion ? "" : "lg:h-[520vh]"}`}
    >
      <div className={`border-y border-white/10 bg-card px-5 py-14 ${reduceMotion ? "" : "lg:hidden"}`}>
        <div className="mx-auto max-w-2xl">
          <p className="section-kicker">A completed exterior</p>
          <h2 className="section-title mt-4">One house, viewed honestly.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">Real project photographs, shown without generated stand-ins.</p>
          <div className="mt-10 space-y-12">
            {PROJECT_FRAMES.map((frame, index) => (
              <figure key={frame.src}>
                <div className="overflow-hidden bg-secondary">
                  <img src={frame.src} alt={frame.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </div>
                <figcaption className="mt-5 grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-heading text-sm font-bold text-primary">0{index + 1}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{frame.eyebrow}</p>
                    <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-foreground">{frame.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{frame.body}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className={`sticky top-0 h-screen overflow-hidden ${reduceMotion ? "hidden" : "hidden lg:block"}`}>
        <div className="absolute left-0 top-0 z-20 h-full w-1 bg-white/10" aria-hidden="true">
          <motion.div style={{ scaleY: reduceMotion ? 1 : progressScale }} className="h-full origin-top bg-primary" />
        </div>
        <div className="absolute left-12 top-28 z-20 max-w-xs">
          <p className="section-kicker text-white/70">A completed exterior</p>
          <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-white">One house, viewed honestly.</h2>
        </div>
        {PROJECT_FRAMES.map((frame, index) => (
          <StoryFrame key={frame.src} frame={frame} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
