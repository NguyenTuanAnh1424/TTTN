const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#030712] py-12 relative z-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-blue-500 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <span className="text-lg font-bold tracking-widest text-white">NEXUS</span>
        </div>
        
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Nexus Security. All rights reserved.
        </div>
        
        <div className="flex space-x-6 mt-4 md:mt-0 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
