import { ChevronDown } from "lucide-react";

const LandingHero = () => {
  return (
    <section className="snap-section flex flex-col items-center justify-center relative">
      <div className="text-center">
        <p className="text-lg text-muted-foreground mb-2">we are</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl">Team Fi</h1>
      </div>
      
      <div className="absolute bottom-12 flex items-center gap-2 text-muted-foreground text-sm">
        <span>scroll down</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};

export default LandingHero;
