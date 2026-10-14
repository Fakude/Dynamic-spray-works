import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function enableSiteMotion() {
  window.dispatchEvent(new Event("dsw-enable-motion"));
}

export default function useSiteMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setReduced(media.matches);
    const enable = () => setReduced(false);
    media.addEventListener("change", update);
    window.addEventListener("dsw-enable-motion", enable);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("dsw-enable-motion", enable);
    };
  }, []);
  return reduced;
}
