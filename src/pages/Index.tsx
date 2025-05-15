
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ContentGrid from '@/components/ContentGrid';
import CategoriesSection from '@/components/CategoriesSection';
import CreatorCTA from '@/components/CreatorCTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-10 py-10">
          <Hero />
          <ContentGrid />
          <CategoriesSection />
          <CreatorCTA />
        </div>
      </main>
      
      <div className="container mx-auto px-4 md:px-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
