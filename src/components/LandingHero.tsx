import { ChevronDown } from "lucide-react";
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import ShinyText from "./ShinyText";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import logo from "../assets/fi.png";

const LandingHero = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(() => {
    return sessionStorage.getItem("heroIntroPlayed") === "true";
  });

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "phi.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
        
        // Small delay to let metallic paint initialize
        setTimeout(() => {
          setLogoLoaded(true);
          sessionStorage.setItem("heroIntroPlayed", "true");
        }, 300);
      } catch (err) {
        console.error("Error loading default image:", err);
        setLogoLoaded(true);
      }
    }
    loadDefaultImage();
  }, []);

  const shouldAnimate = !hasPlayedIntro && logoLoaded;

  return (
    <section className="snap-section relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Blue-tinted overlay that fades out */}
      <motion.div
        className="absolute inset-0 bg-[hsl(220,60%,8%)] pointer-events-none z-10"
        initial={{ opacity: hasPlayedIntro ? 0 : 1 }}
        animate={{ opacity: logoLoaded ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main content with reveal animation */}
      <motion.div
        className="scale-125 origin-center -translate-y-9"
        initial={{ 
          opacity: hasPlayedIntro ? 1 : 0, 
          scale: hasPlayedIntro ? 1 : 0.96,
          filter: hasPlayedIntro ? "blur(0px)" : "blur(8px)"
        }}
        animate={{ 
          opacity: logoLoaded ? 1 : 0, 
          scale: logoLoaded ? 1 : 0.96,
          filter: logoLoaded ? "blur(0px)" : "blur(8px)"
        }}
        transition={{ 
          duration: 1.4, 
          ease: [0.22, 1, 0.36, 1],
          delay: shouldAnimate ? 0.2 : 0
        }}
      >
        <div className="flex flex-col items-center">
          {/* we are */}
          <motion.p 
            className="mb-3 text-sm md:text-base text-muted-foreground text-center"
            initial={{ opacity: hasPlayedIntro ? 1 : 0, y: hasPlayedIntro ? 0 : 10 }}
            animate={{ opacity: logoLoaded ? 1 : 0, y: logoLoaded ? 0 : 10 }}
            transition={{ duration: 0.8, delay: shouldAnimate ? 0.4 : 0 }}
          >
            we are
          </motion.p>

          {/* Team Fi + Φ */}
          <div className="flex items-end gap-3 md:gap-4 lg:gap-5">
            <motion.h1 
              className="font-semibold tracking-tight text-5xl md:text-7xl lg:text-8xl leading-none"
              initial={{ opacity: hasPlayedIntro ? 1 : 0, y: hasPlayedIntro ? 0 : 20 }}
              animate={{ opacity: logoLoaded ? 1 : 0, y: logoLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: shouldAnimate ? 0.5 : 0 }}
            >
              Team Fi
            </motion.h1>

            {/* Φ logo */}
            <motion.div
              className="relative flex items-end w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 -mb-2 -ml-1"
              initial={{ opacity: hasPlayedIntro ? 1 : 0, scale: hasPlayedIntro ? 1 : 0.8 }}
              animate={{ opacity: logoLoaded ? 1 : 0, scale: logoLoaded ? 1 : 0.8 }}
              transition={{ duration: 1, delay: shouldAnimate ? 0.6 : 0 }}
            >
              <MetallicPaint
                imageData={imageData ?? new ImageData(1, 1)}
                params={{
                  edge: 0.0,
                  patternBlur: 0.005,
                  patternScale: 2,
                  refraction: 0.015,
                  speed: 0.3,
                  liquid: 0.1,
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 flex items-center gap-2 text-muted-foreground text-sm"
        initial={{ opacity: hasPlayedIntro ? 1 : 0, y: hasPlayedIntro ? 0 : 20 }}
        animate={{ opacity: logoLoaded ? 1 : 0, y: logoLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: shouldAnimate ? 1 : 0 }}
      >
        <ShinyText 
          text="scroll down" 
          disabled={false} 
          speed={3} 
          className="text-muted-foreground text-sm" 
        />
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default LandingHero;
