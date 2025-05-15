
import React from 'react';
import ContentCard from './ContentCard';

// Sample content data
const sampleContent = [
  {
    id: 1,
    title: "Advanced Trading Strategies",
    description: "Learn how to analyze market trends and make profitable trades with advanced techniques.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    price: { usd: 0.25, xlm: 1.2 }
  },
  {
    id: 2,
    title: "Web3 Development Course",
    description: "Comprehensive course on building decentralized applications on Ethereum and Stellar.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
    price: { usd: 0.50, xlm: 2.4 }
  },
  {
    id: 3,
    title: "Exclusive Crypto Research Report",
    description: "In-depth analysis of emerging cryptocurrencies with growth potential for 2023.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyeXB0b3xlbnwwfHwwfHx8MA%3D%3D",
    price: { usd: 0.15, xlm: 0.7 }
  },
  {
    id: 4,
    title: "DeFi Yield Farming Guide",
    description: "Maximize your returns in DeFi platforms with this comprehensive yield farming strategy guide.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGRlZml8ZW58MHx8MHx8fDA%3D",
    price: { usd: 0.35, xlm: 1.7 }
  },
  {
    id: 5,
    title: "NFT Creation Workshop",
    description: "Learn to create, mint and sell your digital art as NFTs on popular marketplaces.",
    image: "https://images.unsplash.com/photo-1634986666676-ec9f8ec64e8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmZ0fGVufDB8fDB8fHww",
    price: { usd: 0.45, xlm: 2.2 }
  },
  {
    id: 6,
    title: "Crypto Tax Guide 2025",
    description: "Navigate cryptocurrency taxation with expert advice and strategies to minimize your tax burden.",
    image: "https://images.unsplash.com/photo-1586486855514-8c359dbd46e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGF4fGVufDB8fDB8fHww",
    price: { usd: 0.30, xlm: 1.5 }
  }
];

const ContentGrid = () => {
  return (
    <section className="col-span-full mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Featured Content</h2>
        <a href="#" className="text-orange-400 hover:text-orange-300 transition text-sm">View All</a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleContent.map((content) => (
          <ContentCard 
            key={content.id}
            title={content.title}
            description={content.description}
            image={content.image}
            price={content.price}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
