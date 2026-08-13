import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover="hover"
      className="relative group p-6 rounded-2xl bg-[#0b162c]/50 backdrop-blur-md border border-white/5 transition-all duration-300"
    >
      {/* Glow Border on Hover */}
      <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-colors duration-300 pointer-events-none" />
      
      {/* Shadow Effect */}
      <motion.div 
        variants={{
          hover: { y: -10, boxShadow: "0 20px 40px -10px rgba(59,130,246,0.3)" }
        }}
        className="absolute inset-0 rounded-2xl -z-10"
      />
      
      {/* Content */}
      <motion.div
        variants={{
          hover: { y: -10 }
        }}
        className="relative z-10 flex flex-col h-full"
      >
        <div className="mb-6 flex items-center justify-between">
          <motion.div
            variants={{
              hover: { rotate: 8, scale: 1.1, color: "#3B82F6" }
            }}
            transition={{ duration: 0.3 }}
            className="p-3 bg-blue-500/10 rounded-lg text-blue-400"
          >
            {icon}
          </motion.div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
