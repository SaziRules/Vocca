'use client';

import { useEffect, useState, useRef } from 'react';

export default function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Smooth cursor animation with easing
  useEffect(() => {
    const animate = () => {
      // Easing factor - lower = smoother but slower
      const ease = 0.15;
      
      cursorRef.current.x += (mousePosition.x - cursorRef.current.x) * ease;
      cursorRef.current.y += (mousePosition.y - cursorRef.current.y) * ease;
      
      setCursorPosition({
        x: cursorRef.current.x,
        y: cursorRef.current.y,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      {/* Outer dragging circle - follows with delay */}
      <div
        className="fixed pointer-events-none z-9999 mix-blend-difference transition-transform duration-200"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div
          className="w-8 h-8 border-2 border-white rounded-full"
          style={{
            opacity: 0.5,
          }}
        />
      </div>

      {/* Inner cursor dot - follows immediately */}
      <div
        className="fixed pointer-events-none z-9999 mix-blend-difference transition-transform duration-100"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: isHovering ? '#d4a574' : 'white',
          }}
        />
      </div>
    </>
  );
}