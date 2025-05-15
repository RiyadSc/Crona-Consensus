
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        <Button className="rounded-full px-6 py-5 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition h-9">
          Sign In
        </Button>
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
            <Button className="rounded-full px-6 py-2 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition">
              Sign In
            </Button>
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
      <a href="#" className={linkClass}>Browse</a>
      <a href="#" className={linkClass}>My Dashboard</a>
      <a href="#" className={linkClass}>Upload</a>
    </>
  );
};

export default Navbar;
