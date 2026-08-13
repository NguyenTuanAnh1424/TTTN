import FeatureCard from "./FeatureCard";

const Features = () => {
  const featureData = [
    {
      title: "Threat Intelligence",
      description: "Real-time AI analysis of global threat patterns to preemptively block cyber attacks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      )
    },
    {
      title: "Zero Trust Architecture",
      description: "Continuous verification for every user and device, ensuring ironclad perimeter defense.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      )
    },
    {
      title: "Quantum Encryption",
      description: "Future-proof data protection using next-generation cryptographic algorithms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 12L2.5 9.5"/><path d="M12 12l9.5-2.5"/></svg>
      )
    },
    {
      title: "Automated Compliance",
      description: "Streamline regulatory requirements with automated reporting and continuous monitoring.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#030712] relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Enterprise-Grade <span className="text-blue-500">Security</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform provides end-to-end protection with modern architecture designed for the cloud era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              delay={index * 0.12} // Stagger by 0.12s
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
