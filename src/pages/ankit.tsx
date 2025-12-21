import { useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Github, Mail } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import pfp from "@/assets/ankitnobg.png";

const Ankit = () => {
  const navigate = useNavigate();

  const handleBackToTeam = () => {
    navigate('/', { state: { scrollTo: 'team' } });
  };

  const member = {
    id: "ankit",
    name: "Ankit Kumar",
    role: "product designer",
    image: "",
    bio: [
      "bridges the gap between user needs and technical implementation. focused on accessible, inclusive design.",
      "believes good design is invisible — it just works.",
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        <button
          onClick={handleBackToTeam}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to team</span>
        </button>

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

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/ankit-kumar3323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/DarKnight890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="mailto:Ankitboora123an@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center items-start">
            <ProfileCard
              name={member.name}
              title={member.role}
              handle="deactivated bitch"
              status="Online"
              contactText="Contact Me"
              avatarUrl={member.image || pfp}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = "/#contact"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ankit;
