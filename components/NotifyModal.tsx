'use client';

import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotifyModal({ isOpen, onClose }: NotifyModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! We\'ll notify you when we launch.');
        setTimeout(() => {
          onClose();
          setFormData({ name: '', email: '' });
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-9998 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#2b2b2b] border border-[#d4a574]/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 60px rgba(212, 165, 116, 0.3)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 
            className="text-3xl md:text-4xl mb-2 text-white font-bold"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            Get <span className="text-[#d4a574]">Notified</span>
          </h2>
          <p className="text-sm text-white/70">
            Be the first to experience VOCCA when we launch.
          </p>
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#d4a574]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#d4a574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm mb-2 text-white/80 tracking-wider uppercase">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-[#d4a574]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4a574] transition-colors"
                placeholder="Your name"
                disabled={status === 'loading'}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-white/80 tracking-wider uppercase">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-[#d4a574]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#d4a574] transition-colors"
                placeholder="your@email.com"
                disabled={status === 'loading'}
              />
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <p className="text-red-400 text-sm">{message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-full text-sm uppercase tracking-[0.2em] font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: status === 'loading' ? '#8b7355' : '#d4a574',
                color: '#1a1a1a'
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Notify Me'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}