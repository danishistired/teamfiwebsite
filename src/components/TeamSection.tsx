import { Link } from "react-router-dom";
import { teamMembers } from "@/data/teamMembers";
import { User } from "lucide-react";

const TeamSection = () => {
  return (
    <section id="team" className="snap-section flex items-center py-24">
      <div className="container">
        <h2 className="text-2xl mb-12">our team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              to={`/member/${member.id}`}
              className="group block"
            >
              <div className="aspect-[3/4] rounded-xl bg-secondary border border-border overflow-hidden transition-all duration-300 group-hover:border-accent/30 group-hover:bg-secondary/80">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              
              <div className="mt-4 space-y-1">
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
