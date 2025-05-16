import React, { useState } from 'react';
import { X, Menu } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { useWallet } from '../lib/WalletProvider';
import { Link } from "react-router-dom";

// Utility function
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Dialog components
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Navbar
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wallet = useWallet();
  return (
    <div className="w-full flex justify-between items-center py-4 px-6 bg-[#0E0E10]/80 fixed top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center">
        <a href="/" className="text-white font-extrabold text-2xl tracking-tight gradient-text">
          StellarPay
        </a>
      </div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLinks />
        {wallet.isConnected ? (
          <Button className="rounded-full px-6 py-5 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition h-9" onClick={wallet.logout}>
            Logout
          </Button>
        ) : (
          <Button className="rounded-full px-6 py-5 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition h-9" onClick={wallet.connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass-morphism md:hidden py-4 px-6">
          <div className="flex flex-col space-y-4">
            <NavLinks mobile />
            {wallet.isConnected ? (
              <Button className="rounded-full px-6 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition" onClick={wallet.logout}>
                Logout
              </Button>
            ) : (
              <Button className="rounded-full px-6 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition" onClick={wallet.connectWallet}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const linkClass = mobile 
    ? "text-white hover:text-orange-300 transition py-2" 
    : "text-white hover:text-orange-300 transition";
  return (
    <>
      <Link to="/browse" className={linkClass}>Browse</Link>
      <a href="#" className={linkClass}>My Dashboard</a>
      <a href="#" className={linkClass}>Upload</a>
    </>
  );
};

// Hero
const Hero = () => {
  const wallet = useWallet();
  return (
    <section className="text-center col-span-full mt-32 mb-12 px-4 relative overflow-hidden">
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
        {!wallet.isConnected ? (
          <>
            <Button className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition duration-300 shadow-lg shadow-orange-500/20" onClick={wallet.createWallet}>
              Create Wallet
            </Button>
            <Button className="rounded-full px-6 py-3 font-semibold text-white glass-morphism gradient-border hover:scale-105 transition duration-300" onClick={wallet.connectWallet}>
              Connect Wallet
            </Button>
          </>
        ) : (
          <Button className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition duration-300 shadow-lg shadow-orange-500/20" onClick={wallet.logout}>
            Logout
          </Button>
        )}
      </div>
    </section>
  );
};

// CategoriesSection
const categories = [
  { name: "Web3 Development", icon: "👨‍💻", count: 156 },
  { name: "Crypto Research", icon: "📊", count: 89 },
  { name: "NFT Guides", icon: "🖼️", count: 127 },
  { name: "DeFi Strategies", icon: "💰", count: 73 },
  { name: "Trading Advice", icon: "📈", count: 204 },
];
const CategoriesSection = () => (
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

// ContentCard
const ContentCard = ({ title, description, image, price }: {
  title: string;
  description: string;
  image: string;
  price: { usd: number; xlm: number };
}) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'xlm' | 'card'>('xlm');
  const wallet = useWallet();
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
          disabled={!wallet.isConnected}
        >
          Pay to Unlock
        </button>
      </div>
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="glass-morphism border-white/10 bg-[#1A1A1D] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Purchase</DialogTitle>
          </DialogHeader>
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
            <Button className="bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg px-4 py-2 mt-6 w-full hover:opacity-90 transition" disabled={!wallet.isConnected}>
              Confirm Payment
            </Button>
            {!wallet.isConnected && (
              <p className="text-xs text-center text-red-400 mt-2">Connect your wallet to unlock content.</p>
            )}
            <p className="text-xs text-center text-gray-400 mt-4">
              Your payment is secure and processed via the Stellar network.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// ContentGrid
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
const ContentGrid = () => (
  <section className="col-span-full mb-16">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-white">Featured Content</h2>
      <a href="#" className="text-orange-400 hover:text-orange-300 transition text-sm">View All</a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleContent.map((content) => (
        <div key={content.id}>
          <ContentCard 
            title={content.title}
            description={content.description}
            image={content.image}
            price={content.price}
          />
        </div>
      ))}
    </div>
  </section>
);

// CreatorCTA
const CreatorCTA = () => (
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

// Footer
const Footer = () => (
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

// Main Landingpage export
const Landingpage = () => (
  <div className="min-h-screen bg-[#0E0E10] flex flex-col">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 grid grid-cols-1">
      <Hero />
      <CategoriesSection />
      <ContentGrid />
      <CreatorCTA />
    </main>
    <Footer />
  </div>
);

export default Landingpage; 