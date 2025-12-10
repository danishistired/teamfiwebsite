import WorkCard from "./WorkCard";
import profileImage from "@/assets/profile-placeholder.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
              building reliable systems and thoughtful digital experiences.
            </h1>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                we focus on creating software that works — clean architecture, 
                solid foundations, and interfaces that feel intuitive. no unnecessary 
                complexity, just solutions that solve real problems.
              </p>
              
              <p>
                our interests span web development, systems design, security, 
                and the intersection of design and engineering. always learning, 
                always building.
              </p>
              
              <p>
                if you're working on something interesting or want to collaborate 
                — feel free to{" "}
                <a href="#contact" className="text-accent hover:underline">
                  reach out
                </a>
                .
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="aspect-square max-w-sm ml-auto rounded-2xl bg-secondary overflow-hidden border border-border">
              <img 
                src={profileImage} 
                alt="Team profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <WorkCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
