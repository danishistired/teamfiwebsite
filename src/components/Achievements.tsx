import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Trophy, Award, Star, Medal, Sparkles } from "lucide-react";

const achievements = [
  {
    event: "regional hackathon",
    position: "1st place",
    description: "built a real-time collaboration tool in 48 hours",
    year: "2024",
    icon: Trophy,
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    glow: "shadow-[0_0_60px_-10px_rgba(251,191,36,0.6)]",
  },
  {
    event: "open source contribution",
    position: "core contributor",
    description: "accepted patches to major infrastructure project",
    year: "2023",
    icon: Star,
    gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    glow: "shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)]",
  },
  {
    event: "ctf competition",
    position: "top 10",
    description: "national cybersecurity capture-the-flag event",
    year: "2023",
    icon: Medal,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    glow: "shadow-[0_0_60px_-10px_rgba(6,182,212,0.6)]",
  },
  {
    event: "academic scholarship",
    position: "merit award",
    description: "recognized for outstanding technical coursework",
    year: "2022",
    icon: Award,
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    glow: "shadow-[0_0_60px_-10px_rgba(34,197,94,0.6)]",
  },
];

const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHoveringShelf, setIsHoveringShelf] = useState(false);

  return (
    <section id="achievements" className="snap-section flex items-center py-24 border-t border-border relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: isHoveringShelf ? 1.2 : 1,
            opacity: isHoveringShelf ? 1 : 0.5,
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="container relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Trophy Cabinet</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl mb-4">achievements</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            milestones and recognition we've collected along the way.
          </p>
        </motion.div>

        {/* Trophy Shelf */}
        <div
          className="relative"
          onMouseEnter={() => setIsHoveringShelf(true)}
          onMouseLeave={() => setIsHoveringShelf(false)}
        >
          {/* Glass shelf effect */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl h-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-accent/10 to-transparent rounded-t-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </motion.div>

          {/* Trophy Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="relative group perspective-1000"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Trophy Card */}
                  <motion.div
                    className={`relative p-6 rounded-2xl cursor-pointer transform-gpu ${
                      isActive ? item.glow : ""
                    }`}
                    animate={{
                      y: isActive ? -20 : 0,
                      rotateY: isActive ? 5 : 0,
                      rotateX: isActive ? -5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glass background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl border border-border/50 overflow-hidden">
                      {/* Holographic shimmer */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)`,
                        }}
                        animate={isActive ? {
                          x: ["-100%", "200%"],
                        } : {}}
                        transition={{
                          duration: 1,
                          ease: "easeInOut",
                          repeat: isActive ? Infinity : 0,
                          repeatDelay: 0.5,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Icon with gradient */}
                      <motion.div
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? [0, -5, 5, 0] : 0,
                        }}
                        transition={{
                          scale: { type: "spring", stiffness: 300 },
                          rotate: { duration: 0.4 },
                        }}
                      >
                        <Icon className="w-8 h-8 text-background" strokeWidth={2.5} />

                        {/* Floating particles */}
                        <AnimatePresence>
                          {isActive && (
                            <>
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br ${item.gradient}`}
                                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                  animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    x: [0, (i - 1) * 30],
                                    y: [0, -40 - i * 10],
                                  }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 1,
                                    delay: i * 0.15,
                                    repeat: Infinity,
                                    repeatDelay: 0.5,
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Year badge */}
                      <motion.span
                        className="text-xs font-mono text-accent px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10 mb-3"
                        animate={{
                          borderColor: isActive ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.3)",
                        }}
                      >
                        {item.year}
                      </motion.span>

                      {/* Position */}
                      <motion.h3
                        className={`font-bold text-lg mb-1 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                        animate={{
                          scale: isActive ? 1.05 : 1,
                        }}
                      >
                        {item.position}
                      </motion.h3>

                      {/* Event name */}
                      <p className="text-sm text-foreground font-medium mb-2">
                        {item.event}
                      </p>

                      {/* Description - shown on hover */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-muted-foreground leading-relaxed"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Reflection effect */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-accent/10 to-transparent blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative shelf line */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-px w-full max-w-5xl"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
