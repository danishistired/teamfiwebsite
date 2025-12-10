import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

const TaylorKim = () => {
  const member = {
    id: "taylor",
    name: "Taylor Kim",
    role: "devops engineer",
    image: "",
    bio: [
      "keeps systems running smoothly with automation and monitoring. expert in cloud infrastructure and ci/cd pipelines.",
      "passionate about reliability engineering and incident response.",
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to team</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground mb-2">{member.role}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl">{member.name}</h1>
            </div>

            <div className="space-y-6 text-muted-foreground">
              {member.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <p>
                want to connect?{" "}
                <a href="/#contact" className="text-accent hover:underline">
                  reach out
                </a>
                .
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-square max-w-sm ml-auto rounded-2xl bg-secondary overflow-hidden border border-border">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-24 h-24 text-muted-foreground/30" />
                </div>
              )}
            </div>

            <div className="max-w-sm ml-auto p-5 rounded-xl border border-border bg-card/50">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    role
                  </p>
                  <p className="text-sm">{member.role}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    team
                  </p>
                  <p className="text-sm">Team Fi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaylorKim;
