import { Briefcase } from "lucide-react";

const experiences = [
  {
    org: "acme labs",
    role: "lead developer",
    period: "2023 — present",
  },
  {
    org: "state university",
    role: "computer science",
    period: "2020 — 2024",
  },
];

const WorkCard = () => {
  return (
    <div className="max-w-sm ml-auto rounded-xl border border-border bg-card/50 p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Briefcase className="w-4 h-4" />
        <span>work & education</span>
      </div>
      
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{exp.org}</p>
              <p className="text-xs text-muted-foreground">{exp.role}</p>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">{exp.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkCard;
