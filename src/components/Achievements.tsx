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
    <section id="achievements" className="py-20">
      <div className="container">
        <h2 className="text-2xl mb-12">
          achievements
        </h2>
        
        <div className="space-y-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[100px_1fr] gap-4"
            >
              <span className="text-sm text-muted-foreground">{item.year}</span>
              
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-medium">{item.event}</h3>
                  <span className="text-xs text-accent">{item.position}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
