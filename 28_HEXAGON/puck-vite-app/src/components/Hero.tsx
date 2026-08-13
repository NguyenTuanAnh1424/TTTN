import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Earth from "./Earth";
import { ChevronDown } from "lucide-react";

import { TypewriterText } from "./TypewriterText";

interface HeroProps {
  badgeText: string;
  titleLine1: string;
  titleLine2: string;
  titleLine2Highlight: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  scrollText: string;
}

const Hero = ({
  badgeText,
  titleLine1,
  titleLine2,
  titleLine2Highlight,
  description,
  primaryButtonText,
  secondaryButtonText,
  scrollText
}: HeroProps) => {
  const { scrollY } = useScroll();
  
  // Scroll Animations
  const textY = useTransform(scrollY, [0, 300], [0, -30]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const earthScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const earthRotateScroll = useTransform(scrollY, [0, 300], [0, 5]);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothOptions = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  const earthX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const earthY = useTransform(smoothMouseY, [-1, 1], [-25, 25]);

  const textParallaxX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Title variants for staggering
  const titleVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-[#115b40]">
      
      {/* Background overlay patterns */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "100px 100px" }}></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative pt-16 pb-12">
        
        {/* Left Content (Text) */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity, x: textParallaxX }}
          className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6 md:pr-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="inline-block px-4 py-1.5 rounded-full border border-orange-500 text-orange-500 text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(249,115,22,0.3)] backdrop-blur-md"
          >
            {badgeText}
          </motion.div>

          {/* Staggered Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.15, delayChildren: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white"
          >
            <motion.div variants={titleVariants}>
              <TypewriterText strings={[titleLine1, "Giải pháp CN", "Thi Công & Lắp đặt", "Thiết bị CNTT"]} />
            </motion.div>
            <motion.div variants={titleVariants}>
              {titleLine2} <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]">{titleLine2Highlight}</span>
            </motion.div>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }} // 0.2s after heading (0.6s)
            className="text-base md:text-lg text-green-50 max-w-lg mx-auto md:mx-0 leading-relaxed font-light"
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249,115,22,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-500 text-white font-semibold rounded-md shadow-lg transition-shadow"
            >
              {primaryButtonText}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:text-white font-semibold rounded-md backdrop-blur-sm transition-colors"
            >
              {secondaryButtonText}
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content (Earth) */}
        <motion.div 
          style={{ scale: earthScale, rotate: earthRotateScroll }}
          className="mt-12 md:mt-0 flex-shrink-0 w-full md:w-1/2 flex justify-center mix-blend-screen"
        >
          <Earth parallaxX={earthX} parallaxY={earthY} />
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
      >
        <span className="text-sm mb-2 font-light">{scrollText}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
