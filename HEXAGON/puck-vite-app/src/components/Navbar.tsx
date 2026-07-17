import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-[#030712]/50 border-b border-white/5"
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <span className="text-xl font-bold tracking-wider text-white">NEXUS</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
        <a href="#" className="hover:text-blue-400 transition-colors">Products</a>
        <a href="#" className="hover:text-blue-400 transition-colors">Solutions</a>
        <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
        <a href="#" className="hover:text-blue-400 transition-colors">Docs</a>
      </div>

      <div className="flex items-center space-x-4">
        <button className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Log in
        </button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59,130,246,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md transition-shadow"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
