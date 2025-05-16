import React, { useState } from "react";
import { Check, Lock, ArrowLeft, Share2, Bookmark, Heart } from "lucide-react";

// Toast implementation
type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  id?: number;
};

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
}>({
  toast: () => {},
});

const useToast = () => {
  return React.useContext(ToastContext);
};

const Toast = ({ title, description }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg max-w-md animate-fade-in">
      <div className="flex items-start">
        <div>
          {title && <h3 className="font-semibold text-white">{title}</h3>}
          {description && <p className="text-gray-300 text-sm">{description}</p>}
        </div>
      </div>
    </div>
  );
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (props: ToastProps) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, i) => (
          <Toast key={i} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Component: TopBar
const TopBar = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-between py-4 ${className || ""}`}>
      <button 
      className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Browse</span>
      </button>
      
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
};

// Component: ContentMeta
const ContentMeta = ({ 
  creator, 
  rating, 
  views 
}: { 
  creator: string;
  rating: number; 
  views: number;
}) => {
  return (
  <div className="flex justify-between items-center text-sm text-gray-500 mt-4 border-t border-white/10 pt-3">
    <span>By @{creator}</span>
      <div className="flex items-center gap-2">
        <span>{rating} ★</span>
        <span>|</span>
        <span>{views} views</span>
      </div>
  </div>
);
};

// Component: UnlockedContent
const UnlockedContent = ({ 
  thumbnailUrl, 
  content 
}: { 
  thumbnailUrl: string; 
  content: string;
}) => {
  return (
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
};

// Component: LockedContent
const LockedContent = ({
  thumbnailUrl,
  price,
  cryptoPrice,
  onUnlock,
}: {
  thumbnailUrl: string;
  price: string;
  cryptoPrice: string;
  onUnlock: () => void;
}) => {
  return (
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
};

// Component: BottomCTA
const BottomCTA = ({
  isUnlocked,
  price,
  cryptoPrice,
  onUnlock,
  className,
}: {
  isUnlocked: boolean;
  price?: string;
  cryptoPrice?: string;
  onUnlock?: () => void;
  className?: string;
}) => {
  return (
    <div className={`fixed bottom-0 left-0 w-full bg-[#0E0E10]/90 backdrop-blur-md border-t border-white/10 py-3 px-4 flex justify-between items-center z-50 ${className || ""}`}>
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
};

// Sample course modules data
const courseModules = [
  {
    id: 1,
    title: "Lesson 1: Introduction to the Course",
    type: "video",
    price: "$0.25",
    cryptoPrice: "1.2 XLM",
    duration: "10:23",
    isUnlocked: false,
  },
  {
    id: 2,
    title: "Lesson 2: Core Concepts Overview",
    type: "article",
    price: "$0.25",
    cryptoPrice: "1.2 XLM",
    duration: "5 min read",
    isUnlocked: false,
  },
  {
    id: 3,
    title: "Lesson 3: Practical Applications",
    type: "video",
    price: "$0.35",
    cryptoPrice: "1.5 XLM",
    duration: "15:47",
    isUnlocked: false,
  },
  {
    id: 4,
    title: "Lesson 4: Advanced Techniques",
    type: "article",
    price: "$0.30",
    cryptoPrice: "1.3 XLM",
    duration: "8 min read",
    isUnlocked: false,
  },
  {
    id: 5,
    title: "Lesson 5: Case Studies",
    type: "video",
    price: "$0.40",
    cryptoPrice: "1.7 XLM",
    duration: "20:14",
    isUnlocked: false,
  },
  {
    id: 6,
    title: "Lesson 6: Project Setup",
    type: "article",
    price: "$0.20",
    cryptoPrice: "0.9 XLM",
    duration: "4 min read",
    isUnlocked: false,
  },
];

// Main ContentView Component
const ContentView = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(courseModules[0]);
  const [unlockedModules, setUnlockedModules] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<ToastProps | null>(null);

  const handleUnlock = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsUnlocked(true);
      setIsLoading(false);
      
      // Add the current module to unlocked modules
      setUnlockedModules(prev => [...prev, selectedModule.id]);
      
      setToastMessage({
        title: "Content Unlocked!",
        description: "Thank you for your purchase. Enjoy the content!",
      });

      // Hide toast after 3 seconds
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  const handleModuleSelect = (module: typeof courseModules[0]) => {
    setSelectedModule(module);
    setIsUnlocked(unlockedModules.includes(module.id));
  };

  const sampleContent = `
    <h2 class="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text mb-4">The Future of Digital Content</h2>
    <p>This is an example of premium content that has been unlocked. In a real application, this would be the full article, video, or other content that was behind the paywall.</p>
    <p class="my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
    <h3 class="text-lg font-bold mt-6 mb-3">Key Insights</h3>
    <ul class="list-disc list-inside mb-6">
      <li>First major point about the content</li>
      <li>Second insight with supporting details</li>
      <li>Third important element to consider</li>
    </ul>
    <p>Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.</p>
    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Demo content" class="w-full my-6 rounded-xl shadow-lg" />
    <p class="mt-4">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <blockquote class="border-l-4 border-orange-500 pl-4 my-6 italic">
      "This is a powerful quote from the content that deserves highlighting and special attention from readers."
    </blockquote>
    <p>Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
  `;

  // Component for scrollable area (simplified version)
  const ScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`overflow-auto ${className || ""}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E0E10] text-white">
      <div className="px-4 py-4 md:px-8 md:py-6">
      <TopBar />
        
        <h1 className="text-3xl font-bold text-white mt-6">Premium Content Title</h1>
        
        <div className="flex flex-col lg:flex-row mt-8 gap-6">
          {/* Left sidebar - Course modules */}
          <div className="w-full lg:w-1/4 bg-[#1A1A1D] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                Course Modules
              </h3>
            </div>
            
            <ScrollArea className="h-[500px]">
              <div className="p-2">
                {courseModules.map((module) => (
                  <div 
                    key={module.id} 
                    onClick={() => handleModuleSelect(module)}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 
                      ${selectedModule.id === module.id 
                        ? 'bg-white/10 border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]' 
                        : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">{module.title}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <span className="mr-2">{module.type === 'video' ? '📹' : '📄'}</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        {unlockedModules.includes(module.id) ? (
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check size={14} className="text-green-500" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Lock size={14} className="text-orange-500" />
                          </div>
                        )}
                        <span className="text-xs text-orange-400 mt-1">
                          {module.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Right panel - Content preview */}
          <div className="flex-1">
            {unlockedModules.includes(selectedModule.id) ? (
              <>
                <UnlockedContent 
                  thumbnailUrl="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  content={sampleContent}
                />
                <ContentMeta creator="CreatorName" rating={4.7} views={212} />
              </>
            ) : (
              <>
            <LockedContent 
                  thumbnailUrl="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  price={selectedModule.price}
                  cryptoPrice={selectedModule.cryptoPrice}
                  onUnlock={handleUnlock}
                />
                <p className="text-gray-400 text-base mt-4 line-clamp-3">
                  You've unlocked a sneak peek. Pay to continue reading the full content instantly.
                </p>
                <ContentMeta creator="CreatorName" rating={4.7} views={212} />
              </>
            )}
          </div>
        </div>
      </div>
      
      <BottomCTA 
        isUnlocked={unlockedModules.includes(selectedModule.id)} 
        price={selectedModule.price} 
        cryptoPrice={selectedModule.cryptoPrice}
        onUnlock={handleUnlock}
        className="lg:hidden" // Only show on mobile and tablets
      />

      {/* Toast message */}
      {toastMessage && <Toast {...toastMessage} />}
    </div>
  );
};

// Export the main component and all the necessary CSS styles
const ContentViewUnified = () => {
  return (
    <ContentView />
  );
};

// CSS styles that would typically be in index.css
const cssStyles = `
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Customize prose for dark theme */
.prose {
  @apply text-gray-300;
}

.prose h2, .prose h3, .prose h4 {
  @apply text-white mt-6 mb-4;
}

.prose p {
  @apply mb-4;
}

.prose img {
  @apply rounded-xl shadow-lg;
}

.prose ul {
  @apply my-4 list-disc list-inside;
}

.prose blockquote {
  @apply border-l-4 border-orange-500 pl-4 my-6 italic text-gray-300;
}

/* Custom course content styles */
.course-module {
  @apply transition-all duration-200;
}

.course-module:hover {
  @apply shadow-[0_0_8px_rgba(249,115,22,0.3)];
}

.course-module.active {
  @apply border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)];
}

.glassmorphism {
  @apply bg-white/5 border border-white/10 backdrop-blur-md rounded-xl;
}

.text-gradient {
  @apply bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text;
}

.neon-glow {
  text-shadow: 0 0 10px rgba(249,115,22,0.8);
}

.glow-border {
  box-shadow: 0 0 15px rgba(249,115,22,0.5);
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
`;

// The final exported component with comment about CSS styles
export default ContentViewUnified;

/*
  Note: To fully export this to another codebase, you'll need to:
  
  1. Install the required dependencies:
     - lucide-react (for icons)
     - tailwindcss (with appropriate configuration)
  
  2. Add the CSS styles from the cssStyles variable to your CSS file
     or include them via a styled-components or emotion approach
  
  3. Make sure tailwind.config.js includes the appropriate theme extensions
     for colors, animations, etc.
*/