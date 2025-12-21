import { useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Github, Mail, Globe } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import StickerPeel from "@/components/StickerPeel";
import pfp from "@/assets/newme.png";
import logo from "@/assets/favicon.png";

const Danish = () => {
  const navigate = useNavigate();

  const handleBackToTeam = () => {
    navigate('/', { state: { scrollTo: 'team' } });
  };

  const member = {
    id: "danish",
    name: "Danish Verma",
    role: "lead developer/ leader",
    image: "",
    bio: [
      "awd in systems architecture and backend development. passionate about building scalable, reliable infrastructure.",
      "interests include distributed systems, performance optimization, and security.",
    ],
  };

  return (
    <div className="min-h-screen relative">
      <StickerPeel
        imageSrc={logo}
        width={100}
        rotate={0}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0.6}
        lightingIntensity={0.1}
        initialPosition={{ x: 835, y: 129 }}
      />
      
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
                href="https://www.linkedin.com/in/danish--verma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/danishistired"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="mailto:danishverma1116@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://danishv.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Website"
              >
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center items-start">
            <ProfileCard
              name={member.name}
              title={member.role}
              handle="dahahanish"
              status="Online"
              contactText="Contact Me"
              avatarUrl={member.image || pfp}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = "https://www.linkedin.com/in/danish--verma"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Danish;
