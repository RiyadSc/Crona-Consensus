import React, { useState, useRef, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

// Navbar
const Navbar = () => (
  <nav className="sticky top-4 w-full flex justify-center z-20">
    <div className="flex justify-center items-center gap-x-5 px-[0.85rem] py-[0.85rem] rounded-xl backdrop-blur-md bg-white/10 w-full max-w-[560px] mx-auto">
      {/* Nav items */}
      <div className="flex flex-row items-center gap-x-0">
        {/* Home */}
        <a href="#hero" className="relative h-[34px] min-w-[85px] overflow-hidden group flex items-center justify-center whitespace-nowrap px-5 text-center font-manrope font-normal text-white" style={{ fontSize: '13.6px', lineHeight: '17.7px', scrollBehavior: 'smooth' }}>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-full">Home</span>
          <span className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 group-hover:translate-y-0">Home</span>
        </a>
        <div className="border-l border-neutral-700 mx-2 h-8" />
        {/* Features */}
        <a href="#features" className="relative h-[34px] min-w-[85px] overflow-hidden group flex items-center justify-center whitespace-nowrap px-5 text-center font-manrope font-normal text-neutral-500" style={{ fontSize: '13.6px', lineHeight: '17.7px', scrollBehavior: 'smooth' }}>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-full">Features</span>
          <span className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 group-hover:translate-y-0">Features</span>
        </a>
        <div className="border-l border-neutral-700 mx-2 h-8" />
        {/* How It Works */}
        <a href="#how-it-works" className="relative h-[34px] min-w-[85px] overflow-hidden group flex items-center justify-center whitespace-nowrap px-5 text-center font-manrope font-normal text-white" style={{ fontSize: '13.6px', lineHeight: '17.7px', scrollBehavior: 'smooth' }}>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-full">How It Works</span>
          <span className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 group-hover:translate-y-0">How It Works</span>
        </a>
        <div className="border-l border-neutral-700 mx-2 h-8" />
        {/* Testimonials */}
        <a href="#testimonials" className="relative h-[34px] min-w-[85px] overflow-hidden group flex items-center justify-center whitespace-nowrap px-5 text-center font-manrope font-normal text-white" style={{ fontSize: '13.6px', lineHeight: '17.7px', scrollBehavior: 'smooth' }}>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-full">Testimonials</span>
          <span className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 group-hover:translate-y-0">Testimonials</span>
        </a>
        <div className="border-l border-neutral-700 mx-2 h-8" />
        {/* Get Early Access */}
        <div className="relative h-[34px] min-w-[140px] overflow-hidden group flex items-center justify-center whitespace-nowrap px-5 text-center font-manrope font-normal text-white rounded-full bg-[#4B4B4B] nav-link" style={{ fontSize: '13.6px', lineHeight: '17.7px', cursor: 'pointer' }} onClick={() => window.open('https://clocka.framer.ai/', '_blank')}>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-full">Get Early Access</span>
          <span className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 group-hover:translate-y-0">Get Early Access</span>
        </div>
      </div>
    </div>
  </nav>
);

// Hero Section
const HeroSection = ({ heroRef, className = "" }) => {
  // Passkey registration handler
  async function handlePasskeyRegistration() {
    try {
      // 1. Get registration options from backend
      const resp = await fetch('/api/auth/webauthn/register-options', { method: 'POST' });
      if (!resp.ok) throw new Error('Failed to get registration options');
      const options = await resp.json();

      // 2. Start WebAuthn registration
      const attResp = await startRegistration(options);

      // 3. Send attestation to backend for verification
      const verifyResp = await fetch('/api/auth/webauthn/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp),
      });
      if (!verifyResp.ok) throw new Error('Registration verification failed');
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed: ' + (err?.message || err));
    }
  }

  // Passkey sign-in handler
  async function handlePasskeySignin() {
    try {
      // 1. Get authentication options from backend
      const resp = await fetch('/api/auth/webauthn/authenticate-options', { method: 'POST' });
      if (!resp.ok) throw new Error('Failed to get authentication options');
      const options = await resp.json();

      // 2. Start WebAuthn authentication
      const assertionResp = await startAuthentication(options);

      // 3. Send assertion to backend for verification
      const verifyResp = await fetch('/api/auth/webauthn/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assertionResp),
      });
      if (!verifyResp.ok) throw new Error('Authentication verification failed');
      alert('Sign-in successful!');
    } catch (err) {
      alert('Sign-in failed: ' + (err?.message || err));
    }
  }

  return (
    <section ref={heroRef} className={`text-center px-4 relative overflow-hidden pt-56 pb-40 ${className}`} style={{ background: 'none' }}>
      <div className="relative z-10">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Unlock Content. <span className="gradient-text">Instantly.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Pay as little as $0.05 to access premium content from creators worldwide.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button 
            type="button"
            onClick={handlePasskeyRegistration}
            className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-400 hover:scale-105 transition duration-300 shadow-lg shadow-green-500/20 mb-2 sm:mb-0"
          >
            Register with Passkey
          </button>
          <button 
            type="button"
            onClick={handlePasskeySignin}
            className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition duration-300 shadow-lg shadow-orange-500/20"
          >
            Sign in with Passkey
          </button>
          <a 
            href="/signup?role=creator" 
            className="rounded-full px-6 py-3 font-semibold text-white glass-morphism gradient-border hover:scale-105 transition duration-300"
          >
            Sign in as Creator
          </a>
        </div>
      </div>
    </section>
  );
};

// Browse by Category Section
const CategoriesSection = ({ className = "" }) => {
  const categories = [
    { name: "Web3 Development", icon: "👨‍💻", count: 156 },
    { name: "Crypto Research", icon: "📊", count: 89 },
    { name: "NFT Guides", icon: "🖼️", count: 127 },
    { name: "DeFi Strategies", icon: "💰", count: 73 },
    { name: "Trading Advice", icon: "📈", count: 204 },
  ];
  return (
    <section className={`mb-20 ${className}`}>
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

// Featured Content Section
const FeaturedContentSection = ({ className = "" }) => {
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
  const ContentCard = ({ title, description, image, price }) => {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('xlm');
    return (
      <>
        <div className="rounded-2xl glass-morphism p-4 card-glow hover:shadow-xl hover:scale-[1.01] transition duration-300 cursor-pointer">
          <div className="relative mb-4 overflow-hidden rounded-xl aspect-video bg-black">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-diagonal from-orange-400/30 to-red-500/30"></div>
          </div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
          <p className="text-xs text-orange-300 mt-2">
            Price: ${price.usd.toFixed(2)} / {price.xlm.toFixed(1)} XLM
          </p>
          <button 
            onClick={() => setPaymentModalOpen(true)}
            className="w-full mt-4 py-2 text-sm rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:scale-[1.02] transition duration-300"
          >
            Pay to Unlock
          </button>
        </div>
        {paymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="glass-morphism border-white/10 bg-[#1A1A1D] text-white max-w-md w-full p-6 rounded-xl relative">
              <button className="absolute top-2 right-2 text-white text-xl" onClick={() => setPaymentModalOpen(false)}>&#10005;</button>
              <div className="text-xl font-bold mb-4">Confirm Purchase</div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-lg font-bold gradient-text">
                    ${price.usd.toFixed(2)}
                  </p>
                </div>
                <div className="glass-morphism p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Select payment method:</p>
                  <div className="flex justify-center space-x-3 mt-4">
                    <button 
                      className={`px-4 py-2 rounded-full transition ${paymentMethod === 'xlm' ? 
                        'bg-white/20 text-white font-medium' : 
                        'bg-white/5 text-gray-400'}`}
                      onClick={() => setPaymentMethod('xlm')}
                    >
                      XLM ({price.xlm.toFixed(1)})
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-full transition ${paymentMethod === 'card' ? 
                        'bg-white/20 text-white font-medium' : 
                        'bg-white/5 text-gray-400'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      Card (${price.usd.toFixed(2)})
                    </button>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg px-4 py-2 mt-6 w-full hover:opacity-90 transition">
                  Confirm Payment
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  Your payment is secure and processed via the Stellar network.
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <section className={`mb-16 ${className}`}>
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

// For Creators Section
const CreatorCTASection = ({ className = "" }) => {
  return (
    <section className={`mb-20 ${className}`}>
      <div className="glass-morphism rounded-2xl p-8 relative overflow-hidden">
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

// Footer
const Footer = () => {
  return (
    <footer className="col-span-full pt-10 pb-6 border-t border-white/10 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">StellarPay</h3>
          <p className="text-gray-400 text-sm">
            Micropayments platform powered by Stellar blockchain.
            Instantly unlock premium content with minimal fees.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">For Users</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Browse Content</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">My Library</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">XLM Wallet</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Payment History</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">For Creators</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Upload Content</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Analytics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Payouts</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Creator Guidelines</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Careers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2025 StellarPay. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Terms</a>
          <a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-orange-300 transition text-sm">Help</a>
        </div>
      </div>
    </footer>
  );
};

// Main LandingPage
const LandingPage = () => {
  const heroRef = useRef(null);
  const [heroHeight, setHeroHeight] = useState(0);
  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.offsetHeight);
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#0E0E10] flex flex-col relative overflow-x-hidden">
      {/* Full-width background image only for hero section */}
      <div
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: heroHeight ? `${heroHeight}px` : '0',
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'height 0.2s',
        }}
        aria-hidden="true"
      />
      <Navbar />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto w-full px-4 relative z-10">
        <HeroSection heroRef={heroRef} className="md:col-span-12" />
        <CategoriesSection className="md:col-span-12" />
        <FeaturedContentSection className="md:col-span-12" />
        <CreatorCTASection className="md:col-span-12" />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 