import { useEffect, useState } from "react";

const navItems = [
  { label: "home", href: "#home" },
  { label: "team", href: "#team" },
  { label: "projects", href: "#projects" },
  { label: "achievements", href: "#achievements" },
  { label: "contact", href: "#contact" },
];

const ScrollNavigation = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="px-4 py-1.5 text-sm text-muted-foreground rounded-full transition-colors duration-200 hover:text-foreground hover:bg-secondary"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default ScrollNavigation;
