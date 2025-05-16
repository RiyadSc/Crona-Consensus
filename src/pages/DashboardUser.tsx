import React, { useState } from 'react';
import { LogOut, Wallet, Coins, CreditCard, Download, Upload, BookOpen, Play, Copy } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useWallet } from "@/lib/WalletProvider";

// Utility function to conditionally join class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Types
interface PurchaseItem {
  id: string;
  title: string;
  type: "Video" | "Article" | "Module";
  timestamp: string;
  thumbnail: string;
  link: string;
}

interface PaymentItem {
  id: string;
  date: string;
  amount: number;
  method: "XLM" | "Card";
  contentTitle: string;
  contentLink: string;
}

interface DashboardProps {
  userName?: string;
  walletBalance?: number;
  purchases?: PurchaseItem[];
  paymentHistory?: PaymentItem[];
}

// Sample data
const samplePurchases: PurchaseItem[] = [
  {
    id: "1",
    title: "Introduction to Stellar Blockchain",
    type: "Video",
    timestamp: "May 14, 2025",
    thumbnail: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=3276&auto=format&fit=crop",
    link: "/content/1",
  },
  {
    id: "2",
    title: "Advanced Trading Strategies",
    type: "Article",
    timestamp: "May 12, 2025",
    thumbnail: "https://images.unsplash.com/photo-1642790551116-18e150f248dd?q=80&w=3432&auto=format&fit=crop",
    link: "/content/2",
  },
  {
    id: "3",
    title: "Crypto Wallet Security",
    type: "Module",
    timestamp: "May 10, 2025",
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=3276&auto=format&fit=crop",
    link: "/content/3",
  },
  {
    id: "4",
    title: "Future of Digital Payments",
    type: "Video",
    timestamp: "May 5, 2025",
    thumbnail: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=3474&auto=format&fit=crop",
    link: "/content/4",
  }
];

const samplePaymentHistory: PaymentItem[] = [
  {
    id: "1",
    date: "May 14, 2025, 10:32 AM",
    amount: 5.75,
    method: "XLM",
    contentTitle: "Introduction to Stellar Blockchain",
    contentLink: "/content/1",
  },
  {
    id: "2",
    date: "May 12, 2025, 3:45 PM",
    amount: 8.25,
    method: "Card",
    contentTitle: "Advanced Trading Strategies",
    contentLink: "/content/2",
  },
  {
    id: "3",
    date: "May 10, 2025, 11:20 AM",
    amount: 12.50,
    method: "XLM",
    contentTitle: "Crypto Wallet Security",
    contentLink: "/content/3",
  },
  {
    id: "4",
    date: "May 5, 2025, 9:15 AM",
    amount: 6.75,
    method: "XLM",
    contentTitle: "Future of Digital Payments",
    contentLink: "/content/4",
  },
];

// Navigation Component
const Navigation: React.FC<{ userName: string; walletBalance: number }> = ({ 
  userName = "User", 
  walletBalance = 12.5 
}) => {
  // Would typically come from authentication context
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const formattedBalance = walletBalance.toFixed(2);
  
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-[#111] border-b border-[#FF6B00]/40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-stellarorange animate-pulse-glow flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-[#FF6B00] font-medium hidden sm:inline-block">
              StellarPay
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-white">
            <Coins className="h-4 w-4 text-stellarorange" />
            <span className="text-sm font-medium">
              Balance: {formattedBalance} XLM
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="relative h-9 w-9 rounded-full border border-stellarorange flex items-center justify-center overflow-hidden"
              aria-label={userName}
            >
              <span className="text-sm text-white font-medium">{initials}</span>
            </button>
            
            <button 
              className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5 text-white hover:text-stellarorange transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white">
            <Coins className="h-4 w-4 text-stellarorange" />
            <span className="text-sm font-medium">
              {formattedBalance} XLM
            </span>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative h-8 w-8 rounded-full border border-stellarorange flex items-center justify-center"
          >
            <span className="text-sm text-white font-medium">{initials}</span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-zinc-900 border-b border-zinc-800 transition-all duration-200 ease-in-out",
        mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 transition-colors">
            <Wallet className="h-5 w-5 text-stellarorange" />
            <span className="text-white text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 transition-colors">
            <LogOut className="h-5 w-5 text-stellarorange" />
            <span className="text-white text-sm font-medium">Log Out</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Wallet Card Component
const WalletCard: React.FC<{ balance: number }> = ({ balance = 12.5 }) => {
  const wallet = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (wallet.stellarPublicKey) {
      navigator.clipboard.writeText(wallet.stellarPublicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="rounded-xl shadow-lg bg-[#111] border border-[#FF6B00]/40 p-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-stellarorange/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <Wallet className="h-6 w-6 text-stellarorange" />
          <h2 className="text-lg font-medium text-white">Wallet Balance</h2>
        </div>
        
        {/* Wallet Address Display */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-mono text-white bg-[#181818] px-2 py-1 rounded">
            {wallet.stellarPublicKey
              ? `${wallet.stellarPublicKey.slice(0, 6)}...${wallet.stellarPublicKey.slice(-4)}`
              : "No wallet address"}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-[#222] transition"
            title="Copy address"
          >
            <Copy className="w-4 h-4 text-[#FF6B00]" />
          </button>
          {copied && (
            <span className="text-xs text-[#FF6B00] ml-2">Copied!</span>
          )}
        </div>
        
        <div className="mt-2">
          <p className="text-4xl font-bold text-[#FF6B00]">
            {balance.toFixed(2)} <span className="text-xl">XLM</span>
          </p>
          <p className="text-sm text-white/70 mt-1">
            ≈ ${(balance * 5.34).toFixed(2)} USD
          </p>
        </div>
        
        <div className="flex gap-3 mt-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span>Fund Wallet</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-stellarorange" />
                  Fund Your Wallet
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-400">Choose a funding method:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="border border-zinc-700 hover:border-stellarorange p-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
                          <path d="M7 10H17L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7 14H17L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Stellar Transfer</span>
                      </button>
                      <button className="border border-zinc-700 hover:border-stellarorange p-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>Credit Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            className="border-[#FF6B00] text-white hover:bg-[#222]"
          >
            <Download className="h-4 w-4" />
            <span>Withdraw</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Purchase Card Component
const PurchaseCard: React.FC<PurchaseItem> = ({ title, type, timestamp, thumbnail, link }) => {
  const TypeIcon = type === "Video" ? Play : BookOpen;
  
  return (
    <div className="bg-[#111] rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-200 hover:ring-2 hover:ring-[#FF6B00] group">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Thumbnail */}
        <div 
          className="w-full sm:w-24 h-32 sm:h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r"></div>
          <div className="absolute bottom-2 left-2 sm:top-2 text-xs font-medium px-2 py-1 rounded-full bg-black/60 text-white flex items-center gap-1">
            <TypeIcon className="h-3 w-3 text-[#FF6B00]" />
            <span className="text-[#FF6B00]">{type}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-semibold text-white group-hover:text-[#FF6B00] transition-colors duration-200">
              {title}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Unlocked {timestamp}
            </p>
          </div>
          
          <div className="mt-3">
            <Button 
              asChild
              variant="link" 
              className="text-[#FF6B00] hover:text-[#FF6B00]/80 p-0 h-auto font-bold flex items-center gap-1 text-sm"
            >
              <a href={link}>
                <span>Open</span>
                <svg 
                  className="h-3 w-3 transform transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment History Component
const PaymentHistory: React.FC<{ payments: PaymentItem[] }> = ({ payments }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full bg-[#111] rounded-xl border border-[#FF6B00]/40 overflow-hidden"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#FF6B00]"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          </div>
          <h2 className="font-medium text-white">Payment History</h2>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "h-5 w-5 text-white transition-transform",
            isOpen ? "rotate-180 transform" : ""
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <div className="p-4 border-t border-zinc-800">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-[#FF6B00]">Recent Transactions</div>
            
            <div className="hidden md:grid grid-cols-4 gap-4 py-2 text-xs uppercase tracking-wide text-orange-400">
              <div>Date & Time</div>
              <div>Amount</div>
              <div>Method</div>
              <div>Content</div>
            </div>

            {payments.map((payment) => (
              <div key={payment.id} className="group">
                {/* Mobile View */}
                <div className="md:hidden bg-zinc-800/50 rounded-lg p-3 mb-2 group-hover:bg-zinc-800 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-zinc-300">{payment.date}</div>
                    <div className="font-medium text-white">{payment.amount.toFixed(2)} XLM</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {payment.method === "XLM" ? (
                        <Coins className="h-3 w-3 text-stellarorange" />
                      ) : (
                        <CreditCard className="h-3 w-3 text-stellarorange" />
                      )}
                      <span className="text-xs text-zinc-400">{payment.method}</span>
                    </div>
                    <a href={payment.contentLink} className="text-xs text-stellarorange hover:underline">
                      {payment.contentTitle}
                    </a>
                  </div>
                </div>
                
                {/* Desktop View */}
                <div 
                  className="hidden md:grid grid-cols-4 gap-4 py-3 border-b border-zinc-800 group-hover:bg-zinc-800/50 rounded-md px-2 transition-colors"
                >
                  <div className="text-sm text-zinc-300">{payment.date}</div>
                  <div className="font-medium text-white">{payment.amount.toFixed(2)} XLM</div>
                  <div className="flex items-center gap-1.5">
                    {payment.method === "XLM" ? (
                      <Coins className="h-4 w-4 text-stellarorange" />
                    ) : (
                      <CreditCard className="h-4 w-4 text-stellarorange" />
                    )}
                    <span className="text-sm text-zinc-300">{payment.method}</span>
                  </div>
                  <a href={payment.contentLink} className="text-sm text-stellarorange hover:underline truncate">
                    {payment.contentTitle}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Main Dashboard Component
export const StellarPayDashboard: React.FC<DashboardProps> = ({ 
  userName = "Alex Johnson",
  walletBalance = 12.5,
  purchases = samplePurchases,
  paymentHistory = samplePaymentHistory
}) => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation userName={userName} walletBalance={walletBalance} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-24 pb-16">
        <div className="flex flex-col gap-8">
          {/* Wallet Section */}
          <section>
            <WalletCard balance={walletBalance} />
          </section>
          
          {/* Purchases Section */}
          <section className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Your Purchases</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchases.map((purchase) => (
                <PurchaseCard key={purchase.id} {...purchase} />
              ))}
            </div>
          </section>
          
          {/* Payment History Section */}
          <section className="mt-6">
            <PaymentHistory payments={paymentHistory} />
          </section>
        </div>
      </main>
    </div>
  );
};

// CSS Variables (to be added to your CSS)
const cssVariables = `
:root {
  --stellarorange: #FF6B00;
  --stellarorange-300: #FF9240;
  --stellarorange-400: #FF8626;
  --stellarorange-500: #FF6B00;
  --stellarorange-600: #E55F00;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.5);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 15px 5px rgba(255, 107, 0, 0.7);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 3s infinite;
}
`;

export default StellarPayDashboard;