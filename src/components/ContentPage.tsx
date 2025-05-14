/*
  ContentPage.tsx
  ----------------
  This file merges several UI components for content unlock/paywall flows.

  Required dependencies:
    - react
    - react-router-dom
    - lucide-react
    - Tailwind CSS (for styles)

  Utility:
    - The `cn` function is a className joiner. Replace with your own or use the one below.
*/

import React from "react";
import { Share2, Bookmark, Heart, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
// Replace this with your own cn utility or a library like clsx
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// TopBar Component
interface TopBarProps {
  className?: string;
}
const TopBar = ({ className }: TopBarProps) => (
  <div className={cn("flex items-center justify-between py-4", className)}>
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Browse</span>
    </Link>
    <div className="flex items-center space-x-4">
      <button className="text-sm text-gray-300 hover:text-white transition-colors">
        Sign In
      </button>
      <button className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-sm font-medium text-white">
        Connect Wallet
      </button>
    </div>
  </div>
);

// ContentMeta Component
interface ContentMetaProps {
  creator: string;
  rating?: number;
  views?: number;
}
const ContentMeta = ({ creator, rating, views }: ContentMetaProps) => (
  <div className="flex justify-between items-center text-sm text-gray-500 mt-4 border-t border-white/10 pt-3">
    <span>By @{creator}</span>
    {(rating || views) && (
      <span>
        {rating && `${rating} ★`} {views && rating && "| "} {views && `${views} views`}
      </span>
    )}
  </div>
);

// LockedContent Component
interface LockedContentProps {
  thumbnailUrl: string;
  price: string;
  cryptoPrice: string;
  onUnlock: () => void;
}
const LockedContent = ({ thumbnailUrl, price, cryptoPrice, onUnlock }: LockedContentProps) => (
  <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl backdrop-blur-md">
    <img
      src={thumbnailUrl}
      alt="Content preview"
      className="aspect-video object-cover w-full"
    />
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col justify-center items-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-sm mb-4 shadow-[0_0_15px_rgba(249,115,22,0.5)]">
        <Lock className="w-8 h-8 text-white" />
      </div>
      <p className="text-lg text-white font-semibold">
        Unlock for {price} / {cryptoPrice}
      </p>
      <button 
        onClick={onUnlock}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
      >
        Pay to Unlock
      </button>
    </div>
  </div>
);

// UnlockedContent Component
interface UnlockedContentProps {
  thumbnailUrl: string;
  content: string;
}
const UnlockedContent = ({ thumbnailUrl, content }: UnlockedContentProps) => (
  <div className="flex flex-col space-y-6">
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl relative">
      <img
        src={thumbnailUrl}
        alt="Content"
        className="aspect-video object-cover w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
    <div className="prose prose-invert max-w-none p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>
);

// BottomCTA Component
interface BottomCTAProps {
  isUnlocked: boolean;
  price?: string;
  cryptoPrice?: string;
  onUnlock?: () => void;
  className?: string;
}
const BottomCTA = ({ isUnlocked, price, cryptoPrice, onUnlock, className }: BottomCTAProps) => (
  <div className={cn("fixed bottom-0 left-0 w-full bg-[#0E0E10]/90 backdrop-blur-md border-t border-white/10 py-3 px-4 flex justify-between items-center z-50", className)}>
    {isUnlocked ? (
      <>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bookmark className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Heart className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="text-white font-semibold">
          {price} / {cryptoPrice}
        </div>
        <button 
          onClick={onUnlock}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full font-medium transition-all"
        >
          Pay to Unlock
        </button>
      </>
    )}
  </div>
);

// Example ContentPage wrapper for demonstration
const ContentPage = () => {
  // Example state for demonstration
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const fakeContent = "<h2>Unlocked Content</h2><p>This is the unlocked content body.</p>";
  return (
    <div className="min-h-screen bg-[#0E0E10] text-white pb-24">
      <TopBar />
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <img src="https://placehold.co/600x338" alt="Thumbnail" className="rounded-2xl w-full aspect-video object-cover mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sample Content Title</h1>
        <ContentMeta creator="creatorname" rating={4.8} views={1234} />
        <div className="mt-6">
          {isUnlocked ? (
            <UnlockedContent thumbnailUrl="https://placehold.co/600x338" content={fakeContent} />
          ) : (
            <LockedContent 
              thumbnailUrl="https://placehold.co/600x338" 
              price="$5.00" 
              cryptoPrice="0.002 ETH" 
              onUnlock={() => setIsUnlocked(true)} 
            />
          )}
        </div>
      </div>
      <BottomCTA 
        isUnlocked={isUnlocked} 
        price="$5.00" 
        cryptoPrice="0.002 ETH" 
        onUnlock={() => setIsUnlocked(true)} 
      />
    </div>
  );
};

export default ContentPage;
export { TopBar, ContentMeta, LockedContent, UnlockedContent, BottomCTA }; 