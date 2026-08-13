import { motion } from "framer-motion";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

interface PartnerMarqueeProps {
  partners: Partner[];
}

const PartnerMarquee = ({ partners }: PartnerMarqueeProps) => {
  // Duplicate logos for seamless infinite marquee
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full relative mt-12 overflow-hidden">
      {/* Edge Fade Mask */}
      <div 
        className="relative w-full overflow-hidden pb-12" // pb-12 ensures drop-shadow is not cut off
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)",
        }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex w-max animate-marquee"
        >
          {duplicatedPartners.map((partner, index) => {
            // Entrance stagger logic. Only stagger the first set of original partners so it doesn't take too long.
            const isOriginal = index < partners.length;
            const delay = isOriginal ? index * 0.1 : 0;

            return (
              <motion.div
                key={`${partner.id}-${index}`}
                initial={isOriginal ? { opacity: 0, scale: 0.92, y: 12 } : { opacity: 1, scale: 1, y: 0 }}
                whileInView={isOriginal ? { opacity: 1, scale: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: delay,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.08,
                  filter: "brightness(1.15)",
                  boxShadow: "0 8px 24px rgba(0, 180, 120, 0.18)",
                  transition: { duration: 0.25, ease: "easeOut" }
                }}
                className="flex items-center justify-center bg-white rounded-2xl mx-[28px] h-20 md:h-24 w-32 md:w-40 flex-shrink-0 cursor-pointer border border-gray-100"
              >
                <img
                  src={partner.logoUrl || `https://placehold.co/120x60/ffffff/115b40?text=${partner.name}`}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain p-4 pointer-events-none"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerMarquee;
