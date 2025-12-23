import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const achievements = [
  {
    focal: "1st",
    title: "Regional Hackathon",
    impact: "Built a real-time collaboration platform under 48-hour pressure. Judged across 50+ teams on innovation, execution, and technical depth.",
    context: "48 hrs · 50+ teams",
    year: "2024",
  },
  {
    focal: "Core",
    title: "Open Source Contributor",
    impact: "Accepted contributions to production infrastructure serving millions. Code reviewed by maintainers of top-tier projects.",
    context: "Production-grade patches",
    year: "2023",
  },
  {
    focal: "Top 10",
    title: "National CTF",
    impact: "Ranked in the top percentile of a national cybersecurity competition. Solved complex reverse engineering and cryptography challenges.",
    context: "Nationwide · Security",
    year: "2023",
  },
  {
    focal: "Merit",
    title: "Academic Excellence",
    impact: "Recognized for outstanding performance in advanced technical coursework. Maintained distinction across systems and theory.",
    context: "Scholarship recipient",
    year: "2022",
  },
];

const AchievementCard = ({ 
  achievement, 
  index, 
  isInView 
}: { 
  achievement: typeof achievements[0]; 
  index: number; 
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-card border border-border rounded-2xl overflow-hidden cursor-default"
        animate={{
          y: isHovered ? -8 : 0,
          borderColor: isHovered ? "hsl(var(--accent) / 0.3)" : "hsl(var(--border))",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: isHovered 
            ? "0 25px 50px -12px hsl(var(--accent) / 0.15), 0 0 0 1px hsl(var(--accent) / 0.1)"
            : "0 4px 20px -4px hsl(var(--background) / 0.5)",
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: "radial-gradient(ellipse at top, hsl(var(--accent) / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            {/* Focal element - the rank/position */}
            <motion.div
              className="relative"
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-none">
                {achievement.focal}
              </span>
              {/* Subtle underline accent */}
              <motion.div
                className="absolute -bottom-1 left-0 h-1 bg-accent/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : "30%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Year badge */}
            <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
              {achievement.year}
            </span>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl font-semibold text-foreground mb-3"
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {achievement.title}
          </motion.h3>

          {/* Impact description */}
          <motion.p
            className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {achievement.impact}
          </motion.p>

          {/* Context tag */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-accent/80 font-medium">
              {achievement.context}
            </span>
          </div>
        </div>

        {/* Bottom edge gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="snap-section flex items-center py-24 border-t border-border relative overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, hsl(var(--accent) / 0.1) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl mb-4">achievements</h2>
          <p className="text-muted-foreground max-w-md">
            proof of execution. milestones that shaped us.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
    </section>
  );
};

export default Achievements;
