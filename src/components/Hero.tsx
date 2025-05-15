
import React from 'react';

const Hero = () => {
  return (
    <section className="text-center col-span-full mt-20 mb-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-radial from-orange-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-gradient-radial from-red-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow"></div>
      
      <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
        Unlock Content. <span className="gradient-text">Instantly.</span>
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Pay as little as $0.05 to access premium content from creators worldwide.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <a 
          href="/signup?role=user" 
          className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition duration-300 shadow-lg shadow-orange-500/20"
        >
          Create Account as User
        </a>
        
        <a 
          href="/signup?role=creator" 
          className="rounded-full px-6 py-3 font-semibold text-white glass-morphism gradient-border hover:scale-105 transition duration-300"
        >
          Create Account as Creator
        </a>
      </div>
      
      {/* Subtle animation indicator */}
      <div className="mt-12 flex justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 bg-gradient-conic from-orange-500 to-red-500 rounded-full opacity-20 animate-spin-slow"></div>
          <div className="absolute inset-2 bg-[#0E0E10] rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
