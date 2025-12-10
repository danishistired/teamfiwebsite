import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "distributed cache",
    description: "high-performance caching layer for microservices",
    stack: ["go", "redis", "grpc"],
    link: "#",
  },
  {
    title: "auth gateway",
    description: "zero-trust authentication service with oauth2 support",
    stack: ["rust", "postgresql", "jwt"],
    link: "#",
  },
  {
    title: "static site generator",
    description: "minimal markdown-based static site builder",
    stack: ["typescript", "node", "markdown"],
    link: "#",
  },
  {
    title: "monitoring dashboard",
    description: "real-time metrics visualization for infrastructure",
    stack: ["react", "d3", "websockets"],
    link: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container">
        <h2 className="text-2xl mb-12">
          projects
        </h2>
        
        <div className="space-y-1">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className="group block py-5 border-b border-border transition-colors duration-200 hover:bg-secondary/30 -mx-4 px-4 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{project.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
