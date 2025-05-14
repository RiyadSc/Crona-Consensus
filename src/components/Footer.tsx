
import React from 'react';

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

export default Footer;
