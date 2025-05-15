
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ContentCardProps = {
  title: string;
  description: string;
  image: string;
  price: {
    usd: number;
    xlm: number;
  };
};

const ContentCard = ({ title, description, image, price }: ContentCardProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'xlm' | 'card'>('xlm');
  
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
            
            <Button className="bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg px-4 py-2 mt-6 w-full hover:opacity-90 transition">
              Confirm Payment
            </Button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Your payment is secure and processed via the Stellar network.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentCard;
