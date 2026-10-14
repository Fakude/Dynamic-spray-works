import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSiteMotion, { enableSiteMotion } from "@/hooks/useSiteMotion";

const FRAME_COUNT = 241;
const INITIAL_IMAGE = "/images/projects/house-front-dusk.jpg";
const frameUrl = (index) => `/images/hero-sequence/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

function drawCover(canvas, image) {
  if (!canvas || !image?.naturalWidth) return;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  // On narrow screens the landscape source needs to fill the portrait stage;
  // on wider screens contain preserves the full property without distortion.
  const scale = rect.width < 768
    ? Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight)
    : Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.clearRect(0, 0, rect.width, rect.height);
  const y = rect.width < 768 ? 64 : (rect.height - height) / 2;
  context.drawImage(image, (rect.width - width) / 2, y, width, height);
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const copyRef = useRef(null);
  const shadeRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(-1);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const reducedMotion = useSiteMotion();

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      setReady(true);
      return undefined;
    }
    setReady(false);
    setProgress(0);
    frameRef.current = -1;
    let cancelled = false;
    let settled = 0;
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      const complete = () => {
        settled += 1;
        if (!cancelled) setProgress(Math.round((settled / FRAME_COUNT) * 100));
        if (settled === FRAME_COUNT && !cancelled) {
          imagesRef.current = images;
          drawCover(canvasRef.current, images[0]);
          setReady(true);
        }
      };
      image.onload = complete;
      image.onerror = complete;
      image.decoding = "async";
      image.src = frameUrl(index);
      return image;
    });
    document.body.classList.add("is-sequence-loading");
    return () => {
      cancelled = true;
      document.body.classList.remove("is-sequence-loading");
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!ready) return undefined;
    document.body.classList.remove("is-sequence-loading");
    if (reducedMotion) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    frameRef.current = -1;
    const renderFrame = (index) => {
      if (index === frameRef.current) return;
      frameRef.current = index;
      canvasRef.current.dataset.frame = String(index + 1);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawCover(canvasRef.current, imagesRef.current[index]));
    };
    renderFrame(0);
    const trigger = ScrollTrigger.create({
      id: "hero-sequence",
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        renderFrame(Math.round(self.progress * (FRAME_COUNT - 1)));
        gsap.set(canvasRef.current?.previousElementSibling, { opacity: self.progress < 0.002 ? 1 : 0 });
        // Let the sequence breathe first. The paper-toned end state and copy
        // arrive only in the final fifth, so the project remains the focus.
        const endProgress = gsap.utils.clamp(0, 1, (self.progress - 0.78) / 0.22);
        const visibility = gsap.utils.clamp(0, 1, (self.progress - 0.72) / 0.2);
        gsap.set(copyRef.current, { opacity: visibility, y: 28 * (1 - visibility) });
        gsap.set(shadeRef.current, { opacity: endProgress });
        copyRef.current.style.pointerEvents = visibility < 0.1 ? "none" : "auto";
        copyRef.current.inert = visibility < 0.1;
        const cue = section.querySelector(".sequence-hero__cue");
        if (cue) gsap.set(cue, { opacity: gsap.utils.clamp(0, 1, (self.progress - 0.84) / 0.12) });
      },
      onRefresh: (self) => {
        const rect = section.getBoundingClientRect();
        const documentTop = rect.top + window.scrollY;
        window.__DSW_SCROLL_AUDIT__ = { ...(window.__DSW_SCROLL_AUDIT__ || {}), hero: { start: self.start, end: self.end, documentTop, documentBottom: documentTop + rect.height } };
        section.dataset.triggerStart = String(self.start);
        section.dataset.triggerEnd = String(self.end);
        section.dataset.documentTop = String(documentTop);
      },
    });
    let resizeFrame = 0;
    const resize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        drawCover(canvasRef.current, imagesRef.current[frameRef.current]);
        ScrollTrigger.refresh();
      });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    window.addEventListener("resize", resize);
    ScrollTrigger.refresh();
    return () => {
      trigger.kill();
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gsap.set([copyRef.current, shadeRef.current], { clearProps: "all" });
      if (copyRef.current) copyRef.current.inert = false;
    };
  }, [ready, reducedMotion]);

  return (
    <>
      {!ready && <div className="sequence-loader" role="status" aria-live="polite"><div className="sequence-loader__mark">DSW</div><div className="sequence-loader__readout"><span>Preparing the finish</span><strong>{progress}%</strong></div><div className="sequence-loader__track"><span style={{ width: `${progress}%` }} /></div></div>}
      <section id="home" ref={sectionRef} className={`sequence-hero ${reducedMotion ? "sequence-hero--static" : ""}`}>
        <div className="sequence-hero__stage">
          <img src={INITIAL_IMAGE} alt="Freshly coated modern home exterior" className="sequence-hero__initial" />
          {reducedMotion ? null : <canvas ref={canvasRef} className="sequence-hero__canvas" role="img" aria-label="A coating project moves from finished home to spray application and back as the page scrolls" />}
          <div ref={shadeRef} className="sequence-hero__shade" />
          <div ref={copyRef} className="sequence-hero__copy">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-primary sm:text-sm">Professional airless spray coating · South Africa</p>
            <h1 className="max-w-4xl font-heading text-[clamp(3.6rem,10vw,8.4rem)] font-bold uppercase leading-[0.79] tracking-[-0.035em] text-foreground">Make your <span className="block text-primary">house a home.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Controlled application for roofs, walls and paving—built on careful preparation and a finish that holds the whole property together.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href="#quote" className="primary-cta">Request a free quote <ArrowRight className="h-4 w-4" /></a>{reducedMotion ? <button type="button" onClick={enableSiteMotion} className="secondary-cta">Enable scroll animation <ArrowDown className="h-4 w-4" /></button> : <a href="#services" className="secondary-cta">Explore our services <ArrowDown className="h-4 w-4" /></a>}</div>
          </div>
          {!reducedMotion && <div className="sequence-hero__cue" aria-hidden="true"><span>Scroll to coat</span><i /></div>}
        </div>
      </section>
    </>
  );
}
