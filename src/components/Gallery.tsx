import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    event: "Hackathon 2024",
    location: "Tech Hub",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    event: "Conference Talk",
    location: "Dev Summit",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    event: "Team Meetup",
    location: "Office",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    event: "Award Ceremony",
    location: "Grand Hall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    event: "Workshop",
    location: "Innovation Lab",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    event: "Planning Session",
    location: "Workspace",
  },
];

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="gallery" className="snap-section flex items-center py-24 border-t border-border overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl mb-4">gallery</h2>
          <p className="text-muted-foreground mb-12 max-w-xl">
            moments captured from events, hackathons, and team adventures.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(120, 200, 255, 0.06), transparent 40%)`,
            }}
          />

          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`relative group cursor-pointer ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-square">
                {/* Image */}
                <motion.img
                  src={image.src}
                  alt={image.event}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === image.id ? 1.1 : 1,
                    filter: hoveredId !== null && hoveredId !== image.id 
                      ? "grayscale(100%) brightness(0.5)" 
                      : "grayscale(0%) brightness(1)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
                  animate={{
                    opacity: hoveredId === image.id ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredId === image.id ? 1 : 0,
                    y: hoveredId === image.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs text-accent uppercase tracking-wider mb-1">
                    {image.location}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {image.event}
                  </h3>
                </motion.div>

                {/* Border glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-accent/50"
                  animate={{
                    opacity: hoveredId === image.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Floating corner accents */}
              <motion.div
                className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-accent"
                animate={{
                  opacity: hoveredId === image.id ? 1 : 0,
                  x: hoveredId === image.id ? 0 : 10,
                  y: hoveredId === image.id ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-accent"
                animate={{
                  opacity: hoveredId === image.id ? 1 : 0,
                  x: hoveredId === image.id ? 0 : -10,
                  y: hoveredId === image.id ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
