import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "home", id: "home" },
  { label: "team", id: "team" },
  { label: "projects", id: "projects" },
  { label: "gallery", id: "gallery" },
  { label: "archive", id: "archive" },
  { label: "achievements", id: "achievements" },
  { label: "contact", id: "contact" },
];

const ScrollNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  /* ---------------- Scroll spy ---------------- */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navItems.findIndex(
              (i) => i.id === entry.target.id
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  /* ---------------- Visibility ---------------- */
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Click scroll ---------------- */
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 2.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div
        ref={navRef}
        className="relative grid grid-cols-7 items-center gap-1 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl p-2 shadow-xl"
      >
        {/* Highlight pill */}
        <div
          className="absolute inset-y-2 rounded-full bg-white/15 border border-white/20 transition-transform duration-500 ease-out"
          style={{
            width: `calc(100% / ${navItems.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`relative z-10 px-3 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 ${
              activeIndex === i
                ? "text-white scale-105"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ScrollNavigation;
