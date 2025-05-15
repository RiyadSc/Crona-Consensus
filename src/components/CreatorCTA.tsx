
import React from 'react';

const CreatorCTA = () => {
  return (
    <section className="col-span-full mb-20">
      <div className="glass-morphism rounded-2xl p-8 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-radial from-orange-500/20 to-transparent rounded-full filter blur-3xl"></div>
        
        <div className="max-w-2xl relative z-10">
          <span className="inline-block glass-morphism px-3 py-1 rounded-full text-xs text-orange-300 mb-4">
            For Creators
          </span>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your Knowledge.<br />
            <span className="gradient-text">Earn Instantly.</span>
          </h2>
          
          <p className="text-gray-400 mb-6">
            Upload premium content and get paid directly through the Stellar network.
            No waiting for monthly payouts or high transaction fees.
          </p>
          
          <a 
            href="/signup?role=creator" 
            className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition inline-block"
          >
            Start Creating
          </a>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;
