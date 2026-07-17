import { motion, MotionValue } from "framer-motion";

interface EarthProps {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

const Earth = ({ parallaxX, parallaxY }: EarthProps) => {
  return (
    <motion.div
      style={{ x: parallaxX, y: parallaxY }}
      className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center mix-blend-screen"
    >
      {/* Glow Behind Earth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ 
          opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          delay: 0.0 // glow appears at 0.0s but we'll let Hero handle global initial load
        }}
        className="absolute inset-0 bg-green-500 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none"
      />

      {/* Earth Image */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.2, // Appears at 1.2s
          ease: "easeOut",
        }}
        className="relative w-full h-full flex items-center justify-center z-10 mix-blend-screen"
      >
        <motion.img
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          src="https://i.pinimg.com/originals/b8/fc/d5/b8fcd5dc21fc41be47ae5ae99c7690f8.gif"
          alt="Hexagon Earth"
          className="w-[120%] h-[120%] object-contain mix-blend-screen"
          style={{
            filter: 'contrast(1.8) brightness(0.6) hue-rotate(-15deg) saturate(1.5)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Earth;
