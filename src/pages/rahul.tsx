import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import pfp from "@/assets/Rahulnobg.png";

const Rahul = () => {
  const navigate = useNavigate();

  const handleBackToTeam = () => {
    navigate('/', { state: { scrollTo: 'team' } });
  };

  const member = {
    id: "rahul",
    name: "Rahul Jaluthria",
    role: "UI/UX Designer",
    image: "",
    bio: [
      "I’m a UI/UX designer who turns ideas into seamless digital experiences. ",
      "Through strong collaboration with my team, I design interfaces that are simple, functional, and visually engaging.",
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
          </div>

          <div className="flex justify-center items-start">
            <ProfileCard
              name={member.name}
              title={member.role}
              handle="rjaluthria"
              status="Online"
              contactText="Contact Me"
              avatarUrl={member.image || pfp}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = "https://www.linkedin.com/in/rahul-jaluthria-629101321/"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rahul;