import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";

const AlexChen = () => {
  const member = {
    id: "Danish",
    name: "Danish Verma",
    role: "lead developer/ leader",
    image: "",
    bio: [
      "awd in systems architecture and backend development. passionate about building scalable, reliable infrastructure.",
      "interests include distributed systems, performance optimization, and security.",
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

          <div className="flex justify-center items-start">
            <ProfileCard
              name={member.name}
              title={member.role}
              handle="@danish"
              status="Online"
              contactText="Contact Me"
              avatarUrl={member.image || "https://i.pravatar.cc/300?img=1"}
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

export default AlexChen;
