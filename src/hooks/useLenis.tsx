import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const snappingRef = useRef(false);
  const lastSnapRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    const SNAP_COOLDOWN = 400; // ms

    const snapToNearestSection = () => {
      if (snappingRef.current) return;

      const now = performance.now();
      if (now - lastSnapRef.current < SNAP_COOLDOWN) return;

      const sections = document.querySelectorAll<HTMLElement>(".snap-section");
      if (!sections.length) return;

      const scrollMiddle = window.scrollY + window.innerHeight / 2;

      let closest: HTMLElement | null = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + window.scrollY + rect.height / 2;
        const distance = Math.abs(scrollMiddle - sectionMiddle);

        if (distance < minDistance) {
          minDistance = distance;
          closest = section;
        }
      });

      if (!closest) return;

      const target = closest.offsetTop;
      const diff = Math.abs(window.scrollY - target);

      if (diff < 6) return;

      snappingRef.current = true;
      lastSnapRef.current = now;

      lenis.scrollTo(target, {
        duration: 1,
        easing: (t) => t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: () => {
          snappingRef.current = false;
        },
      });
    };

    // 🔥 Correct scroll listener
    lenis.on("scroll", ({ isScrolling }) => {
      if (!isScrolling) {
        snapToNearestSection();
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return lenisRef;
};
