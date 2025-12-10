const navItems = [
  { label: "home", href: "#home" },
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "achievements", href: "#achievements" },
  { label: "contact", href: "#contact" },
];

const Navigation = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
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

export default Navigation;
