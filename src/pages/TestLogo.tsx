import MetallicPaint, { parseLogoImage } from "../components/MetallicPaint";
import { useState, useEffect } from 'react';

// replace with your own SVG
// NOTE: your SVG should have a bit of padding around the shape, to keep it from being cut off
// it should also have black fill color, to allow the metallic effect to show through the mask
import logo from '../assets/fi.png';

const Component = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
        const url = URL.createObjectURL(parsedData.pngBlob);
const debug = document.createElement("img");
debug.src = url;
debug.style.border = "3px solid red";
debug.style.maxWidth = "300px";
document.body.appendChild(debug);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div style={{ width: '50%', height: '100vh' }}>
      <MetallicPaint 
        imageData={imageData ?? new ImageData(1, 1)} 
        params={{ edge: 0, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.10 }} 
      />
    </div>
  );
}

export default Component;