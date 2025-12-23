import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";

const navItems = [
  { label: "home", id: "home" },
  { label: "team", id: "team" },
  { label: "projects", id: "projects" },
  { label: "gallery", id: "gallery" },
  { label: "events", id: "events" },
  { label: "achievements", id: "achievements" },
  { label: "contact", id: "contact" },
];

const ScrollNavigation = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0 });

  // Initialize refs array
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, navItems.length);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrollY > threshold);

      // Find active section
      const viewportMiddle = scrollY + window.innerHeight / 2;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(navItems[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          
          if (viewportMiddle >= sectionTop) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate pill position based on active index
  useLayoutEffect(() => {
    const calculatePillPosition = () => {
      const activeItem = itemsRef.current[activeIndex];
      const nav = navRef.current;
      
      if (activeItem && nav) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        
        setPillStyle({
          x: itemRect.left - navRect.left,
          width: itemRect.width,
        });
      }
    };

    calculatePillPosition();
    
    // Recalculate on window resize
    window.addEventListener("resize", calculatePillPosition);
    return () => window.removeEventListener("resize", calculatePillPosition);
  }, [activeIndex]);

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
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-white/15 border border-white/20"
          animate={{
            x: pillStyle.x,
            width: pillStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{ left: 0 }}
        />

        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <a
              key={item.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
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