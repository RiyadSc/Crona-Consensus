
import React from 'react';

const categories = [
  { name: "Web3 Development", icon: "👨‍💻", count: 156 },
  { name: "Crypto Research", icon: "📊", count: 89 },
  { name: "NFT Guides", icon: "🖼️", count: 127 },
  { name: "DeFi Strategies", icon: "💰", count: 73 },
  { name: "Trading Advice", icon: "📈", count: 204 },
];

const CategoriesSection = () => {
  return (
    <section className="col-span-full mb-20">
      <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div 
            key={category.name}
            className="glass-morphism rounded-xl p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition cursor-pointer h-32"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <h3 className="text-white font-medium text-sm mb-1">{category.name}</h3>
            <p className="text-gray-400 text-xs">{category.count} items</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
