import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";

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

          <div className="flex justify-center items-start">
            <ProfileCard
              name={member.name}
              title={member.role}
              handle="@taylor"
              status="Online"
              contactText="Contact Me"
              avatarUrl={member.image || "https://i.pravatar.cc/300?img=4"}
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

export default TaylorKim;
