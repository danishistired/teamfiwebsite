import ScrollNavigation from "@/components/ScrollNavigation";
import LandingHero from "@/components/LandingHero";
import TeamSection from "@/components/TeamSection";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import EventFolders from "@/components/EventFolders";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  useLenis();

  return (
    <div id="home">
      <ScrollNavigation />
      <main>
        <LandingHero />
        <TeamSection />
        <Projects />
        <Gallery />
        <EventFolders />
        <Achievements />
        <Contact />
      </main>
      <footer className="snap-section flex items-center py-8 border-t border-border min-h-[30vh]">
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
