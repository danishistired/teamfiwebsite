import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const achievements = [
  {
    position: "1st",
    event: "Regional Hackathon",
    description: "Built a real-time collaboration tool in 48 hours",
    year: "2024",
  },
  {
    position: "Core",
    event: "Open Source Contributor",
    description: "Accepted patches to major infrastructure project",
    year: "2023",
  },
  {
    position: "Top 10",
    event: "CTF Competition",
    description: "National cybersecurity capture-the-flag event",
    year: "2023",
  },
  {
    position: "Merit",
    event: "Academic Scholarship",
    description: "Recognized for outstanding technical coursework",
    year: "2022",
  },
];

const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="achievements" className="snap-section flex items-center py-24 border-t border-border relative overflow-hidden">
      <div className="container" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-2xl mb-4">achievements</h2>
          <p className="text-muted-foreground max-w-md">
            milestones we've hit along the way.
          </p>
        </motion.div>

        <div className="space-y-0">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Main row */}
              <div className="relative border-t border-border py-8 md:py-10 cursor-default">
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-accent/5"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                <div className="relative flex items-baseline gap-6 md:gap-12">
                  {/* Large position text */}
                  <motion.div
                    className="w-20 md:w-32 shrink-0"
                    animate={{
                      x: hoveredIndex === index ? 8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
                      {item.position}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                      <div className="flex-1">
                        <motion.h3
                          className="text-lg md:text-xl font-medium text-foreground mb-1"
                          animate={{
                            x: hoveredIndex === index ? 4 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                        >
                          {item.event}
                        </motion.h3>
                        <motion.p
                          className="text-sm text-muted-foreground max-w-md"
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0.6,
                            x: hoveredIndex === index ? 4 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {item.description}
                        </motion.p>
                      </div>

                      {/* Year */}
                      <motion.span
                        className="text-sm font-mono text-muted-foreground tabular-nums"
                        animate={{
                          color: hoveredIndex === index ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.year}
                      </motion.span>
                    </div>
                  </div>

                  {/* Animated line indicator */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-accent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <motion.div
            className="border-t border-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            style={{ originX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Achievements;
