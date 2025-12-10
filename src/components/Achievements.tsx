const achievements = [
  {
    event: "regional hackathon",
    position: "1st place",
    description: "built a real-time collaboration tool in 48 hours",
    year: "2024",
  },
  {
    event: "open source contribution",
    position: "core contributor",
    description: "accepted patches to major infrastructure project",
    year: "2023",
  },
  {
    event: "ctf competition",
    position: "top 10",
    description: "national cybersecurity capture-the-flag event",
    year: "2023",
  },
  {
    event: "academic scholarship",
    position: "merit award",
    description: "recognized for outstanding technical coursework",
    year: "2022",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 border-t border-border">
      <div className="container">
        <h2 className="text-2xl mb-4">achievements</h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          milestones and recognition we've collected along the way.
        </p>
        
        <div className="grid gap-4">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-lg">{item.event}</h3>
                    <span className="text-xs text-accent px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10">
                      {item.position}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                <span className="text-sm text-muted-foreground shrink-0">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
