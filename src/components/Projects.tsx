import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "distributed cache",
    description: "high-performance caching layer for microservices with automatic sharding and failover",
    stack: ["go", "redis", "grpc"],
    link: "#",
  },
  {
    title: "auth gateway",
    description: "zero-trust authentication service with oauth2 and mfa support",
    stack: ["rust", "postgresql", "jwt"],
    link: "#",
  },
  {
    title: "static site generator",
    description: "minimal markdown-based static site builder with hot reload",
    stack: ["typescript", "node", "markdown"],
    link: "#",
  },
  {
    title: "monitoring dashboard",
    description: "real-time metrics visualization for infrastructure health",
    stack: ["react", "d3", "websockets"],
    link: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="snap-section flex items-center py-24 border-t border-border">
      <div className="container">
        <h2 className="text-2xl mb-4">projects</h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          things we've built together — from internal tools to open source contributions.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="group block p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:bg-secondary/50"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-medium text-lg">{project.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
