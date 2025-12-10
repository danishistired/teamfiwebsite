import { ChevronDown } from "lucide-react";
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import { useState, useEffect } from "react";
import logo from "../assets/fi.png";

const LandingHero = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "phi.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }
    loadDefaultImage();
  }, []);

  return (
    <section className="snap-section relative flex items-center justify-center min-h-screen">
      {/* ✅ SCALED CONTENT */}
      <div className="scale-125 origin-center -translate-y-9">
        <div className="flex flex-col items-center">
          {/* we are */}
          <p className="mb-3 text-sm md:text-base text-muted-foreground text-center">
            we are
          </p>

          {/* Team Fi + Φ */}
          <div className="flex items-end gap-3 md:gap-4 lg:gap-5">
            <h1 className="font-semibold tracking-tight text-5xl md:text-7xl lg:text-8xl leading-none">
              Team Fi
            </h1>

            {/* Φ logo */}
            <div
              className="
                relative
                flex items-end
                w-20 h-20
                md:w-24 md:h-24
                lg:w-28 lg:h-28
                -mb-2
                -ml-1
              "
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
            </div>
          </div>
        </div>
      </div>

      {/* ❌ NOT SCALED */}
      <div className="absolute bottom-12 flex items-center gap-2 text-muted-foreground text-sm">
        <span>scroll down</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};

export default LandingHero;
