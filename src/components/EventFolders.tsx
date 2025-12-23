import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ChevronRight } from "lucide-react";

interface EventPhoto {
  id: number;
  src: string;
  caption?: string;
}

interface EventFolder {
  id: string;
  name: string;
  year: string;
  category: string;
  photos: EventPhoto[];
  coverImage: string;
}

const eventFolders: EventFolder[] = [
  {
    id: "hackathon-2024",
    name: "Regional Hackathon",
    year: "2024",
    category: "Competition",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", caption: "Opening ceremony" },
      { id: 2, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", caption: "Team coding session" },
      { id: 3, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", caption: "Planning our approach" },
    ],
  },
  {
    id: "conference-2024",
    name: "Dev Summit",
    year: "2024",
    category: "Conference",
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", caption: "Keynote session" },
      { id: 2, src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", caption: "Panel discussion" },
    ],
  },
  {
    id: "workshop-2023",
    name: "System Design Workshop",
    year: "2023",
    category: "Workshop",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", caption: "Whiteboard session" },
      { id: 2, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80", caption: "Group discussion" },
    ],
  },
  {
    id: "meetup-2023",
    name: "Tech Community Meetup",
    year: "2023",
    category: "Meetup",
    coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80", caption: "Networking" },
      { id: 2, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", caption: "Lightning talks" },
      { id: 3, src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", caption: "After party" },
    ],
  },
  {
    id: "ctf-2023",
    name: "CTF Competition",
    year: "2023",
    category: "Competition",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", caption: "Team strategizing" },
    ],
  },
];

const FolderCard = ({ folder, onClick, index, isInView }: { 
  folder: EventFolder; 
  onClick: () => void; 
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
      className="group relative cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Folder structure */}
      <div className="relative">
        {/* Folder tab */}
        <div className="absolute -top-3 left-4 w-20 h-4 bg-card rounded-t-md border-t border-l border-r border-border z-10" />
        
        {/* Main folder body */}
        <motion.div
          className="relative bg-card border border-border rounded-lg overflow-hidden"
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Cover image with overlay */}
          <div className="relative h-40 overflow-hidden">
            <motion.img
              src={folder.coverImage}
              alt={folder.name}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            
            {/* Photo count indicator */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-background/60 backdrop-blur-sm rounded text-xs text-foreground/80">
              {folder.photos.length} photos
            </div>
          </div>

          {/* Folder info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-mono">{folder.year}</span>
              <span className="text-xs text-accent/80">{folder.category}</span>
            </div>
            <h3 className="text-base font-medium text-foreground mb-1 truncate">
              {folder.name}
            </h3>
            
            {/* Hover arrow */}
            <motion.div
              className="flex items-center gap-1 text-xs text-muted-foreground mt-2"
              animate={{
                x: isHovered ? 4 : 0,
                opacity: isHovered ? 1 : 0.6,
              }}
              transition={{ duration: 0.2 }}
            >
              <span>View photos</span>
              <ChevronRight className="w-3 h-3" />
            </motion.div>
          </div>

          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 pointer-events-none rounded-lg shadow-[inset_0_-20px_40px_-20px_hsl(var(--background)/0.5)]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const PhotoViewer = ({ folder, onClose }: { folder: EventFolder; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs text-muted-foreground font-mono">{folder.year} / {folder.category}</span>
          <h2 className="text-2xl font-semibold text-foreground mt-1">{folder.name}</h2>
        </div>

        {/* Main photo */}
        <div className="relative aspect-video bg-card rounded-lg overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={folder.photos[currentIndex].src}
              alt={folder.photos[currentIndex].caption}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          
          {folder.photos[currentIndex].caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
              <p className="text-sm text-foreground/90">{folder.photos[currentIndex].caption}</p>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {folder.photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {folder.photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden transition-all duration-200 ${
                  index === currentIndex 
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background" 
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={photo.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const EventFolders = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedFolder, setSelectedFolder] = useState<EventFolder | null>(null);

  return (
    <>
      <section id="gallery" className="snap-section flex items-center py-24 border-t border-border">
        <div className="container" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl mb-4">gallery</h2>
            <p className="text-muted-foreground max-w-md">
              a quiet archive of moments that matter.
            </p>
          </motion.div>

          {/* Folder grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eventFolders.map((folder, index) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                index={index}
                isInView={isInView}
                onClick={() => setSelectedFolder(folder)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Photo viewer overlay */}
      <AnimatePresence>
        {selectedFolder && (
          <PhotoViewer
            folder={selectedFolder}
            onClose={() => setSelectedFolder(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EventFolders;
