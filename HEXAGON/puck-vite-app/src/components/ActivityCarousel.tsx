import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Activity {
  title: string;
  image?: string;
}

interface ActivityCarouselProps {
  activities: Activity[];
}

const ActivityCarousel = ({ activities }: ActivityCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate items per view based on window width (simple responsive approach)
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto Slider
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, activities.length]);

  const springTransition = {
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
  };

  // Helper to get visible items (simulating infinite loop)
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerView; i++) {
      items.push(activities[(currentIndex + i) % activities.length]);
    }
    return items;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-hidden py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      <div className="flex gap-6 relative">
        <AnimatePresence mode="popLayout">
          {getVisibleItems().map((activity, index) => (
            <motion.div
              key={`${currentIndex}-${index}-${activity.title}`}
              layout
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{
                ...springTransition,
                opacity: { duration: 0.3 },
                // Stagger entry animation logic could be complex with infinite loop, using layout transitions instead
              }}
              whileHover="hover"
              className="flex-shrink-0 flex flex-col justify-end text-left shadow-lg text-white rounded-2xl overflow-hidden relative group cursor-grab active:cursor-grabbing border border-transparent"
              style={{
                width: `calc(${100 / itemsPerView}% - ${(24 * (itemsPerView - 1)) / itemsPerView}px)`,
                height: "300px"
              }}
              variants={{
                hover: { 
                  y: -8, 
                  scale: 1.03, 
                  boxShadow: "0 20px 40px -10px rgba(17,91,64,0.5)",
                  borderColor: "rgba(32, 212, 137, 0.5)",
                  transition: { duration: 0.25, ease: "easeOut" }
                }
              }}
            >
              {/* Shifting Gradient Background */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-br from-[#115b40] via-[#1a7a56] to-[#0c3f2d] bg-[length:200%_200%] z-0"
              />

              {/* Soft Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.1),_transparent_70%)] z-0 pointer-events-none" />

              {/* Title at top */}
              <div className="relative z-20 p-6 pt-8 bg-gradient-to-b from-[#115b40]/90 to-transparent">
                <h3 className="text-xl font-bold leading-snug">
                  {activity.title}
                </h3>
              </div>

              {/* Product Image at bottom */}
              <div className="absolute top-24 left-0 right-0 bottom-0 flex items-end justify-center z-10 p-4 pb-0 overflow-visible">
                <motion.img
                  src={activity.image || "https://placehold.co/400x300/115b40/ffffff?text=Illustration"}
                  alt={activity.title}
                  className="w-[90%] h-auto object-contain"
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ActivityCarousel;
