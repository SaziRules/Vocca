'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';
import NotifyModal from './NotifyModal';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonHero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date('2026-02-01T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pr-20 md:pr-8 py-20 md:py-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN - Hero Content */}
        <div className="text-left pr-0 md:pr-8">
          {/* Main Heading */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase mb-4 md:mb-6 text-white leading-tight font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            Indulgence,
            <br />
            <span className="text-[#d4a574]">Perfected</span>
          </h1>

          {/* Brand Story */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-xl">
            This is chocolate without excess — refined, deliberate, and unmistakably luxurious. 
            VOCCA arrives soon, introducing South Africa to a new era of indulgence shaped by 
            mastery, patience, and purpose.
          </p>

          {/* CTA Buttons - Stack on mobile, inline on bigger screens */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-semibold transition-all transform hover:scale-105"
              style={{ 
                background: '#d4a574',
                color: '#1a1a1a'
              }}
            >
              Notify Me
            </button>
            
            <button 
              className="border-2 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-all"
              style={{ borderColor: '#d4a574' }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* DIVIDER - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-linear-to-b from-transparent via-[#d4a574]/30 to-transparent"></div>

        {/* RIGHT COLUMN - Countdown & Contact */}
        <div className="text-left pl-0 md:pl-8 mt-8 md:mt-0">
          {/* Countdown Timer */}
          <div className="mb-6 md:mb-10 lg:mb-12">
            <div 
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-5 lg:mb-6"
              style={{ color: '#d4a574' }}
            >
              Launching In
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-3 lg:gap-4">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-[#d4a574]/20 rounded-lg p-2 sm:p-3 md:p-4 lg:p-5 hover:border-[#d4a574]/40 transition-all"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-1">
                    {item.value}
                  </div>
                  <div 
                    className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider"
                    style={{ color: '#d4a574' }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-[#d4a574]/20 pt-4 md:pt-5 lg:pt-6">
            <div 
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 md:mb-4"
              style={{ color: '#d4a574' }}
            >
              Get In Touch
            </div>
            <div className="flex flex-col gap-2 md:gap-3 text-white/80">
              <a 
                href="mailto:info@vocca.co.za" 
                className="flex items-center gap-2 hover:text-[#d4a574] transition-colors"
              >
                <Mail size={14} className="sm:w-4 sm:h-4" />
                <span className="text-[11px] sm:text-xs md:text-sm">hoosen@vocca.co.za</span>
              </a>
              <a 
                href="tel:+27123456789" 
                className="flex items-center gap-2 hover:text-[#d4a574] transition-colors"
              >
                <Phone size={14} className="sm:w-4 sm:h-4" />
                <span className="text-[11px] sm:text-xs md:text-sm">+27 80 786 1314</span>
              </a>
              <a 
                href="https://instagram.com/vocca.sa" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#d4a574] transition-colors"
              >
                <Instagram size={14} className="sm:w-4 sm:h-4" />
                <span className="text-[11px] sm:text-xs md:text-sm">@vocca.sa</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Notify Modal */}
      <NotifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}