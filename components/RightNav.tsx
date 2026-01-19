'use client';

import { Youtube, Twitter, Instagram, Menu } from 'lucide-react';

export default function RightNav() {
  return (
    <div className="fixed right-0 top-0 h-screen w-16 z-50 bg-[#3a3a3a]/30 backdrop-blur-md border-l border-white/10 flex flex-col items-center justify-between py-6 md:px-10">
      {/* Hamburger Menu at Top */}
      <button 
        className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>
      
      {/* Social Icons at Bottom */}
      <div className="flex flex-col gap-4">
        <button 
          className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </button>
        
        <button 
          className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Twitter"
        >
          <Twitter size={20} />
        </button>
        
        <button 
          className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </button>
      </div>
    </div>
  );
}