import { useEffect, useState, useRef } from "react";
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
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrollY > threshold);

      // Find active section
      const sections = navItems.map(item => ({
        id: item.href.substring(1),
        element: document.getElementById(item.href.substring(1))
      })).filter(s => s.element);

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
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position when active section changes
  useEffect(() => {
    const activeElement = itemRefs.current.get(activeSection);
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeElement.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeSection, visible]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId) || document.querySelector(href);
    
    if (targetElement) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetElement, {
          duration: 1.8,
          easing: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const setItemRef = (label: string) => (el: HTMLAnchorElement | null) => {
    if (el) {
      itemRefs.current.set(label.substring(1), el);
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div 
        ref={navRef}
        className="relative flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-2"
      >
        {/* Sliding indicator */}
        <motion.div
          className="absolute h-[calc(100%-8px)] rounded-full bg-secondary/80"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
          style={{ top: 4 }}
        />

        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <a
              key={item.label}
              ref={setItemRef(item.href)}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative z-10 px-4 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                isActive 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
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
