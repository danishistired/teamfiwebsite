import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Make lenis globally accessible
    (window as any).lenis = lenis;

    let scrollTimeout: NodeJS.Timeout;
    let isSnapping = false;

    // Smooth snap to nearest section after scrolling stops
    const handleScroll = () => {
      if (isSnapping) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('.snap-section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        let closestSection: Element | null = null;
        let closestDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionMiddle = rect.top + window.scrollY + rect.height / 2;
          const distance = Math.abs(scrollPosition - sectionMiddle);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        });

        if (closestSection) {
          const rect = closestSection.getBoundingClientRect();
          const targetScroll = window.scrollY + rect.top;
          const currentScroll = window.scrollY;
          const difference = Math.abs(targetScroll - currentScroll);

          // Snap if not already perfectly aligned (within 5px tolerance)
          if (difference > 5) {
            isSnapping = true;
            lenis.scrollTo(closestSection as HTMLElement, {
              duration: 1.2,
              easing: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
              onComplete: () => {
                isSnapping = false;
              }
            });
          }
        }
      }, 150); // Wait 150ms after scroll stops
    };

    window.addEventListener('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      delete (window as any).lenis;
    };
  }, []);

  return lenisRef;
};
