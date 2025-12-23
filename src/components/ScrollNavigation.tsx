import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

const navItems = [
  { label: "home", href: "#home" },
  { label: "team", href: "#team" },
  { label: "projects", href: "#projects" },
  { label: "gallery", href: "#gallery" },
  { label: "events", href: "#events" },
  { label: "achievements", href: "#achievements" },
  { label: "contact", href: "#contact" },
];

const ScrollNavigation = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isReady, setIsReady] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrollY > threshold);

      // Find active section based on viewport position
      const sections = navItems
        .map((item) => {
          const id = item.href.substring(1);
          const element = document.getElementById(id);
          return { id, element };
        })
        .filter((s) => s.element);

      let currentSection = "home";
      const viewportMiddle = scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
            currentSection = section.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position when active section or visibility changes
  const updateIndicator = useCallback(() => {
    const activeElement = itemRefs.current.get(activeSection);
    const navElement = navRef.current;
    
    if (activeElement && navElement) {
      const navRect = navElement.getBoundingClientRect();
      const itemRect = activeElement.getBoundingClientRect();
      
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
      
      if (!isReady) {
        setIsReady(true);
      }
    }
  }, [activeSection, isReady]);

  useEffect(() => {
    updateIndicator();
    // Also update on resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator, visible]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement =
      document.getElementById(targetId) || document.querySelector(href);

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

  const setItemRef = useCallback(
    (sectionId: string) => (el: HTMLAnchorElement | null) => {
      if (el) {
        itemRefs.current.set(sectionId, el);
      }
    },
    []
  );

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
        className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-1.5 py-1.5 shadow-2xl shadow-black/50"
      >
        {/* Sliding pill indicator */}
        <motion.div
          className="absolute h-[calc(100%-6px)] rounded-full bg-gradient-to-r from-white/15 to-white/10 border border-white/20"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: isReady ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
            mass: 0.8,
          }}
          style={{ top: 3 }}
        />

        {navItems.map((item) => {
          const sectionId = item.href.substring(1);
          const isActive = activeSection === sectionId;
          
          return (
            <a
              key={item.label}
              ref={setItemRef(sectionId)}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative z-10 px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
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
