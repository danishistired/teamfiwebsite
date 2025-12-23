import { useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Github, Mail, Globe } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import ClickSpark from "@/components/ClickSpark";
import TextPressure from "@/components/TextPressure";
import pfp from "@/assets/newme.png";

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
      "i do everything, from builing apps, websites, traning ai models, hacking machines to leading the team. without me we wouldn't exist.",
      "but if you were to ask me how i do it, i probably wouldn't know so don't ask me.",
    ],
  };

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen relative">
        <div className="container py-12">
        <button
          onClick={handleBackToTeam}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to team</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-0">
            <div>
              <p className="text-muted-foreground mb-2">{member.role}</p>
              <div className="relative mb-7">
  <TextPressure
    text="Danish Verma"
    flex
    alpha={false}
    stroke={false}
    width
    weight
    italic
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>

            </div>

            <div className="space-y-6 text-muted-foreground">
              {member.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <p>
                want to connect?{" "}
                <a href="https://www.linkedin.com/in/danish--verma" className="text-accent hover:underline">
                  reach out
                </a>
                .
              </p>
            </div>

            <div className="inline-flex items-center gap-4 pt-10">
  <a
    href="https://www.linkedin.com/in/danish--verma"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
  >
    <Linkedin className="w-6 h-6" />
  </a>

  <a
    href="https://github.com/danishistired"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
  >
    <Github className="w-6 h-6" />
  </a>

  <a
    href="mailto:danishverma1116@gmail.com"
    aria-label="Email"
    className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
  >
    <Mail className="w-6 h-6" />
  </a>

  <a
    href="https://danishv.me"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Website"
    className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
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
    </ClickSpark>
  );
};

export default Danish;
