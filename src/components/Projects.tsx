import { useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { motion, useInView } from "motion/react";

const projects = [
  {
    title: "distributed cache",
    description: "high-performance caching layer for microservices with automatic sharding and failover",
    stack: ["go", "redis", "grpc"],
    link: "#",
    number: "01",
  },
  {
    title: "auth gateway",
    description: "zero-trust authentication service with oauth2 and mfa support",
    stack: ["rust", "postgresql", "jwt"],
    link: "#",
    number: "02",
  },
  {
    title: "static site generator",
    description: "minimal markdown-based static site builder with hot reload",
    stack: ["typescript", "node", "markdown"],
    link: "#",
    number: "03",
  },
  {
    title: "monitoring dashboard",
    description: "real-time metrics visualization for infrastructure health",
    stack: ["react", "d3", "websockets"],
    link: "#",
    number: "04",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="snap-section flex items-center py-24 border-t border-border">
      <div className="container" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl mb-4">projects</h2>
          <p className="text-muted-foreground max-w-xl">
            things we've built together — from internal tools to open source contributions.
          </p>
        </motion.div>
        
        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background highlight */}
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-lg"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative py-6 px-4 flex items-center gap-6 border-b border-border/50">
                {/* Number */}
                <motion.span
                  className="text-sm font-mono text-muted-foreground w-8"
                  animate={{
                    color: hoveredIndex === index ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {project.number}
                </motion.span>

                {/* Title */}
                <motion.h3
                  className="text-xl md:text-2xl font-medium flex-1"
                  animate={{
                    x: hoveredIndex === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>

                {/* Stack - visible on hover */}
                <motion.div
                  className="hidden md:flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    x: hoveredIndex === index ? 0 : -20,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border bg-secondary/50"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* Arrow */}
                <motion.div
                  className="flex items-center gap-2"
                  animate={{
                    x: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight
                    className={`w-5 h-5 transition-colors duration-200 ${
                      hoveredIndex === index ? "text-accent" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Description - slides down on hover */}
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: hoveredIndex === index ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground px-4 py-4 pl-[4.5rem]">
                  {project.description}
                </p>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            <span>view all on github</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 3 }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
