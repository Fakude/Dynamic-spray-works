import { useEffect, useState } from "react";

export function enableSiteMotion() {
  window.dispatchEvent(new Event("dsw-enable-motion"));
}

export default function useSiteMotion() {
  // The site experience is scroll-led by default. Keep the explicit motion
  // event hook so a future accessibility control can opt out without making
  // the browser's global preference hide the primary sequence for everyone.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const enable = () => setReduced(false);
    window.addEventListener("dsw-enable-motion", enable);
    return () => {
      window.removeEventListener("dsw-enable-motion", enable);
    };
  }, []);
  return reduced;
}
