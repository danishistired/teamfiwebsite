import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Award, Star, Medal } from "lucide-react";

const achievements = [
  {
    event: "regional hackathon",
    position: "1st place",
    description: "built a real-time collaboration tool in 48 hours",
    year: "2024",
    icon: Trophy,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500",
  },
  {
    event: "open source contribution",
    position: "core contributor",
    description: "accepted patches to major infrastructure project",
    year: "2023",
    icon: Star,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-500",
  },
  {
    event: "ctf competition",
    position: "top 10",
    description: "national cybersecurity capture-the-flag event",
    year: "2023",
    icon: Medal,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-500",
  },
  {
    event: "academic scholarship",
    position: "merit award",
    description: "recognized for outstanding technical coursework",
    year: "2022",
    icon: Award,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500",
  },
];

const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="achievements" className="snap-section flex items-center py-24 border-t border-border">
      <div className="container" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl mb-4">achievements</h2>
          <p className="text-muted-foreground max-w-xl">
            milestones and recognition we've collected along the way.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            style={{ originY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <div className="space-y-8 md:space-y-12">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className={`relative flex items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${item.borderColor} bg-background z-10`}
                    animate={{
                      scale: hoveredIndex === index ? 1.5 : 1,
                      backgroundColor: hoveredIndex === index ? "hsl(var(--accent))" : "hsl(var(--background))",
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content */}
                  <div className={`flex-1 pl-16 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <motion.div
                      className={`relative p-6 rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-sm overflow-hidden`}
                      animate={{
                        scale: hoveredIndex === index ? 1.02 : 1,
                        y: hoveredIndex === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Background glow */}
                      <motion.div
                        className="absolute inset-0 opacity-0"
                        animate={{
                          opacity: hoveredIndex === index ? 0.5 : 0,
                        }}
                        style={{
                          background: `radial-gradient(circle at ${isEven ? '100%' : '0%'} 50%, ${item.color.includes('yellow') ? 'rgba(234, 179, 8, 0.2)' : item.color.includes('purple') ? 'rgba(168, 85, 247, 0.2)' : item.color.includes('cyan') ? 'rgba(6, 182, 212, 0.2)' : 'rgba(34, 197, 94, 0.2)'}, transparent 50%)`,
                        }}
                      />

                      <div className={`relative flex items-start gap-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        {/* Icon */}
                        <motion.div
                          className={`shrink-0 p-3 rounded-xl border ${item.borderColor} bg-background/50`}
                          animate={{
                            rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className={`w-6 h-6 ${item.iconColor}`} />
                        </motion.div>

                        <div className={`flex-1 ${isEven ? "md:text-right" : ""}`}>
                          <div className={`flex items-center gap-3 mb-2 ${isEven ? "md:flex-row-reverse" : ""}`}>
                            <h3 className="font-semibold text-lg">{item.event}</h3>
                            <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                              {item.year}
                            </span>
                          </div>
                          
                          <span className={`inline-block text-sm font-medium ${item.iconColor} mb-2`}>
                            {item.position}
                          </span>
                          
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
