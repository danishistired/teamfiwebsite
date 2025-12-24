import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, PanInfo } from "motion/react";
import { MapPin } from "lucide-react";
import pic1 from "../assets/gallery/me.jpg";
import pic2 from "../assets/gallery/menvarun.jpg";
import pic3 from "../assets/gallery/pic3.jpg"
import pic4 from "../assets/gallery/pic4.jpg"
import pic5 from "../assets/gallery/pic5.jpg"
import pic6 from "../assets/gallery/pic6.jpg"

const galleryImages = [
  {
    id: 1,
    src: pic3,
    event: "CU AI Hacksprint",
    location: "Chandigarh University",
    rotation: -12,
    scale: 1.1,
  },
  {
    id: 2,
    src: pic4,
    event: "FOSSHack 2025",
    location: "UIET Panjab University",
    rotation: 8,
    scale: 0.95,
  },
  {
    id: 3,
    src: pic5,
    event: "Random",
    location: "Cafeteria",
    rotation: -5,
    scale: 1,
  },
  {
    id: 4,
    src: pic2,
    event: "SIH 2025",
    location: "Chandigarh University",
    rotation: 15,
    scale: 1.05,
  },
  {
    id: 5,
    src: pic6,
    event: "SIH 2025",
    location: "Chandigarh University",
    rotation: -8,
    scale: 0.9,
  },
  {
    id: 6,
    src: pic1,
    event: "CipherHunt 2.0",
    location: "Chandigarh University",
    rotation: 10,
    scale: 1,
  },
];

interface DraggablePhotoProps {
  image: typeof galleryImages[0];
  index: number;
  isInView: boolean;
  bringToFront: (id: number) => void;
  zIndex: number;
  containerBounds: DOMRect | null;
}

const DraggablePhoto = ({
  image,
  index,
  isInView,
  bringToFront,
  zIndex,
  containerBounds,
}: DraggablePhotoProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);

  // Initial scattered positions
  const positions = [
    { x: -220, y: -160 },
    { x: 0, y: -180 },
    { x: 220, y: -160 },
    { x: -180, y: 140 },
    { x: 0, y: 180 },
    { x: 180, y: 140 },
  ];

  const x = useMotionValue(positions[index % positions.length].x);
  const y = useMotionValue(positions[index % positions.length].y);

  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleDragStart = () => {
    setIsDragging(true);
    bringToFront(image.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // ✅ Calculate drag constraints dynamically
  const dragConstraints = (() => {
  if (!containerBounds || !photoRef.current) return false;

  const photoRect = photoRef.current.getBoundingClientRect();

  // 👇 Increase this value to allow more freedom
  const PADDING = 200; // px (try 80–200)

  return {
    left: -containerBounds.width / 2 + photoRect.width / 2 - PADDING,
    right: containerBounds.width / 2 - photoRect.width / 2 + PADDING,
    top: -containerBounds.height / 2 + photoRect.height / 2 - PADDING,
    bottom: containerBounds.height / 2 - photoRect.height / 2 + PADDING,
  };
})();


  return (
    <motion.div
      ref={photoRef}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        x: springX,
        y: springY,
        zIndex,
      }}
      initial={{
        opacity: 0,
        scale: 0,
        rotate: image.rotation * 2,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: image.scale,
              rotate: isDragging ? 0 : image.rotation,
            }
          : {}
      }
      transition={{
        opacity: { delay: 0.1 + index * 0.08, duration: 0.4 },
        scale: { delay: 0.1 + index * 0.08, duration: 0.5, type: "spring" },
        rotate: { type: "spring", stiffness: 200 },
      }}
      drag
      dragConstraints={dragConstraints} // ✅ HARD LIMIT
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileDrag={{ scale: 1.1, rotate: 0 }}
    >
      {/* Polaroid */}
      <motion.div
        className="relative bg-foreground p-2 pb-12 rounded-sm"
        animate={{ y: isHovered && !isDragging ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden bg-muted">
          <motion.img
            src={image.src}
            alt={image.event}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            draggable={false}
          />
        </div>

        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-background text-sm font-medium truncate">
            {image.event}
          </p>
        </div>

        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-accent/30 backdrop-blur-sm rounded-sm rotate-1" />
      </motion.div>
    </motion.div>
  );
};


const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [zIndices, setZIndices] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    galleryImages.forEach((img, i) => {
      initial[img.id] = i;
    });
    return initial;
  });
  const [containerBounds, setContainerBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerBounds(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const bringToFront = (id: number) => {
    setZIndices(prev => {
      const maxZ = Math.max(...Object.values(prev));
      return { ...prev, [id]: maxZ + 1 };
    });
  };

  return (
    <section id="gallery" className="snap-section flex items-center py-24 border-t border-border overflow-hidden relative">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl mb-4">gallery</h2>
          <p className="text-muted-foreground mb-2 max-w-xl mx-auto">
            moments that prove our existence, beyond just a screen.
          </p>
          <p className="text-xs text-accent">drag the photos around!</p>
        </motion.div>

        {/* Draggable photo area */}
        <div
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] flex items-center justify-center"
        >
          {/* Center marker */}
          <motion.div
            className="absolute w-4 h-4 rounded-full border-2 border-dashed border-accent/30"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          />

          {/* Photos */}
          {galleryImages.map((image, index) => (
            <DraggablePhoto
              key={image.id}
              image={image}
              index={index}
              isInView={isInView}
              bringToFront={bringToFront}
              zIndex={zIndices[image.id]}
              containerBounds={containerBounds}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
