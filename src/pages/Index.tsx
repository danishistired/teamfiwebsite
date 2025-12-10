import ScrollNavigation from "@/components/ScrollNavigation";
import LandingHero from "@/components/LandingHero";
import TeamSection from "@/components/TeamSection";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen" id="home">
      <ScrollNavigation />
      <main>
        <LandingHero />
        <TeamSection />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <footer className="py-8 border-t border-border">
        <div className="container">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Team Fi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
