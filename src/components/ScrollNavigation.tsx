import { useEffect, useState, useRef, useLayoutEffect, useCallback } from "react";

const navItems = [
  { label: "home", id: "home" },
  { label: "team", id: "team" },
  { label: "projects", id: "projects" },
  { label: "gallery", id: "gallery" },
  { label: "events", id: "events" },
  { label: "achievements", id: "achievements" },
  { label: "contact", id: "contact" },
];

interface SectionBounds {
  id: string;
  top: number;
  bottom: number;
}

const ScrollNavigation = () => {
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const sectionBoundsRef = useRef<SectionBounds[]>([]);
  const itemPositionsRef = useRef<{ left: number; width: number }[]>([]);
  const rafRef = useRef<number | null>(null);

  // Calculate section bounds and item positions
  const calculateBounds = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();

    // Calculate nav item positions - get left relative to nav's content area
    itemPositionsRef.current = itemsRef.current.map((item) => {
      if (!item) return { left: 0, width: 0 };
      const rect = item.getBoundingClientRect();
      return {
        left: rect.left - navRect.left,
        width: rect.width,
      };
    });

    // Calculate section bounds
    sectionBoundsRef.current = navItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return { id: item.id, top: 0, bottom: 0 };
      const rect = element.getBoundingClientRect();
      return {
        id: item.id,
        top: rect.top + window.scrollY,
        bottom: rect.top + window.scrollY + rect.height,
      };
    });
  }, []);

  // Lerp helper
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Update pill position based on scroll
  const updatePillPosition = useCallback(() => {
    const pill = pillRef.current;
    const sections = sectionBoundsRef.current;
    const positions = itemPositionsRef.current;

    if (!pill || sections.length === 0 || positions.length === 0) return;

    const scrollY = window.scrollY;
    const viewportMiddle = scrollY + window.innerHeight / 2;

    // Find which section we're in and calculate progress
    let fractionalIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const nextSection = sections[i + 1];

      if (viewportMiddle < section.top) {
        // Before first section
        fractionalIndex = 0;
        break;
      }

      if (!nextSection) {
        // In or after last section
        fractionalIndex = sections.length - 1;
        break;
      }

      if (viewportMiddle >= section.top && viewportMiddle < nextSection.top) {
        // Between section i and i+1
        const sectionProgress = (viewportMiddle - section.top) / (nextSection.top - section.top);
        fractionalIndex = i + sectionProgress;
        break;
      }
    }

    // Clamp to valid range
    fractionalIndex = Math.max(0, Math.min(sections.length - 1, fractionalIndex));

    // Get the two indices we're interpolating between
    const lowerIndex = Math.floor(fractionalIndex);
    const upperIndex = Math.min(lowerIndex + 1, positions.length - 1);
    const t = fractionalIndex - lowerIndex;

    const lowerPos = positions[lowerIndex] || { left: 0, width: 0 };
    const upperPos = positions[upperIndex] || lowerPos;

    // Interpolate position and width
    const pillLeft = lerp(lowerPos.left, upperPos.left, t);
    const pillWidth = lerp(lowerPos.width, upperPos.width, t);

    // Apply directly for smooth real-time tracking - use left instead of transform
    pill.style.left = `${pillLeft}px`;
    pill.style.width = `${pillWidth}px`;

    // Update visibility
    const threshold = window.innerHeight * 0.5;
    setVisible(scrollY > threshold);
  }, []);

  // RAF loop for smooth updates
  useEffect(() => {
    const tick = () => {
      updatePillPosition();
      rafRef.current = requestAnimationFrame(tick);
    };

    calculateBounds();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateBounds, updatePillPosition]);

  // Recalculate bounds on resize
  useLayoutEffect(() => {
    const handleResize = () => {
      calculateBounds();
      updatePillPosition();
    };

    window.addEventListener("resize", handleResize);
    
    // Initial calculation after mount
    const timeout = setTimeout(handleResize, 100);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [calculateBounds, updatePillPosition]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetElement, {
          duration: 1.8,
          easing: (t: number) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        });
      } else {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Calculate active index for text highlighting
  const getActiveIndex = () => {
    const sections = sectionBoundsRef.current;
    if (sections.length === 0) return 0;
    
    const scrollY = window.scrollY;
    const viewportMiddle = scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (viewportMiddle >= sections[i].top) {
        return i;
      }
    }
    return 0;
  };

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setActiveIndex(getActiveIndex());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div
        ref={navRef}
        className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl px-1.5 py-1.5 shadow-2xl shadow-black/50"
      >
        {/* Sliding pill indicator */}
        <div
          ref={pillRef}
          className="absolute top-1 bottom-1 rounded-full bg-white/15 border border-white/20"
          style={{
            willChange: "left, width",
          }}
        />

        {navItems.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <a
              key={item.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative z-10 px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default ScrollNavigation;