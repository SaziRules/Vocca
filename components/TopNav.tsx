'use client';

import { Search, User, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-16 z-40 bg-(--background)/25 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 md:py-10 pr-12 px-6">
        {/* Logo */}
        <div className="flex-1">
          <Image 
            src="/images/logo.png" 
            alt="Vocca" 
            width={150} 
            height={30}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>

        {/* Right Nav Items */}
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <User size={18} />
            <span className="hidden md:inline text-xs uppercase tracking-widest">Account</span>
          </button>

          <button className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <ShoppingBag size={18} />
            <span className="hidden md:inline text-xs uppercase tracking-widest">Cart (0)</span>
          </button>

          <button className="hover:text-gray-300 transition-colors">
            <Search size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}